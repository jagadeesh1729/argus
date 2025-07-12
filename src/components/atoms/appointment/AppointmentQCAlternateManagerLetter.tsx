import { useRecoilState, useRecoilValue } from 'recoil';

import { altQcManagerState, contractNumberState, contractorNameState, deliveryOrderNoState, letterAddressState, letterDateState, shortCompanyNameState, workOrderState } from '../../../recoil/state/formState';
import EditableText from '../EditableText';
import { useState } from 'react';
import SignatureBlock from '../SignatureBlock';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../../utils/pageStyles';


const AppointmentQCAlternateManagerLetter = () => {
  const contractNumber = useRecoilValue(contractNumberState);
  const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
  const workOrderNo = useRecoilValue(workOrderState);
  const name=useRecoilValue(altQcManagerState)
  const workDescription = useRecoilValue(contractorNameState);
  const shortCompanyName = useRecoilValue(shortCompanyNameState);
  const [date,setDate] = useRecoilState(letterDateState);
  const [rec,setRec] = useRecoilState(letterAddressState);
    const [reference, setReference] = useState(workDescription);
  const [contract, setContract] = useState(contractNumber);
  const [deliveryOrder, setDeliveryOrder] = useState(deliveryOrderNo);
  const [workOrder, setWorkOrder] = useState(workOrderNo);
  const [subject, setSubject] = useState(`Appointment of Onsite Alternate Quality Control Manager`);
  const [paragraph1, setParagraph1] = useState(
    `In regards to the above referenced project, ${shortCompanyName} will appoint ${name} as the Alternate Quality Control Manager. When the QC Manager is not onsite, ${name} will be responsible for reviewing the work and onsite day-to-day implementation of the Quality Control Plan. He will also act as the day-to-day project manager’s representative.`
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
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <EditableText
          defaultValue={date}
          onSave={setDate}
          tag="p"
          className="font-bold mb-4"
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
              tag="h2"
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
    </div>
  );
};

export default AppointmentQCAlternateManagerLetter;
