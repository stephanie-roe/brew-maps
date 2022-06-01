import React from 'react';
import '../Styles/Brewery.css';
import { Link } from 'react-router-dom'

type BreweryProps = {
  breweryObject: {
    name: string,
    city: string,
    state: string,
    id: string
  }
}

const Brewery = ({ breweryObject }: BreweryProps): JSX.Element => {
  return (
    <Link to={`/${breweryObject.id}`} style={{textDecoration: 'none', color: 'black'}}>
      <div className='brewery'>
        <h2>{breweryObject.name}</h2>
        <p>{`${breweryObject.city}, ${breweryObject.state}`}</p>
      </div>
    </Link>
  )
}


export default Brewery;
