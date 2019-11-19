import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <div>
      <Link to="/places"><h1 className="animated pulse">-CO.ORDINATE</h1></Link>
    </div>
    <div className="container">
      <div className="columns">
        <h2 className="column col-6">
    Map your to - go list! 
        </h2>
        <div className="column">
          <Link to='/register'><h3>Register</h3></Link>
        </div>
        <div className="column">
          <Link to='/login'><h3>Login</h3></Link>
        </div>
      </div>
    </div>
    </>
)

export default Home