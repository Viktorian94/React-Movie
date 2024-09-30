import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Movies from './pages/Movies';
import Login from './pages/Login';
import Header from './components/Header';
import Register from './pages/SignUp';

function App() {
  const isAuthorized = localStorage.getItem('isAuthorized') === 'true';

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isAuthorized ? <Navigate to="/movies" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthorized ? <Navigate to="/movies" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthorized ? <Navigate to="/movies" /> : <Register />}
        />
        <Route
          path="/movies"
          element={isAuthorized ? <Movies /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
