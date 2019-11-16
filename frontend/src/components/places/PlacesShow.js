import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class PlacesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      place: null,
      text: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const placeId = this.props.match.params.id
    // console.log(placeId)
    axios.get(`/api/places/${placeId}`)
      .then(res => this.setState({ place: res.data }))
      .catch(err => console.log(err))
  }

  isOwner() { 
    // return Auth.getPayload().sub === this.state.place.user.id
  }

  handleDelete(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.delete(`/api/places/${placeId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/places'))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.place) return null
    const { place } = this.state
    console.log(place)
    return (
      <div>
        <h1>{place.name}</h1>
        <div>
          <img src={place.image} alt={place.name}/>
          {place.description}
        </div>
        <div>
          <h2>Categories</h2>
          {place.categories.map(cat => 
            <p key={cat.id}>{cat.name}</p>
          )}
        </div>
        <div>
          <h3>Discuss</h3>
          {place.comments.map(com => 
            <p key={com.id}>{com.text}</p>
          )}
        </div>
        <div>
          <h3>Liked by</h3>
          {place.users.map(user => 
            <p key={user.id}>{user.username}
              <img src={user.profile_image} alt={user.username}/>
            </p>
          )}
        </div>
        
        <>
          <Link to={`/places/${place.id}/edit`}><button>Edit Your Place</button></Link>
          <button className="delete-place" onClick={this.handleDelete}>Delete Your Place</button>
        </>
      </div>
    )
  }
}

export default PlacesShow