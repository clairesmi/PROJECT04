import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <div>
      <Link to="/places" style={{ textDecoration: 'none' }}><h1 className="title">-CO.ORDINATE</h1></Link>
    </div>
    <div className="container">
      <div className="columns">
        <h2 className="column col-12 col-sm-12">
    Map your to-go list
        </h2>
        <div className="column col-6 col-sm-6">
          <Link to='/register' style={{ textDecoration: 'none' }}><h3 className="homepage-buttons">Sign Up</h3></Link>
        </div>
        <div className="column col-6 col-sm-6">
          <Link to='/login' style={{ textDecoration: 'none' }}><h3 className="homepage-buttons">Login</h3></Link>
        </div>
      </div>
    </div>
    </>
)

export default Home