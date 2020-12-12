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
function App() {
  return (
    <div className="center">
      <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/faq" component={Faq}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/reserve" component={Reserve}/>
          <Route exact path="/reserve/history" component={History}/>
          <Route component={Err}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
