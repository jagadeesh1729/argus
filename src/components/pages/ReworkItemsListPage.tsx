import { useRecoilValue } from "recoil";
import { companyNameState, contractNumberState, contractorNameState, deliveryOrderNoState,  workOrderState } from "../../recoil/state/formState";
import { useState } from "react";
import EditableText from "../atoms/EditableText";

type ReworkItemRow = {
  id: number;
  number: string;
  dateIdentified: string;
  description: string;
  contractRequirement: string;
  actionTaken: string;
  resolution: string;
  dateCompleted: string;
};

// New functional component for the Rework Items List page
function ReworkItemsListPage() {
  // Recoil values for the top section
  const contractTitleFromRecoil = useRecoilValue(contractorNameState); // Assuming workDescriptionState holds the contract title
  const contractNumber = useRecoilValue(contractNumberState);
  const deliveryOrderNo = useRecoilValue(deliveryOrderNoState);
  const workOrder = useRecoilValue(workOrderState);
  const contractorName = useRecoilValue(companyNameState);

  // Local state for the page title
  const [pageTitle, setPageTitle] = useState('REWORK ITEMS LIST');

  // State for the table data
  const [tableData, setTableData] = useState<ReworkItemRow[]>(
    Array.from({ length: 15 }, (_, i) => ({ // 15 empty rows initially
      id: i,
      number: '',
      dateIdentified: '',
      description: '',
      contractRequirement: '',
      actionTaken: '',
      resolution: '',
      dateCompleted: '',
    }))
  );

  // Handler for updating table cell data
  const handleTableCellSave = (
    rowIndex: number,
    column: keyof ReworkItemRow,
    value: string
  ) => {
    setTableData(prevData =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [column]: value } : row
      )
    );
  };

  return (
    <div className="border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow overflow-hidden break-inside-avoid page-break">
      <div className="">
        {/* Yellow border - simulating the image */}
        <div className=""></div>

        {/* Page Title */}
        <div className="text-center mb-8 mt-10 ">
          <EditableText
            tag="h1"
            defaultValue={pageTitle}
            onSave={setPageTitle}
            className="text-xl font-bold underline"
          />
        </div>

        {/* Top Information Section */}
        <div className=" mt-10 text-sm ">
          <div className="mb-2 flex items-center">
            <span className="font-semibold w-24">Title:</span>
            <EditableText
              tag="span"
              defaultValue={contractTitleFromRecoil}
              onSave={() => { /* This value is from Recoil, so onSave might not be directly applicable here if it's meant to be read-only from Recoil */ }}
              className="ml-11  rounded-md flex-grow"
            />
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-semibold w-24">Contract No:</span>
            <EditableText
              tag="span"
              defaultValue={contractNumber}
              onSave={() => { /* Recoil value */ }}
              className="ml-2 px-2 py-1 rounded-md flex-grow"
            />
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-semibold ">Delivery Order No:</span>
            <EditableText
              tag="span"
              defaultValue={deliveryOrderNo}
              onSave={() => { /* Recoil value */ }}
              className="ml-2 px-2 py-1 rounded-md flex-grow"
            />
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-semibold ">Work Order No:</span>
            <EditableText
              tag="span"
              defaultValue={workOrder}
              onSave={() => { /* Recoil value */ }}
              className="ml-2 px-2 py-1 rounded-md flex-grow"
            />
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-semibold w-24">Contractor:</span>
            <EditableText
              tag="span"
              defaultValue={contractorName}
              onSave={() => { /* Recoil value */ }}
              className="ml-2 px-2 py-1 rounded-md flex-grow"
            />
          </div>
        </div>

        {/* Rework Items Table */}
        <div className="mt-10  px-4">
          <div className="border border-b">
            <table className=" text-xs">
              <thead className="border border-b">
                <tr className="border border-b">
                  <th scope="col" className=" text-center font-medium text-gray-700 uppercase border-r border-b border  w-[5%]">
                    <EditableText tag="span" defaultValue="NUMBER" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-r border-b  border  w-[5%]">
                    <EditableText tag="span" defaultValue="DATE IDENTIFIED" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-r border-b  w-[20%]">
                    <EditableText tag="span" defaultValue="DESCRIPTION" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-r border-b  w-[10%]">
                    <EditableText tag="span" defaultValue="CONTRACT REQUIREMENT (Spec. Section and Par. No., Drawing No. and Detail No., etc.)" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-r border-b  w-[15%]">
                    <EditableText tag="span" defaultValue="ACTION TAKEN BY QC MANAGER" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-r border-b  w-[15%]">
                    <EditableText tag="span" defaultValue="RESOLUTION" onSave={() => {}} className="block text-center" />
                  </th>
                  <th scope="col" className="px-2 py-3 text-center font-medium text-gray-700 uppercase  border-b  w-[5%]">
                    <EditableText tag="span" defaultValue="DATE COMPLETED" onSave={() => {}} className="block text-center" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white ">
                {tableData.map((row, rowIndex) => (
                  <tr key={row.id}>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.number}
                        onSave={(val) => handleTableCellSave(rowIndex, 'number', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.dateIdentified}
                        onSave={(val) => handleTableCellSave(rowIndex, 'dateIdentified', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50 "
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.description}
                        onSave={(val) => handleTableCellSave(rowIndex, 'description', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.contractRequirement}
                        onSave={(val) => handleTableCellSave(rowIndex, 'contractRequirement', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.actionTaken}
                        onSave={(val) => handleTableCellSave(rowIndex, 'actionTaken', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border-r border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.resolution}
                        onSave={(val) => handleTableCellSave(rowIndex, 'resolution', val)}
                        className="w-full h-full min-h-[24px] outline-none focus:bg-blue-50"
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-b">
                      <EditableText
                        tag="div"
                        defaultValue={row.dateCompleted}
                        onSave={(val) => handleTableCellSave(rowIndex, 'dateCompleted', val)}
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
    </div>
  );
}

export default ReworkItemsListPage;