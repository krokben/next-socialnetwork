import fetch from 'isomorphic-unfetch';

function submitUserData (e) {
  e.preventDefault();
  fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      password2: e.target.password2.value
    })
  })
    .then(response => response.json())
    .then(data => handleData(data))
    .catch(errors => handleErrors());
}

function handleData (data) {
  console.log(data.message);
  console.log(data.user);
}

function handleErrors () {
  console.log('There was an error...');
}

const Register = () => (
  <div className="container">
    <form className="form" onSubmit={submitUserData}>
      <label className="label">
        Name:
        <input
          name="name"
          className="input"
          type="text"
          placeholder="Enter your name"
        />
      </label>
      <label className="label">
        Email:
        <input
          name="email"
          className="input"
          type="email"
          placeholder="Enter your email"
        />
      </label>
      <label className="label">
        Username:
        <input
          name="username"
          className="input"
          type="text"
          placeholder="Enter your desired username"
        />
      </label>
      <label className="label">
        Password:
        <input
          name="password"
          className="input"
          type="password"
          placeholder="Enter desired password"
        />
      </label>
      <label className="label">
        Confirm Password:
        <input
          name="password2"
          className="input"
          type="password"
          placeholder="Confirm entered password"
        />
      </label>
      <input className="submit" type="submit" defaultValue="Register" />
    </form>
    <style jsx>{`
      .container {
        width: 400px;
      }

      .form {
        display: flex;
        flex-direction: column;
      }

      .label {
        display: flex;
        flex-direction: column;
        margin-bottom: 8px;
      }

      .input {
        font-size: 16px;
        padding: 8px;
      }

      .submit {
        font-size: 16px;
      }

    `}</style>
  </div>
);

export default Register;
