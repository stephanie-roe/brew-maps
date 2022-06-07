import React from 'react';
import '../Styles/Brewery.css';
import { Link } from 'react-router-dom';

type BreweryProps = {
  filterReviews: (id: string) => void,
  breweryObject: {
    name: string,
    city: string,
    state: string,
    id: string
  }
}

const Brewery = ({ breweryObject, filterReviews }: BreweryProps): JSX.Element => {
  return (
    <Link to={`/${breweryObject.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <div id={breweryObject.id} className='brewery' onClick={() => filterReviews(breweryObject.id)}>
          <h2 className='name'>{breweryObject.name}</h2>
          <p className='location'>{`${breweryObject.city}, ${breweryObject.state}`}</p>
       </div>
    </Link>
  )
}


export default Brewery;
