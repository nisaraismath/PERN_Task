import React from 'react';
import Form from './form/form';
import Dashboard from './dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import Editpage from './editpage/editpage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addEmployee" element={<Form />} />
        <Route path="/editEmployee/:id" element={<Editpage />} />
      </Routes>
    </div>
  );
}

export default App;
