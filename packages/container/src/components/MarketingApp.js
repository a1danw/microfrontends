// the mount function takes in a reference to the html element and then displays some content inside it
// we cant directly use the mount function inside of the component
// mount function is not a react component, its a simple function that takes in a reference to an html element
// we dont want to assume that an app is using a particular framework as this will break the rules of loose coupling, which is wh were not importing/exporting an actual component
// import {MarketingReactComponent} - this will break the rules of loose coupling
// if we make a change in the component we would have to make chages in the container which we dont want
import { mount } from "marketing/MarketingApp"; // get remote js file
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

// we can use the below approach with any other framework
export default () => {
  // console.log(mount);
  // ƒ mount(el, _ref) {
  //   var onNavigate = _ref.onNavigate,
  //       defaultHistory = _ref.defaultHistory,
  //       initialPath = _ref.initialPath;
  //   var history = defaultHistory || (0,history__WEBPACK_IMPORTED_…
  const ref = useRef(null); // reference to html element we want to mount/render
  const history = useHistory();

  // provide the reference to the mount function
  useEffect(() => {
    // mount(ref.current) // passing reference to the below html element into the mount function
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
