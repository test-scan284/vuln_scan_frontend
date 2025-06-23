import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ResetPassword } from './pages/auth/ResetPassword';
import { ResetPasswordConfirmation } from './pages/auth/ResetPasswordConfirmation';
import { Home } from './pages/Home';
import { Select } from './pages/Sast';
import { DAST } from './pages/DAST';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AboutDAST } from './pages/AboutDAST';
import { Dashboard } from './pages/Dashboard'; // Added Dashboard import
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import FreePlan from './pages/FreePlan';
import Paid_Page from './pages/Paid_Page';
import { PaidInput } from './pages/PaidInput';
import Chatbot from './components/chatbot/chatbot';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Chatbot />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/confirmation" element={<ResetPasswordConfirmation />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dast"
              element={
                <ProtectedRoute>
                  <DAST />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-dast"
              element={
                <ProtectedRoute>
                  <AboutDAST />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sast"
              element={
                <ProtectedRoute>
                  <Select />
                </ProtectedRoute>
              }
            />
            <Route
              path="/free-plan"
              element={
                <ProtectedRoute>
                  <FreePlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paid-plan"
              element={
                <ProtectedRoute>
                  <PaidInput />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Paid_Page"
              element={
                <ProtectedRoute>
                  <Paid_Page />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;