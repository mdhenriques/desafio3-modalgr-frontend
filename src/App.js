import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import RegistrationForm from './components/RegistrationForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/registro" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
