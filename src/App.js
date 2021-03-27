import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from "styled-components"
import Header from './Components/Header'
import Sidebar from "./Components/Sidebar"
import Chat from "./Components/Chat"
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user ,loading] = useAuthState(auth)

  if(loading)
  {
    return(
      <AppLoading>
      <ApploadingContainer>
       <img src='data:image/png;base64,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' alt="Logo"/>
       <Spinner name="three-bounce" color='red' fadeIn='none' />
      </ApploadingContainer>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
      {!user?(
        <Login/>
      ):(
        <>
        <Header />
        <AppBody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              <Chat/>
            </Route>
          </Switch>
        </AppBody>
      </>
      )}

       
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
display:flex;
height:100vh;
`;

const AppLoading = styled.div`
display:grid;
place-items:center;
height:100vh;
width:100%;
`;

const ApploadingContainer = styled.div`
text-align:center;
padding-bottom:100px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

>img{
  height:100px;
  padding:20px;
  margin-bottom:40px;
}
`;