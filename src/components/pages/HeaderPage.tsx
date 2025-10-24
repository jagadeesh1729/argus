/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilState } from 'recoil';
import {
  contractNumberState,
  deliveryOrderNoState,
  workOrderState,
  locationState,
  contractorNameState,
  companyNameState,
  companyAddressState,
} from '../../recoil/state/formState';
import { useState } from 'react';
import EditableText from '../atoms/EditableText';
import { EditableRow } from '../atoms/EditableRow';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const HeaderPage = () => {
  const [contractNumber, setContractNumber] = useRecoilState(contractNumberState);
  const [deliveryOrderNo, setDeliveryOrderNo] = useRecoilState(deliveryOrderNoState);
  const [workOrder, setWorkOrder] = useRecoilState(workOrderState);
  const [location, setLocation] = useRecoilState(locationState);
  const [contractorName, setContractorName] = useRecoilState(contractorNameState);
  const [companyName, setCompanyName] = useRecoilState(companyNameState);
  const [companyAddress, setCompanyAddress] = useRecoilState(companyAddressState);

  const [title, setTitle] = useState('Quality Control Plan');
  const [contactNumberLabel, setcontactNumberLabel] = useState("Contract Number:")
  const [deliveryOrderLabel, setdeliveryOrderLabel] = useState("Delivery Order No:")
  const [workOrderLabel, setworkOrderLabel] = useState("Work Order:")

  // Images now sourced from public assets (not from uploaded inputs)
  const companyLogoSrc = '/assets/7433889.jpg';
  const contractorLogoSrc = '/assets/4288571.jpg';

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        {/* Logos and top section */}
        <div className='flex flex-col justify-between'>
          <div className="flex flex-col items-center space-y-6 mt-10">
            <img src={companyLogoSrc} alt="Company Logo" className=" max-h-60" />
            <img src={contractorLogoSrc} alt="Contractor Logo" className="object-contain w-40" />
          </div>

          {/* Title */}
          <hr className="border-blue-700 my-6" />
          <EditableText
            tag="h1"
            defaultValue={title}
            onSave={setTitle}
            className="text-3xl font-bold text-center text-[#001b8f] uppercase tracking-wide"
          />
          <hr className="border-blue-700 my-6" />

          {/* Contractor Name & Location */}
          <div className="text-center text-black space-y-3 py-6 text-lg font-semibold">
            <EditableText tag="p" defaultValue={contractorName} onSave={setContractorName} />
            <EditableText tag="p" defaultValue={location} onSave={setLocation} />
          </div>

          <div className="mt-8 max-w-2xl mx-auto space-y-4 text-base font-medium">
            <EditableRow label={<EditableText tag="p" defaultValue={contactNumberLabel} onSave={setcontactNumberLabel}/>} value={contractNumber} onChange={setContractNumber} />
            <EditableRow label={<EditableText tag="p" defaultValue={deliveryOrderLabel} onSave={setdeliveryOrderLabel}/>} value={deliveryOrderNo} onChange={setDeliveryOrderNo} />
            <EditableRow label={<EditableText tag="p" defaultValue={workOrderLabel} onSave={setworkOrderLabel}/>} value={workOrder} onChange={setWorkOrder} />
          </div>
        </div> {/* End of flex flex-col justify-between border border-b */}

        {/* This empty div will push the footer to the bottom */}
        <div className="flex-grow"></div>

        {/* Footer - moved to be the absolute last element on the page */}
        <div className="text-center text-[#001b8f] font-medium text-sm  pt-4 mt-auto"> {/* Added border-t and pt-4 */}
          <EditableText tag="p" defaultValue={companyName} onSave={setCompanyName} />
          <EditableText tag="p" defaultValue={companyAddress} onSave={setCompanyAddress} />
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
