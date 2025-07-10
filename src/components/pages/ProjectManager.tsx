import { useRecoilValue } from 'recoil';
import {  projectManagerState, roleBasedFilesState } from '../../recoil/state/formState';
import { useEffect, useState } from 'react';
import EditableText from '../atoms/EditableText';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';

GlobalWorkerOptions.workerSrc = workerSrc;

const ProjectManager= () => {
   const qc_name=useRecoilValue(projectManagerState)
  const [heading, setHeading] = useState("6. Project  Manager\nINSERT RESUME & QUALIFICATIONS ["+qc_name+"]");
  const filesMap = useRecoilValue(roleBasedFilesState);
  const role = "projectManager";
  const files = filesMap[role] || [];
  const [pdfImages, setPdfImages] = useState<string[]>([]);
//   const [nonPdfFiles, setNonPdfFiles] = useState<{ name: string; content: JSX.Element }[]>([]);
  const [firstPageNonPdf, setFirstPageNonPdf] = useState<JSX.Element[]>([]);
  const [remainingNonPdf, setRemainingNonPdf] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const renderFiles = async () => {
      const previews: string[] = [];
      const tempFirstPage: JSX.Element[] = [];
      const tempRemainingPages: JSX.Element[] = [];
      let firstPageFilled = false;

      for (const file of files) {
        const url = URL.createObjectURL(file);

        if (file.type === 'application/pdf') {
          const pdf = await getDocument(url).promise;
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: ctx, viewport }).promise;
            previews.push(canvas.toDataURL());
          }
        } else {
          let contentBlock: JSX.Element;

          if (file.type.startsWith('image/')) {
            contentBlock = (
              <div key={file.name}>
                <p className="font-semibold mb-2">{file.name}</p>
                <img src={url} alt={file.name} className="max-w-full max-h-[900px]" />
              </div>
            );
          } else if (file.type === 'text/plain') {
            const text = await file.text();
            contentBlock = (
              <div key={file.name}>
                <p className="font-semibold mb-2">{file.name}</p>
                <pre className="bg-gray-100 p-4 text-sm whitespace-pre-wrap break-words">{text}</pre>
              </div>
            );
          } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            contentBlock = (
              <div key={file.name}>
                <p className="font-semibold mb-2">{file.name}</p>
                <div
                  className="prose prose-sm max-w-full"
                  dangerouslySetInnerHTML={{ __html: result.value }}
                />
              </div>
            );
          } else {
            contentBlock = (
              <div key={file.name}>
                <p className="font-semibold mb-2">{file.name}</p>
                <p className="text-red-500 text-sm">Preview not supported for this file.</p>
              </div>
            );
          }

          if (!firstPageFilled) {
            tempFirstPage.push(contentBlock);
            firstPageFilled = true;
          } else {
            tempRemainingPages.push(contentBlock);
          }
        }
      }

      setPdfImages(previews);
      setFirstPageNonPdf(tempFirstPage);
      setRemainingNonPdf(tempRemainingPages);
    };

    renderFiles();
  }, [files]);

  return (
    <>
      <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
        <EditableText
          tag="h1"
          defaultValue={heading}
          onSave={setHeading}
          className="text-center text-amber-800 underline"
        />
        {firstPageNonPdf.map((block, idx) => (
          <div key={`first-nonpdf-${idx}`}>{block}</div>
        ))}
      </div>

      {pdfImages.map((src, idx) => (
        <div
          key={`pdf-${idx}`}
          className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break flex justify-center items-center"
        >
          <img src={src} alt={`PDF page ${idx + 1}`} className="max-h-full max-w-full" />
        </div>
      ))}

      {remainingNonPdf.map((block, idx) => (
        <div
          key={`remain-nonpdf-${idx}`}
          className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break"
        >
          {block}
        </div>
      ))}
    </>
  );
};

export default ProjectManager;
