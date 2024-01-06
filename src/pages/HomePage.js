import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [popupTitle, setPopupTitle] = useState('');

    useEffect(() => {
        console.log("Content State Updated:", popupContent);
    }, [popupContent]);

    const handleYesClick = async () => {
        if (selectedKeyword) {
            const articleContent = await fetchData(selectedKeyword);
            setPopupContent(articleContent);
        }
    };

    const handleNoClick = () => {
        setShowPopup(false); // This will hide the popup
    };
    
      const fetchData = async (keyword) => {
        try {
          const response = await axios.get(`https://amitesh.suryasekhardatta.com/game?q=${encodeURIComponent(keyword)}`);
          if (response.data && response.data.article !== undefined) {
            setPopupContent(response.data.article);
            setPopupTitle(response.data.data_c);
            setShowPopup(true);
            return response.data.article;
          } else {
            console.error("Article data is undefined:", response.data);
            setPopupContent("Article data is not available.");
            setPopupTitle(response.data.data_c || "Information");
            setShowPopup(true);
          }
        } catch (error) {
          console.error("Fetching error: ", error);
          setPopupContent("Failed to fetch data. Please try again later.");
          setPopupTitle("Error");
          setShowPopup(true);
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
          setIsSpinning(false);
          setShowPopup(true);
        }, 2000);
      };

    return (
        <div className="bg-[#2c4a27] text-[#f2f2f2] min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold mb-8">Personal Finance 101</h1>
            <div className={`mt-8 text-3xl font-bold ${isSpinning ? 'animate-bounce' : ''}`}>
                {selectedKeyword}
            </div>
            <button
                className={`px-6 py-3 text-white font-bold rounded ${isSpinning ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} transition duration-300 ease-in-out`}
                onClick={spin}
                disabled={isSpinning}
            >
                {isSpinning ? 'Spinning...' : "Let's Play"}
            </button>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <h2 className="text-2xl font-bold mb-4">{popupTitle}</h2>
                        <p className="mb-4">{popupContent}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleYesClick}
                                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded mr-2" // Added margin-right to "Yes" button
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleNoClick}
                                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;