import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import routes from './routes';

const App = () => (
  <Router>
    <Routes>
      <Route path={routes.loginPage()} element={<LoginPage />} />
      <Route path={routes.signupPage()} element={<SignupPage />} />
      <Route path={routes.mainPage()} element={<MainPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default App;
