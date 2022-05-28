import React, { Component } from 'react';
import '../Styles/App.css';
import Breweries from './Breweries';

// state is going to have one key which is breweries
  // breweries is an array that contains objects which are the interface of brewery
type State = {
  breweries: Brewery[]
}

// Brewery is an object that has all of these keys, which have specified data types as their values
  // each element in our breweries state is one of these objects
type Brewery = {
  id: string,
  name: string,
  brewery_type: string,
  street: string,
  address_2: string,
  address_3: string,
  city: string,
  state: string,
  county_province: string,
  postal_code: string,
  country: string,
  longitude: string,
  latitude: string,
  phone: string,
  website_url: string,
  updated_at: string,
  created_at: string
}

// when setting up a class component using typescript, pass an empty object if no props are being passed down
  // expecting two arguments: props and state
class App extends React.Component<{}, State> {
  state: State = {
    breweries: [],
  }

// invoking our fetch and then setting the state to include all of the brewery data we just received from our promise
  componentDidMount() {
    this.getAllBreweries().then(breweries => this.setState(state => ({ breweries: breweries })))
  }

// this method is given a type (<Brewery[]> --> going to be an array and everything in that array will be this Brewery object). the type communicates our anticipated outcome. We are expecting a promise which is an array that contains Brewery objects
  getAllBreweries = (): Promise<Brewery[]> => {
    return fetch('https://api.openbrewerydb.org/breweries')
      .then(response => response.json())
      .then(data => {
        return data as Brewery[]
      })
  }

  render() {
    const { breweries } = this.state
    console.log(breweries)
    return (
      <div className='app'>
        <h1>Brew Maps</h1>
        <Breweries newBrewery={breweries}/>
      </div>
    )
  }
}


export default App;
