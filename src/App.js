import {Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'

import Signup from './pages/Signup'
import SetContainer from './pages/SetContainer'

import './style.css'

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/sets" component={SetContainer}/>
      </Switch>
    </div>
  );
}

export default App;
