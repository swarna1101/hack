import React, { useState } from 'react';

const keywords = [
    "Emergency Fund, Savings",
    "Debt Reduction, Financial Planning",
    "Investment, Stock Market",
    "Credit Score, Financial Health",
    "Retirement Savings, Financial Security",
    "Tax Savings, Income Tax",
    "Insurance, Risk Management",
    "Gold Investment, Precious Metals",
    "Real Estate, Property Investment",
    "Cryptocurrency, Digital Currency",
    "Salary Investment, Financial Planning",
    "Budgeting, Young Professionals",
    "Employee Benefits, Financial Perks",
    "Tax Planning, Income Tax",
    "Financial Goals, Savings",
    "Health Insurance, Life Insurance",
    "Credit Score, Financial Responsibility",
    "Debt Management, Financial Freedom",
    "Retirement Savings, Financial Planning",
    "Financial Products, Banking",
    "Budget Shopping, Saving Tips",
    "Credit Cards, Smart Usage",
    "Financial Planning, Personal Finance",
    "Stock Market, Long-Term Investing",
    "Education Savings, College Fund",
    "Debt Management, Personal Finance",
    "Risk Management, Financial Security",
    "Sustainable Budgeting, Financial Health",
    "Investment Strategies, Financial Growth",
    "Major Purchases, Financial Planning",
    "Mutual Funds, Investing",
    "Mutual Fund Performance, Analysis",
    "Systematic Investment Plan, SIP",
    "ELSS, Tax Saving",
    "Retirement, Mutual Funds",
    "Alternative Investments, Assets",
    "Real Estate, Investment",
    "Cryptocurrency, Digital Assets",
    "Gold Investment, Precious Metals",
    "Hedge Funds, Investment Strategies",
    "ELSS, Tax Saving",
    "Retirement, Mutual Funds",
    "Alternative Investments, Assets",
    "Real Estate, Investment",
    "Cryptocurrency, Digital Assets",
    "Gold Investment, Precious Metals",
    "Hedge Funds, Investment Strategies",
    "Commodity Trading, Market Insights",
    "Financial Planning, Life Events",
    "Insurance, Financial Security",
    "Charitable Giving, Tax Deductions",
    "Online Banking, Digital Finance",
    "Financial Planning, Resilience",
    "Global Economy, Market Trends",
    "Financial Technology, Personal Finance",
    "Commodity Trading, Market Insights",
    "Financial Planning, Life Events",
    "Global Economics, Personal Finance",
    "Insurance, Life Stages",
    "Loans, Debt Management",
    "Credit History, Financial Health",
    "Financial Advisors, Financial Planning",
    "FinTech, Personal Finance Trends",
    "Financial Planning, Life Events",
    "Budgeting, Financial Planning",
    "Risk Management, Financial Planning",
    "Estate Planning, Legacy",
    "Digital Finance, Money Management Tools",
    "Gig Economy, Investing",
    "Market Volatility, Investment Strategy",
    "Financial Literacy, Education",
    "Financial Planning, Couples",
    "HSA, Health Finance",
    "FIRE Movement, Savings",
    "Spending Habits, Psychology",
    "Kids, Financial Education",
    "Inflation, Savings",
    "Estate Planning, Wills",
    "Student Loans, Debt Management",
    "Credit Usage, Financial Health"
  ];
  

  const HomePage = () => {
    const [selectedKeyword, setSelectedKeyword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [popupContent, setPopupContent] = useState('');
  
    const fetchData = async (keyword) => {
    console.log(keyword);
      try {
        const response = await fetch(`https://amitesh.suryasekhardatta.com/game?q=${(keyword)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetching error: ", error);
        return "Failed to fetch data";
      }
    };
  
    const spin = () => {
      setIsSpinning(true);
      let currentIndex = 0;
      const spinner = setInterval(() => {
        setSelectedKeyword(keywords[currentIndex]);
        currentIndex = (currentIndex + 1) % keywords.length;
      }, 50);
  
      setTimeout(async () => {
        clearInterval(spinner);
        const randomIndex = Math.floor(Math.random() * keywords.length);
        setSelectedKeyword(keywords[randomIndex]);
        const data = await fetchData(keywords[randomIndex]);
        setPopupContent(data);
        setIsSpinning(false);
        setShowPopup(true);
      }, 2000); // Duration of spin animation
    };
  
    return (
      <div className="bg-[#2c4a27] text-[#f2f2f2] min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-8">Personal Finance 101</h1>
        <button
          className={`px-6 py-3 text-white font-bold rounded ${isSpinning ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} transition duration-300 ease-in-out`}
          onClick={spin}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning...' : "Let's Play"}
        </button>
        <div className={`mt-8 text-3xl font-bold ${isSpinning ? 'animate-bounce' : ''}`}>
          {selectedKeyword}
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Your Personal Finance Tip:</h2>
              <p className="text-black mb-4">{popupContent}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default HomePage;
