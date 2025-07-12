import { useState } from 'react';
import EditableText from '../atoms/EditableText';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const ThreePhasesControl = () => {
  const [heading, setHeading] = useState("15. Procedures for Performing the Three Phases of Control");

  const [prepTitle, setPrepTitle] = useState("Preparatory Phase");
  const [prepDesc, setPrepDesc] = useState(
    "This is performed prior to beginning each definable feature of work. The projected dates of each Preparatory Meeting shall be \"Activities\" on the approved project schedule. Each meeting will cover items including but not limited to:"
  );
  const [prepPoints, setPrepPoints] = useState([
    "Review contract requirements (each paragraph of applicable specification and contract drawings).",
    "Check to assure that all materials and/or equipment are on hand and are properly stored.",
    "Check to assure that provisions have been made to provide required control testing.",
    "Examine work area to assure that all preliminary work has been accomplished.",
    "Review safety plan and hazard analysis.",
    "Discuss construction methods.",
    "Approved submittals are required for this phase to occur.",
    "48 hour notification to be given to NAVFAC prior to the meeting.",
    "Any inspections will be determined during this meeting."
  ]);

  const [prepNote, setPrepNote] = useState("Preparatory Phase is conducted by QC manager");

  const [initialTitle, setInitialTitle] = useState("Initial Phase");
  const [initialDesc, setInitialDesc] = useState(
    "This is performed at the beginning of a definable feature of work. All Start dates will be discussed and accepted as part of the Preparatory Meeting."
  );
  const [initialPoints, setInitialPoints] = useState([
    "Check preliminary work.",
    "Check new work for compliance with contract documents and Preparatory Phase.",
    "Review of control testing. Make sure to use approved testing agency.",
    "Establish level of workmanship.",
    "Check for use of defective or damaged materials.",
    "Resolve conflicts.",
    "Check safety compliance."
  ]);

  const [initialNote, setInitialNote] = useState(
    "The QC Manager presides at the Initial Phase but, it should be conducted by the contractor’s superintendent to establish the proper line of authority."
  );

  const [followTitle, setFollowTitle] = useState("Follow-up Phase");
  const [followDesc, setFollowDesc] = useState(
    "Perform daily checks to assure continued compliance with workmanship established at the Initial Phase."
  );
  const [followPointsTitle, setFollowPointsTitle] = useState("Assurance of continuous compliance with contract drawings and specifications");
  const [followPoints, setFollowPoints] = useState([
    "Control testing by approved laboratory.",
    "Maintain quality of workmanship.",
    "Ensure that rework items are being corrected"
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
        <EditableText defaultValue={heading} onSave={setHeading} tag="h1" className="text-center font-bold underline mb-6 text-amber-800" />

        <EditableText defaultValue={prepTitle} onSave={setPrepTitle} tag="h1" className="font-bold mb-2" />
        <EditableText defaultValue={prepDesc} onSave={setPrepDesc} tag="p" className="mb-2" />
        <ol className="list-[lower-alpha] pl-6 mb-2">
          {prepPoints.map((pt, i) => (
            <li key={i} className="mb-1">
              <EditableText defaultValue={pt} onSave={(val) => {
                const updated = [...prepPoints];
                updated[i] = val;
                setPrepPoints(updated);
              }} tag="span" />
            </li>
          ))}
        </ol>
        <EditableText defaultValue={prepNote} onSave={setPrepNote} tag="p" className="mb-4" />

        <EditableText defaultValue={initialTitle} onSave={setInitialTitle} tag="h1" className="font-bold mb-2" />
        <EditableText defaultValue={initialDesc} onSave={setInitialDesc} tag="p" className="mb-2" />
        <ol className="list-[lower-alpha] pl-6 mb-2">
          {initialPoints.map((pt, i) => (
            <li key={i} className="mb-1">
              <EditableText defaultValue={pt} onSave={(val) => {
                const updated = [...initialPoints];
                updated[i] = val;
                setInitialPoints(updated);
              }} tag="span" />
            </li>
          ))}
        </ol>
        <EditableText defaultValue={initialNote} onSave={setInitialNote} tag="p" className="mb-4" />

        <EditableText defaultValue={followTitle} onSave={setFollowTitle} tag="h1" className="font-bold mb-2" />
        <EditableText defaultValue={followDesc} onSave={setFollowDesc} tag="p" className="mb-2" />

        <EditableText defaultValue={followPointsTitle} onSave={setFollowPointsTitle} tag="p" className="font-semibold mb-1" />
        <ol className="list-[lower-alpha] pl-6">
          {followPoints.map((pt, i) => (
            <li key={i} className="mb-1">
              <EditableText defaultValue={pt} onSave={(val) => {
                const updated = [...followPoints];
                updated[i] = val;
                setFollowPoints(updated);
              }} tag="span" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ThreePhasesControl;
