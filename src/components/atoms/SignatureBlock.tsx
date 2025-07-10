import { useState } from "react"
import EditableText from "./EditableText"
import { useRecoilState } from "recoil"
import { companyNameState, presName } from "../../recoil/state/formState"
import SignatureDisplay from "./appointment/SignatureDisplay"


const SignatureBlock = () => {
     const [sin, setSin] = useState("Sincerely,")
  const [comp,setComp]=useRecoilState(companyNameState)
  const [president, setpresident] = useState("President")
  const [footer, setfooter] = useState(`cc: Read File`)
  const [f1, setf1] = useState("Contract File")
  const [name,preName] =useRecoilState(presName)
  
  return (
    <div>
              <EditableText
      defaultValue={sin}
      onSave={setSin}
      tag='p'
      />
      <EditableText
      defaultValue={comp}
      onSave={setComp}
      tag='strong'
      />
      <SignatureDisplay/>
      <EditableText
      defaultValue={name+","}
      onSave={preName}
      tag="p"
 />
        <EditableText
      defaultValue={president}
      onSave={setpresident}
      tag='p'
      />
      <EditableText
      defaultValue={footer}
      onSave={setfooter}
      tag="p"
      className="mt-9"
      
      />
       <EditableText
      defaultValue={f1}
      onSave={setf1}
      tag="p"
      className="pl-6"
      
      />
      
    </div>
  )
}

export default SignatureBlock