import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import StarRating from './StarRating';


////////////////////////////// index.js ← [App.js]        //////////////////////////////
//////////////////////////////          ← [StarRating.js] //////////////////////////////
//////////////////////////////          ← [Test.js]       //////////////////////////////
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

