import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage/ErrorPage';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import { UserProvider } from '../context/context';

function App() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={token ? <MainPage /> : <LoginPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;