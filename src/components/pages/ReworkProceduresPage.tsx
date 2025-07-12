import { useState } from "react";
import EditableText from "../atoms/EditableText"; // Corrected path to atoms
import { useRecoilValue } from "recoil";
import { shortCompanyNameState } from "../../recoil/state/formState"; // Corrected path to recoil state

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


function ReworkProceduresPage() {
   const name= useRecoilValue(shortCompanyNameState)
  const [pageTitle, setPageTitle] = useState('12. Procedures to Complete Rework Items');
  const [surveillanceTitle, setSurveillanceTitle] = useState('Surveillance of Subcontractors');
  const [surveillanceContent, setSurveillanceContent] = useState(
    'The first responsibility and accountability of a Quality Control inspection and Correction lies with, and, on each subcontractor. "First Time Quality" is only possible by the subcontractor who "first" performs the work. Oversight and supervision of the subcontractor\'s operations and QC effort is the responsibility of the Quality Control Manager. The subcontractor\'s QC personnel will be directly responsible to the Contractor\'s QC System Manager. The QC Manager has the authority to work with and direct the subcontractor\'s on-site representative to ensure compliance. Noncompliant work will be corrected, recorded and reported prior to the item being covered. Major discrepancies will be followed on a daily basis. Upon correction of the major discrepancy, the correction will be recorded and direction to continue with subsequent work will come from '+name+'\'s System Manager.'
  );

  const [inspectionAcceptanceTitle, setInspectionAcceptanceTitle] = useState('Inspection Acceptance Procedures');
  const [inspectionAcceptanceContent, setInspectionAcceptanceContent] = useState(
    'All construction work shall be in accordance with contract drawings and specifications. All approved changes to the contract drawings or construction work will be recorded on the Quality Control Manager\'s report. Work found in compliance with the drawings and specifications will be so noted. If discrepancies are found, they will be handled in accordance with inspection discrepancy procedures.'
  );

  const [inspectionDiscrepancyTitle, setInspectionDiscrepancyTitle] = useState('Inspection Discrepancy Procedure');
  const [inspectionDiscrepancyContent1, setInspectionDiscrepancyContent1] = useState(
    'This procedure is intended as a second level inspection system whereby discrepancies in quality are tracked, corrected, and reported. Discrepancies will be recorded on the Quality Control Daily report form. Copies of the report noting the discrepancies will be provided to the contractor\'s management team and to NAVFAC.'
  );
  const [inspectionDiscrepancyContent2, setInspectionDiscrepancyContent2] = useState(
    'Upon reviewing the discrepancy report, the Project Manager or his representatives and the Quality Control Manager will examine the rejected items for corrective actions. Upon completion of corrective/rework items, the Quality Control Manager will be notified and he will review all noted and accomplished rework on the report, and re-inspect the item for conformance with the contract requirement. If found to be acceptable, it will be so noted on the discrepancy report. If the item is still not compliant the Quality Control Manager will direct further rework.'
  );
  const [inspectionDiscrepancyContent3, setInspectionDiscrepancyContent3] = useState(
    'The rework item log will be periodically reviewed by the Project Manager with the Quality Control Manager to formulate a disposition of each listed item. They will establish timetables for final resolution of all discrepancies.'
  );

  const [workmanshipControlTitle, setWorkmanshipControlTitle] = useState('Workmanship Control');
  const [workmanshipControlContent, setWorkmanshipControlContent] = useState(
    'Items which will be covered up by subsequent work will be inspected by the Quality Control Manager. The Quality Control Manager shall verify by signature that all items installed are in accordance with the contract drawings and specifications. Any corrective action required will be recorded and rework directed. When the work is deemed compliant by the QC Manager, NAVFAC will be contacted for a General inspection and approval before cover up.'
  );

  const [bulletPoint1, setBulletPoint1] = useState('•Control/verification form (enclosed) is prepared for each definable work item.');
  const [bulletPoint2, setBulletPoint2] = useState('•Daily Site report form / Contractor Production Report.');


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
        <div className="text-center mb-8">
          <EditableText
            tag="h1"
            defaultValue={pageTitle}
            onSave={setPageTitle}
            className="text-lg font-bold text-amber-800 underline"
          />
        </div>

        {/* Section: Surveillance of Subcontractors */}
        <div className="mt-8">
          <EditableText
            tag="strong"
            defaultValue={surveillanceTitle}
            onSave={setSurveillanceTitle}
            className="text-base underline"
          />
          <EditableText
            tag="p"
            defaultValue={surveillanceContent}
            onSave={setSurveillanceContent}
            className="mt-2 text-sm leading-relaxed"
          />
        </div>

        {/* Section: Inspection Acceptance Procedures */}
        <div className="mt-3">
          <EditableText
            tag="strong"
            defaultValue={inspectionAcceptanceTitle}
            onSave={setInspectionAcceptanceTitle}
            className="text-base"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionAcceptanceContent}
            onSave={setInspectionAcceptanceContent}
            className="mt-2 text-sm leading-relaxed"
          />
        </div>

        {/* Section: Inspection Discrepancy Procedure */}
        <div className="mt-3">
          <EditableText
            tag="strong"
            defaultValue={inspectionDiscrepancyTitle}
            onSave={setInspectionDiscrepancyTitle}
            className="text-base underline"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionDiscrepancyContent1}
            onSave={setInspectionDiscrepancyContent1}
            className="mt-2 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionDiscrepancyContent2}
            onSave={setInspectionDiscrepancyContent2}
            className="mt-4 text-sm leading-relaxed"
          />
          <EditableText
            tag="p"
            defaultValue={inspectionDiscrepancyContent3}
            onSave={setInspectionDiscrepancyContent3}
            className="mt-4 text-sm leading-relaxed"
          />
        </div>

        {/* Section: Workmanship Control */}
        <div className="mt-3">
          <EditableText
            tag="strong"
            defaultValue={workmanshipControlTitle}
            onSave={setWorkmanshipControlTitle}
            className="text-base underline"
          />
          <EditableText
            tag="p"
            defaultValue={workmanshipControlContent}
            onSave={setWorkmanshipControlContent}
            className="mt-2 text-sm leading-relaxed"
          />
        </div>

        {/* Bullet Points */}
        <div className="mt-6"> {/* Removed mx-20 as INNER_PAGE_CONTENT_CLASSES already provides horizontal padding */}
          <EditableText
            tag="p"
            defaultValue={bulletPoint1}
            onSave={setBulletPoint1}
            className="text-sm"
          />
          <EditableText
            tag="p"
            defaultValue={bulletPoint2}
            onSave={setBulletPoint2}
            className="text-sm mt-1"
          />
        </div>

      </div>
    </div>
  );
}

export default ReworkProceduresPage;
