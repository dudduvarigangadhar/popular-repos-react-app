import './index.css'

const RepositoryItem = props => {
  const {listDetails} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = listDetails
  return (
    <li className="list-item">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <p className="name">{name}</p>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo-img"
        />
        <p className="count-content">{starsCount} stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo-img"
        />
        <p className="count-content">{forksCount} forks</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo-img"
        />
        <p className="count-content">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
