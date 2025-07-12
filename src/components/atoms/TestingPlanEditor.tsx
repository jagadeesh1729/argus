import { useRecoilValue } from "recoil";
import { contractNumberState, contractorNameState, deliveryOrderNoState, locationState,  workOrderState } from "../../recoil/state/formState";
import { useState } from "react";
import EditableText from "./EditableText"; // Assuming EditableText is in the same directory or accessible

// Import the common page classes from your new utility file
import { PAGE_COMMON_CLASSES, PAGE_NUMBER_PLACEHOLDER_CLASSES, INNER_PAGE_CONTENT_CLASSES } from '../../utils/pageStyles';

type TestPlanLogItem = {
  id: number;
  specSection: string;
  itemOfWork: string;
  testRequired: string;
  yes: string;
  no: string;
  sampledBy: string;
  testedBy: string;
  onSite: string;
  offSite: string;
  dateCompleted: string;
  dateForwarded: string;
  remarks: string;
};

// New functional component for the Testing Plan and Log page
function TestingPlanEditor() {
  // Recoil values for the top information boxes
  const contractNumber = useRecoilValue(contractNumberState);
  const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
  const workOrder = useRecoilValue(workOrderState);
  // const projectTitle = useRecoilValue(workDescriptionState); // Assuming workDescriptionState holds the project title
  const location = useRecoilValue(locationState);
  const contractorName = useRecoilValue(contractorNameState);

  // Local state for the page title
  const [pageTitle, setPageTitle] = useState('TESTING PLAN AND LOG');

  // Local states for the static labels in the top boxes
  const [contractNumberLabel, setContractNumberLabel] = useState('CONTRACT NUMBER');
  const [projectTitleLocationLabel, setProjectTitleLocationLabel] = useState('PROJECT TITLE AND LOCATION');
  const [contractorLabel, setContractorLabel] = useState('CONTRACTOR');

  // State for the table data
  const [tableData, setTableData] = useState<TestPlanLogItem[]>(
    Array.from({ length: 15 }, (_, i) => ({ // 15 empty rows initially
      id: i,
      specSection: '',
      itemOfWork: '',
      testRequired: '',
      yes: '',
      no: '',
      sampledBy: '',
      testedBy: '',
      onSite: '',
      offSite: '',
      dateCompleted: '',
      dateForwarded: '',
      remarks: '',
    }))
  );

  // Handler for updating table cell data
  const handleTableCellSave = (
    rowIndex: number,
    column: keyof TestPlanLogItem,
    value: string
  ) => {
    setTableData(prevData =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [column]: value } : row
      )
    );
  };

  return (
    // Outermost div now uses the reusable PAGE_COMMON_CLASSES constant
    // Removed fixed height h-[1123px] and overflow-hidden from this div
    <div className={PAGE_COMMON_CLASSES}>
      {/* Page number placeholder, positioned top-right */}
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}>
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>

      {/* Main content wrapper: Now uses INNER_PAGE_CONTENT_CLASSES for padding and flex-col layout */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        {/* Page Title */}
        <div className="text-center mb-8 mt-10">
          <EditableText
            tag="h1"
            defaultValue={pageTitle}
            onSave={setPageTitle}
            className="text-xl font-bold"
          />
        </div>

        {/* Top Information Boxes */}
        {/* Removed fixed width w-[741px] and redundant px-4 */}
        <div className="mt-8 grid grid-cols-3 gap-4 border border-black">
          {/* CONTRACT NUMBER Box */}
          <div className="p-2 flex flex-col justify-between border-r border-black">
            <EditableText
              tag="strong"
              defaultValue={contractNumberLabel}
              onSave={setContractNumberLabel}
              className="text-sm text-center font-bold italic mb-2"
            />
            <div className="text-xs space-y-1">
              <EditableText
                tag="p"
                defaultValue={`Contract Number: ${contractNumber}`}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
              <EditableText
                tag="p"
                defaultValue={`Delivery Order Number: ${deliveryOrderNo}`}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
              <EditableText
                tag="p"
                defaultValue={`Work Order Number: ${workOrder}`}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
            </div>
          </div>

          {/* PROJECT TITLE AND LOCATION Box */}
          <div className="p-2 flex flex-col justify-between border-r border-black">
            <EditableText
              tag="strong"
              defaultValue={projectTitleLocationLabel}
              onSave={setProjectTitleLocationLabel}
              className="text-sm text-center font-bold italic mb-2"
            />
            <div className="text-xs space-y-1">
              <EditableText
                tag="p"
                defaultValue={`${contractorName}`}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
              <EditableText
                tag="p"
                defaultValue={`${location}`}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
            </div>
          </div>

          {/* CONTRACTOR Box */}
          <div className="p-2 flex flex-col justify-between">
            <EditableText
              tag="strong"
              defaultValue={contractorLabel}
              onSave={setContractorLabel}
              className="text-sm text-center font-bold italic mb-2"
            />
            <div className="text-xs">
              <EditableText
                tag="p"
                defaultValue={contractorName}
                onSave={() => { /* Recoil value */ }}
                className="font-normal"
              />
            </div>
          </div>
        </div>

        {/* Testing Plan and Log Table */}
        {/* Removed overflow-x-auto to prevent horizontal scrolling */}
        <div className="mt-8">
          <table className="min-w-full table-fixed divide-y divide-black text-xs border border-black">
            <thead>
              <tr className="">
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[12%]">
                  <EditableText tag="span" defaultValue="SPECIFICATION SECTION AND PARAGRAPH NUMBER" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[10%]">
                  <EditableText tag="span" defaultValue="ITEM OF WORK" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[10%]">
                  <EditableText tag="span" defaultValue="TEST REQUIRED" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th colSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="ACCREDITED/ APPROVED LAB" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="SAMPLED BY" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="TESTED BY" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th colSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="LOCATION OF TEST" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="DATE COMPLETED" onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th colSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-b border-black w-[8%]">
                  <EditableText tag="span" defaultValue="DATE FORWARDED TO CONTR. OFF." onSave={() => {}} className="block text-center leading-tight" />
                </th>
                <th rowSpan={2} className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-b border-black border-l w-[20%]">
                  <EditableText tag="span" defaultValue="REMARKS" onSave={() => {}} className="block text-center leading-tight" />
                </th>
              </tr>
              <tr>
                {/* These widths are relative to their parent colSpan, but here they are direct percentages of the table width */}
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="YES" onSave={() => {}} className="block text-center" />
                </th>
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="NO" onSave={() => {}} className="block text-center" />
                </th>
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="ON SITE" onSave={() => {}} className="block text-center" />
                </th>
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-r border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="OFF SITE" onSave={() => {}} className="block text-center" />
                </th>
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="DATE" onSave={() => {}} className="block text-center" />
                </th>
                <th className="px-1 py-1 text-center font-medium text-gray-700 uppercase tracking-wider border-b border-black w-[4%]">
                  <EditableText tag="span" defaultValue="TO CONTR." onSave={() => {}} className="block text-center" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black">
              {tableData.map((row, rowIndex) => (
                <tr key={row.id}>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.specSection}
                      onSave={(val) => handleTableCellSave(rowIndex, 'specSection', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.itemOfWork}
                      onSave={(val) => handleTableCellSave(rowIndex, 'itemOfWork', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.testRequired}
                      onSave={(val) => handleTableCellSave(rowIndex, 'testRequired', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.yes}
                      onSave={(val) => handleTableCellSave(rowIndex, 'yes', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.no}
                      onSave={(val) => handleTableCellSave(rowIndex, 'no', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.sampledBy}
                      onSave={(val) => handleTableCellSave(rowIndex, 'sampledBy', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.testedBy}
                      onSave={(val) => handleTableCellSave(rowIndex, 'testedBy', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.onSite}
                      onSave={(val) => handleTableCellSave(rowIndex, 'onSite', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.offSite}
                      onSave={(val) => handleTableCellSave(rowIndex, 'offSite', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.dateCompleted}
                      onSave={(val) => handleTableCellSave(rowIndex, 'dateCompleted', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1 border-r border-black"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.dateForwarded}
                      onSave={(val) => handleTableCellSave(rowIndex, 'dateForwarded', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                  <td className="px-1 py-1"> {/* Removed whitespace-nowrap */}
                    <EditableText
                      tag="div"
                      defaultValue={row.remarks}
                      onSave={(val) => handleTableCellSave(rowIndex, 'remarks', val)}
                      className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TestingPlanEditor;
