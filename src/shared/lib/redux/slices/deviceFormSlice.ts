import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DeviceFormData {
  name: string;
  type: string;
  location: string;
  description: string;
  serialNumber: string;
  sensors: string[];
  installationDate: string;
  minValue?: string;
  maxValue?: string;
}

export interface DeviceFormState {
  form: DeviceFormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeviceFormState = {
  form: {
    name: '',
    type: '',
    location: '',
    description: '',
    serialNumber: '',
    sensors: [],
    installationDate: new Date().toISOString().split('T')[0],
  },
  isSubmitting: false,
  error: null,
  success: false,
};

const deviceFormSlice = createSlice({
  name: 'deviceForm',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Record<string, string>>) => {
      Object.assign(state.form, action.payload);
      state.error = null;
    },
    toggleSensor: (state, action: PayloadAction<string>) => {
      const sensor = action.payload;
      const index = state.form.sensors.indexOf(sensor);
      if (index > -1) {
        state.form.sensors.splice(index, 1);
      } else {
        state.form.sensors.push(sensor);
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetForm: (state) => {
      state.form = initialState.form;
      state.error = null;
      state.success = false;
      state.isSubmitting = false;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const { updateField, toggleSensor, setError, setSubmitting, resetForm, setSuccess } = deviceFormSlice.actions;
export default deviceFormSlice.reducer;
