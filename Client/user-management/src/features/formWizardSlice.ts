import { createSlice } from '@reduxjs/toolkit';

interface FormWizardState {
  step: number;
}

const initialState: FormWizardState = {
  step: 1,
};

const formWizardSlice = createSlice({
  name: 'formWizard',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < 4) state.step += 1; // Boundary check
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1; // Boundary check
    },
  },
});

export const { nextStep, prevStep } = formWizardSlice.actions;
export default formWizardSlice.reducer;
