import { useRecoilValue } from 'recoil';
import { roleBasedFilesState } from '../../recoil/state/formState';
import { useEffect, useState } from 'react';
import EditableText from '../atoms/EditableText';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';

GlobalWorkerOptions.workerSrc = workerSrc;

const A4_HEIGHT = 1123;

const FileSectionRenderer = ({ role, initialHeading }: { role: string; initialHeading: string }) => {
  const filesMap = useRecoilValue(roleBasedFilesState);
  const files = filesMap[role] || [];

  const [heading, setHeading] = useState(initialHeading);
  const [contentBlocks, setContentBlocks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const renderFiles = async () => {
      const blocks: JSX.Element[] = [];
      let currentContent: JSX.Element[] = [];
      let currentHeight = 0;
      let headingRendered = false;

      const flushPage = () => {
        blocks.push(
          <div
            key={`page-${blocks.length}`}
            className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break flex flex-col"
          >
            {!headingRendered && (
              <EditableText
                tag="h1"
                defaultValue={heading}
                onSave={setHeading}
                className="text-center text-amber-800 underline mb-6"
              />
            )}
            {currentContent.map((block, i) => (
              <div key={`content-${blocks.length}-${i}`}>{block}</div>
            ))}
          </div>
        );
        currentContent = [];
        currentHeight = 0;
        headingRendered = true;
      };

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
              <img
                src={url}
                alt={file.name}
                className="max-w-full max-h-[800px] object-contain"
              />
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
              <div
                key={`${file.name}-pdf-${pageNum}`}
                className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break"
              >
   {!headingRendered && (
 <div className="mb-6">
  {heading.split('\n').map((line, idx) => (
    <div
      key={idx}
      className="text-center text-amber-800 underline text-sm font-medium"
    >
      {line}
    </div>
  ))}
</div>

)}

                <img
                  src={imgData}
                  alt={`PDF page ${pageNum}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            );
            headingRendered = true;
          }
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
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
                <div
                  key={`${file.name}-docx-${i}`}
                  className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break prose prose-sm"
                >
                  {!headingRendered && (
                    <EditableText
                      tag="h1"
                      defaultValue={heading}
                      onSave={setHeading}
                      className="text-center text-amber-800 underline mb-6"
                    />
                  )}
                  <div dangerouslySetInnerHTML={{ __html: html }} />
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
              <div
                key={`${file.name}-docx-final`}
                className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break prose prose-sm"
              >
                {!headingRendered && (
                  <EditableText
                    tag="h1"
                    defaultValue={heading}
                    onSave={setHeading}
                    className="text-center text-amber-800 underline mb-6"
                  />
                )}
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            );
          }

          document.body.removeChild(container);
        } else {
          if (currentHeight > 0) flushPage();
          blocks.push(
            <div
              key={file.name}
              className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break"
            >
              {!headingRendered && (
                <EditableText
                  tag="h1"
                  defaultValue={heading}
                  onSave={setHeading}
                  className="text-center text-amber-800 underline mb-6"
                />
              )}
              <p className="font-semibold mb-2">{file.name}</p>
              <p className="text-red-500 text-sm">Preview not supported for this file.</p>
            </div>
          );
          headingRendered = true;
        }
      }

      if (currentContent.length > 0) flushPage();
      setContentBlocks(blocks);
    };

    renderFiles();
  }, [files, heading]);

  return <>{contentBlocks.map((block, index) => <div key={index}>{block}</div>)}</>;
};

export default FileSectionRenderer;
