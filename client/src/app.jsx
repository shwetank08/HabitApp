import React from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="flex flex-col">
      <Signin />
      <Signup />
    </div>
  );
};

export default App;
