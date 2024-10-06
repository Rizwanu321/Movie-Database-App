import {Link} from 'react-router-dom'
import './index.css'

const MovieList = ({movieData}) => {
  const {posterPath, title, id, voteAverage} = movieData

  return (
    <li className="responsive-movie-list-item" key={id}>
      <img className="responsive-movie-poster" src={posterPath} alt={title} />
      <div className="movie-info">
        <div className="title-rating-container">
          <h2 className="movie-tit">{title}</h2>
          <p className="movie-rat">
            <i className="bi bi-star-fill rating-icon" />
            {voteAverage}
          </p>
        </div>
      </div>
      <Link to={`/movie/${id}`} className="link-btn-view">
        <button className="view-details-button" data-testid="view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieList
