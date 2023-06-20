import './App.css';
import Header from './Header';
import Content from './Content';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [reload,setReload] = useState(false)
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login reload={reload} setReload={setReload} />} />
          <Route path="/home" element={<Content />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
