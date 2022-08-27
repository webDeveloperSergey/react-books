import React from 'react'

import './scss/app.scss'

import Header from './components/Header';
import Home from './pages/Home';


function App() {

  return (
    <div className="App">

      <div className="container">
        <Header />
        <Home />
      </div>

    </div>
  );
}

export default App;
