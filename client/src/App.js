import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartPage from './pages/StartPage/StartPage';
import './pages/_GlobalStyle/style.scss'

function App() {
  // Redirecting user in paths
  // Path 'ADRESS/' gets StartPage (Info page)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={StartPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
