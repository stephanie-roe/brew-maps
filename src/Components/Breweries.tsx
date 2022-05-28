import React from 'react';
import '../Styles/Breweries.css';
import Brewery from './Brewery';

type BreweriesProps = {
  newBrewery: {
    name: string,
    state: string
  }[]
}

const Breweries = ({ newBrewery }: BreweriesProps): JSX.Element => {
  const result = newBrewery.map(singleBrewery => {
    return (
      <Brewery breweryObject={singleBrewery} key={newBrewery.indexOf(singleBrewery)} />
    )
  })
  return (
    <div>
      {result}
    </div>
  )
}


export default Breweries;
