import { UserProvider } from './context/UserContext';
import HomePage from './components/HomePage';
import './App.css'

function App() {
  return (
    <UserProvider>
      <div className="App">
        <HomePage />
      </div>
    </UserProvider>
  );
}

export default App;
