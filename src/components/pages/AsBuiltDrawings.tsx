import { useState } from "react"
import EditableText from "../atoms/EditableText"; // Assuming EditableText is correctly imported

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const AsBuiltDrawings = () => {
  const [heading, setHeading] = useState('16. As-Built Drawings');
  const [intro, setIntro] = useState(
    'The CQC system manager is responsible for maintaining updated As-built drawings at the construction site. These drawings will be clearly marked in large red letters identifying them as AS-BUILT DRAWINGS. The maintenance of As-built drawings will be performed according to the project request for proposal (RFP) documents and routinely updated as work progresses. These prints will be marked during construction to show all deviations in actual construction from the contract drawings. The color red will be used to indicate additions and green to indicate all deletions. As-built Drawings will include the following items:'
  );

  const [items, setItems] = useState([
    'Locations and descriptions of any utility lines and other installations of any kind or description known to exist within the construction area.',
    'The locations and dimensions of any changes within the building or structure, and the accurate location and dimension of all underground utilities and facilities.',
    'Correct grade or alignment of roads, structures and utilities if any changes were made from contract plans.',
    'Correct elevations if changes were made in site grading from the contract plans.',
    'Changes in details of design or additional information obtained from working drawings specified to be prepared and/or furnished by the contractor.',
    'The topography and grades of all drainage installed or affected as part of the project construction.',
    'All changes or modifications from the design and from the final inspection.',
    'Changes in the drawings and specifications due to Change Orders.',
    'Changes in the drawings and specifications resulting from minor dimensional adjustments in the field.',
    'All Changes or modifications from the design and from the final inspection.',
  ]);

  const [note, setNote] = useState(
    'As-built data from surveys and field measurements will be marked on the drawings in red letters with an asterisk to denote that the data is surveyed or field measured. As-built documents will be provided to the Contracting staff in hard copy as well as electronic copy as part of the close out documents.'
  );

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

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
          defaultValue={heading}
          onSave={setHeading}
          tag="h1"
          className="text-center font-bold underline text-[15px] mb-4 text-amber-800"
        />

        <EditableText
          defaultValue={intro}
          onSave={setIntro}
          tag="p"
          className="text-sm mb-4 mt-7"
        />

        <ul className="list-none text-sm mb-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start mb-2">
              <span className="mt-[3px]">&#x2610;</span>
              <EditableText
                defaultValue={item}
                onSave={(val) => updateItem(idx, val)}
                tag="span"
                className="flex-1 ml-5"
              />
            </li>
          ))}
        </ul>

        <EditableText
          defaultValue={note}
          onSave={setNote}
          tag="p"
          className="text-sm"
        />
      </div>
    </div>
  );
};

export default AsBuiltDrawings;
