import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Donor() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users/donor')
      .then(response => {
        setDonors(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="text-2xl font-bold mb-4">All Donors</h3>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Full Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Blood Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Contact Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Email Address</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Donated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donors.map((donor, index) => (
            <tr key={donor._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{donor.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{donor.bloodType}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{donor.contactNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{donor.emailAddress}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{donor.haveDonated ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Donor;
