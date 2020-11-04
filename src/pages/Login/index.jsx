import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import validateUserLogin from '../../lib/validateUserLogin';

function Login({ setUser }) {
  const history = useHistory();

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await validateUserLogin(username, password);
      
      if(error) {
        setErrorMessage(error);
      } else {
        setUser(user);
        history.push('/table')
      }
    } catch (error) {
      console.log("error", error)
      setErrorMessage("Wrong credentials");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password" />
        { errorMessage && <p>{errorMessage}</p>}
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
