import  { useState } from 'react'
import EditableText from '../atoms/EditableText';
import { useRecoilState } from 'recoil';
import { contractNumberState, contractorNameState, deliveryOrderNoState, locationState, workOrderState } from '../../recoil/state/formState';
import { EditableRow } from '../atoms/EditableRow';

const AppointmentLetterHeading = () => {
     const [heading, setHeading] = useState("9. ARGUS CJW JV LLC Appointment Letters");
       const [contractNumber, setContractNumber] = useRecoilState(contractNumberState);
       const [deliveryOrderNo, setDeliveryOrderNo] = useRecoilState(deliveryOrderNoState);
       const [workOrder, setWorkOrder] = useRecoilState(workOrderState);
       const [location, setLocation] = useRecoilState(locationState);
       const [contractorName, setContractorName] = useRecoilState(contractorNameState);
         const [contactNumberLabel, setcontactNumberLabel] = useState("Contract Number:")
  const [deliveryOrderLabel, setdeliveryOrderLabel] = useState("Delivery Order No:")
  const [workOrderLabel, setworkOrderLabel] = useState("Work Order:")

  return (
    <div>
            <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
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

export default AppointmentLetterHeading