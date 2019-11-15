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
    console.log(data)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)

      .then(() => this.props.history.push('/login'))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <div className="registerForm">
        <section className="section">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <h2 className="title">Sign Up</h2>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <input 
                    className="input"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <input 
                    className="input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <input 
                    className="input"
                    id="password"
                    name="password"
                    type="password" // this hides the password input (turns into dots)
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <input 
                    className="input"
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="button is-fullwidth">Submit</button>
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default Register