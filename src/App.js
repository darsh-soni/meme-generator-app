import React from "react";
import Header from "./components/Header";
import Heading from "./components/Heading";
import Form from "./components/Form";
import GeneratedMeme from "./components/GeneratedMeme";

import { Container, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  containerPadding: {
    paddingTop: theme.spacing(4),
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column"
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Container maxWidth="sm" className={classes.containerPadding}>
          <Switch>
            <Route exact path="/">
              <Heading title="MEME MAKER" />
              <Form />
            </Route>
            <Route path="/generated">
              <Heading title="DOWNLOAD MEME" />
              <GeneratedMeme />
            </Route>
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default App;
