import logo from './logo.svg';
import './App.css';
import { useState } from "react"
import SearchComponent from './components/search/SearchComponent';
import { ContentStates } from './functions/common';

function App() {

  const [ response, setResponse ] = useState({
        contentState: ContentStates.unset,
        success: false, // Whether the response worked
        body: null, // actual server response
        error: '' // Used if there are any errors
  })

  return (
    <div className="bcontainer">
      <SearchComponent response={response} setResponse={setResponse}/>
    </div>
  );
}

export default App;
