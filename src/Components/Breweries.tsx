import React from 'react';
import '../Styles/Breweries.css';

type BreweriesProps = {
  newBrewery: object[]
}

const Breweries = ({ newBrewery }: BreweriesProps): JSX.Element => {
  return (
    <h2>Breweries</h2>
  )
}


export default Breweries;
