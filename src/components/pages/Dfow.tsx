import { useState } from "react"
import EditableText from "../atoms/EditableText" // Assuming EditableText is correctly imported

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const Dfow = () => {
    const [first, setfirst] = useState("14. List of Definable Features of Work (DFOW)")
    const numRows = 10;
    const numCols = 5;
    
  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
          <EditableText defaultValue={first} onSave={setfirst} tag="h1" className="text-amber-800 underline text-center"/>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y rounded-md border border-black mt-16">
              <thead className="bg-gray-50 border border-black ">
                <tr className="border border-black">
                  {/* Generate table headers */}
                  {[...Array(numCols)].map((_, colIndex) => (
                    <th
                      key={colIndex}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-black"
                    >
                      {/* Placeholder for header content, can be made editable if needed */}
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
                        {/* Editable content for each cell */}
                        <EditableText
                          tag="div"
                          defaultValue="" // Default empty, user can type
                          onSave={() => {}} // Add a state and handler if you want to save table cell content
                          className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default Dfow;
