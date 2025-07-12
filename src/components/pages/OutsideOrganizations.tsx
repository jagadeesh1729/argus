import { useState } from "react";
import EditableText from "../atoms/EditableText";
import { tradesState } from "../../recoil/state/formState";
import { useRecoilState } from "recoil";
import {
  PAGE_COMMON_CLASSES,
  PAGE_NUMBER_PLACEHOLDER_CLASSES,
  INNER_PAGE_CONTENT_CLASSES,
} from '../../utils/pageStyles';

const OutsideOrganizations = () => {
  const [heading, setHeading] = useState("8. Outside Organizations");
  const [rows, setRows] = useRecoilState(tradesState);

  // Update a specific field in a row
  const handleUpdate = (idx: number, key: keyof typeof rows[number], value: string) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [key]: value };
    setRows(updated);
  };

  return (
    <div className={PAGE_COMMON_CLASSES}>
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES} />

      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <EditableText
          tag="h1"
          defaultValue={heading}
          onSave={setHeading}
          className="text-center text-amber-800 underline"
        />

        <table className="table-fixed border border-black w-full text-sm mt-10">
          <thead>
            <tr>
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
                  <EditableText
                    defaultValue={row.trade}
                    onSave={(val) => handleUpdate(idx, 'trade', val)}
                    tag="span"
                  />
                </td>
                <td className="border border-black p-1">
                  <EditableText
                    defaultValue={row.contractor}
                    onSave={(val) => handleUpdate(idx, 'contractor', val)}
                    tag="span"
                  />
                </td>
                <td className="border border-black p-1">
                  <EditableText
                    defaultValue={row.email}
                    onSave={(val) => handleUpdate(idx, 'email', val)}
                    tag="span"
                  />
                </td>
                <td className="border border-black p-1">
                  <EditableText
                    defaultValue={row.phone}
                    onSave={(val) => handleUpdate(idx, 'phone', val)}
                    tag="span"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutsideOrganizations;
