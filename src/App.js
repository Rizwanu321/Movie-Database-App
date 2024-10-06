import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchList from './components/SearchList'
import SearchContext from './context/SearchContext'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')

  const onChangeInput = value => {
    setSearchInput(value)
  }
  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput: onChangeInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/search" component={SearchList} />
        <Route component={NotFound} />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
