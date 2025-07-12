import { useRecoilValue } from 'recoil';
import { roleBasedFilesState } from '../../recoil/state/formState';
import { useEffect, useMemo, useState } from 'react';
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

const FileSectionRenderer = ({
  role,
  initialHeading,
  notheading
}: {
  role: string;
  initialHeading: string;
  notheading?:boolean
}) => {
  const filesMap = useRecoilValue(roleBasedFilesState);
  const files = useMemo(() => filesMap[role] || [], [filesMap, role]);
  const [heading, setHeading] = useState(initialHeading);
  const [contentBlocks, setContentBlocks] = useState<JSX.Element[]>([]);
  // const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // if (rendered) return;
    // console.log('Rendering FileSectionRenderer for', role, 'with heading:', initialHeading);

    const renderFiles = async () => {
      const blocks: JSX.Element[] = [];
      let currentContent: JSX.Element[] = [];
      let currentHeight = 0;
      let headingRendered = false;

      const flushPage = () => {
        blocks.push(
          <div key={`page-${blocks.length}`} className={PAGE_COMMON_CLASSES}>
            <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
            <div className={INNER_PAGE_CONTENT_CLASSES}>
            {!headingRendered && !notheading && (
  <EditableText
    tag="h1"
    defaultValue={heading}
    onSave={(newVal) => {
      if (newVal !== heading) setHeading(newVal);
    }}
    className="text-center text-amber-800 underline mb-6"
  />
)}

              {currentContent.map((block, i) => (
                <div key={`content-${blocks.length}-${i}`}>{block}</div>
              ))}
            </div>
          </div>
        );
        currentContent = [];
        currentHeight = 0;
        headingRendered = true;
      };
      
      /* Nothing uploaded yet? — show a placeholder page */
      if (files.length === 0) {
        flushPage(); // just the heading
        setContentBlocks(blocks);
        return;
      }

      for (const file of files) {
        const url = URL.createObjectURL(file);

        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.src = url;
          await img.decode();
          const estimatedHeight = Math.min(img.height, 800);
          if (currentHeight + estimatedHeight > A4_HEIGHT - 100) flushPage();

          currentContent.push(
            <div key={file.name} className="flex justify-center">
              <img src={url} alt={file.name} className="max-w-full max-h-[800px] object-contain" />
            </div>
          );
          currentHeight += estimatedHeight;
        } else if (file.type === 'application/pdf') {
          const pdf = await getDocument(url).promise;
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, viewport }).promise;
            const imgData = canvas.toDataURL();

            if (currentHeight > 0) flushPage();

            blocks.push(
              <div key={`${file.name}-pdf-${pageNum}`} className={PAGE_COMMON_CLASSES}>
                <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                <div className={INNER_PAGE_CONTENT_CLASSES}>
                  {!headingRendered && (
                    <div className="mb-6">
                      {heading.split('\n').map((line, idx) => (
                        <div key={idx} className="text-center text-amber-800 underline text-sm font-medium">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}
                  <img src={imgData} alt={`PDF page ${pageNum}`} className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            );
            headingRendered = true;
          }
        } else if (
          file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });

          const container = document.createElement('div');
          container.innerHTML = result.value;
          container.style.position = 'absolute';
          container.style.visibility = 'hidden';
          container.style.width = '794px';
          container.style.padding = '2rem';
          container.className = 'prose prose-sm';
          document.body.appendChild(container);

          const children = Array.from(container.children);
          let tempPage: HTMLElement[] = [];
          let accumulatedHeight = 0;

          for (let i = 0; i < children.length; i++) {
            const node = children[i] as HTMLElement;
            const nodeHeight = node.getBoundingClientRect().height;

            if (accumulatedHeight + nodeHeight > A4_HEIGHT - 100) {
              const html = tempPage.map(el => el.outerHTML).join('');
              blocks.push(
                <div key={`${file.name}-docx-${i}`} className={PAGE_COMMON_CLASSES}>
                  <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                  <div className={`${INNER_PAGE_CONTENT_CLASSES} prose prose-sm`}>
                    {!headingRendered && (
                      <EditableText
                        tag="h1"
                        defaultValue={heading}
                        onSave={(newVal) => {
                          if (newVal !== heading) setHeading(newVal);
                        }}
                        className="text-center text-amber-800 underline mb-6"
                      />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
                </div>
              );
              headingRendered = true;
              tempPage = [];
              accumulatedHeight = 0;
            }

            tempPage.push(node.cloneNode(true) as HTMLElement);
            accumulatedHeight += nodeHeight;
          }

          if (tempPage.length > 0) {
            const html = tempPage.map(el => el.outerHTML).join('');
            blocks.push(
              <div key={`${file.name}-docx-final`} className={PAGE_COMMON_CLASSES}>
                <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
                <div className={`${INNER_PAGE_CONTENT_CLASSES} prose prose-sm`}>
                  {!headingRendered && (
                    <EditableText
                      tag="h1"
                      defaultValue={heading}
                      onSave={(newVal) => {
                        if (newVal !== heading) setHeading(newVal);
                      }}
                      className="text-center text-amber-800 underline mb-6"
                    />
                  )}
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            );
          }

          document.body.removeChild(container);
        } else {
          if (currentHeight > 0) flushPage();

          blocks.push(
            <div key={file.name} className={PAGE_COMMON_CLASSES}>
              <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
              <div className={INNER_PAGE_CONTENT_CLASSES}>
                {!headingRendered && (
                  <EditableText
                    tag="h1"
                    defaultValue={heading}
                    onSave={(newVal) => {
                      if (newVal !== heading) setHeading(newVal);
                    }}
                    className="text-center text-amber-800 underline mb-6"
                  />
                )}
                <p className="font-semibold mb-2">{file.name}</p>
                <p className="text-red-500 text-sm">Preview not supported for this file.</p>
              </div>
            </div>
          );
          headingRendered = true;
        }
      }

      if (currentContent.length > 0) flushPage();

      setContentBlocks(blocks);
      // setRendered(true);
    };

    renderFiles();
  }, [files.length, initialHeading]);

  return <>{contentBlocks.map((block, index) => <div key={index}>{block}</div>)}</>;
};

export default FileSectionRenderer;
