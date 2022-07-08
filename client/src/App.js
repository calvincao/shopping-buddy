import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Error from './pages/Error.jsx';
import SharedLayout from './pages/SharedLayout.jsx';
import Home from './pages/Home.jsx';
import Test from './pages/Test.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="*" exact element={<Error />} />
        </Route>
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
