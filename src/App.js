import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={LandingPage} element={LandingPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
