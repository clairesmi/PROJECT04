import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
// import axios from 'axios'
import 'spectre.css'



class Navbar extends React.Component {
  constructor() {
    super()
    this.state = { 
 
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }




  toggleNavbar() {
    this.setState({ navOpen: !this.state.navOpen })
  }

  handleLogout() {
    Auth.logout() // removes user token from storage (function created in auth file )
    this.props.history.push('/')
  }


  componentDidUpdate(prevProps) { // checks if the component has updated
    // console.log('updated') // don't update state from here without an 'if' otherwise it will cause
    // an infinite loop

    // prevProps gets an object of the props on the previous render 

    if (this.props.location.pathname !== prevProps.location.pathname) // checks for a change and hides navbar when 
    // user navigates to a different page
      this.setState({ navOpen: false })
    
  }

  render() {
    // console.log(this.state)
    return (
      <header className="navbar">
        {/* 
            <a 
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`} 
              onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
        {/* <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}> */}
            
        <section className="navbar-section">
          <Link to="/" className="navbar-brand mr-2">-CO.ORDINATE</Link>
          <Link to="/places" className="btn btn-link">Your Places</Link>
          <Link to="/categories" className="btn btn-link">Browse by Category</Link>
          {Auth.isAuthenticated() && <Link className="btn btn-link" to="/places/new">Add a place</Link>}
          {!Auth.isAuthenticated() && <Link to="/login" className="btn btn-link">Login</Link>}
          {!Auth.isAuthenticated() && <Link to="/register" className="btn btn-link">Sign Up</Link>}
        </section>
        <section className="navbar-section">
          <div className="input-group input-inline">
            {Auth.isAuthenticated() && <p className="logged-in">YOU ARE LOGGED IN </p>}
            {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="btn btn-link">Logout</a>}
          </div>
        </section>

      </header>
    )
  }

}

export default withRouter(Navbar)