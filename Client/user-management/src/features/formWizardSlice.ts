// features/formWizardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormWizardState {
  step: number;
  formData: Record<string, any>;
}

const initialState: FormWizardState = {
  step: 1,
  formData: {},
};

const formWizardSlice = createSlice({
  name: 'formWizard',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    saveFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { nextStep, prevStep, saveFormData } = formWizardSlice.actions;
export default formWizardSlice.reducer;
