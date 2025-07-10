import { useRecoilState } from 'recoil';
import { roleBasedFilesState } from '../../recoil/state/formState';

type FileUploadProps = {
  role: string;
  text?:string
};

const FileUploadByRole = ({ role,text }: FileUploadProps) => {
  const [filesMap, setFilesMap] = useRecoilState(roleBasedFilesState);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const existing = filesMap[role] || [];
    const unique = Array.from(selected).filter(
      (file) =>
        !existing.some((f) => f.name === file.name && f.lastModified === file.lastModified)
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
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-2">{text} Upload</h3>
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={handleUpload}
        className="block mb-4 border bg-blue-500"
      />

      <ul className="text-sm list-disc pl-5">
        {(filesMap[role] || []).map((file, idx) => (
          <li key={idx} className="flex justify-between items-center  ">
            {file.name}
            <button
              onClick={() => removeFile(idx)}
              className="ml-4 text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadByRole;
