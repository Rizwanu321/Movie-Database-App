import {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = props => {
  const [searchQuery, setSearchQuery] = useState('')
  const {setSearchInput} = useContext(SearchContext)

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = () => {
    const {history} = props
    setSearchInput(searchQuery)
    history.push('/search')
  }

  return (
    <header className="header-container">
      <div className="top-section">
        <h1 className="title-head">movieDB</h1>
        <div className="left-container">
          <Link to="/">
            <button className="nav-btn-large" type="button">
              Popular
            </button>
          </Link>
          <Link to="/top-rated">
            <button className="nav-btn-large" type="button">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming">
            <button className="nav-btn-large" type="button">
              Upcoming
            </button>
          </Link>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="search-btn"
            type="button"
            data-testid="search-btn"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>
      </div>

      <nav className="bottom-navigation">
        <Link to="/" className="nav-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            fill="currentColor"
            className="bi bi-fire"
            viewBox="0 0 16 16"
          >
            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
          </svg>
        </Link>
        <Link to="/top-rated" className="nav-btn">
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </Link>
        <Link to="/upcoming" className="nav-btn">
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2.002 2.002 0 00-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6a2.002 2.002 0 00-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
          </svg>
        </Link>
      </nav>
    </header>
  )
}

export default withRouter(Header)
