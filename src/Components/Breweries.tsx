import React from 'react';
import '../Styles/Breweries.css';
import Brewery from './Brewery';

type BreweriesProps = {
  filterReviews: (id: string) => void,
  newBrewery: {
    name: string,
    city: string,
    state: string,
    id: string
  }[]
}

const Breweries = ({ newBrewery, filterReviews }: BreweriesProps): JSX.Element => {
  const result = newBrewery.map(singleBrewery => {
    return (
      <Brewery filterReviews={filterReviews} breweryObject={singleBrewery} key={newBrewery.indexOf(singleBrewery)} />
    )
  })
  return (
    <div className='breweries'>
      {result}
    </div>
  )
}


export default Breweries;
