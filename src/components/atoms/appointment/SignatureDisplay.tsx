import { useRecoilValue } from 'recoil';
import { presidentSignatureUrlState } from '../../../recoil/state/formState';


const SignatureDisplay = () => {
  const file = useRecoilValue(presidentSignatureUrlState);

  if (!file) return null;

  const imageUrl = URL.createObjectURL(file);

  return (
    <div className="mt-4">
      <img src={imageUrl} alt="President Signature" className="h-24 w-auto object-contain" />
    </div>
  );
};

export default SignatureDisplay;
