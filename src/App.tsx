import './App.css';
import Profile from './pages/profile/Profile';
import MainPage from './pages/main/MainPage';
import NavigationBar from './components/navigationBar/NavigationBar';
import NavigationItem from './components/navigationBar/NavigationItem';

function App() {
  return (
    <div className="app">
      <NavigationBar title='Jorge Moreira' link='#profile'>
        <NavigationItem name='Work Experiences' link='#work_experiences' />
        <NavigationItem name='Education' link='#education' />
        <NavigationItem name='Software Skills' link='#software_skills' />
        <NavigationItem name='Personal Skills' link='#personal_skills' />
        <NavigationItem name='Interests & Hobbies' link='#interests_hobbies' />
      </NavigationBar>
      <header className="app-header">
        <Profile />
      </header>
      <MainPage />
      <footer>

      </footer>
    </div>
  );
}

export default App;