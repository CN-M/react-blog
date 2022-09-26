import TopBar from "./components/topbar/TopBar";
import Show from "./components/show/Show";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <TopBar />
          <Show />
        </div>
      </Router>
    </>
  );
}

export default App;