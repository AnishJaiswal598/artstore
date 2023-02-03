import * as React from 'react';
// import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { GoogleLoginButton } from 'react-social-login-buttons';

function App() {
  return (
    <>
      <Button variant="contained">Hello World</Button>;
      <Button variant="text mx=5">Text</Button>
      <Button variant="contained mx=5">Contained</Button>
      <Button variant="outlined mx=5">Outlined</Button>
      <GoogleLoginButton></GoogleLoginButton>
    </>
  );
}

export default App;
