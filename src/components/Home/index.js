import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieList from '../MovieList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [response, setResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const updatedData = data => ({
    results: data.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  const getData = async () => {
    setResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const res = await fetch(apiUrl, options)
    const responseData = await res.json()
    console.log(responseData)
    if (res.ok) {
      const data = updatedData(responseData)
      setResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstants.success,
        data,
      }))
    } else {
      setResponse(prevApiResponse => ({
        ...prevApiResponse,
        status: apiStatusConstants.failure,
        errorMsg: responseData.error_msg,
      }))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderSuccessView = () => {
    const {results} = response.data
    console.log(results)
    return (
      <div className="home-container">
        <h1 className="page-heading">Popular</h1>
        <ul className="responsive-movie-list-container">
          {results.map(each => (
            <MovieList key={each.id} movieData={each} />
          ))}
        </ul>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="err-container">
      <h1>Something Went Wrong</h1>
      <button type="button" className="retry-btn" onClick={getData}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loding-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height="50" width="50" />
    </div>
  )

  const renderMovieDb = () => {
    const {status} = response
    console.log(response)
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderMovieDb()}
    </>
  )
}

export default Home
