
import './App.css';

import {HashRouter as Router, Switch, Route} from 'react-router-dom' 
import Home  from './Pages/InitialPage'
import LoginPage from './Pages/SignPage/login';
import Form from './Components/SignUpForm/Form';
import HomeRoutes  from './Pages/HomePage';
import Routes from './Pages/EventsPage';
import CreateR from './Pages/CreateEventPage';
import Events from './Pages/JoinEventPage';
import SavedRoutes from './Pages/EventListPage';
import ProfileP from './Pages/ProfilePage';
import InstP from './Pages/InstitutionsPage';
import MyEvents from './Pages/MyEventsPage';
import Prizes from './Pages/PrizesPage';
import VCompanions from './Pages/CompanionsPage';


function App() {
  return (
    <Router>
    <Switch> 
     <Route path="/" component={Home}  exact />
     <Route path="/login" component={LoginPage}  exact />
     <Route path="/signup" component={Form} exact/>
     <Route path="/home" component={HomeRoutes}  exact />
     <Route path="/events" component={Routes}  exact />
     <Route path="/createEvent" component={CreateR}  exact />
     <Route path="/joinEvent" component={Events}  exact />
     <Route path="/eventList" component={SavedRoutes}  exact />
     <Route path="/profile" component={ProfileP}  exact />
     <Route path="/myEvents" component={MyEvents}  exact />
     <Route path="/companions" component={VCompanions}  exact />
     <Route path="/institutions" component={InstP}  exact />
     <Route path="/prizes" component={Prizes}  exact />

   
     
   
    </Switch>
    </Router> 
  );
}

export default App;
