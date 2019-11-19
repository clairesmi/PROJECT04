import React from 'react'
import axios from 'axios'
import CategoriesCard from './CategoriesCard'

class CategoriesIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      categoryChosen: 'All'

    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  filteredCategories() {
    const { categories, categoryChosen } = this.state
    return categories.filter((category) => {
      return (category.name === categoryChosen || categoryChosen === 'All')
    })
  }

  render() {
    if (!this.state.categories) return null
    const { categories } = this.state
    // console.log(categories)
    return (
      <>
      <h1>Categories</h1>

      <select onChange={this.handleChange} name="categoryChosen">
        <option>All</option>
        {categories.map(category => {
          return <option key={category.id} value={category.name}>{category.name}</option>
        })}
      </select>

      <div>{this.filteredCategories().map(category => 
        <CategoriesCard key={category.id} {...category} />
      )}
      </div>
      </>
    )
  }
}

export default CategoriesIndex