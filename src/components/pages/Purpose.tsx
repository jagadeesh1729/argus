import { useState } from 'react';
import { useRecoilState,  } from 'recoil';
import {
  companyNameState,
  shortCompanyNameState,
  workDescriptionState
} from '../../recoil/state/formState';
import EditableText from '../atoms/EditableText';

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const Purpose = () => {
  const [companyName, setCompanyName] = useRecoilState(companyNameState);
  const [shortCompanyName, setShortCompanyName] = useRecoilState(shortCompanyNameState);
  const [workDescription, setWorkDescription] = useRecoilState(workDescriptionState);

  const [title, setTitle] = useState("1. Purpose");
  const [introText1, setIntroText1] = useState(
    "This document establishes the Quality Control System of"
  );
  const [introText2, setIntroText2] = useState(
    "to provide the necessary supervision, control phases and tests of all items of work necessary to properly complete the following work:"
  );
  const [descriptionLabel, setDescriptionLabel] = useState("Description of the work:");
  const [footerIntro, setFooterIntro] = useState(
    "Quality Control System will include that of suppliers and subcontractors"
  );
  const [footerRest, setFooterRest] = useState(
    "to ensure compliance of all work with applicable specification and drawings in respect with contractor furnished equipment, materials, workmanship, construction, finish, functional performance and identification."
  );

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
          tag="h1"
          defaultValue={title}
          onSave={setTitle}
          className="underline text-center text-amber-700"
        />

        <div className="pt-6">
          <EditableText tag="span" defaultValue={introText1} onSave={setIntroText1} />{" "}
          <EditableText tag="span" defaultValue={companyName} onSave={setCompanyName} className="font-semibold" />{" "}
          <EditableText tag="span" defaultValue={introText2} onSave={setIntroText2} />
        </div>

        <div className="pt-6">
          <b>
            <EditableText tag="span" defaultValue={descriptionLabel} onSave={setDescriptionLabel} /></b>{" "}
            <EditableText tag="span" defaultValue={workDescription} onSave={setWorkDescription} />
        </div>

        <div className="pt-6">
          <EditableText tag="span" defaultValue={shortCompanyName} onSave={setShortCompanyName} className="font-semibold" />{" "}
          <EditableText tag="span" defaultValue={footerIntro} onSave={setFooterIntro} />{" "}
          <EditableText tag="span" defaultValue={footerRest} onSave={setFooterRest} />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
