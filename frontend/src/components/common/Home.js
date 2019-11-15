import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
<>
  <div>
    <Link to="/places"><h1>-CO.ORDINATE</h1></Link>
  </div>
  <div>
    <Link to='/register'><h2>Register</h2></Link>
  </div>
  <div>
    <Link to='/login'><h2>Login</h2></Link>
  </div>
  </>
)

export default Home