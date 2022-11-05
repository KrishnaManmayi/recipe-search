import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import AdvancedSearch from "./components/AdvancedSearch";
import RecipePage from "./components/RecipePage";

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" exact={true}>
                    <Home />
                </Route>
                <Route path="/advancedSearch">
                    <AdvancedSearch />
                </Route>
                <Route path="/recipe">
                    <RecipePage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
