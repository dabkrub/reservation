import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Home from './pages/home';
import Contact from './pages/contact';
import Faq from './pages/faq';
import Login from './pages/login';
import Reserve from './pages/reserve';
import Err from './pages/err';
import Navbar from './components/Navbar'
import History from './pages/history';
import { useState } from 'react';
import PrivateRoute from 'react-private-route';
import Reservehome from './pages/reservehome';
function App() {
  const [userLogin,setStatus] = useState(false);
  return (
    <div className="center">
      <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/faq" component={Faq}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/reserve" component={Reservehome}/>
          <Route exact path="/reserve/history" component={History}/>
          <Route exact path="/reserve/reserve" component={Reserve}></Route>
          <Route component={Err}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
