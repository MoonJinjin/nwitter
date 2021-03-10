import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import React from "react";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {isLoggedIn ? < Home /> : < Auth />}
                </Route>
            </Switch>
        </Router>
    )
};

export default AppRouter;