import React, { useState } from 'react';
import { setUserSession } from '../../utils/common';

function LoginPage(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const API = "https://localhost:5001/api/Jewelery/UserLogin";

  const handleLogin = () => {

    setError(null);
    setLoading(true);
    const request ={
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({UserName: username.value,password: password.value})
    }

    fetch(API,request).then(res => res.json())
    .then(data => {
            setLoading(false);
            setUserSession(data);
      props.history.push('/estimate');
    })
    .catch(error => {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <small style={{ color: 'red' }}>{error}</small><br /><br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }  
export default LoginPage;