import { useRecoilState } from 'recoil';
import { presidentSignatureUrlState } from '../../../recoil/state/formState';


const SignatureUpload = () => {
  const [signatureFile, setSignatureFile] = useRecoilState(presidentSignatureUrlState);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignatureFile(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="font-medium block mb-2">Upload President Signature</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="bg-white border border-gray-300 px-2 py-1 rounded"
      />
      {signatureFile && (
        <p className="text-sm text-green-700 mt-2">Uploaded: {signatureFile.name}</p>
      )}
    </div>
  );
};

export default SignatureUpload;
