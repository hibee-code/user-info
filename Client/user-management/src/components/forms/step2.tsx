import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormData {
  contact: {
    email: string;
    phone: string;
    fax?: string;
    linkedInUrl?: string;
  };
}

const Step2: React.FC = () => {
  // Use the defined form schema with useFormContext
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Contact Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          {...register('contact.email', { required: 'Email is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.contact?.email && (
          <p className="text-red-500 text-sm">{errors.contact.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          type="text"
          {...register('contact.phone', { required: 'Phone number is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.contact?.phone && (
          <p className="text-red-500 text-sm">{errors.contact.phone.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fax (Optional)</label>
        <input
          type="text"
          {...register('contact.fax')}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">LinkedIn URL (Optional)</label>
        <input
          type="url"
          {...register('contact.linkedInUrl')}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
    </div>
  );
};

export default Step2;
