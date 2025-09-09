import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'; 

function App() {
	const [serverTime, setServerTime] = useState(null);
	
	useEffect(() => {
		fetch("http://localhost:3001/api/time")
			.then(res => res.json())
			.then(data => setServerTime(data.currentTime))
			.catch(err => console.error("Error fetching time:", err));
	}, []);

  return (
      <div>
        <h1>Hello from React!</h1>
        <p>Welcome to Descope Auth Lab</p>
        <p>Server time: {serverTime ? serverTime : "Loading..."}</p>
      </div>  
    )
}

export default App
