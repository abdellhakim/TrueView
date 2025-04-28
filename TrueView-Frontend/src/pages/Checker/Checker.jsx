import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import Sidebar, { SidebarItem } from '../../components/Sidebar';

export const Checker = () => {
    const [userText, setUserText] = useState('');
    const [classificationResult, setClassificationResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [verifications, setVerifications] = useState([]);

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Fetch previous verifications
    useEffect(() => {
        const fetchVerifications = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/verifications/sidebar', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setVerifications(data);
            } catch (error) {
                console.error('Error fetching verifications:', error);
            }
        };
        fetchVerifications();
    }, [token]);

    // Function to verify text
    const handleTextCheck = async () => {
        if (!userText.trim()) {
            setError('Please enter some text to check.');
            return;
        }

        setLoading(true);
        setError('');
        setClassificationResult('');

        try {
            // Classify text
            const response = await fetch('http://localhost:8080/api/classifyText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text: userText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            setClassificationResult(result);

            // Save to database
            await fetch('http://localhost:8080/api/verifications/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: userText,
                    result: result,
                }),
            });

            const updatedVerifications = await fetch('http://localhost:8080/api/verifications/sidebar', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const updatedData = await updatedVerifications.json();
            setVerifications(updatedData);

        } catch (err) {
            console.error('Error during classification:', err);
            setError('An error occurred while checking the text.');
        } finally {
            setLoading(false);
        }
    };

    // Click on a verification item
    const handleSidebarItemClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/verifications/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUserText(data.text);
            setClassificationResult(data.result);
        } catch (error) {
            console.error('Error fetching verification details:', error);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Sidebar>
                <SidebarItem 
                    icon={<FaPlus />} 
                    text="New Check"
                    active={!userText && !classificationResult}
                    onClick={() => {
                        setUserText('');
                        setClassificationResult('');
                        setError('');
                    }}
                />
                {verifications.map((verification) => (
                    <SidebarItem
                        key={verification.id}
                        text={verification.text}
                        onClick={() => handleSidebarItemClick(verification.id)}
                    />
                ))}
            </Sidebar>

            {/* Main content */}
            <div style={{ flex: 1, padding: '20px' }} className='flex flex-col justify-center items-center '>
                <h1 className='text-4xl font-medium text-center'>Please Provide The Article</h1>

                <textarea
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    className="w-[80%] h-[300px] mt-10 border-2 border-gray-300 rounded-md p-4 resize-none"
                    placeholder="Type or paste the text here..."
                ></textarea>

                <button
                    onClick={handleTextCheck}
                    className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md mt-4'
                    disabled={loading}
                >
                    {loading ? 'Checking...' : 'Check now'}
                </button>

                {classificationResult && (
                    <div className={`mt-4 text-xl font-semibold ${classificationResult === 'This text contains racist content.' ? 'text-red-500' : 'text-green-500'}`}>
                        <p>{classificationResult}</p>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Checker;
