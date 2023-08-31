import React from 'react';
import CartesianTree from './components/CartesianTree';
import './App.css';
import flare from './flare.json';

const treeData = flare

function App() {
  return (
    <div className="App">
      <CartesianTree data={treeData} />
    </div>
  );
}

export default App;
