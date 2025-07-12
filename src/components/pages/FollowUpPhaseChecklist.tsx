import { useState } from 'react';
import EditableText from '../atoms/EditableText'; // Assuming EditableText is correctly imported

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';


const FollowUpPhaseChecklist = () => {
  const [dateInspected, setDateInspected] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [workInCompliance, setWorkInCompliance] = useState<'YES' | 'NO' | ''>('');
  const [actionInitiated, setActionInitiated] = useState('');
  const [testingAgency, setTestingAgency] = useState('');
  const [testReportsReceived, setTestReportsReceived] = useState('');
  const [signature, setSignature] = useState('');
  const [signatureDate, setSignatureDate] = useState('');

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <h2 className="text-center font-bold underline mb-6 text-sm">FOLLOW UP PHASE CHECKLIST</h2>

        <ol className="text-sm space-y-4 list-decimal" type='A'>
          <li>
            Date inspected:&nbsp;
            <EditableText defaultValue={dateInspected} onSave={setDateInspected} tag="span" className="border-b border-black inline-block min-w-[200px]" />
          </li>
          <li>
            Date work Completed:&nbsp;
            <EditableText defaultValue={dateCompleted} onSave={setDateCompleted} tag="span" className="border-b border-black inline-block min-w-[200px]" />
          </li>
          <li>
            Work in compliance:&nbsp;
            <label className="mr-4">
              <input
                type="radio"
                checked={workInCompliance === 'YES'}
                onChange={() => setWorkInCompliance('YES')}
                className="mr-1"
              />
              YES
            </label>
            <label>
              <input
                type="radio"
                checked={workInCompliance === 'NO'}
                onChange={() => setWorkInCompliance('NO')}
                className="mr-1"
              />
              NO
            </label>
          </li>
          <li>
            If NO on item 3, action initiated:
            <textarea
              value={actionInitiated}
              onChange={(e) => setActionInitiated(e.target.value)}
              className="border border-black w-full h-28 mt-1"
            />
          </li>
          <li>
            Testing agency involved:&nbsp;
            <EditableText defaultValue={testingAgency} onSave={setTestingAgency} tag="span" className="border-b border-black inline-block min-w-[300px]" />
          </li>
          <li>
            Test reports received:&nbsp;
            <EditableText defaultValue={testReportsReceived} onSave={setTestReportsReceived} tag="span" className="border-b border-black inline-block min-w-[300px]" />
          </li>
        </ol>
        </div>

        <div className="mt-20 text-sm">
          <div className="mb-2">
            <span className="inline-block w-64 border-b border-black">
              <EditableText defaultValue={signature} onSave={setSignature} tag="span" />
            </span>
            <div className="mt-1">QC Manager Signature</div>
          </div>
          <div>
            <span className="inline-block w-48 border-b border-black">
              <EditableText defaultValue={signatureDate} onSave={setSignatureDate} tag="span" />
            </span>
            <div className="mt-1">Date</div>
          </div>
        </div>
      </div>
  );
};

export default FollowUpPhaseChecklist;
