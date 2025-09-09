const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

// 1. Import the Descope Node SDK
// Note: We use .default because the SDK is an ES Module
const DescopeClient = require('@descope/node-sdk');

app.use(cors());
app.use(express.json());

// 2. Initialize the Descope Client with your Project ID
let descopeClient;
try {
  descopeClient = DescopeClient({ projectId: 'P32Q8fxZ2F3jwhh2hJl7fUjwmdWc' });
  console.log("Descope client initialized successfully.");
} catch (error) {
  console.log("Failed to initialize Descope client: " + error);
}

app.get('/', (req, res) => {
res.send('Hello from Node server!');
});

app.get('/api/greet', (req, res) => {
res.json({ message: 'Hello API' });
});

// 4. Protect the `/api/time` route
app.get('/api/time', async (req, res) => {
  // Get the session token from the Authorization header 
  const authHeader = req.headers.authorization;
  const sessionToken = authHeader?.split(' ')[1];

  if (!sessionToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Use the SDK to validate the session token 
    const authInfo = await descopeClient.validateSession(sessionToken);
    console.log("Successfully validated user session:", authInfo);

    // If validation is successful, execute the original logic
    const now = new Date();
    res.json({ currentTime: now.toISOString() });

  } catch (error) {
    console.log("Could not validate user session: " + error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});



