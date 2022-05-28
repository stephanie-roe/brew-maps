import React from 'react';
import '../Styles/Brewery.css';

type BreweryProps = {
  breweryObject: {
    name: string,
    city: string,
    state: string
  }
}

const Brewery = ({ breweryObject }: BreweryProps): JSX.Element => {
  return (
    <div className='brewery'>
      <h2>{breweryObject.name}</h2>
      <p>{`${breweryObject.city}, ${breweryObject.state}`}</p>
    </div>
  )
}


export default Brewery;
