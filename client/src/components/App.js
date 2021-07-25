import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import MainPage from "./views/MainPage/MainPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import ProductRegisterPage from './views/ProductPage/ProductRegisterPage';
// import PrivateRoute from '../hoc/PrivateRoute';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '180px', minHeight: 'calc(100vh - 180px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(MainPage, null)} />
          <Route path="/partner" component={MainPage} />
          <Route path="/post" component={MainPage} />
          <Route path="/feed" component={MainPage} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/products/new" component={ProductRegisterPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
