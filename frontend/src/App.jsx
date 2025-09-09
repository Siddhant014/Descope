import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect, useCallback } from 'react'; 

//Import Descope hooks and components
import { 
  useSession, 
  useUser, 
  useDescope, 
  Descope, 
  getSessionToken 
} from '@descope/react-sdk';

function App() 
{
  //Add Descope hooks to get user and session status
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const { logout } = useDescope();

  //Original state for server time
	const [serverTime, setServerTime] = useState(null);
	
  //Modify `useEffect` to fetch data only when logged in
  useEffect(() => {
    // This check ensures we only fetch data for authenticated users
    if (isAuthenticated) {
      const sessionToken = getSessionToken(); // Get the user's session token

      // Add the Authorization header to your fetch request
      fetch("http://localhost:3001/api/time", {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + sessionToken,
        }
      })
      .then(res => res.json())
      .then(data => setServerTime(data.currentTime))
      .catch(err => console.error("Error fetching time:", err));
    }
  }, [isAuthenticated]); // The effect now depends on the authentication status
  
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
      <div>
        {/* 4. Conditionally render content based on authentication status */}
        {!isAuthenticated && (
            <Descope
              flowId="sign-up-or-in"
              onSuccess={(e) => console.log(e.detail.user)}
              onError={(e) => console.log('Could not log in!')}
            />
        )}

        {(isSessionLoading || isUserLoading) && <p>Loading...</p>}

        {isAuthenticated && (
          <>
            <h1>Hello, {user.name}!</h1>
            <p>Welcome to Descope Auth Lab</p>
            <p>Server time: {serverTime ? serverTime : "Loading..."}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>  
    )
}


export default App
 
