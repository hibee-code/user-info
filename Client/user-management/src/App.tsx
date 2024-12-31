import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import MultiStepForm from './components/multiStepsForm';
import UserForm from './pages/UserForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
            <Route
              path="/multi-step-form"
              element={
                <div className="flex items-center justify-center h-full">
                  <MultiStepForm />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
