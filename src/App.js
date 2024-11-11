import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Stopwatch</h1>
      <div className="text-5xl font-mono">{formatTime(time)}</div>
      <div className="flex space-x-4 mt-8">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          disabled={isRunning}
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Stop
        </button>
        <button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
