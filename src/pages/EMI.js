// EmiCalculator.js

import React, { useState } from 'react';
import axios from 'axios';

const EmiCalculator = () => {
  const [formData, setFormData] = useState({
    principal: 1000,
    interest: 10,
    tenure: 5,
  });
  const [emiResult, setEmiResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateEmi = async () => {
    try {
      const response = await axios.post('https://amitesh.suryasekhardatta.com/emi', formData);
      if (response.data && response.data.emi !== undefined) {
        setEmiResult(response.data.emi);
      } else {
        setEmiResult('Error: Unable to calculate EMI');
      }
    } catch (error) {
      console.error('Error making the API request:', error);
      setEmiResult('Error: Unable to calculate EMI');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEmi();
  };

  return (
    <div className="bg-[#2c4a27] text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-4">EMI Calculator</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Principal Amount */}
        <div>
          <label htmlFor="principal" className="block">Principal Amount</label>
          <input
            type="number"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label htmlFor="interest" className="block">Interest Rate (%)</label>
          <input
            type="number"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Tenure (Loan Duration) */}
        <div>
          <label htmlFor="tenure" className="block">Tenure (Years)</label>
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Calculate EMI
        </button>
      </form>

      {emiResult !== null && (
        <div className="mt-4"><strong>EMI Result:</strong> {emiResult}</div>
      )}
    </div>
  );
};

export default EmiCalculator;
