import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/common/Home'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Navbar from './components/common/Navbar'
import PlacesIndex from './components/places/PlacesIndex'
import PlacesShow from './components/places/PlacesShow'
import PlacesNew from './components/places/PlacesNew'
import PlacesEdit from './components/places/PlacesEdit'

import CategoriesIndex from './components/categories/CategoriesIndex'
import CategoriesShow from './components/categories/CategoriesShow'

import 'spectre.css'
import '../src/styles/style.scss'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path ='/places/new' component={PlacesNew}/>
          <Route path ='/places/:id/edit' component={PlacesEdit}/>
          <Route path ='/places/:id' component={PlacesShow}/>
          <Route path='/places' component={PlacesIndex} />

          <Route path='/categories' component={CategoriesIndex} />
          <Route path='/categories/:id' component={CategoriesShow} />

          <Route path ='/register' component={Register}/>
          <Route path ='/login' component={Login}/>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)