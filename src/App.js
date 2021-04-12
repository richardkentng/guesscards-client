import { Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'

import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SetShow from './pages/SetShow'
import SetContainer from './pages/SetContainer'


import './css/style.css'

toast.configure()
function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/sets/:id" component={SetShow}/>
        <Route path="/sets" component={SetContainer}/>
      </Switch>
    </div>
  );
}

export default App;
