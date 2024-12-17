import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import formWizardReducer from '../features/formWizardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    formWizard: formWizardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

