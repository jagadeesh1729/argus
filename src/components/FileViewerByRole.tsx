import { useRecoilValue } from 'recoil';
import { roleBasedFilesState } from '../recoil/state/formState';
import { useEffect, useState } from 'react';

type Props = {
  role: string;
};

const FileViewerByRole = ({ role }: Props) => {
  const filesMap = useRecoilValue(roleBasedFilesState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const files = filesMap[role] || [];

  const [filePreviews, setFilePreviews] = useState<
    { name: string; content: JSX.Element }[]
  >([]);

  useEffect(() => {
    const loadPreviews = async () => {
      const previews = await Promise.all(
        files.map(async (file) => {
          const url = URL.createObjectURL(file);

          if (file.type.startsWith('image/')) {
            return {
              name: file.name,
              content: <img src={url} alt={file.name} className="max-w-full mb-4" />,
            };
          } else if (file.type === 'application/pdf') {
            return {
              name: file.name,
              content: (
                <iframe
                  src={url}
                  title={file.name}
                  className="w-full h-[600px] border mb-4"
                />
              ),
            };
          } else if (file.type === 'text/plain') {
            const text = await file.text();
            return {
              name: file.name,
              content: <pre className="bg-gray-100 p-4 overflow-auto">{text}</pre>,
            };
          } else {
            return {
              name: file.name,
              content: (
                <p className="text-sm text-red-500">Preview not supported for this file.</p>
              ),
            };
          }
        })
      );

      setFilePreviews(previews);
    };

    loadPreviews();
  }, [files]);

  return (
    <div className="my-10">
      <h2 className="text-lg font-bold mb-4">{role} Files Preview</h2>
      {filePreviews.map((preview, idx) => (
        <div key={idx} className="mb-8">
          <p className="font-semibold">{preview.name}</p>
          {preview.content}
        </div>
      ))}
    </div>
  );
};

export default FileViewerByRole;
