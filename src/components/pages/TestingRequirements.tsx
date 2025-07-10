import { useState } from "react";
import EditableText from "../atoms/EditableText";


const TestingRequirements = () => {
      const [heading, setHeading] = useState("11. Testing Requirements");
    
  return (
    <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break"
    >
          <EditableText
          tag="h1"
          defaultValue={heading}
          onSave={setHeading}
          className="text-center text-amber-800 underline"
        />
        <ul className="mt-11">
            <li>
                    Testing Requirements will be completed in strict accordance with contract specifications. A sample testing log is attached.
            </li>
        </ul>
    </div>
  )
}

export default TestingRequirements