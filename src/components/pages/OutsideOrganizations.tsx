import { useState } from "react";
import EditableText from "../atoms/EditableText";
import { tradesState } from "../../recoil/state/formState";
import { useRecoilState } from "recoil";


const OutsideOrganizations = () => {
     const [heading, setHeading] = useState("8.	Outside Organizations");
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const [rows, setRows] = useRecoilState(tradesState);

  return (
    
       <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
        <EditableText
          tag="h1"
          defaultValue={heading}
          onSave={setHeading}
          className="text-center text-amber-800 underline"
          
        />
         <table className="table-fixed border border-black w-full text-sm mt-10">
      <thead>
        <tr className="">
          {(['trade', 'contractor', 'email', 'phone'] as const).map((col) => (
            <th key={col} className="border border-black p-2">
              <EditableText
                defaultValue={col.charAt(0).toUpperCase() + col.slice(1)}
                onSave={() => {}}
                tag="span"
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td className="border border-black p-1">
              <EditableText defaultValue={row.trade} onSave={() => {}} tag="span" />
            </td>
            <td className="border border-black p-1">
              <EditableText defaultValue={row.contractor} onSave={() => {}} tag="span" />
            </td>
            <td className="border border-black p-1">
              <EditableText defaultValue={row.email} onSave={() => {}} tag="span" />
            </td>
            <td className="border border-black p-1">
              <EditableText defaultValue={row.phone} onSave={() => {}} tag="span" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
        </div>
  )
}

export default OutsideOrganizations