import Banner from './components/Banner';
import TextField from './components/TextField';

function App() {
  return (
    <div className="App">
      <Banner />      
      <TextField label="Username" placeholder="Enter your username..."/>
      <TextField label="Password" placeholder="Enter your password..."/>
    </div>
  );
}

export default App;
