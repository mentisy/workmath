import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Clips from "./pages/Clips";
import Nav from "./pages/Nav";
import Fixtures from "./pages/Fixtures";
import { useTranslation } from "react-i18next";

function App(): JSX.Element {
    const { t } = useTranslation();

    return (
        <main>
            <Router basename="/math">
                <header>
                    <h1>
                        <Link to="/">{t("Work Math")}</Link>
                    </h1>
                </header>
                <Switch>
                    <Route path="/" exact>
                        <Nav />
                    </Route>
                    <Route path="/clips">
                        <Clips />
                    </Route>
                    <Route path="/fixtures">
                        <Fixtures />
                    </Route>
                </Switch>
            </Router>
        </main>
    );
}

export default App;
