import React, { useState, useEffect } from "react";
// import "./styles.css";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Switch, Route } from "react-router";
import PopularJSRepos from "./PopularJSRepos";
import SearchUsers from "./SearchUsers";
import NavigateWithArrows from "./NavigateWithArrows";
import axios from "axios"

export default function App() {

  const [repos, setRepos ] = useState([])
  useEffect(() => {
    axios
      .get("https://api.github.com/search/repositories?q=language:javascript&sort=stars")
      .then((res) => res.data.items)
      .then((repos) => setRepos(repos))
      .catch((err) => {
        console.error(err.response.data);
      });
  }, [])

  return (
    <Router>
      <h1>This is the new github UI</h1>
      <NavigateWithArrows />
      <p>(you can navigate with your left/right keyboard arrows !)</p>
      <nav>
        <NavLink exact to="/">
          <span role="img" aria-label="arrow-left">
            ⬅️{" "}
          </span>
          Popular Repos
        </NavLink>
        <NavLink to="/search-user">
          Search Users
          <span role="img" aria-label="arrow-left">
            {" "}
            ➡️
          </span>
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/" component={PopularJSRepos} />
        <Route path="/search-user" component={SearchUsers} />
      </Switch>
    </Router>
  );
}
