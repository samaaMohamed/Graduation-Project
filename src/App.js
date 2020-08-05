import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "globals/routes";
// import { darkThemePonyfill, lightThemePonyfill } from "globals/cssVarsPonyfill";

import Layout from "shared/layout";

class App extends React.Component {
  renderSingleRoute = (key, path, component) => (
    <Route key={`route${key}`} exact path={path} component={component} />
  );

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            {routes.map((route, index) =>
              this.renderSingleRoute(index, route.path, route.component)
            )}
            <Redirect from="*" to="/404" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
