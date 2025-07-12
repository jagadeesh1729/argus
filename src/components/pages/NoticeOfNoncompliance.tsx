import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { contractNumberState, contractorNameState, deliveryOrderNoState, qcManagerState, workOrderState } from '../../recoil/state/formState';
import EditableText from '../atoms/EditableText';
import {
  PAGE_COMMON_CLASSES,
  PAGE_NUMBER_PLACEHOLDER_CLASSES,
  INNER_PAGE_CONTENT_CLASSES,
} from '../../utils/pageStyles';

const NoticeOfNoncompliance = () => {
  const [qcManager, setQcManager] = useRecoilState(qcManagerState);

  const [title, setTitle] = useState('NOTICE OF NONCOMPLIANCE');
  const [contractTitle, setContractTitle] = useRecoilState(contractorNameState);
  const [contractNumber, setContractNumber] = useRecoilState(contractNumberState)
  const [deliveryOrder, setDeliveryOrder] = useRecoilState(deliveryOrderNoState)
  const [workOrder, setWorkOrder] = useRecoilState(workOrderState)
  const [specSection, setSpecSection] = useState('______________');
  const [contractDrawing, setContractDrawing] = useState('_____________________');
  const [rectifyDate, setRectifyDate] = useState('_______________');
  const [comments, setComments] = useState(' ');

  return (
    <div className={PAGE_COMMON_CLASSES}>
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES} />
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <div className="text-center mt-6">
          <EditableText
            tag="h2"
            defaultValue={title}
            onSave={setTitle}
            className="font-bold underline"
          />
        </div>

        <div className="mt-8 ml-4 text-sm space-y-2">
          <div>
            <span className="font-semibold mr-11">Contract Title:</span>{' '}
            <EditableText defaultValue={contractTitle} onSave={setContractTitle} tag='span' />
          </div>
          <div>
            <span className="font-semibold mr-11">Contract Number:</span>{' '}
            <EditableText defaultValue={contractNumber} onSave={setContractNumber} tag='span' />
          </div>
          <div>
            <span className="font-semibold mr-11">Delivery Order Number:</span>{' '}
            <EditableText defaultValue={deliveryOrder} onSave={setDeliveryOrder}  tag='span' />
          </div>
          <div>
            <span className="font-semibold mr-11">Work Order Number:</span>{' '}
            <EditableText defaultValue={workOrder} onSave={setWorkOrder}  tag='span' />
          </div>
        </div>

        <div className="mt-8 text-sm">
          <p className="mb-4">
            You are hereby notified that the following items installed are not in compliance with the specification
            section <EditableText defaultValue={specSection} onSave={setSpecSection}  tag='span' /> and contract drawing{' '}
            <EditableText defaultValue={contractDrawing} onSave={setContractDrawing}   tag='span'/>.
          </p>
          <p>
            You are hereby notified to remove/rectify this item of noncompliance by{' '}
            <EditableText defaultValue={rectifyDate} onSave={setRectifyDate}  tag='span' />. Please notify the undersigned upon
            completion of this work.
          </p>
        </div>

        <div className="mt-12 flex justify-between items-center text-sm px-4">
          <div className="flex flex-col items-start">
            <EditableText defaultValue={qcManager} onSave={setQcManager} className="border-t w-48 text-center pt-1 "  tag='p' />
            <div>QC Manager</div>
          </div>
          <div className="flex flex-col items-end">
            <EditableText defaultValue=" " onSave={() => {}} className="border-t w-32 text-center pt-1" tag='p' />
            <div>Date</div>
          </div>
        </div>

        <div className="mt-10 text-sm font-semibold text-center underline">SUBCONTRACTORS COMMENTS</div>
        <div className="mt-2 border h-32 w-full p-2">
          <EditableText
            tag="div"
            defaultValue={comments}
            onSave={setComments}
            className="min-h-[6rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeOfNoncompliance;
