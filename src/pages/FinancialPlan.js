// FinancialPlan.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

//import PieChart from '../components/PieChart'; // Update the import path as needed


const FinancialPlan = () => {
  const [formData, setFormData] = useState({
    age: 22,
    annual_income: 100000,
    risk_appetite: 'High', // Default value
    income_growth_rate: 10,
    annual_expense: 80000,
    expense_growth: 13,
    major_expense: 20000,
    year_of_major_expense: 2025,
  });
  const [financialPlan, setFinancialPlan] = useState(null);
  const [investmentData, setInvestmentData] = useState(null);
  const [myChart, setMyChart] = useState(null);

 // Destroy existing chart when component unmounts
 useEffect(() => {
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [myChart]);

  // Function to create or update the chart
  const createChart = () => {
    if (myChart) {
      myChart.destroy();
    }
    const ctx = document.getElementById('myChart');
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(investmentData),
        datasets: [
          {
            data: Object.values(investmentData),
            backgroundColor: [
              'red',
              'blue',
              'green',
              'yellow',
              'orange',
              'purple',
            ],
          },
        ],
      },
    });
    setMyChart(newChart);
  };

  useEffect(() => {
    if (investmentData !== null) {
      createChart();
    }
  }, [investmentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('age', formData.age);
    formDataToSend.append('annual_income', formData.annual_income);
    formDataToSend.append('risk_appetite', formData.risk_appetite);
    formDataToSend.append('income_growth_rate', formData.income_growth_rate);
    formDataToSend.append('annual_expense', formData.annual_expense);
    formDataToSend.append('expense_growth', formData.expense_growth);
    formDataToSend.append('major_expense', formData.major_expense);
    formDataToSend.append('year_of_major_expense', formData.year_of_major_expense);

    try {
        const response = await axios.post('https://amitesh.suryasekhardatta.com/financial_plan', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const responseData = response.data;
        console.log(responseData);

      if (response.data !== undefined) {
        setFinancialPlan(responseData);
        setInvestmentData(responseData['Investment Allocation']); // Set Investment Allocation data
        console.log(financialPlan);
      } else {
        setFinancialPlan('Error: Unable to generate a financial plan');
      }
    } catch (error) {
      console.error('Error making the API request:', error);
      setFinancialPlan('Error: Unable to generate a financial plan');
    }
  };

  return (
    <div className="bg-[#2c4a27] text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-4">Financial Planning</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Age */}
        <div>
          <label htmlFor="age" className="block">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Annual Income */}
        <div>
          <label htmlFor="annual_income" className="block">Annual Income</label>
          <input
            type="number"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Risk Appetite (Dropdown/Select) */}
        <div>
          <label htmlFor="risk_appetite" className="block">Risk Appetite</label>
          <select
            name="risk_appetite"
            value={formData.risk_appetite}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          >
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
          </select>
        </div>

        {/* Income Growth Rate */}
        <div>
          <label htmlFor="income_growth_rate" className="block">Income Growth Rate (%)</label>
          <input
            type="number"
            name="income_growth_rate"
            value={formData.income_growth_rate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Annual Expense */}
        <div>
          <label htmlFor="annual_expense" className="block">Annual Expense</label>
          <input
            type="number"
            name="annual_expense"
            value={formData.annual_expense}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Expense Growth Rate */}
        <div>
          <label htmlFor="expense_growth" className="block">Expense Growth Rate (%)</label>
          <input
            type="number"
            name="expense_growth"
            value={formData.expense_growth}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Major Expense */}
        <div>
          <label htmlFor="major_expense" className="block">Major Expense</label>
          <input
            type="number"
            name="major_expense"
            value={formData.major_expense}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Year of Major Expense */}
        <div>
          <label htmlFor="year_of_major_expense" className="block">Year of Major Expense</label>
          <input
            type="number"
            name="year_of_major_expense"
            value={formData.year_of_major_expense}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Generate Financial Plan
        </button>
      </form>

      {financialPlan !== null && (
        <div className="mt-4">
          <strong>Financial Plan:</strong><br />
            <strong>Needs:</strong> {financialPlan['Needs']} <br />
            <strong>Wants:</strong> {financialPlan['Wants']} <br />
            <strong>Savings:</strong> {financialPlan['Savings']} <br />
        </div>
      )}
        {investmentData !== null && (
  <div className="mt-4">
    <strong>Investment Allocation:</strong>
    {investmentData !== null && (
        <div className="mt-4 text-white">
          <strong>Investment Allocation:</strong>
          <canvas id="myChart" />
        </div>
      )}
  </div>
)}


    </div>
  );
};

export default FinancialPlan;
