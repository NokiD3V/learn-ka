import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartPage from './pages/StartPage/StartPage';
import './pages/_GlobalStyle/style.scss'
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RequireAuth from './utilities/RequireAuth/RequireAuth';
import FirstGame from './pages/FirstGame/FirstGame';
import GamesPage from './pages/Games/GamesPage';
import Leaders from './pages/Leaders/Leaders';


function App() {
  // Redirecting user in paths
  // Path 'ADRESS/' gets StartPage (Info page)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={StartPage}/>
        <Route path='/login' Component={LoginPage}  />
        <Route path='/profile' Component={() => <RequireAuth><ProfilePage/></RequireAuth>}/>
        <Route path='/register' Component={RegisterPage} />
        <Route path='/writecorrect' Component={() => <RequireAuth><FirstGame/></RequireAuth>}/>
        <Route path='/games' Component={() => <RequireAuth><GamesPage/></RequireAuth>}/>
        <Route path='/leaders' Component={() => <RequireAuth><Leaders/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
