import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { UserContextProvider } from './context/context';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Router>
            <ToastContainer />
        </UserContextProvider>
    );
}

export default App;