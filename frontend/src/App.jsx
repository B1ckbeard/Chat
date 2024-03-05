import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './context/context';

function App() {
    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Router>
        </UserContextProvider>
    );
}

export default App;