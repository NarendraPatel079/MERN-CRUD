import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./Components/Navbar";
import Authenticate from "./Components/Authenticate";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import AllUsers from "./Components/AllUsers";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";
import NotFound from "./Components/NotFound";
import { isLoggedIn } from './Helpers/CommonHelpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

require('dotenv').config();
//console.log(process.env.DEFAULT_ERROR_MESSAGE);

toast.configure();

function App() {
  window.notify = (message, type = '') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'warning') {
      toast.warn(message);
    } else if (type === 'info') {
      toast.info(message);
    } else if (type === 'dark') {
      toast.dark(message);
    } else {
      toast(message);
    }
  }
  window.isLoggedIn = isLoggedIn();
  //console.log("isLoggedIn = " + window.isLoggedIn);
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add" component={AddUser} />
        {
          window.isLoggedIn
          ?
            <Route exact path="/all">
              <Authenticate cmp={AllUsers} />
            </Route>
          :
            ''
        }
        {
          window.isLoggedIn
          ?
            <Route exact path="/edit/:id">
              <Authenticate cmp={EditUser} />
            </Route>
          :
            ''
        }
        {
          window.isLoggedIn
          ?
            <Route exact path="/logout" component={Logout} />
          :
            <Route exact path="/login" component={Login} />
        }
        <Route component={NotFound} />
      </Switch>
      <ToastContainer pauseOnHover={true} />
    </BrowserRouter>
  );
}

export default App;