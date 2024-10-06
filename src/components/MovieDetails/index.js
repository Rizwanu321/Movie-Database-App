import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CastItem from '../CastItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [movieData, setMovieData] = useState({})
  const [castData, setCastData] = useState([])

  const API_KEY = 'b3b1a441745f4448039e38effc347631'

  const getMovieAndCastData = async () => {
    try {
      setApiStatus(apiStatusConstants.loading)

      const movieDataUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      const castDataUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

      const movieResponse = await fetch(movieDataUrl)
      const movieJsonData = await movieResponse.json()
      const castResponse = await fetch(castDataUrl)
      const castJsonData = await castResponse.json()

      if (movieResponse.ok && castResponse.ok) {
        const releaseDateObj = new Date(movieJsonData.release_date)
        const updatedMovieData = {
          backdropImage: movieJsonData.backdrop_path,
          posterImage: movieJsonData.poster_path,
          genres: movieJsonData.genres,
          title: movieJsonData.title,
          overview: movieJsonData.overview,
          releaseDate: releaseDateObj.toDateString(),
          runtime: movieJsonData.runtime,
          rating: movieJsonData.vote_average,
        }

        const updatedCastData = castJsonData.cast.map(eachCast => ({
          profileImage: eachCast.profile_path,
          name: eachCast.name,
          id: eachCast.id,
          character: eachCast.character,
        }))

        setMovieData(updatedMovieData)
        setCastData(updatedCastData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getMovieAndCastData()
  }, [id])

  const renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" color="#263868;" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="err-container">
      <h1>Something Went Wrong</h1>
      <button type="button" className="retry-btn" onClick={getMovieAndCastData}>
        Retry
      </button>
    </div>
  )

  const renderMovieDetails = () => {
    const {
      backdropImage,
      posterImage,
      title,
      overview,
      genres,
      releaseDate,
      runtime,
      rating,
    } = movieData

    return (
      <div className="movie-details-page">
        <div
          className="movie-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropImage})`,
          }}
        >
          <div className="movie-details-content">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${posterImage}`}
              alt={title}
            />
            <div className="movie-info-section">
              <h1 className="movie-title">{title}</h1>
              <p className="movie-overview">{overview}</p>
              <p className="movie-genres">
                {genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </p>

              <p className="movie-release-date">Release Date: {releaseDate}</p>
              <p className="movie-duration">Duration: {runtime} mins</p>
              <p className="movie-rating">Rating: {rating}/10</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCastDetails = () => (
    <div className="cast-details-section">
      <h2 className="cast-title">Cast</h2>
      <ul className="cast-list">
        {castData.map(cast => (
          <CastItem key={cast.id} cast={cast} />
        ))}
      </ul>
    </div>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return (
          <>
            {renderMovieDetails()}
            {renderCastDetails()}
          </>
        )
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderContent()}
    </>
  )
}

export default MovieDetails
