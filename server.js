const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json());
const dummyUser = { email: "test@example.com", password: "pass123" };
app.post('/api/login', (req, res) => {
	const { email, password } = req.body;
	if(email === dummyUser.email && password === dummyUser.password) {
		res.json({ message: "Login successful", token: "fake-jwt-token" });
	} else {
		res.status(401).json({ message: "Invalid credentials" });
	}
});

app.get('/', (req, res) => {
res.send('Hello from Node server!');
});

app.get('/api/greet', (req, res) => {
res.json({ message: 'Hello API' });
});

app.get('/api/time', (req, res) => {
const now = new Date();
res.json({ currentTime: now.toISOString() });
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});



