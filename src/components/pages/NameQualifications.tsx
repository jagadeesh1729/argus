import { useRecoilState } from 'recoil';
import {
  qcManagerState,
  altQcManagerState,
  projectManagerState,
  corporateSafetyOfficerState,
  qcManagerPhoneState,
  altQcManagerPhoneState,
  projectManagerPhoneState,
  corporateSafetyPhoneState
} from '../../recoil/state/formState';
import EditableText from '../atoms/EditableText';
import { useState } from 'react';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const NameQualifications = () => {
  const [qcManager, setQcManager] = useRecoilState(qcManagerState);
  const [altQcManager, setAltQcManager] = useRecoilState(altQcManagerState);
  const [projectManager, setProjectManager] = useRecoilState(projectManagerState);
  const [corporateSafetyOfficer, setCorporateSafetyOfficer] = useRecoilState(corporateSafetyOfficerState);

  const [qcPhone, setQcPhone] = useRecoilState(qcManagerPhoneState);
  const [altQcPhone, setAltQcPhone] = useRecoilState(altQcManagerPhoneState);
  const [projectPhone, setProjectPhone] = useRecoilState(projectManagerPhoneState);
  const [coopNumber,setcoopNumber]=useRecoilState(corporateSafetyPhoneState)

  const [t1, sett1] = useState("Quality Control Manager, Superintendent, and SSHO");
  const [d1, setd1] = useState("to serve as the");
  const [d11, setd11] = useState("on this project. He will also be responsible for enforcement of safety standards and regulations, monitoring the day-to-day activities, and ensuring a safe work environment that meets the requirements of the approved Safety and Health Plan.");

  const [t2, sett2] = useState("Alternate Quality Control Manager");
  const [d2, setd2] = useState("to serve as the");
  const [d22, setd22] = useState("on this project. He maintains current CQCM for Contractor’s Certification.");

  const [t3, sett3] = useState("Project Manager");
  const [d3, setd3] = useState("to serve as the");
  const [d33, setd33] = useState("for this project. He has the responsibility of supporting the Quality Control Plan.");

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <h1 className="text-center text-amber-700 font-semibold underline mb-6">
          2. <span className="underline ml-2">Names & Qualifications</span>
        </h1>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <p>Argus/CJW QC Manager/Superintendent/SSHO</p>
          <p className="font-semibold">
            <EditableText tag="span" defaultValue={qcManager} onSave={setQcManager} />{' '}
            <EditableText tag="span" defaultValue={qcPhone} onSave={setQcPhone} />
          </p>

          <p>Argus/CJW Alternate QC Manager/SSHO</p>
          <p className="font-semibold">
            <EditableText tag="span" defaultValue={altQcManager} onSave={setAltQcManager} />{' '}
            <EditableText tag="span" defaultValue={altQcPhone} onSave={setAltQcPhone} />
          </p>

          <p>Argus/CJW Project Manager</p>
          <p className="font-semibold">
            <EditableText tag="span" defaultValue={projectManager} onSave={setProjectManager} />{' '}
            <EditableText tag="span" defaultValue={projectPhone} onSave={setProjectPhone} />
          </p>

          <p>Argus/CJW Corporate Safety Officer</p>
          <p className="font-semibold">
            <EditableText tag="span" defaultValue={corporateSafetyOfficer} onSave={setCorporateSafetyOfficer} />
            <EditableText tag="span" defaultValue={coopNumber} onSave={setcoopNumber} />
          </p>
        </div>

        <p className="mb-4">
          Argus/CJW has appointed{' '}
          <EditableText tag="span" defaultValue={qcManager} onSave={setQcManager} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d1} onSave={setd1} />{' '}
          <EditableText tag="span" defaultValue={t1} onSave={sett1} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d11} onSave={setd11} />
        </p>

        <p className="mb-4">
          Argus/CJW has appointed{' '}
          <EditableText tag="span" defaultValue={altQcManager} onSave={setAltQcManager} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d2} onSave={setd2} />{' '}
          <EditableText tag="span" defaultValue={t2} onSave={sett2} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d22} onSave={setd22} />
        </p>

        <p>
          Argus/CJW has appointed{' '}
          <EditableText tag="span" defaultValue={projectManager} onSave={setProjectManager} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d3} onSave={setd3} />{' '}
          <EditableText tag="span" defaultValue={t3} onSave={sett3} className="font-bold" />{' '}
          <EditableText tag="span" defaultValue={d33} onSave={setd33} />
        </p>
      </div>
    </div>
  );
};

export default NameQualifications;
