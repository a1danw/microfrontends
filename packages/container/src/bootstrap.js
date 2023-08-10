// React App to be used for the container
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

// we dont need to use mount like with the container
// container doesnt need a mount function
// whenever the container app is to be shown in the browser, we always want the container to show immediately
// its only sub projects that need some kind of mount function or render themselves conditionally depending on wherever we are in development
