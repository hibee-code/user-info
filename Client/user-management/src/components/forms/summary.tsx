import React from 'react';
import { useFormContext } from 'react-hook-form';

const Summary: React.FC = () => {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">User Information</h3>
        <p><strong>First Name:</strong> {data.info.firstName}</p>
        <p><strong>Last Name:</strong> {data.info.lastName}</p>
        <p><strong>Date of Birth:</strong> {data.info.dob}</p>
        <p><strong>Occupation:</strong> {data.info.occupation}</p>
        <p><strong>Gender:</strong> {data.info.gender}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <p><strong>Email:</strong> {data.contact.email}</p>
        <p><strong>Phone:</strong> {data.contact.phone}</p>
        <p><strong>Fax:</strong> {data.contact.fax || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> {data.contact.linkedInUrl || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Address</h3>
        <p><strong>Address:</strong> {data.address.address}</p>
        <p><strong>City:</strong> {data.address.city}</p>
        <p><strong>State:</strong> {data.address.state}</p>
        <p><strong>Country:</strong> {data.address.country}</p>
        <p><strong>Zip Code:</strong> {data.address.zipCode}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Academic Background</h3>
        <p><strong>Past Schools:</strong> {data.academics.schools}</p>
      </div>
    </div>
  );
};

export default Summary;
