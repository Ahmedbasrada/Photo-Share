import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { SignUp } from './componets';
import Login from './pages/login/login';
import Home from './pages/Home';
import SignUp from './pages/signUp/signUp';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Route exact path='/login' Component={Login} />
      <Route exact path='/signUp' Component={SignUp} />
      <Route exact path='/home' Component={Home} />
    </Router>
        <div id='redBox'>نعتذر, لم يتم بناء التطبيق ليعمل على الأجهزة الصغيرة</div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
