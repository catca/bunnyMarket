import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import MainPage from "./views/MainPage/MainPage.js";
// import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import ProductRegisterPage from './views/ProductPage/ProductRegisterPage/ProductRegisterPage';
import ProductDetailPage from './views/ProductPage/ProductDetailPage/ProductDetailPage';
import ProductManagePage from './views/ProductPage/ProductManagePage/ProductManagePage';
import ProductCategoryPage from './views/ProductPage/ProductCategoryPage/ProductCategoryPage';
import SearchPage from './views/SearchPage/SearchPage';
import ShopPage from './views/ShopPage/ShopPage';
// import PrivateRoute from '../hoc/PrivateRoute';
// import SuperRoute from '../hoc/SuperRoute';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar />
                <div style={{ paddingTop: '190px', minHeight: 'calc(100vh - 190px)' }}>
                    <Switch>
                        <Route exact path="/" component={Auth(MainPage, null)} />
                        {/* <Route path="/login" component={Auth(LoginPage, null)} /> */}
                        <Route path="/register" component={Auth(RegisterPage, null)} />
                        <Route path="/products/new" component={ProductRegisterPage} />
                        <Route path="/products/manage" component={ProductManagePage} />
                        <Route path="/shop/:userId/product" component={ShopPage} />
                        <Route path="/shop/:userId/favorite" component={ShopPage} />
                        <Route path="/products/:productId" component={Auth(ProductDetailPage, null)} />
                        <Route path="/categories/:categoryId" component={Auth(ProductCategoryPage, null)} />
                        <Route path="/search/products" component={SearchPage} />
                    </Switch>
                </div>
                <Footer />
        </Suspense>
    );
}

export default App;
