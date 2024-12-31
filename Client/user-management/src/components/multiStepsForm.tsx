import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1 from './forms/step1';
import Step2 from './forms/step2';
import Step3 from './forms/step3';
import Summary from './forms/summary';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: {
      info: {
        profilePhoto: '',
        firstName: '',
        lastName: '',
        dob: '',
        occupation: '',
        gender: '',
      },
      contact: {
        email: '',
        phone: '',
        fax: '',
        linkedInUrl: '',
      },
      address: {
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      academics: {
        schools: '',
      },
    },
  });

  const onSubmit = (data: any) => {
    console.log('Final Form Data:', data);
    // Make API call to backend
    fetch('http://localhost:3000/users/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => console.log('API Response:', result))
      .catch(error => console.error('Error:', error));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-8 max-w-lg mx-auto border rounded shadow">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Summary />}

        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
