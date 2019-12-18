import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      data: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    // console.log(data)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('this is sending')
    axios.post('/api/register', this.state.data)
      .catch(err => console.log(err))
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    return (
      <>
      <h2 className="register-title">Sign Up</h2>
      <div className="form-wrapper">
        <div className="register-form">
          <form onSubmit={this.handleSubmit}>
      
            <div className="field">
              <div className="control">
                <input 
                  className="input"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  required="required"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input 
                  className="input"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  required="required"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input 
                  className="input"
                  id="password"
                  name="password"
                  type="password" // this hides the password input (turns into dots)
                  placeholder="Password"
                  onChange={this.handleChange}
                  required="required"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input 
                  className="input"
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Password Confirmation"
                  onChange={this.handleChange}
                  required="required"
                />
              </div>
            </div>
            <button type="submit" className="register-button">Submit</button>
          </form>
        </div>
      </div>
      </>
    )
  }
}

export default Register