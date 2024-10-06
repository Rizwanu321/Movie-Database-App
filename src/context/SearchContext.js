import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  setSearchInput: () => {},
})

export default SearchContext
