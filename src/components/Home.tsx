import React, { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Home = () => {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <div>{isLoggedIn ? <h1>Welcome Home!</h1> : <p>Please log in to access the homepage.</p>}</div>
  );
};

export default Home;
