import { useState } from "react";
import EditableText from "../atoms/EditableText"; // Assuming EditableText is correctly imported

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


function DocumentControlProceduresPage() {
  const [pageTitle, setPageTitle] = useState('13. Document Control Procedures');
  const [introText, setIntroText] = useState(
    'The Quality Control Manager will maintain current records of tests. These will include factual evidence that the required control phases and tests have been performed, including the number and results; nature of defects, causes for rejection, etc.; proposed remedial action; and corrective actions taken; contractor\'s records will cover both conforming and defective features and will include a statement that all materials systems incorporated into the work are in full compliance with the terms of the contract. Legible copies of these records on an appropriate form will be furnished and reviewed during each weekly progress meeting.'
  );

  const [drawingControlTitle, setDrawingControlTitle] = useState('Drawing and Document Control');
  const [drawingControlA, setDrawingControlA] = useState(
    'A. Contract drawing, work orders and change orders issued for construction will also be issued to the Quality Control Manager. It is the responsibility of the project manager to issue all technical information to the Quality Control Manager. It is the responsibility of the Quality Control Manager to maintain this technical information and keep it current and recorded as it is revised. No technical information will be replaced or revised without receipt of properly authorized change notice, revision, or equal.'
  );
  const [drawingControlB, setDrawingControlB] = useState(
    'B. Each identifiable work item is listed out and all of the control features are checked with respect to specifications and drawings.'
  );

  const [inspectionsTestsTitle, setInspectionsTestsTitle] = useState('Inspections and Tests');
  const [inspectionsTestsIntro, setInspectionsTestsIntro] = useState(
    'Prior to start of inspection or tests, all systems being inspected or tested shall be accepted by the Quality Control Manager. After this acceptance, the inspection or test may proceed in accordance with these following steps:'
  );
  const [inspectionsTestsA, setInspectionsTestsA] = useState(
    'A. Verify the test personnel have a working knowledge of the special characteristics of the instruments being used.'
  );
  const [inspectionsTestsB, setInspectionsTestsB] = useState(
    'B. Note the particular inspection or test requirements and criteria for successful completion of the required inspection or test.'
  );
  const [inspectionsTestsC, setInspectionsTestsC] = useState(
    'C. Upon satisfactory verification of these requirements the test may proceed. Each reading will be verified and documented by the Quality Control Manager. All functional validations or tests will be performed by the Quality Control Department unless otherwise noted. No functional test will be accepted without properly authorized and approved test procedures.'
  );
  const [inspectionsTestsD, setInspectionsTestsD] = useState(
    'D. The general requirements of final acceptance will include, but not limited to the following:'
  );

  const [finalAcceptancePoints, setFinalAcceptancePoints] = useState([
    'General appearance',
    'Workmanship',
    'Cleanliness of work areas',
    'Removal of unused material and temporary facilities',
    'Condition of job files and completion of paperwork',
  ]);

  const handleFinalAcceptancePointSave = (index: number, value: string) => {
    setFinalAcceptancePoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[index] = value;
      return newPoints;
    });
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
        {/* Page Title */}
        <div className="text-center mb-8 mt-10">
          <EditableText
            tag="h1"
            defaultValue={pageTitle}
            onSave={setPageTitle}
            className="text-lg font-bold text-amber-800 underline"
          />
        </div>

        {/* Introduction Text */}
        <div className="mt-8"> {/* Removed mx-16 as INNER_PAGE_CONTENT_CLASSES already provides padding */}
          <EditableText
            tag="p"
            defaultValue={introText}
            onSave={setIntroText}
            className="text-sm leading-relaxed"
          />
        </div>

        {/* Section: Drawing and Document Control */}
        <div className="mt-8"> {/* Removed mx-16 */}
          <EditableText
            tag="strong"
            defaultValue={drawingControlTitle}
            onSave={setDrawingControlTitle}
            className="text-base underline"
          />
          <EditableText
            tag="p"
            defaultValue={drawingControlA}
            onSave={setDrawingControlA}
            className="mt-2 text-sm leading-relaxed ml-11"
          />
          <EditableText
            tag="p"
            defaultValue={drawingControlB}
            onSave={setDrawingControlB}
            className="mt-2 text-sm leading-relaxed ml-11"
          />
        </div>

        {/* Section: Inspections and Tests */}
        <div className="mt-8"> {/* Removed mx-16 */}
          <EditableText
            tag="strong"
            defaultValue={inspectionsTestsTitle}
            onSave={setInspectionsTestsTitle}
            className="text-base underline"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionsTestsIntro}
            onSave={setInspectionsTestsIntro}
            className="mt-2 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionsTestsA}
            onSave={setInspectionsTestsA}
            className="mt-2 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionsTestsB}
            onSave={setInspectionsTestsB}
            className="mt-2 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionsTestsC}
            onSave={setInspectionsTestsC}
            className="mt-2 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionsTestsD}
            onSave={setInspectionsTestsD}
            className="mt-2 text-sm leading-relaxed"
          />
          <ol className="list-decimal list-inside ml-20 mt-2">
            {finalAcceptancePoints.map((point, index) => (
              <li key={index} className="text-sm ">
                <EditableText
                  tag="span" // Use span inside li for editable text
                  defaultValue={point}
                  onSave={(val) => handleFinalAcceptancePointSave(index, val)}
                  className="inline-block"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DocumentControlProceduresPage;
