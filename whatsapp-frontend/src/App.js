import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";


function App() {

  const [userLoggedIn, setUserLoggedIn] = useState();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  
  function submit(e){
    if(name!=="" && mobileNo!==""){
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }

  return (
    <div className="app">
      { !userLoggedIn
        ?
        <div className="app__login">
          <img className="app__img" alt="avatar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"></img>
          <h1>SignIn into Whatsapp</h1>
          <form>
            <input type="text" placeholder="Enter Full Name" value={name} onChange={e=>setName(e.target.value)} required></input>
            <input type="text" placeholder="Enter Mobile Number" value={mobileNo} onChange={e=>setMobileNo(e.target.value)} required></input>
            <button onClick={submit}>Login</button>
          </form>
        </div>
        :
        <div className="app__body">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId/">
              <Chat name={name}/>
            </Route>
            <Route path="/">
            <div className="app__bodyimg">
            <img className="app__bodyimg" alt="avatar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/766px-WhatsApp.svg.png"></img>
            </div>
            </Route>
          </Switch>
        </Router>
      </div>
      }
      
    </div>
  );
}

export default App;
