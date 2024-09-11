// pages/passwordGenerator.js
"use client"
import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    
    let allChars = '';
    if (includeUpper) allChars += upperCaseChars;
    if (includeLower) allChars += lowerCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSpecial) allChars += specialChars;

    if (!allChars) {
      alert("Please select at least one character type.");
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomIndex];
    }
    
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const calculateStrength = () => {
    let strength = 0;
    if (length >= 8) strength += 1;
    if (includeUpper && includeLower) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSpecial) strength += 1;

    switch (strength) {
      case 1: return 'Weak';
      case 2: return 'Medium';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return 'Very Weak';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">
      <h1 className="text-3xl font-bold text-white animate-bounce mb-6">Password Generator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input 
          type="text"
          value={password}
          readOnly
          className="w-64 p-2 mb-4 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold text-gray-800 focus:outline-none"
        />

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={generatePassword}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 transform hover:scale-105"
          >
            Generate Password
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full ml-4"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password Length:</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-16 p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
            min="6"
            max="20"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper(!includeUpper)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Uppercase</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower(!includeLower)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Lowercase</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Numbers</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={() => setIncludeSpecial(!includeSpecial)}
            className="mr-2"
          />
          <label className="text-gray-700">Include Special Characters</label>
        </div>

        <div className="mt-4">
          <p className="font-bold text-gray-700">Password Strength: {calculateStrength()}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
