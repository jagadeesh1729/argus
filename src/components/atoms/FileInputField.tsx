import { useRecoilState } from 'recoil';
import { roleBasedFilesState } from '../../recoil/state/formState';
import { TrashIcon } from '@heroicons/react/24/outline'; // npm install @heroicons/react

type FileUploadProps = {
  role: string;
  text?: string;
};

const FileUploadByRole = ({ role, text = 'File' }: FileUploadProps) => {
  const [filesMap, setFilesMap] = useRecoilState(roleBasedFilesState);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const existing = filesMap[role] || [];
    const unique = Array.from(selected).filter(
      (file) =>
        !existing.some(
          (f) => f.name === file.name && f.lastModified === file.lastModified
        )
    );

    setFilesMap((prev) => ({
      ...prev,
      [role]: [...existing, ...unique],
    }));
  };

  const removeFile = (index: number) => {
    const updated = [...(filesMap[role] || [])];
    updated.splice(index, 1);
    setFilesMap((prev) => ({
      ...prev,
      [role]: updated,
    }));
  };

  return (
    <div className="mb-10">
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {text} Upload
      </h3>

      {/* File input */}
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={handleUpload}
        className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      {/* File list */}
      {(filesMap[role] || []).length > 0 ? (
        <ul className="rounded border border-gray-200 bg-white divide-y text-sm">
          {filesMap[role].map((file, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-4 py-2"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeFile(idx)}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline hover:underline">Remove</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileUploadByRole;
