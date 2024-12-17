import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { nextStep, prevStep, saveFormData } from '../features/formWizardSlice';
import Step1 from '../components/forms/step1';
import Step2 from '../components/forms/step2';
import Step3 from '../components/forms/step3';
import ResumeePreview from '../components/forms/ResumeePreview';
import { useAppDispatch, useAppSelector } from '../hooks/hook';

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { step, formData } = useAppSelector((state) => state.formWizard);
  const methods = useForm({ defaultValues: formData });

  const onSubmit = (data: any) => {
    if (step < 3) {
      dispatch(saveFormData(data));
      dispatch(nextStep());
    } else {
      console.log('Final Data:', { ...formData, ...data });
      // Call API to save the final data
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <ResumeePreview data={formData} />} {/* Pass formData */}
          <div className="mt-4">
            {step > 1 && (
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => dispatch(prevStep())}
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {step === 3 ? 'Submit' : 'Next'}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserForm;
