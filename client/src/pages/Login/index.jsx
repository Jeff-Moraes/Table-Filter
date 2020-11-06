import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import validateUserLogin from '../../lib/validateUserLogin';

import { LoginContainer, LoginContent, Background } from './styles';

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
    <LoginContainer>
      <LoginContent>
      <h1 className="display-3">Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          value={username}
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        { errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button className="btn btn-outline-secondary" type="submit">login</button>
      </form>
      </LoginContent>
      <Background />
    </LoginContainer>
  )
}

export default Login
