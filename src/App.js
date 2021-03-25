import React from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './routes/index';
import './assets/css/style.css';

function App() {
  return (
    <div className="bg-p-alice-blue">
        <Main />
    </div>
  );
}

export default App;
