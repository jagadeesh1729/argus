import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  contractNumberState,
  deliveryOrderNoState,
  workOrderState,
  locationState,
  contractorNameState,
  qcManagerState,
  altQcManagerState,
  projectManagerState,
} from '../../recoil/state/formState';
import { shortCompanyNameState } from '../../recoil/state/formState';
import EditableText from '../atoms/EditableText';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const QualityControlPlan = () => {
  const [qcManager, setQcManager] = useRecoilState(qcManagerState);
  const [altQcManager, setAltQcManager] = useRecoilState(altQcManagerState);
  const [projectManager, setProjectManager] = useRecoilState(projectManagerState);

  const contractNumber = useRecoilValue(contractNumberState);
  const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
  const workOrder = useRecoilValue(workOrderState);
  const contractorName = useRecoilValue(contractorNameState);
  const location = useRecoilValue(locationState);

  const [title, setTitle] = useState('QUALITY CONTROL PLAN');
  const [labelContract, setLabelContract] = useState('Contract No:');
  const [labelDeliveryOrder, setLabelDeliveryOrder] = useState('Delivery Order Number:');
  const [labelWorkOrder, setLabelWorkOrder] = useState('Work Order:');
  const [labelContractName, setLabelContractName] = useState('Contract Name:');
  const [labelLocation, setLabelLocation] = useState('Location:');
  const shortCompanyName = useRecoilValue(shortCompanyNameState) || '';
  const companyLabel = shortCompanyName || 'Company';
  const [labelQcManager, setLabelQcManager] = useState(`${companyLabel} Quality Control Manager / Superintendent / SSHO`);
  const [labelAltQcManager, setLabelAltQcManager] = useState(`${companyLabel} Alternate QC Manager`);
  const [labelProjectManager, setLabelProjectManager] = useState(`${companyLabel} Project Manager`);
  const [labelSchedule, setLabelSchedule] = useState(`${companyLabel} Work Schedule:`);
  const [scheduleTime, setScheduleTime] = useState('Mon–Fri 0600 Hrs (6:00 AM) to 1700 Hrs (5:00 PM)');

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    // Removed the unnecessary fragment <>...</>
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        {/* Title */}
        <div className="flex justify-center mt-20">
          <EditableText
            tag="h1"
            defaultValue={title}
            onSave={setTitle}
            className="text-2xl font-bold underline text-center text-amber-800"
          />
        </div>

        {/* Info Section */}
        <div className="mt-10 ml-56 space-y-3 text-sm font-semibold">
          <div><EditableText tag="span" defaultValue={labelContract} onSave={setLabelContract} /> {contractNumber}</div>
          <div><EditableText tag="span" defaultValue={labelDeliveryOrder} onSave={setLabelDeliveryOrder} /> {deliveryOrderNo}</div>
          <div><EditableText tag="span" defaultValue={labelWorkOrder} onSave={setLabelWorkOrder} /> {workOrder}</div>
          <div><EditableText tag="span" defaultValue={labelContractName} onSave={setLabelContractName} /> {contractorName}</div>
          <div><EditableText tag="span" defaultValue={labelLocation} onSave={setLabelLocation} /> {location}</div>
        </div>

        {/* Editable Names */}
        <div className="mt-16 space-y-6 text-center">
          <div>
            <EditableText tag="p" defaultValue={labelQcManager} onSave={setLabelQcManager} className="text-sm" />
            <EditableText
              tag="div"
              defaultValue={qcManager}
              onSave={setQcManager}
              className="mt-1 px-4 py-2 rounded font-semibold inline-block min-w-[300px]"
            />
          </div>

          <div>
            <EditableText tag="p" defaultValue={labelAltQcManager} onSave={setLabelAltQcManager} className="text-sm" />
            <EditableText
              tag="div"
              defaultValue={altQcManager}
              onSave={setAltQcManager}
              className="mt-1 px-4 py-2 rounded font-semibold inline-block min-w-[300px]"
            />
          </div>

          <div>
            <EditableText tag="p" defaultValue={labelProjectManager} onSave={setLabelProjectManager} className="text-sm" />
            <EditableText
              tag="div"
              defaultValue={projectManager}
              onSave={setProjectManager}
              className="mt-1 px-4 py-2 rounded font-semibold inline-block min-w-[300px]"
            />
          </div>

          <div>
            <EditableText tag="p" defaultValue={labelSchedule} onSave={setLabelSchedule} className="text-sm" />
            <EditableText tag="div" defaultValue={scheduleTime} onSave={setScheduleTime} className="mt-1 font-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityControlPlan;
