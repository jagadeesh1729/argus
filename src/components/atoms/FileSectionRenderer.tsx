import { useRecoilValue } from 'recoil';
import { roleBasedFilesState } from '../../recoil/state/formState';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import EditableText from '../atoms/EditableText';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';
import {
  PAGE_COMMON_CLASSES,
  PAGE_NUMBER_PLACEHOLDER_CLASSES,
  INNER_PAGE_CONTENT_CLASSES
} from '../../utils/pageStyles';

GlobalWorkerOptions.workerSrc = workerSrc;

const A4_HEIGHT = 1123;

// Optimized settings for batch processing
const PDF_RENDER_SCALE = 1.0; // Lower scale = much faster
const PARALLEL_PDF_PAGES = 4; // Render 4 PDF pages in parallel

// Estimated heights for DOCX elements (avoid slow DOM measurement)
const ELEMENT_HEIGHTS: Record<string, number> = {
  P: 24, H1: 40, H2: 36, H3: 32, H4: 28, LI: 22, UL: 10, OL: 10,
  TABLE: 100, TR: 28, IMG: 200, DIV: 20, BLOCKQUOTE: 40, DEFAULT: 24
};

interface ProgressState {
  currentFile: number;
  totalFiles: number;
  fileName: string;
  currentPage?: number;
  totalPages?: number;
}

