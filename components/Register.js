import fetch from 'isomorphic-unfetch';
import Input from './Input';

export default class Register extends React.Component {
  constructor () {
    super();
    this.state = {
      disabled: false,
      error: false,
      buttonText: 'Register',
      errorMessage: 'There was an error'
    };
    this.submitUserData = this.submitUserData.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  submitUserData (e) {
    e.preventDefault();
    const self = this;
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
      .then(data => self.handleData(data))
      .catch(errors => self.handleErrors());
  }

  handleData (data) {
    this.setState({
      disabled: true,
      button: data.message
    });
    console.log(data.user);
  }

  handleErrors () {
    console.log('There was an error...');
  }

  render () {
    return (
      <div className="container">
        <form className="form" onSubmit={this.submitUserData}>
          <Input label="Name" name="name" type="text" placeholder="Enter your name" />
          <Input label="Email" name="email" type="email" placeholder="Enter your email" />
          <Input label="Username" name="username" type="text" placeholder="Enter your desired username" />
          <Input label="Password" name="password" type="password" placeholder="Enter your password" />
          <Input label="Confirm password" name="password2" type="password" placeholder="Confirm password" />
          <input
            className="submit"
            type="submit"
            defaultValue={this.state.buttonText}
            disabled={this.state.disabled}
          />
        </form>
        <style jsx>{`
          .container {
            width: 400px;
          }

          .form {
            display: flex;
            flex-direction: column;
          }

          .submit {
            border: 1px solid #ccc;
            cursor: pointer;
            font-size: 16px;
            padding: 8px;
          }

          .submit:hover {
            background: #ccc;
            color: #fff;
          }

        `}</style>
      </div>
    );
  }
}
