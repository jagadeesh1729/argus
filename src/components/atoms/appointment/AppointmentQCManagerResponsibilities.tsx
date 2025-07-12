import EditableText from '../EditableText';
import { useRecoilState, useRecoilValue } from 'recoil';
import { companyNameState, contractNumberState, contractorNameState, deliveryOrderNoState, letterDateState, qcManagerState, workOrderState, } from '../../../recoil/state/formState';
import SignatureBlock from '../SignatureBlock';
import { useState } from 'react';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../../utils/pageStyles';


const AppointmentQCManagerResponsibilities = () => {
  const name = useRecoilValue(qcManagerState);
  const shortCompanyName = useRecoilValue(companyNameState);
  
  const [dearText, setDearText] = useState(`Dear Mr. ${name},`);
  const [mainText, setMainText] = useState(
    `In regards to the above referenced project, ${shortCompanyName} does hereby appoint you as the Quality Control Manager. You have the authority and responsibility to exercise fair judgment in the enforcement of industry standards & project specific quality control measures in the oversight of the prime contract. Take the general oversight of the QC efforts of the subcontractors in their day-to-day activities to ensure they are providing a quality product that fulfills the requirements of the contract documents. You have the authority and responsibility to direct the removal and replacement of any defective material and/or work. You also have "stop work" authority and the responsibility to ensure that project elements are inspected at their time of completion before they are covered up. In addition, your duties shall consist of the following:`
  );

  const [duties, setDuties] = useState([
    "Coordination and oversight of all inspections, tests, reports, and actions taken by the quality control organization.",
    "Submit daily inspection reports of all operations on the project indicating work performed, tests made, deficiencies found, and corrective actions taken.",
    "Keep adequate records of materials received and accepted by NAVFAC to ensure that only acceptable materials are incorporated.",
    "Report to an executive of Argus/CJW JV 3 LLC. Incorporated and work in close cooperation with the NAVFAC QA Team and the Argus/CJW JV 3 LLC Board.",
    "Assist, instruct and supervise any other member of the contractor quality team in performance of their duties if the need for additional or supplement personnel shall arise.",
    "Implement Three Phases of Quality Control as specified in the QC plan."
  ]);
    const [date,setDate] = useRecoilState(letterDateState);
    const [n1,setName]=useRecoilState(qcManagerState)
    const [add, setadd] = useState("Argus/CJW JV 3 LLC\n30 Catoctin Circle SE,\n Suite 10 Leesburg, VA 20175\n")
    const [Ref, setRef] = useState("Reference:")
  const [con, setcon] = useState("Contract No:")
  const [del, setdel] = useState("Delivery Order No:")
  const [work, setwork] = useState("Work Order No:")
  const [sub, setSub] = useState("Subject:")
    const contractNumber = useRecoilValue(contractNumberState);
    const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
    const workOrderNo = useRecoilValue(workOrderState);
    const workDescription = useRecoilValue(contractorNameState);
  
      const [reference, setReference] = useState(workDescription);
    const [contract, setContract] = useState(contractNumber);
    const [deliveryOrder, setDeliveryOrder] = useState(deliveryOrderNo);
    const [workOrder, setWorkOrder] = useState(workOrderNo);
    const [subject, setSubject] = useState(`Appointment of Onsite Quality Control Manager`);
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
         className="font-bold  mb-4"
       />
       <EditableText
       defaultValue={n1}
       onSave={setName}
       tag='p'
       />
       <EditableText
       defaultValue={add}
       onSave={setadd}
       tag='p'
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
             tag="span"className='ml-24'

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
         defaultValue={dearText}
         onSave={setDearText}
         tag="p"
         className="mb-4 font-semibold"
       />

       <EditableText
         defaultValue={mainText}
         onSave={setMainText}
         tag="p"
         className="text-sm mb-4 whitespace-pre-wrap"
       />

       <ol className="list-decimal list-inside text-sm mb-8">
         {duties.map((duty, index) => (
           <li key={index}>
             <EditableText
               defaultValue={duty}
               onSave={(val) => {
                 const newDuties = [...duties];
                 newDuties[index] = val;
                 setDuties(newDuties);
               }}
               tag="span"
             />
           </li>
         ))}
       </ol>

       <SignatureBlock />
      </div>
    </div>
  );
};

export default AppointmentQCManagerResponsibilities;
