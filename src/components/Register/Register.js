import { useState } from 'react';
async function createUser(credentials) {
  return fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    
}
export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit= async e => {
      e.preventDefault();
      const data= await createUser({
        username,
        password
      });
      console.log(data.isSaved)
      if(data.isSaved===false){
        setSubmitted(false)
        setError(true);
      }
      else{
        setSubmitted(true);
        setError(false);
      }
  }
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User successfully registered</h1>
      </div>
    );
  };
 
  const errorMessage = () => {

    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>User registration failed</h1>
      </div>
    );
  };
  return (
    <div className="login-wrapper">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
              <div>
              {successMessage()}
              {errorMessage()}
              </div>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
  );
}