import { useRecoilState } from 'recoil';
import { tradesState, type TradeRow } from '../../recoil/state/formState';
import EditableText from './EditableText';


const TradesForm = () => {
  const [rows, setRows] = useRecoilState(tradesState);

  const addRow = () => {
    const newRow: TradeRow = {
      id: Date.now(),
      trade: '',
      contractor: '',
      email: '',
      phone: ''
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: number) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const updateCell = (id: number, field: keyof TradeRow, value: string) => {
    setRows(prev => {
      return prev.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      );
    });
  };

  return (
    <div className="mt-4">
      <table className="table-fixed border border-black w-full text-sm mb-4">
        <thead>
          <tr className="bg-gray-300">
            {(['trade', 'contractor', 'email', 'phone'] as const).map((col) => (
              <th key={col} className="border border-black p-2">
                <EditableText
                  defaultValue={col.charAt(0).toUpperCase() + col.slice(1)}
                  onSave={() => {}}
                  tag="span"
                />
              </th>
            ))}
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {(['trade', 'contractor', 'email', 'phone'] as const).map((field) => (
                <td key={field} className="border border-black p-1">
                  <EditableText
                    defaultValue={row[field]}
                    onSave={(val) => updateCell(row.id, field, val)}
                    tag="span"
                  />
                </td>
              ))}
              <td className="border border-black p-1 text-center">
                <button
                  onClick={() => removeRow(row.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4">
        <button onClick={addRow} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
          Add Row
        </button>
      </div>
    </div>
  );
};

export default TradesForm;