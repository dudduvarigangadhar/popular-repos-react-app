import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    languageList: [],
    activeTab: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageApi()
  }

  getLanguageApi = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeTab} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        languageList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveTab = languageId => {
    this.setState({activeTab: languageId}, this.getLanguageApi)
  }

  renderLoading = () => (
    <div className="three-dots-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure-view"
        className="failure-img"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLanguageList = () => {
    const {languageList} = this.state

    return (
      <div className="language-flex-container">
        <ul className="language-list-container">
          {languageList.map(eachList => (
            <RepositoryItem listDetails={eachList} key={eachList.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularHeader = () => {
    const {activeTab} = this.state

    return (
      <>
        <div>
          <h1 className="popular-main-heading">Popular</h1>
        </div>
        <ul className="language-filter-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageDetails={eachItem}
              key={eachItem.id}
              isActive={activeTab === eachItem.id}
              changeActiveTab={this.changeActiveTab}
            />
          ))}
        </ul>
      </>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderLanguageList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderPopularHeader()}
        {this.renderRepositories()}
      </>
    )
  }
}

export default GithubPopularRepos
