import React from 'react';
import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Erreur from './pages/Erreur/Erreur.jsx';
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // A changer to false une fois le auth en place // 

  return (
    <Router 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }} >

    <Header/>
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Erreur />} />
      </Routes>
      <Footer />
      </Router>
  )
}

export default App
