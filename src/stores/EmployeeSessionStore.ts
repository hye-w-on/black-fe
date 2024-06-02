import { create } from 'zustand';
import { EmployeeSession } from '../models/session';

interface sessionState {
  employeeId: string;
  name: string;
  //languageCode: string; //TODO: 사용여부 미정
  roleCodes: string[];
  resetEmployeeSession: () => void;
  setEmployeeSession: (session: EmployeeSession) => void;
}

export const useEmployeeSessionStore = create<sessionState>((set, get) => {
  return {
    employeeId: '',
    name: '',
    //languageCode: '',
    roleCodes: [],
    resetEmployeeSession: async () => {
      set({
        employeeId: '',
        name: '',
        //languageCode: '',
        roleCodes: [],
      });
    },
    setEmployeeSession: (session: EmployeeSession) => {
      set({
        employeeId: session.employeeId,
        name: session.name,
        //languageCode: session.languageCode,
        roleCodes: session.roleCodes,
      });
    },
  };
});
export default useEmployeeSessionStore;
