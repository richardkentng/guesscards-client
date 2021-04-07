import {Switch, Route} from 'react-router-dom'

import Signup from './pages/Signup'
import SetContainer from './pages/SetContainer'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/sets" component={SetContainer}/>
      </Switch>
    </div>
  );
}

export default App;
