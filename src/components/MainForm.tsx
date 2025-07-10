import { useRecoilState } from 'recoil';
import {
  contractNumberState,
  deliveryOrderNoState,
  workOrderState,
  contractorNameState,
  locationState,
  qcManagerState,
  altQcManagerState,
  projectManagerState,
  corporateSafetyOfficerState,
  qcManagerPhoneState,
  altQcManagerPhoneState,
  projectManagerPhoneState,
  corporateSafetyPhoneState,
  workDescriptionState,
  companyNameState,
  shortCompanyNameState,
  letterDateState,
  letterAddressState,
  presName,
} from "../recoil/state/formState";

import FileUploadByRole from "./atoms/FileInputField";
import InputField from "./atoms/InputFeild";
import { useNavigate } from 'react-router';
import TradesForm from './atoms/TradesForm';
import SignatureUpload from './atoms/appointment/SignatureUpload';

const MainForm = () => {
  const [contractNumber, setContractNumber] = useRecoilState(contractNumberState);
  const [deliveryOrderNo, setDeliveryOrderNo] = useRecoilState(deliveryOrderNoState);
  const [workOrder, setWorkOrder] = useRecoilState(workOrderState);
  const [contractorName, setContractorName] = useRecoilState(contractorNameState);
  const [location, setLocation] = useRecoilState(locationState);
  const [qcManager, setQcManager] = useRecoilState(qcManagerState);
  const [altQcManager, setAltQcManager] = useRecoilState(altQcManagerState);
  const [projectManager, setProjectManager] = useRecoilState(projectManagerState);
  const [corporateSafetyOfficer, setCorporateSafetyOfficer] = useRecoilState(corporateSafetyOfficerState);
  const [qcManagerPhone, setQcManagerPhone] = useRecoilState(qcManagerPhoneState);
  const [altQcManagerPhone, setAltQcManagerPhone] = useRecoilState(altQcManagerPhoneState);
  const [projectManagerPhone, setProjectManagerPhone] = useRecoilState(projectManagerPhoneState);
  const [corporateSafetyPhone, setCorporateSafetyPhone] = useRecoilState(corporateSafetyPhoneState);
  const [workDescription, setWorkDescription] = useRecoilState(workDescriptionState);
  const [companyName, setCompanyName] = useRecoilState(companyNameState);
  const [shortCompanyName, setShortCompanyName] = useRecoilState(shortCompanyNameState);
  const [date, setDate] = useRecoilState(letterDateState);
  const [address, setAddress] = useRecoilState(letterAddressState);
  const [pres, setPres] = useRecoilState(presName);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Project Information Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Contract No" value={contractNumber} onChange={e => setContractNumber(e.target.value)} />
        <InputField label="Delivery Order No" value={deliveryOrderNo} onChange={e => setDeliveryOrderNo(e.target.value)} />
        <InputField label="Work Order No" value={workOrder} onChange={e => setWorkOrder(e.target.value)} />
        <InputField label="Contract Name" value={contractorName} onChange={e => setContractorName(e.target.value)} />
        <InputField label="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <InputField label="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        <InputField label="Company Short Name" value={shortCompanyName} onChange={e => setShortCompanyName(e.target.value)} />
      </div>

      <h3 className="text-lg font-semibold">Key Personnel</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Quality Control Manager/Superintendent/Site Safety and Health Officer" value={qcManager} onChange={e => setQcManager(e.target.value)} />
        <InputField label="Phone Number (QCM/SSH/SSHO)" value={qcManagerPhone} onChange={e => setQcManagerPhone(e.target.value)} />
        <InputField label="Alternate QC Manager" value={altQcManager} onChange={e => setAltQcManager(e.target.value)} />
        <InputField label="Phone Number (Alternate QC)" value={altQcManagerPhone} onChange={e => setAltQcManagerPhone(e.target.value)} />
        <InputField label="Project Manager" value={projectManager} onChange={e => setProjectManager(e.target.value)} />
        <InputField label="Phone Number (Project Manager)" value={projectManagerPhone} onChange={e => setProjectManagerPhone(e.target.value)} />
        <InputField label="Corporate Safety Officer" value={corporateSafetyOfficer} onChange={e => setCorporateSafetyOfficer(e.target.value)} />
        <InputField label="Phone Number (Corporate Safety)" value={corporateSafetyPhone} onChange={e => setCorporateSafetyPhone(e.target.value)} />
      </div>

      <h3 className="text-lg font-semibold text-center">1. Purpose</h3>
      <InputField label="Description of the work" value={workDescription} onChange={e => setWorkDescription(e.target.value)} multiline />

      <h3 className="text-lg font-semibold text-center">Uploads</h3>
      <FileUploadByRole role="flowchart" text="Organizational Chart" />
      <FileUploadByRole role="projectQualityControlManager" text="Project Quality Control Manager, Superintendent, & Site Safety and Health Officer\nINSERT RESUME & QUALIFICATIONS" />
      <FileUploadByRole role="alternateProjectManager" text="Project Alternate Quality Control Manager\nINSERT RESUME & QUALIFICATIONS" />
      <FileUploadByRole role="projectManager" text="Project Manager\nINSERT RESUME & QUALIFICATIONS" />
      <FileUploadByRole role="submittalRegister" text="Submittal Register & Submittal Procedures" />

      <h3 className="text-lg font-semibold text-center">Trades</h3>
      <TradesForm />

      <h3 className="text-lg font-semibold text-center">Appointment Letter</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Date" value={date} onChange={e => setDate(e.target.value)} />
        <InputField label="NAVFACSYSCOM Address" value={address} onChange={e => setAddress(e.target.value)} multiline />
      </div>

      <SignatureUpload />
      <InputField label="Enter President Name" value={pres} onChange={e => setPres(e.target.value)} />

      <div className="text-center">
        <button onClick={() => navigate("/flow")} className="mt-4 px-6 py-2 bg-black text-white rounded shadow hover:bg-gray-800">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MainForm;
