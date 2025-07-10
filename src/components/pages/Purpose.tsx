import { useRecoilState } from "recoil";
import { companyNameState, shortCompanyNameState, workDescriptionState } from "../../recoil/state/formState";
import EditableText from "../atoms/EditableText";
import { useState } from "react";

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
    <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
      <EditableText
        tag="div"
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
  );
};

export default Purpose;
