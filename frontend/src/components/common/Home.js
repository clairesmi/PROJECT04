import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <div className="main-home-wrapper" style={{ textDecoration: 'none' }}>
      <h1 className="title col-12 col-sm-12" style={{ textDecoration: 'none' }}>
        <Link to="/places" style={{ textDecoration: 'none' }}>
          -CO.ORDINATE
        </Link>
      </h1>
      <h2 className="column col-12 col-sm-12">
    Map your to-go list
      </h2>
    </div>
    <div className="container">
      <div className="columns">
    
        <div className="buttons-column col-6 col-sm-12">
          <Link to='/register' style={{ textDecoration: 'none' }}><h3 className="homepage-buttons">Sign Up</h3></Link>
        </div>
        <div className="buttons-column col-6 col-sm-12">
          <Link to='/login' style={{ textDecoration: 'none' }}><h3 className="homepage-buttons">Login</h3></Link>
        </div>
      </div>
    </div>
    </>
)

export default Home