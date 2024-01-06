import React, { useState } from 'react';
import axios from 'axios';

const EmiCalculator = () => {
    const [formData, setFormData] = useState({
      principal: 1000,
      interest: 10,
      tenure: 5,
    });
    const [emiResult, setEmiResult] = useState(null);
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const calculateEmi = async (formDataToSend) => {
      try {
        const response = await axios.post(
          'https://amitesh.suryasekhardatta.com/emi',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        const responseData = response.data;
  
        if (responseData.EMI !== undefined) {
          setEmiResult(responseData.EMI);
          if (responseData['Amortization Schedule']) {
            setAmortizationSchedule(responseData['Amortization Schedule']);
          }
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
      const formDataToSend = new FormData();
      formDataToSend.append('principal', formData.principal);
      formDataToSend.append('interest', formData.interest);
      formDataToSend.append('tenure', formData.tenure);
  
      calculateEmi(formDataToSend);
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

{amortizationSchedule.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Amortization Schedule:</h3>
          <table className="w-full border-collapse border border-white">
            <thead>
              <tr>
                <th className="border border-white px-4 py-2">Month</th>
                <th className="border border-white px-4 py-2">EMI</th>
                <th className="border border-white px-4 py-2">Interest</th>
                <th className="border border-white px-4 py-2">Principal</th>
                <th className="border border-white px-4 py-2">Remaining Principal</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((entry) => (
                <tr key={entry.Month}>
                  <td className="border border-white px-4 py-2">{entry.Month}</td>
                  <td className="border border-white px-4 py-2">{entry.EMI}</td>
                  <td className="border border-white px-4 py-2">{entry.Interest}</td>
                  <td className="border border-white px-4 py-2">{entry.Principal}</td>
                  <td className="border border-white px-4 py-2">{entry['Remaining Principal']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
