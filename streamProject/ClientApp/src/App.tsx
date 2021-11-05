import React from "react";
import './App.css';
import
{
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider, } from 'react-redux';
import Login from './Login/indexLogin'
import HomePage from './HomePage/indexHome'
import WinePage from './Wine/indexWine'
import { PersistGate } from 'redux-persist/integration/react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialState } from "./redux/initialState";
const { store, persistor } = configureStore(initialState);


const App: React.FC = () =>
{


    return (
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <div className="App-header">
                        <ToastContainer />
                        <Switch>
                            <PrivateRoute exact path="/Homepage">
                                <HomePage />
                            </PrivateRoute>
                            <PrivateRoute exact path="/Wine">
                                <WinePage />
                            </PrivateRoute>
                            <Route path="/">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </PersistGate>
        </ReduxProvider>
    );

}

function PrivateRoute({ children , ...rest }:any)
{

    return (
        <Route
            {...rest}
            render={({ location }) =>
                store.getState().Login && store.getState().Login.Username ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;