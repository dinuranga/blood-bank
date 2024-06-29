import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Organization() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users/organization')
      .then(response => {
        setOrganizations(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-4">All Organizations</h3>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Organization Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Registration Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Type of Organization</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Contact Person</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Contact Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email Address</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {organizations.map((organization, index) => (
            <tr key={organization._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.organizationName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.registrationNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.typeOfOrganization}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.contactPersonName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.contactNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{organization.emailAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Organization;