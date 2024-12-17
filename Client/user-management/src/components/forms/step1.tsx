import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormData {
  info: {
    profilePhoto?: File;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
    gender: string;
  };
}

const Step1: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: User Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Profile Photo</label>
        <input
          type="file"
          {...register('info.profilePhoto')}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          {...register('info.firstName', { required: 'First Name is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.info?.firstName && (
          <p className="text-red-500 text-sm">{errors.info.firstName.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          {...register('info.lastName', { required: 'Last Name is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.info?.lastName && (
          <p className="text-red-500 text-sm">{errors.info.lastName.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Date of Birth</label>
        <input
          type="date"
          {...register('info.dob', { required: 'Date of Birth is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.info?.dob && (
          <p className="text-red-500 text-sm">{errors.info.dob.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Occupation</label>
        <input
          type="text"
          {...register('info.occupation', { required: 'Occupation is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        {errors.info?.occupation && (
          <p className="text-red-500 text-sm">{errors.info.occupation.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Gender</label>
        <select
          {...register('info.gender', { required: 'Gender is required' })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.info?.gender && (
          <p className="text-red-500 text-sm">{errors.info.gender.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;
