import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import MultiStepForm from './components/multiStepsForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-6">User Management System</h1>
        <Switch>
          {/* Home page with a list of users */}
          <Route exact path="/" component={UserList} />

          {/* Page for adding a new user */}
          <Route path="/add-user" component={UserForm} />

          {/* Page for editing an existing user */}
          <Route path="/edit-user/:id" component={UserForm} />

          {/* Multi-step form for user data collection */}
          <Route
            path="/multi-step-form"
            component={() => (
              <div className="flex items-center justify-center h-full">
                <MultiStepForm />
              </div>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
