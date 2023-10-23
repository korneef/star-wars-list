import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage, Peoples, Favorites, Person, HeaderLayout } from 'pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route element={ <HeaderLayout/> }>
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
