import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PlacesList from '../PlacesList'
import './index.css'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class TravelGuide extends Component {
  state = {destinationsList: [], apiStatus: status.initials}

  componentDidMount() {
    this.getDestinationsList()
  }

  getDestinationsList = async () => {
    this.setState({apiStatus: status.loading})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedList = data.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))
      this.setState({destinationsList: updatedList, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  getLoaderResults = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successfulResults = () => {
    const {destinationsList} = this.state
    console.log(destinationsList)
    return (
      <ul className="unordered-list-container">
        {destinationsList.map(eachDestination => (
          <PlacesList
            eachDestinationDetails={eachDestination}
            key={eachDestination.id}
          />
        ))}
      </ul>
    )
  }

  renderDestinationsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.successfulResults()

      case 'LOADING':
        return this.getLoaderResults()

      case 'FAILED':
        return this.getFailedResults()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="line" />
        <div className="container">{this.renderDestinationsList()}</div>
      </div>
    )
  }
}

export default TravelGuide
