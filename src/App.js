import logo from './logo.svg';
import './App.css';
import { useState } from "react"
import SearchComponent from './components/search/SearchComponent';

function App() {
  return (
    <div className="bcontainer">
      <SearchComponent />
    </div>
  );
}

export default App;
