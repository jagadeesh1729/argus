import { useState } from 'react';
import EditableText from '../atoms/EditableText';
import {
  PAGE_COMMON_CLASSES,
  PAGE_NUMBER_PLACEHOLDER_CLASSES,
  INNER_PAGE_CONTENT_CLASSES,
} from '../../utils/pageStyles';

// Checklist items (you can move this to a separate constants file if needed)
const DEFAULT_ITEMS = [
  'A Narrative listing of work activities performed including location, description and contractor/sub-contractors involved.',
  'Minutes of meeting documenting discussions during Preparatory and Initial phase control meetings.',
  'A listing of construction activities started or completed.',
  'A detailed description of QC items requirements as applicable including inspections. Testing, etc.',
  'A listing of QC/QA punch list issued, corrected, etc.',
  'A listing of Contractor and Sub-contractor working on the project and their area(s) of responsibility.',
  'A list of the construction equipment on the site and the information regarding its active/inactive status.',
  'A listing of all Non-Compliance Reports issued or closed.',
  'A listing of material received and information regarding the acceptance and storage of the material.',
  'A list of off-site inspection activities.',
  'A listing of Design issues encountered in the plans or specifications and any resolutions from the Engineer/Designer.',
];

const QsrChecklist = () => {
  const [title, setTitle] = useState('The Quality Control Daily Report (QSR) is the primary method of reporting to the NAVFAC. QSR Daily reports will be prepared on a daily basis and submitted to be NAVFAC before 10:00am the day after each day’s work covered by the report. The Daily QSR will include the following information:');
  const [checklistItems, setChecklistItems] = useState(DEFAULT_ITEMS);

  const handleItemSave = (index: number, newValue: string) => {
    const updated = [...checklistItems];
    updated[index] = newValue;
    setChecklistItems(updated);
  };

  return (
    <div className={PAGE_COMMON_CLASSES}>
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES} />

      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <div className="text-sm leading-relaxed mb-6">
          <EditableText
            defaultValue={title}
            onSave={setTitle}
            tag="p"
            className="mb-4"
          />
        </div>

        <ul className="text-sm space-y-2">
          {checklistItems.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2">☐</span>
              <EditableText
                tag="div"
                defaultValue={item}
                onSave={(value) => handleItemSave(idx, value)}
                className="flex-1"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QsrChecklist;
