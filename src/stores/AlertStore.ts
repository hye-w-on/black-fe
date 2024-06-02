import { AlertColor } from '@mui/material';
import { create } from 'zustand';

interface AlertMessageState {
  message: string;
  type: AlertColor;
  open: boolean;
  setMessage: (message: string, type?: AlertColor) => void;
  setClose: () => void;
}

export const useAlertStore = create<AlertMessageState>((set, get) => {
  return {
    type: 'info',
    message: '',
    open: false,
    setMessage: (message: string, type?: AlertColor) => {
      set({
        message,
        type: type || 'info',
        open: true,
      });
    },
    setClose: () => {
      set({
        open: false,
      });
    },
  };
});
