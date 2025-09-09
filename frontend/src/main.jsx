//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'

//createRoot(document.getElementById('root')).render(
//  <StrictMode>
//    <App />
//  </StrictMode>,
//)

import React from 'react';
import ReactDOM from 'react-dom/client';
// Add this line to import the Descope provider
import { AuthProvider } from '@descope/react-sdk';
import App from './App';

// Creating a original createRoot call using ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Modify the render method to include AuthProvider
root.render(
    <React.StrictMode>
        <AuthProvider projectId='P32Q8fxZ2F3jwhh2hJl7fUjwmdWc'>
            <App />
        </AuthProvider>
    </React.StrictMode>
);