import React from 'react';
import UserList from './pages/UserList';
import MultiStepForm from './components/multiStepsForm';


const App: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">User Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MultiStepForm />
        </div>
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default App;
