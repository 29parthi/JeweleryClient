import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from '../src/components/pages/LoginPage';
import EstimationPage from '../src/components/pages/EstimationPage';
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
<Switch>
<Route exact path="/" component={LoginPage}/>
<Route path="/estimate" component={EstimationPage}/>
</Switch>
</BrowserRouter>
    </div>
  );
}

export default App;
