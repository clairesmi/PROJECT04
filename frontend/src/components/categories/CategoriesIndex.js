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
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
      .catch(err => console.log(err))
  }

  handleClick(e) {
    this.setState({ categoryChosen: e.target.value })
    // console.log(e.target.value)
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
 
    return (
      <>
      <h1 className="categories-header">Categories</h1>
      <div className="filter-by-category">
        <div className="category-options-wrapper">
          <option className="category-options" value="All" onClick={this.handleClick}>All</option>
          {categories.map(category => {
            return <option className="category-options" key={category.id} value={category.name} 
              onClick={this.handleClick}>{category.name}</option>
          })}
        </div>
      </div>
      <div className="category-hero">{this.filteredCategories().map(category => 
        <CategoriesCard key={category.id} {...category} />
      )}
      </div>
      </>
    )
  }
}

export default CategoriesIndex