// components/AppointmentQCManagerLetter.tsx
import { useRecoilState, useRecoilValue } from 'recoil';

import {  contractNumberState, contractorNameState, deliveryOrderNoState, letterAddressState, letterDateState, qcManagerState, shortCompanyNameState, workOrderState } from '../../../recoil/state/formState';
import EditableText from '../EditableText';
import { useState } from 'react';
import SignatureBlock from '../SignatureBlock';


const AppointmentQCManagerLetter = () => {
  const contractNumber = useRecoilValue(contractNumberState);
  const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
  const workOrderNo = useRecoilValue(workOrderState);
  const name=useRecoilValue(qcManagerState)
  const workDescription = useRecoilValue(contractorNameState);
  const shortCompanyName = useRecoilValue(shortCompanyNameState);
  const [date,setDate] = useRecoilState(letterDateState);
  const [rec,setRec] = useRecoilState(letterAddressState);
    const [reference, setReference] = useState(workDescription);
  const [contract, setContract] = useState(contractNumber);
  const [deliveryOrder, setDeliveryOrder] = useState(deliveryOrderNo);
  const [workOrder, setWorkOrder] = useState(workOrderNo);
  const [subject, setSubject] = useState(`Appointment of Onsite Quality Control Manager (${name})`);
  const [paragraph1, setParagraph1] = useState(
    `In regards to the above referenced project, ${shortCompanyName} will appoint ${name} as the Quality Control Manager. He will be responsible for reviewing the work and on site day-to-day implementation of the Quality Control Plan. He will also act as the day-to-day Project Manager’s representative.`
  );
  const [paragraph2, setParagraph2] = useState(
    "Thank you for your cooperation and assistance in this matter. If you have any questions or need more information, please do not hesitate to contact the undersigned."
  );
  const [Ref, setRef] = useState("Reference:")
  const [con, setcon] = useState("Contract No:")
  const [del, setdel] = useState("Delivery Order No:")
  const [work, setwork] = useState("Work Order No:")
  const [sub, setSub] = useState("Subject:")
 

  return (
    <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
      <EditableText
        defaultValue={date}
        onSave={setDate}
        tag="p"
        className="font-bold  mb-4"
      />

      <EditableText
        defaultValue={rec}
        onSave={setRec}
        tag="p"
        className="text-sm text-gray-800 mb-4 whitespace-pre-wrap"
      />


      <div className="mb-4 text-sm">
        <p>
          <EditableText
            defaultValue={Ref}
            onSave={setRef}
            tag="strong"
          />{' '}
          <EditableText
            defaultValue={reference}
            onSave={setReference}
            tag="span"
            className='ml-24'
            
          />
        </p>
        <p>
          <EditableText
            defaultValue={con}
            onSave={setcon}
            tag="strong"
          />{' '}
          <EditableText
            defaultValue={contract}
            onSave={setContract}
            tag="span"
                        className='ml-24'

          />
        </p>
        <p>
          <EditableText
            defaultValue={del}
            onSave={setdel}
            tag="strong"
          />{' '}
          <EditableText
            defaultValue={deliveryOrder}
            onSave={setDeliveryOrder}
            tag="span"
                        className='ml-24'

          />
        </p>
        <p>
          <EditableText
            defaultValue={work}
            onSave={setwork}
            tag="strong"
          />{' '}
          <EditableText
            defaultValue={workOrder}
            onSave={setWorkOrder}
            tag="span"
                        className='ml-24'

          />
        </p>
        <p>
          <EditableText
            defaultValue={sub}
            onSave={setSub}
            tag="strong"
          />{' '}
          <EditableText
            defaultValue={subject}
            onSave={setSubject}
            tag="span"
                        className='ml-24'

          />
        </p>
      </div>

      <EditableText
        defaultValue={paragraph1}
        onSave={setParagraph1}
        tag="p"
        className="text-sm mb-4"
      />

      <EditableText
        defaultValue={paragraph2}
        onSave={setParagraph2}
        tag="p"
        className="text-sm mb-6"
      />
      <SignatureBlock/>

      
    </div>
  );
};

export default AppointmentQCManagerLetter;
