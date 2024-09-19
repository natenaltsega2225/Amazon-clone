import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import { DataProvider } from './Components/DataProvider/DataProvider';
import { initialState, reducer } from './Utility/reducer';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </React.StrictMode>
);
