import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'


class Login extends React.Component {
  constructor() {
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
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/places')
      })
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    return (
      <>
        <h2 className="login-title">Login</h2>
        <section className="form-wrapper">
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    required="required"
                  />
                </div>
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </section>
      </>
    )
  }
  
}


export default Login

