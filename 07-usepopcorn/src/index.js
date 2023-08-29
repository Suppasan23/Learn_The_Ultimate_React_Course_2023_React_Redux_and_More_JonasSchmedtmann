import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';

import StarRating from './StarRating';


////////////////////////////// index.js ← [App.js]        //////////////////////////////
//////////////////////////////          ← [StarRating.js] //////////////////////////////
//////////////////////////////          ← [Test.js]       //////////////////////////////
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating maxRating={10} messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}/>
    <StarRating maxRating={10} size={24} color="red" className="test"  defaultRating={5}/>
    <Test/>
  </React.StrictMode>
);


////////////////////////////// Test ← [StarRating.js] //////////////////////////////
function Test() {

  return (
    <div>
      <StarRating maxRating={10} color="blue" />
    </div>
  )
}
