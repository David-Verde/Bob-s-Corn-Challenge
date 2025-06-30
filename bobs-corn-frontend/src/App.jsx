import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/buy-corn';

function App() {
  const [clientId, setClientId] = useState('');
  const [cornCount, setCornCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyCorn = async () => {
    if (!clientId.trim()) {
      setMessage('Please enter your name or an ID to buy corn.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(API_URL, { clientId });

      if (response.status === 200) {
        setCornCount(prevCount => prevCount + 1);
        setMessage(`Success! You bought a corn. You now have ${cornCount + 1} 🌽.`);
        setMessageType('success');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred. Is the server running?');
      }
      setMessageType('error');
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-900">Bob's Fair Corn 🌽</h1>
          <p className="text-gray-500 mt-2">One corn per customer, per minute. That's the rule!</p>
        </div>

        <div className="flex justify-center items-center space-x-4 p-6 bg-yellow-100 rounded-lg">
          <span className="text-6xl animate-bounce">🌽</span>
          <div>
            <p className="text-yellow-800 text-lg">Your Corn</p>
            <p className="text-4xl font-bold text-yellow-900">{cornCount}</p>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Enter your name (e.g., 'Alice')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            disabled={isLoading}
          />

          <button
            onClick={handleBuyCorn}
            disabled={isLoading}
            className="w-full bg-yellow-400 text-yellow-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Buy One Corn'
            )}
          </button>
        </div>

        {message && (
          <div 
            className={`p-4 rounded-lg text-center font-medium
              ${messageType === 'success' ? 'bg-green-100 text-green-800' : ''}
              ${messageType === 'error' ? 'bg-red-100 text-red-800' : ''}
            `}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;