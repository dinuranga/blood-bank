import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowPassword(true);

    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: '' };
    });

    if (name === 'bloodType') {
      setErrors((prevErrors) => {
        return { ...prevErrors, bloodType: '' };
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Common validations
  
    if (!formData || !formData.emailAddress || !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid email address';
    }
  
    if (!formData || !formData.contactNumber || !/^(?:\+?94)?[0-9]{9,10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid Sri Lankan phone number';
    }
  
    if (!formData || !formData.password || formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }
  
    // Validation specific to donors
    if (userType === 'donor') {
      if (!formData || !formData.fullName || formData.fullName.trim() === '') {
        newErrors.fullName = 'Full Name is required';
      }
      if (!formData || formData.haveDonated === undefined) {
        newErrors.haveDonated = 'Please select an option';
      }
      if (!formData || !formData.nic) {
        newErrors.nic = 'NIC is required';
      } else if (!/^\d{9}[VvXx]$|^.{12}$/.test(formData.nic)) {
        newErrors.nic = 'Invalid NIC';
      }
      const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      if (!formData || !formData.bloodType) {
        newErrors.bloodType = 'Blood Type is required';
      }
      if (formData && formData.bloodType && !bloodTypes.includes(formData.bloodType)) {
        newErrors.bloodType = 'Invalid Blood Type';
      }
    }
  
    // Validation specific to organizations
    if (userType === 'organization') {
      if (!formData || !formData.organizationName || formData.organizationName.trim() === '') {
        newErrors.organizationName = 'Organization Name is required';
      }
      if (!formData || !formData.registrationNumber || formData.registrationNumber.trim() === '') {
        newErrors.registrationNumber = 'Registration Number is required';
      }
      if (!formData || !formData.typeOfOrganization || formData.typeOfOrganization.trim() === '') {
        newErrors.typeOfOrganization = 'Type of Organization is required';
      }
      if (!formData || !formData.contactPersonName || formData.contactPersonName.trim() === '') {
        newErrors.contactPersonName = 'Contact Person Name is required';
      }
      if (!formData || !formData.address || formData.address.trim() === '') {
        newErrors.address = 'Address is required';
      }
      if (!formData || !formData.purposeOrMission || formData.purposeOrMission.trim() === '') {
        newErrors.purposeOrMission = 'Purpose or Mission is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('/users/register', formData, { withCredentials: true });
      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
      console.error('Error registering:', error);
    }
    console.log({ formData });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-screen-lg bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">User Type:</label>
            <select
              name="userType"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                handleChange(e);
              }}
              className="mt-1 bg-blue-50 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Select User Type"
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          {userType && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {userType === 'donor' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700">NIC:</label>
                      <input
                        type="text"
                        name="nic"
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.nic ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter NIC"
                      />
                      {errors.nic && <p className="text-red-500 mt-1">{errors.nic}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Full Name:</label>
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.fullName ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Full Name"
                      />
                      {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email:</label>
                      <input
                        type="email"
                        name="emailAddress"
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.emailAddress ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Email"
                      />
                      {errors.emailAddress && <p className="text-red-500 mt-1">{errors.emailAddress}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Number:</label>
                      <input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.contactNumber ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Contact Number"
                      />
                      {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Blood Type:</label>
                      <select
                        name="bloodType"
                        onChange={handleChange}
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.bloodType ? 'border-red-500' : ''
                        }`}
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                      {errors.bloodType && <p className="text-red-500 mt-1">{errors.bloodType}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Have Donated:</label>
                      <select
                        name="haveDonated"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.haveDonated ? 'border-red-500' : ''
                        }`}

                      >
                        <option value="">Select Option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>

                      {errors.haveDonated && <p className="text-red-500 mt-1">{errors.haveDonated}</p>}

                    </div>
                  </>
                )}
                {userType === 'organization' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700">Organization Name:</label>
                      <input
                        type="text"
                        name="organizationName"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.organizationName ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Organization Name"
                      />
                      {errors.organizationName && <p className="text-red-500 mt-1">{errors.organizationName}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Registration Number:</label>
                      <input
                        type="text"
                        name="registrationNumber"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.registrationNumber ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Registration Number"
                      />
                      {errors.registrationNumber && <p className="text-red-500 mt-1">{errors.registrationNumber}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Type of Organization:</label>
                      <input
                        type="text"
                        name="typeOfOrganization"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.typeOfOrganization ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Type of Organization"
                      />
                      {errors.typeOfOrganization && <p className="text-red-500 mt-1">{errors.typeOfOrganization}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Person Name:</label>
                      <input
                        type="text"
                        name="contactPersonName"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.contactPersonName ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Contact Person Name"
                      />
                      {errors.contactPersonName && <p className="text-red-500 mt-1">{errors.contactPersonName}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Number:</label>
                      <input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.contactNumber ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Contact Number"
                      />
                      {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email Address:</label>
                      <input
                        type="text"
                        name="emailAddress"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.emailAddress ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Email Address"
                      />
                      {errors.emailAddress && <p className="text-red-500 mt-1">{errors.emailAddress}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Address:</label>
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.address ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Address"
                      />
                      {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}

                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Purpose or Mission:</label>
                      <input
                        type="text"
                        name="purposeOrMission"
                        onChange={handleChange}

                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                          errors.purposeOrMission ? 'border-red-500' : ''
                        }`}
                        placeholder="Enter Purpose or Mission"
                      />
                      {errors.purposeOrMission && <p className="text-red-500 mt-1">{errors.purposeOrMission}</p>}

                    </div>
                  </>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>

                <div className="relative">
                  <input
                    type={!showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {!showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}

              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>

              {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
            </>
          )}

        </form>
      </div>
    </div>
  );
};

export default Register;
