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
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="loginPage">
        <section className="section">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <h2 className="title">Login</h2>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <input
                    className="input"
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="button is-fullwidth">Login</button>
            </form>
          </div>
        </section>
      </div>
    )
  }
  
}


export default Login