const FileSectionRenderer = ({
  role,
  initialHeading,
  notheading
}: {
  role: string;
  initialHeading: string;
  notheading?: boolean;
}) => {
  const filesMap = useRecoilValue(roleBasedFilesState);
  const files = useMemo(() => filesMap[role] || [], [filesMap, role]);
  const [heading, setHeading] = useState(initialHeading);
  const [contentBlocks, setContentBlocks] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    currentFile: 0, totalFiles: 0, fileName: ''
  });
  
  // Cache processed files and abort controller
  const processedCache = useRef<Map<string, JSX.Element[]>>(new Map());
  const abortController = useRef<AbortController | null>(null);

  // Estimate element height without DOM measurement
  const estimateHeight = useCallback((tagName: string, textLength: number = 0): number => {
    const baseHeight = ELEMENT_HEIGHTS[tagName] || ELEMENT_HEIGHTS.DEFAULT;
    return textLength > 100 ? baseHeight + Math.floor(textLength / 80) * 20 : baseHeight;
  }, []);

  // Process PDF with parallel page rendering
  const processPDF = useCallback(async (
    file: File,
    headingRendered: boolean,
    signal: AbortSignal
  ): Promise<{ blocks: JSX.Element[]; headingRendered: boolean }> => {
    const blocks: JSX.Element[] = [];
    const url = URL.createObjectURL(file);
    
    try {
      const pdf = await getDocument(url).promise;
      const totalPages = pdf.numPages;
      
      setProgress(p => ({ ...p, fileName: file.name, currentPage: 0, totalPages }));

      // Process pages in parallel batches
      for (let batchStart = 1; batchStart <= totalPages; batchStart += PARALLEL_PDF_PAGES) {
        if (signal.aborted) break;
        
        const batchEnd = Math.min(batchStart + PARALLEL_PDF_PAGES - 1, totalPages);
        const pagePromises: Promise<{ pageNum: number; imgData: string }>[] = [];
        
        for (let pageNum = batchStart; pageNum <= batchEnd; pageNum++) {
          pagePromises.push(
            (async () => {
              const page = await pdf.getPage(pageNum);
              const viewport = page.getViewport({ scale: PDF_RENDER_SCALE });
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d')!;
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              await page.render({ canvasContext: ctx, viewport }).promise;
              const imgData = canvas.toDataURL('image/jpeg', 0.75);
              canvas.width = 0; canvas.height = 0; // cleanup
              return { pageNum, imgData };
            })()
          );
        }
        
        const results = await Promise.all(pagePromises);
        results.sort((a, b) => a.pageNum - b.pageNum);
        
        for (const { pageNum, imgData } of results) {
          blocks.push(
            <div key={`${file.name}-pdf-${pageNum}`} className={PAGE_COMMON_CLASSES}>
              <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
              <div className={INNER_PAGE_CONTENT_CLASSES}>
                {!headingRendered && pageNum === 1 && (
                  <div className="mb-6">
                    {heading.split('\n').map((line, idx) => (
                      <div key={idx} className="text-center text-amber-800 underline text-sm font-medium">{line}</div>
                    ))}
                  </div>
                )}
                <img src={imgData} alt={`PDF page ${pageNum}`} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          );
          if (pageNum === 1) headingRendered = true;
        }
        
        setProgress(p => ({ ...p, currentPage: batchEnd }));
      }
      
      pdf.destroy();
    } finally {
      URL.revokeObjectURL(url);
    }
    
    return { blocks, headingRendered };
  }, [heading]);

  // Process DOCX - optimized without DOM measurement
  const processDOCX = useCallback(async (
    file: File,
    headingRenderedInitial: boolean,
    signal: AbortSignal
  ): Promise<{ blocks: JSX.Element[]; headingRendered: boolean }> => {
    const blocks: JSX.Element[] = [];
    let headingRendered = headingRenderedInitial;
    
    setProgress(p => ({ ...p, fileName: file.name, currentPage: undefined, totalPages: undefined }));
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      if (signal.aborted) return { blocks, headingRendered };
      
      // Parse HTML without DOM measurement - use DOMParser instead
      const parser = new DOMParser();
      const doc = parser.parseFromString(result.value, 'text/html');
      const children = Array.from(doc.body.children);
      
      let tempHtml: string[] = [];
      let accumulatedHeight = 0;
      const maxPageHeight = A4_HEIGHT - 150;
      
      for (const node of children) {
        if (signal.aborted) break;
        
        const tagName = node.tagName;
        const textLength = node.textContent?.length || 0;
        const nodeHeight = estimateHeight(tagName, textLength);
        
        if (accumulatedHeight + nodeHeight > maxPageHeight && tempHtml.length > 0) {
          const html = tempHtml.join('');
          blocks.push(
            <div key={`${file.name}-docx-${blocks.length}`} className={PAGE_COMMON_CLASSES}>
              <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
              <div className={`${INNER_PAGE_CONTENT_CLASSES} prose prose-sm`}>
                {!headingRendered && (
                  <EditableText tag="h1" defaultValue={heading}
                    onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                    className="text-center text-amber-800 underline mb-6" />
                )}
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          );
          headingRendered = true;
          tempHtml = [];
          accumulatedHeight = 0;
        }
        
        tempHtml.push((node as HTMLElement).outerHTML);
        accumulatedHeight += nodeHeight;
      }
      
      if (tempHtml.length > 0) {
        const html = tempHtml.join('');
        blocks.push(
          <div key={`${file.name}-docx-final`} className={PAGE_COMMON_CLASSES}>
            <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
            <div className={`${INNER_PAGE_CONTENT_CLASSES} prose prose-sm`}>
              {!headingRendered && (
                <EditableText tag="h1" defaultValue={heading}
                  onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                  className="text-center text-amber-800 underline mb-6" />
              )}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        );
        headingRendered = true;
      }
    } catch (error) {
      console.error(`Error processing DOCX ${file.name}:`, error);
      blocks.push(
        <div key={`${file.name}-error`} className={PAGE_COMMON_CLASSES}>
          <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
          <div className={INNER_PAGE_CONTENT_CLASSES}>
            <p className="text-red-500">Error loading {file.name}</p>
          </div>
        </div>
      );
    }
    
    return { blocks, headingRendered };
  }, [heading, estimateHeight]);

  useEffect(() => {
    // Cancel previous processing
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();
    const signal = abortController.current.signal;

    const renderFiles = async () => {
      const allBlocks: JSX.Element[] = [];
      let headingRendered = false;

      // Empty placeholder page
      if (files.length === 0) {
        allBlocks.push(
          <div key="empty-page" className={PAGE_COMMON_CLASSES}>
            <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
            <div className={INNER_PAGE_CONTENT_CLASSES}>
              {!notheading && (
                <EditableText tag="h1" defaultValue={heading}
                  onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                  className="text-center text-amber-800 underline mb-6" />
              )}
            </div>
          </div>
        );
        setContentBlocks(allBlocks);
        setIsLoading(false);
        return;
      }

      setProgress({ currentFile: 0, totalFiles: files.length, fileName: '' });

      // Process files sequentially but with optimized individual processing
      for (let i = 0; i < files.length; i++) {
        if (signal.aborted) break;
        
        const file = files[i];
        
        setProgress(p => ({ ...p, currentFile: i + 1, fileName: file.name }));
        
        // Check cache
        const cacheKey = `${file.name}-${file.size}-${file.lastModified}`;
        const cached = processedCache.current.get(cacheKey);
        
        if (cached) {
          allBlocks.push(...cached);
          headingRendered = true;
          setContentBlocks([...allBlocks]); // Update incrementally
          continue;
        }
        
        let result: { blocks: JSX.Element[]; headingRendered: boolean };
        
        try {
          if (file.type.startsWith('image/')) {
            // Process image - convert to base64
            const reader = new FileReader();
            const base64 = await new Promise<string>((resolve) => {
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
            
            result = {
              blocks: [
                <div key={file.name} className={PAGE_COMMON_CLASSES}>
                  <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                  <div className={INNER_PAGE_CONTENT_CLASSES}>
                    {!headingRendered && (
                      <EditableText tag="h1" defaultValue={heading}
                        onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                        className="text-center text-amber-800 underline mb-6" />
                    )}
                    <div className="flex justify-center">
                      <img src={base64} alt={file.name} className="max-w-full max-h-[800px] object-contain" />
                    </div>
                  </div>
                </div>
              ],
              headingRendered: true
            };
          } else if (file.type === 'application/pdf') {
            result = await processPDF(file, headingRendered, signal);
          } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
          ) {
            result = await processDOCX(file, headingRendered, signal);
          } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            // Process text file
            const text = await file.text();
            const lines = text.split('\n');
            const blocks: JSX.Element[] = [];
            let tempLines: string[] = [];
            const linesPerPage = 45;
            let localHeadingRendered = headingRendered;
            
            for (const line of lines) {
              if (tempLines.length >= linesPerPage) {
                blocks.push(
                  <div key={`${file.name}-txt-${blocks.length}`} className={PAGE_COMMON_CLASSES}>
                    <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                    <div className={INNER_PAGE_CONTENT_CLASSES}>
                      {!localHeadingRendered && (
                        <EditableText tag="h1" defaultValue={heading}
                          onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                          className="text-center text-amber-800 underline mb-6" />
                      )}
                      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{tempLines.join('\n')}</pre>
                    </div>
                  </div>
                );
                localHeadingRendered = true;
                tempLines = [];
              }
              tempLines.push(line);
            }
            
            if (tempLines.length > 0) {
              blocks.push(
                <div key={`${file.name}-txt-final`} className={PAGE_COMMON_CLASSES}>
                  <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                  <div className={INNER_PAGE_CONTENT_CLASSES}>
                    {!localHeadingRendered && (
                      <EditableText tag="h1" defaultValue={heading}
                        onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                        className="text-center text-amber-800 underline mb-6" />
                    )}
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{tempLines.join('\n')}</pre>
                  </div>
                </div>
              );
            }
            
            result = { blocks, headingRendered: true };
          } else {
            // Unsupported file
            result = {
              blocks: [
                <div key={file.name} className={PAGE_COMMON_CLASSES}>
                  <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                  <div className={INNER_PAGE_CONTENT_CLASSES}>
                    {!headingRendered && (
                      <EditableText tag="h1" defaultValue={heading}
                        onSave={(newVal) => { if (newVal !== heading) setHeading(newVal); }}
                        className="text-center text-amber-800 underline mb-6" />
                    )}
                    <p className="font-semibold mb-2">{file.name}</p>
                    <p className="text-red-500 text-sm">Preview not supported for this file type.</p>
                    <p className="text-gray-500 text-xs mt-1">Supported: PDF, DOCX, Images, TXT</p>
                  </div>
                </div>
              ],
              headingRendered: true
            };
          }
          
          // Cache and add to blocks
          processedCache.current.set(cacheKey, result.blocks);
          allBlocks.push(...result.blocks);
          headingRendered = result.headingRendered;
          
          // Update state incrementally for better UX
          if (!signal.aborted) {
            setContentBlocks([...allBlocks]);
          }
          
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          allBlocks.push(
            <div key={`error-${file.name}`} className={PAGE_COMMON_CLASSES}>
              <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
              <div className={INNER_PAGE_CONTENT_CLASSES}>
                <p className="text-red-500 font-semibold">Error processing {file.name}</p>
                <p className="text-gray-500 text-sm mt-2">The file may be corrupted or too large.</p>
              </div>
            </div>
          );
        }
      }

      if (!signal.aborted) {
        setContentBlocks(allBlocks);
        setIsLoading(false);
        setProgress({ currentFile: 0, totalFiles: 0, fileName: '' });
      }
    };

    setIsLoading(true);
    renderFiles();

    return () => {
      if (abortController.current) abortController.current.abort();
    };
  }, [files, initialHeading, notheading, heading, processPDF, processDOCX]);

  // Show loading indicator
  if (isLoading && progress.totalFiles > 0) {
    const fileProgress = (progress.currentFile / progress.totalFiles) * 100;
    const pageProgress = progress.totalPages 
      ? (progress.currentPage || 0) / progress.totalPages * 100 
      : 0;
    
    return (
      <div className={PAGE_COMMON_CLASSES}>
        <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
        <div className={`${INNER_PAGE_CONTENT_CLASSES} flex flex-col items-center justify-center`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mb-4"></div>
          <p className="text-amber-800 font-medium text-lg">
            Processing file {progress.currentFile} of {progress.totalFiles}
          </p>
          <p className="text-gray-600 text-sm mt-1 max-w-md truncate">
            {progress.fileName}
          </p>
          
          {/* File progress bar */}
          <div className="w-72 mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Files</span>
              <span>{Math.round(fileProgress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-600 transition-all duration-300"
                style={{ width: `${fileProgress}%` }}
              />
            </div>
          </div>
          
          {/* Page progress bar (for PDFs) */}
          {progress.totalPages && (
            <div className="w-72 mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Pages</span>
                <span>{progress.currentPage} / {progress.totalPages}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${pageProgress}%` }}
                />
              </div>
            </div>
          )}
          
          <p className="text-gray-400 text-xs mt-4">
            Large files may take a moment...
          </p>
        </div>
      </div>
    );
  }

  return <>{contentBlocks.map((block, index) => <div key={index}>{block}</div>)}</>;
};

export default FileSectionRenderer;
