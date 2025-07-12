import { useState } from "react";
import EditableText from "../atoms/EditableText";

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const TestingRequirements = () => {
      const [heading, setHeading] = useState("11. Testing Requirements");
    
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
    </div>
  )
}

export default TestingRequirements;
