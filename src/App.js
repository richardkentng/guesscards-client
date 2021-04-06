import {Switch, Route} from 'react-router-dom'

import Signup from './pages/Signup'


function App() {
  return (
    <div>
      hi there. im the app component
      <Switch>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;
