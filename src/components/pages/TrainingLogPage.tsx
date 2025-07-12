import EditableText from '../atoms/EditableText';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { shortCompanyNameState } from '../../recoil/state/formState';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const TrainingLogPage = () => {
  const shortCompanyName = useRecoilValue(shortCompanyNameState);

  const [title1, setTitle1] = useState('17. Completion Inspection');
  const [desc1, setDesc1] = useState(`Prior to Pre-Final Inspection, contractor’s punch list will be completed, and a 48-hour notice will be given to the NAVFAC staff for inspection. During the pre-final inspection, a comprehensive punch list will be completed by the Quality Control Manager for ${shortCompanyName}. Attendants to the Inspection walkthrough should include QCM, Superintendent, Sub-contractors and Foreman. After all items on the Pre-final Punch list are completed, 48-hour notice will be given to NAVFAC staff for the Final Inspection during which all items on the pre-final punch list will be reviewed. Any items still not accepted will be noted and completed.`);

  const [title2, setTitle2] = useState('18. Training Procedures and Log');
  const [desc2, setDesc2] = useState(`Each employee, General and Subcontractor, will receive an initial safety indoctrination that will be complimented by the weekly daily meetings to enable them to perform their work in a safe manner. During the safety indoctrination the SSHO will determine if workers are fit for duty. The SSHO will also review the AHA with all workers to ensure their understanding about the AHA and have the workers sign the AHA as verification of their understanding. The GDA will be invited to safety meetings. The safety indoctrination and training will be based on this Accident Prevention Program and will include, but not be limited to:`);

  const [sectionA, setSectionA] = useState('a. Discussion Subjects for Employee Indoctrination');
  const [discussionPoints, setDiscussionPoints] = useState([
    'General Safety Policy and pertinent provisions, of the United States Army Corps of Engineers Safety and Health Requirement Manual EM 385-1-1, dated 15 March 2024 and OSHA Standards for the Construction Industry (26 CFR part 1926 w/Amendments as of Feb. 1, 2000).',
    'Accident Prevention Plan and Activity Hazard Analysis.',
    'Requirement for employee and project safety.',
    'Employee’s responsibilities for property and the safety of others.',
    'Employee’s responsibilities for reporting all accidents.',
    'Medical facilities and required treatment.',
    'Procedures for reporting or correcting unsafe conditions or practices.',
    'Safe clearance procedures.',
    'Firefighting and other emergency procedures.',
    'Activity hazard analysis and accident prevention plan.',
    'Alcohol and Drug abuse policy.',
    'Segregation of vehicular and pedestrian traffic.',
    'All topics relating to ongoing work.'
  ]);

  const [sectionB, setSectionB] = useState('b. Applicable Mandatory Training and Certifications:');
  const [trainingPoints, setTrainingPoints] = useState([
    'Personal Protective Equipment',
    'Lift Equipment Operator Training',
    'First Aid and CPR',
    'Fall Protection'
  ]);

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <EditableText defaultValue={title1} onSave={setTitle1} tag="h1" className="text-center text-amber-800 font-bold mb-4 text-sm" />
        <EditableText defaultValue={desc1} onSave={setDesc1} tag="p" className="mb-6" />

        <EditableText defaultValue={title2} onSave={setTitle2} tag="h1" className="text-center text-amber-800 font-bold mb-4 text-sm" />
        <EditableText defaultValue={desc2} onSave={setDesc2} tag="p" className="mb-4" />

        <EditableText defaultValue={sectionA} onSave={setSectionA} tag="p" className="font-bold mb-2 ml-8" />
        <ol className="list-decimal mb-6 ml-24">
          {discussionPoints.map((point, idx) => (
            <li key={idx} className="mb-1">
              <EditableText
                defaultValue={point}
                onSave={(val) => {
                  const updated = [...discussionPoints];
                  updated[idx] = val;
                  setDiscussionPoints(updated);
                }}
                tag="span"
              />
            </li>
          ))}
        </ol>

        <EditableText defaultValue={sectionB} onSave={setSectionB} tag="p" className="font-bold mb-2 ml-8" />
        <ol className="list-decimal ml-24">
          {trainingPoints.map((point, idx) => (
            <li key={idx} className="mb-1">
              <EditableText
                defaultValue={point}
                onSave={(val) => {
                  const updated = [...trainingPoints];
                  updated[idx] = val;
                  setTrainingPoints(updated);
                }}
                tag="span"
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TrainingLogPage;
