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

class GithubPopularRepos extends Component {
  state = {
    languageList: [],
    activeTab: languageFiltersData[0].id,
    isFetch: false,
  }

  componentDidMount() {
    this.getLanguageApi()
  }

  getLanguageApi = async () => {
    this.setState({
      isFetch: true,
    })
    const {activeTab} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTab}`

    // console.log(url)
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)
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
        isFetch: false,
      })
    }
  }

  changeActiveTab = languageId => {
    this.setState({activeTab: languageId}, this.getLanguageApi)
  }

  renderLoading = () => (
    <div className="three-dots-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderLanguageList = () => {
    const {languageList} = this.state
    console.log(languageList.length)
    return (
      <div className="language-flex-container">
        {languageList.length === 0 ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure-view"
              className="failure-img"
            />
          </div>
        ) : (
          <ul className="language-list-container">
            {languageList.map(eachList => (
              <RepositoryItem listDetails={eachList} key={eachList.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {activeTab, isFetch} = this.state
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
        {isFetch ? this.renderLoading() : this.renderLanguageList()}
      </>
    )
  }
}

export default GithubPopularRepos
