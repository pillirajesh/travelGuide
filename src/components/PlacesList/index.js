import './index.css'

const PlacesList = props => {
  const {eachDestinationDetails} = props
  const {imageUrl, description, name} = eachDestinationDetails

  return (
    <li className="list-items">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="place-name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default PlacesList
