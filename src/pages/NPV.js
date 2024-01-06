// src/components/NPV.js
import React, { useState } from 'react';
import axios from 'axios';

const NPV = () => {
  const [formData, setFormData] = useState({
    initial_investment: 99,
    required_rate_of_return: 5,
    number_of_periods: 5,
    annual_inflow: 20000,
    growth_rate: 5
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('initial_investment', formData.initial_investment);
    formDataToSend.append('required_rate_of_return', formData.required_rate_of_return);
    formDataToSend.append('number_of_periods', formData.number_of_periods);
    formDataToSend.append('annual_inflow', formData.annual_inflow);
    formDataToSend.append('growth_rate', formData.growth_rate);

    try {
      const response = await axios.post('https://amitesh.suryasekhardatta.com/npv', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = response.data;

      // Check if the response contains NPV and Result properties
      if (responseData && responseData['Net Present Value (NPV)'] !== undefined && responseData['Result'] !== undefined) {
        setResult(responseData);
      } else {
        console.error('Invalid response data:', responseData);
      }
    } catch (error) {
      console.error('Error making the API request:', error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2c4a27] text-white p-4">
    <h2 className="text-3xl font-bold mb-4">NPV Calculator</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        
        {/* Initial Investment */}
        <div>
          <label htmlFor="initial_investment" className="block">Initial Investment</label>
          <input
            type="number"
            name="initial_investment"
            value={formData.initial_investment}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Required Rate of Return */}
        <div>
          <label htmlFor="required_rate_of_return" className="block">Required Rate of Return (%)</label>
          <input
            type="number"
            name="required_rate_of_return"
            value={formData.required_rate_of_return}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Number of Periods */}
        <div>
          <label htmlFor="number_of_periods" className="block">Number of Periods</label>
          <input
            type="number"
            name="number_of_periods"
            value={formData.number_of_periods}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Annual Inflow */}
        <div>
          <label htmlFor="annual_inflow" className="block">Annual Inflow</label>
          <input
            type="number"
            name="annual_inflow"
            value={formData.annual_inflow}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Growth Rate */}
        <div>
          <label htmlFor="growth_rate" className="block">Growth Rate (%)</label>
          <input
            type="number"
            name="growth_rate"
            value={formData.growth_rate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Calculate NPV
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <strong>Net Present Value (NPV):</strong> {result['Net Present Value (NPV)']}
          <br />
          <strong>Result:</strong> {result['Result']}
        </div>
      )}
    </div>
  );
};

export default NPV;