import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

import PlacesComment from './PlacesComment'

class PlacesShow extends React.Component {
  constructor() {
    super()

    this.state = {
      place: null,
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
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

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.post(`/api/places/${placeId}/comments/`, { text: this.state.text }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ place: res.data, text: '' })
      })
      .catch(err => console.log(err))
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

  handleDeleteComment(e) {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.delete(`/api/places/${placeId}/comments/${e.target.value}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ places: res.data })

      })
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.place) return null
    const { place } = this.state
    // console.log(place)
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
          <h3>Notes to Self</h3>
          {place.comments.map(comment => 
            <div key={comment.id}>
              <p>{comment.text}</p>
              {/* {this.isOwner() &&  */}
              <button onClick={this.handleDeleteComment} value={comment.id}>Delete Comment</button>
              {/* } */}
            </div>
          )}
        </div>
        <div>
          <PlacesComment 
            place={place}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.text}
          />
        </div>
        
        <>
          <Link to={`/places/${place.id}/edit`}><button>Edit {place.name}</button></Link>
          <button className="delete-place" onClick={this.handleDelete}>Delete {place.name}</button>
        </>
      </div>
    )
  }
}

export default PlacesShow