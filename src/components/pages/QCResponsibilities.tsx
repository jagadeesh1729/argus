// components/QCResponsibilities.tsx
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { shortCompanyNameState } from '../../recoil/state/formState';
import EditableText from '../atoms/EditableText';

const QCResponsibilities = () => {
  const companyName = useRecoilValue(shortCompanyNameState);
  const [heading, setHeading] = useState("7. Duties, Responsibility and Authority of QC Personnel");
  const [description, setDescription] = useState(
    `${companyName}, through the utilization of this Quality Control System, strives to obtain a uniform, high quality, level of workmanship throughout all phases of procurement and construction. To ensure this end, the following principles will be observed:`
  );
  const [bullets, setBullets] = useState([
    "Ensure the highest quality by maintaining supervised controls and written instructions governing control procedures and practices, clearly defined responsibility, and authority to enforce compliance.",
    "To ensure objectivity, our QCM can directly contact and is functionally responsible to our Corporate Officer in Charge (COC). This authority and responsibility is stated in a letter of appointment issued to the QCM by the COC. However, corporate QC accountability does not diminish the Project Manager’s on-site contractual authority. The QC Manager will have a current certification issued by the US Army Corps of Engineers.",
    "This direct link to the COC of the company ensures that if there are any discrepancies that cannot be resolved satisfactorily at the project level, they are immediately addressed with corporate management. Our approach to contract operations is to establish internal oversight and control procedures which incorporate QC responsibilities into site superintendence as well as subcontractor agreements. Therefore, if Quality Control problems do occur, they are usually resolved at the project or supervisory levels.",
    "The QC Manager is responsible for applying our approved QC procedures to the contract and NAVFAC Quality Control procedure, developing site-specific procedures to meet local conditions and base requirements, and as a project inspector, monitoring ongoing delivery order work to ensure that materials and workmanship conform to specifications. As stated in the PM requirements, the QCM works with the PM and COC on any subcontracting issues to ensure satisfactory performance. The QCM also supervises specialty or subcontracted inspectors as necessary due to the volume and location of delivery orders.",
    "and maintain/submit testing records.",
    "Assign specialty QC inspectors as required.",
    "Ensure that as-built drawings are updated daily or as required and accurately reflect work performed.",
    "Inspect and conduct operational tests of the completed operating systems.",
    "Enforce effective and timely corrective actions.",
    "Prepare daily QC reports and submit on the next work day.",
    `Stop work of subcontractors and/or ${companyName} crafts employees if materials, work methods, or craftsmanship do not meet specifications.`,
    "Order work resumed when deficiencies are corrected.",
    "Conduct contract-wide trend and deficiency analyses.",
    `Provide QC activity assessments and performance evaluations to the Project Manager and ${companyName}.`,
    `Report Quality Control matters directly to the ${companyName} Board if necessary.`,
    "Inspection of existing conditions prior to installation of each major component.",
    "Sub-Contractor & 3rd Party Inspections will also be responsible for QC and to the QCM."
  ]);

  const [meetingTitle, setMeetingTitle] = useState("QC Manager is also responsible for conducting weekly QC meetings at the work site. At a minimum, the following shall be accomplished at each meeting:");
  const [meetingItems, setMeetingItems] = useState([
    "Review the minutes of the previous meeting.",
    "Review the schedule, the two week look ahead, and status of work.",
    "Work or testing accomplished since the last meeting.",
    "Rework items identified and/or completed since the last meeting.",
    "Review the status of submittals.",
    "Schedule the Three Phases of Control.",
    "Testing required.",
    "Status of offsite work or testing.",
    "Documentation required.",
    "Resolve QC and production problems.",
    "Revisions to the QC Plan or personnel as required."
  ]);

  const [phasesTitle, setPhasesTitle] = useState("Perform the Three Phases of Control:");
  const [phases, setPhases] = useState([
    "Preparatory Phase",
    "Initial Phase",
    "Follow Up Phase"
  ]);

  return (
    <>
      <div className="p-6 border border-gray-300 bg-white w-[794px] h-[1123px] mx-auto shadow break-inside-avoid page-break">
        <EditableText
          defaultValue={heading}
          onSave={setHeading}
          tag="h1"
          className="text-center font-bold underline text-lg mb-4"
        />

        <p className="mb-4">
          <span className="bg-yellow-300 font-bold">{companyName}</span>,&nbsp;
          <EditableText
            defaultValue={description.replace(`${companyName}, `, '')}
            onSave={(val) => setDescription(`${companyName}, ${val}`)}
            tag="span"
          />
        </p>

        <ul className="list-disc list-inside mb-6">
          {bullets.map((item, idx) => (
            <li key={idx} className="mb-1">
              <EditableText
                defaultValue={item}
                onSave={(val) => {
                  const updated = [...bullets];
                  updated[idx] = val;
                  setBullets(updated);
                }}
                tag="span"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border border-gray-300 bg-white w-[794px] h-[1123px] mx-auto shadow break-inside-avoid page-break">
        <EditableText
          defaultValue={meetingTitle}
          onSave={setMeetingTitle}
          tag="h1"
          className="font-bold mb-2"
        />
        <ul className="list-disc list-inside mb-6">
          {meetingItems.map((item, idx) => (
            <li key={idx} className="mb-1">
              <EditableText
                defaultValue={item}
                onSave={(val) => {
                  const updated = [...meetingItems];
                  updated[idx] = val;
                  setMeetingItems(updated);
                }}
                tag="span"
              />
            </li>
          ))}
        </ul>

        <EditableText
          defaultValue={phasesTitle}
          onSave={setPhasesTitle}
          tag="h1"
          className="font-bold mb-2"
        />
        <ul className="list-disc list-inside">
          {phases.map((item, idx) => (
            <li key={idx} className="mb-1">
              <EditableText
                defaultValue={item}
                onSave={(val) => {
                  const updated = [...phases];
                  updated[idx] = val;
                  setPhases(updated);
                }}
                tag="span"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QCResponsibilities;
