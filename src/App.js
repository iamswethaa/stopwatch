import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const getMilliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(time / 60000);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
  };


  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]); 
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-8">
      <h1 className="text-3xl font-bold mb-4">Stopwatch</h1>

      {/* Centered Stopwatch Display */}
      <div className="flex flex-col items-center">
        <div className="text-5xl font-mono mb-8">{formatTime(time)}</div>
        <div className="flex space-x-4">
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
            onClick={handleReset}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Reset
          </button>
          <button
            onClick={handleLap}
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
            disabled={!isRunning}
          >
            Lap
          </button>
        </div>
      </div>

      {/* Lap times display */}
      <div className="mt-8 w-3/4 max-w-md border-t border-gray-600 pt-4">
        <h2 className="text-2xl mb-4 text-center">Laps</h2>
        <ul className="space-y-2">
          {laps.map((lap, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-700 p-2 rounded"
            >
              <span>Lap {index + 1}</span>
              <span>{formatTime(lap)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;