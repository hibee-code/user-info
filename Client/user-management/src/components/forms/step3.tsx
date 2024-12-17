import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormData {
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  academics: {
    schools: string;
  };
}

const Step3: React.FC = () => {
  // Use the defined form schema with useFormContext
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Address and Academics</h2>
      {/* Address Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Address</label>
        <input
          type="text"
          {...register('address.address', { required: 'Address is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors?.address?.address && (
          <p className="text-red-500 text-sm">{errors.address.address.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            {...register('address.city', { required: 'City is required' })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors?.address?.city && (
            <p className="text-red-500 text-sm">{errors.address.city.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            type="text"
            {...register('address.state', { required: 'State is required' })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors?.address?.state && (
            <p className="text-red-500 text-sm">{errors.address.state.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input
            type="text"
            {...register('address.country', { required: 'Country is required' })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors?.address?.country && (
            <p className="text-red-500 text-sm">{errors.address.country.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Zip Code</label>
          <input
            type="text"
            {...register('address.zipCode', { required: 'Zip Code is required' })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors?.address?.zipCode && (
            <p className="text-red-500 text-sm">{errors.address.zipCode.message}</p>
          )}
        </div>
      </div>
      {/* Academics Section */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Past Schools (comma-separated)</label>
        <textarea
          {...register('academics.schools', { required: 'Past schools are required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          rows={3}
          placeholder="Enter schools separated by commas (e.g., High School, University)"
        />
        {errors?.academics?.schools && (
          <p className="text-red-500 text-sm">{errors.academics.schools.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step3;
