import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { addUser, updateUser } from '../redux/usersSlice';
import { RootState, AppDispatch } from '../redux/store';
import { addUser } from '../redux/reducers/usersReducers';

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number,
}

interface UserFormInputs extends Omit<User, 'id'> {
  id?: number; // Optional ID for editing
}

const UserForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === Number(id))
  );

  const [formData, setFormData] = useState<UserFormInputs>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber,
  });

  const [errors, setErrors] = useState<Partial<UserFormInputs>>({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (id && user) {
      setFormData({
        ...user,
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [id, user]);

  const validate = (): boolean => {
    const newErrors: Partial<UserFormInputs> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    if (id) {
      dispatch(updateUser({ ...formData, id: Number(id) }));
    } else {
      dispatch(addUser({ ...formData, id: formData.id || Date.now() }));
    }
    navigate('/');
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {id ? 'Edit User' : 'Add User'}
      </h2>
      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {id ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};


