import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
// import axios from 'axios'



class Navbar extends React.Component {
  constructor() {
    super()
    this.state = { 
 
    }
    // this.toggleNavbar = this.toggleNavbar.bind(this)
    // this.handleLogout = this.handleLogout.bind(this)
  }




  // toggleNavbar() {
  //   this.setState({ navOpen: !this.state.navOpen })
  // }

  handleLogout() {
    Auth.logout() // removes user token from storage (function created in auth file )
    this.props.history.push('/')
  }


  // componentDidUpdate(prevProps) { // checks if the component has updated
  //   console.log('updated') // don't update state from here without an 'if' otherwise it will cause
  //   // an infinite loop

  //   // prevProps gets an object of the props on the previous render 

  //   if (this.props.location.pathname !== prevProps.location.pathname) // checks for a change and hides navbar when 
  //   // user navigates to a different page
  //     this.setState({ navOpen: false })
    
  // }

  render() {
    // console.log(this.state)
    return (
      <nav>
        <div>
          <div>
            <Link to="/">Home</Link>

            {/* <a 
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`} 
              onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            
            <div>
              <Link to="/places">Your Places</Link>
              <Link to="/places/new">Add to your map</Link>
              <Link to="/categories">Browse by Category</Link>
              {/* {Auth.isAuthenticated() && <Link className="navbar-item" to="/creatures/new">Add a new creature</Link>} */}
              {!Auth.isAuthenticated() && <Link to="/login">Login</Link>}
              {!Auth.isAuthenticated() && <Link to="/register">Sign Up</Link>}
              {Auth.isAuthenticated() && <p>You are logged in </p>}
              {!Auth.isAuthenticated() && <a onClick={this.handleLogout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }

}

export default withRouter(Navbar)