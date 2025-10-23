import { useState } from 'react'
import EditableText from '../atoms/EditableText';
import { useRecoilState } from 'recoil';
import { companyNameState, contractNumberState, contractorNameState, deliveryOrderNoState, locationState, workOrderState } from '../../recoil/state/formState';
import { EditableRow } from '../atoms/EditableRow';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const AppointmentLetterHeading = () => {
     const [companyName] = useRecoilState(companyNameState);
     const [heading, setHeading] = useState(`9. ${companyName || 'Company'} Appointment Letters`);
       const [contractNumber, setContractNumber] = useRecoilState(contractNumberState);
       const [deliveryOrderNo, setDeliveryOrderNo] = useRecoilState(deliveryOrderNoState);
       const [workOrder, setWorkOrder] = useRecoilState(workOrderState);
       const [location, setLocation] = useRecoilState(locationState);
       const [contractorName, setContractorName] = useRecoilState(contractorNameState);
         const [contactNumberLabel, setcontactNumberLabel] = useState("Contract Number:")
   const [deliveryOrderLabel, setdeliveryOrderLabel] = useState("Delivery Order No:")
   const [workOrderLabel, setworkOrderLabel] = useState("Work Order:")

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <EditableText
          tag="h1"
          defaultValue={heading}
          onSave={setHeading}
          className="text-center text-amber-800 underline"
        />
        <div className=' mt-40'>
          <div>
            <div className="text-center text-black space-y-3 py-6 text-lg font-semibold">
              <EditableText tag="p" defaultValue={contractorName} onSave={setContractorName} />
              <EditableText tag="p" defaultValue={location} onSave={setLocation} />
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-10'>
          <div>
            <EditableRow label={<EditableText tag="p" defaultValue={contactNumberLabel} onSave={setcontactNumberLabel}/>} value={contractNumber} onChange={setContractNumber} />
            <EditableRow label={<EditableText tag="p" defaultValue={deliveryOrderLabel} onSave={setdeliveryOrderLabel}/>} value={deliveryOrderNo} onChange={setDeliveryOrderNo} />
            <EditableRow label={<EditableText tag="p" defaultValue={workOrderLabel} onSave={setworkOrderLabel}/>} value={workOrder} onChange={setWorkOrder} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentLetterHeading;
