import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, changeActiveTab, isActive} = props
  const {language, id} = languageDetails
  const onChangeActive = () => {
    changeActiveTab(id)
  }

  const activeBtn = isActive ? 'active-btn' : ''

  return (
    <li className="language-btn-container">
      <button
        type="submit"
        className={`language-btn ${activeBtn}`}
        onClick={onChangeActive}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
