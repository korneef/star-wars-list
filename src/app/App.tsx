import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage, Peoples, Favorites, Person } from 'pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route>
          <Route path="peoples" element={ <Peoples/> }/>
          <Route path="peoples/page/:page" element={ <Peoples/> }/>
          <Route path="peoples/:id" element={ <Person/> }/>
          <Route path="favorites" element={ <Favorites/> }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
