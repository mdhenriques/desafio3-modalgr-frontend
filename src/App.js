import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import RegistrationForm from './components/RegistrationForm';
import Feed from './components/Feed';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const token = sessionStorage.getItem("jwtToken");
  console.log(token);
  return token ? <>{children}</> : <Navigate to="/signup" replace/>
}


function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
