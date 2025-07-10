import { useState } from "react"
import EditableText from "../atoms/EditableText"

const Dfow = () => {
    const [first, setfirst] = useState(" 14. List of Definable Features of Work (DFOW)")
    const numRows = 10;
  const numCols = 5;
  return (
    <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] min-h-[1123px] mx-auto shadow overflow-hidden page-break">
            <EditableText defaultValue={first} onSave={setfirst} tag="h1" className="text-amber-800 underline text-center"/>
                    <div className="overflow-x-auto">
          <table className="min-w-full divide-y  rounded-md  border border-black mt-16">
            <thead className="bg-gray-50 border border-black ">
              <tr className="border border-black">
                {/* Generate table headers */}
                {[...Array(numCols)].map((_, colIndex) => (
                  <th
                    key={colIndex}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                  >
                   
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border border-black">
              {/* Generate table rows */}
              {[...Array(numRows)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border border-black">
                  {/* Generate table cells for each row */}
                  {[...Array(numCols)].map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-black"
                    >
                    
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Dfow