// src/state/formState.ts
import { atom } from 'recoil';

export const contractNumberState = atom({
  key: 'contractNumber',
  default: '',
});

export const deliveryOrderNoState = atom({
  key: 'deliveryOrderNo',
  default: '',
});

export const workOrderState = atom({
  key: 'workOrder',
  default: '',
});

export const locationState = atom({
  key: 'location',
  default: '',
});

export const contractorNameState = atom({
  key: 'contractorName',
  default: '',
});
export const qcManagerState = atom({
  key: 'qcManager',
  default: '',
});

export const altQcManagerState = atom({
  key: 'altQcManager',
  default: '',
});

export const projectManagerState = atom({
  key: 'projectManager',
  default: '',
});
export const roleBasedFilesState = atom<Record<string, File[]>>({
  key: 'roleBasedFilesState',
  default: {},
});
export const corporateSafetyOfficerState = atom({
  key: 'corporateSafetyOfficer',
  default: '',
});

export const qcManagerPhoneState = atom({
  key: 'qcManagerPhone',
  default: '',
});

export const altQcManagerPhoneState = atom({
  key: 'altQcManagerPhone',
  default: '',
});

export const projectManagerPhoneState = atom({
  key: 'projectManagerPhone',
  default: '',
});

export const corporateSafetyPhoneState = atom({
  key: 'corporateSafetyPhone',
  default: '',
});

export const workDescriptionState = atom({
  key: 'workDescription',
  default: '',
});

export const companyNameState = atom({
  key: 'companyName',
  default: '',
});
export const shortCompanyNameState = atom({
  key: 'shortCompanyName',
  default: '',
});

export type TradeRow = {
  id: number;
  trade: string;
  contractor: string;
  email: string;
  phone: string;
};

export const tradesState = atom<TradeRow[]>({
  key: 'tradesState',
  default: [
    { id:1,trade: 'Demo', contractor: '', email: '', phone: '' },
    { id:2,trade: 'Structural', contractor: '', email: '', phone: '' },
    { id:3,trade: 'Electrical', contractor: '', email: '', phone: '' },
    { id:4,trade: 'Mechanical', contractor: '', email: '', phone: '' },
    {id:5, trade: 'Plumbing', contractor: '', email: '', phone: '' },
    { id:6,trade: 'Doors', contractor: '', email: '', phone: '' },
    {id:7,trade: 'Concrete', contractor: '', email: '', phone: '' },
  ],
});
// src/recoil/state/formState.ts

export const letterDateState = atom({
  key: 'letterDate',
  default: '', // e.g., 'October 18, 2024'
});

export const letterAddressState = atom({
  key: 'letterAddress',
  default: '', // e.g., 'NAVFACSYSCOM Mid-Atlantic\nPWD Oceana\n...'
});
export const presidentSignatureUrlState = atom<File | null>({
  key: 'presidentSignatureUrlState',
  default: null,
});
export const presName = atom({
  key: 'presName',
  default: '', // e.g., 'NAVFACSYSCOM Mid-Atlantic\nPWD Oceana\n...'
});



export type TestPlanRow = {
  id:number;
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

export const testingPlanState = atom<TestPlanRow[]>({
  key: 'testingPlanState',
  default: [],
});
