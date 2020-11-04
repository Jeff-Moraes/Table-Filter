import React, { useState } from 'react';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleLoginSubmit = event => {
    event.preventDefault();
    console.log(username, password);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password" />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
