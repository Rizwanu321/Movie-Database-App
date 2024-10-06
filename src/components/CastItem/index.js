import './index.css'

const CastItem = ({cast}) => (
  <li className="cast-item">
    <img
      className="cast-image"
      src={`https://image.tmdb.org/t/p/w185${cast.profileImage}`}
      alt={cast.name}
    />
    <p className="cast-name">{cast.name}</p>
    <p className="cast-character">as {cast.character}</p>
  </li>
)

export default CastItem
