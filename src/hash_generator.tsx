import React, { useState } from 'react';
import { MD5 } from 'crypto-js'; // Import the Md5 function from CryptoJS

function HashApp() {
  const [inputText, setInputText] = useState<string>('');
  const [md5Hash, setMd5Hash] = useState<string>('');

  const generateMd5Hash = () => {
    const hash = MD5(inputText).toString(); // Generate the MD5 hash
    setMd5Hash(hash);
  };

  return (
    <div>
      <h1>MD5 Hash Generator</h1>
      <div>
        <label htmlFor="inputText">Enter Text:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={generateMd5Hash}>Generate MD5 Hash</button>
      </div>
      {md5Hash && (
        <div>
          <p>MD5 Hash:</p>
          <p>{md5Hash}</p>
        </div>
      )}
    </div>
  );
}

export default HashApp;
