import React from 'react';
import '../Styles/App.css';
import Breweries from './Breweries';
import Brewery from './Brewery';
import BreweryDetails from './BreweryDetails'
import NavBar from './NavBar';
import { Route, RouteComponentProps } from 'react-router-dom'

interface match {
  id: string
}
// state is going to have one key which is breweries
  // breweries is an array that contains objects which are the interface of brewery
type State = {
  breweries: Brewery[],
  searchedBreweries: Brewery[],
  error: boolean
  // specificBrewery: {}
}

// Brewery is an object that has all of these keys, which have specified data types as their values
  // each element in our breweries state is one of these objects
export type Brewery = {
  id: string,
  name: string,
  brewery_type: string,
  street: string,
  address_2?: string,
  address_3?: string,
  city: string,
  state: string,
  county_province?: string,
  postal_code: string,
  country?: string,
  longitude?: string,
  latitude?: string,
  phone: string,
  website_url: string,
  updated_at?: string,
  created_at?: string
}

// type id ={
//   id: string
// }

// type specificBrew={
//   brewery: object
// }




// when setting up a class component using typescript, pass an empty object if no props are being passed down
  // expecting two arguments: props and state
class App extends React.Component<{}, State> {
  state: State = {
    breweries: [],
    searchedBreweries: [],
    error: false
    // specificBrewery: {}
  }

// invoking our fetch and then setting the state to include all of the brewery data we just received from our promise
  componentDidMount() {
    this.getAllBreweries().then(breweries => this.setState(state => ({ breweries: breweries })))
  }


// this method is given a type (<Brewery[]> --> going to be an array and everything in that array will be this Brewery object). the type communicates our anticipated outcome. We are expecting a promise which is an array that contains Brewery objects
  getAllBreweries = (): Promise<Brewery[]> => {
    return fetch('https://api.openbrewerydb.org/breweries')
      .then(response => {
        console.log(response)
        return response.json()})
      // .then(data => {
      //   return data as Brewery[]
      // })
  }

  searchBrewery = (query: string, event: any): void => {
    event.preventDefault()
    const result = this.state.breweries.filter(brewery => {
      return brewery.name.includes(query)
    })
    // const result = this.state.breweries.reduce((acc, brewery) => {
    //   if (query.length > 0 && brewery.name.includes(query)) {
    //     acc.push(brewery)
    //   // } else if (query.length === 0) {
    //   //   this.setState({ error: false, searchedBreweries: [] })
    //   }
    //   return acc
    // }, [])

    if (result.length > 0) {
      this.setState({ searchedBreweries: result, error: false })
    // } else if (query.length === 0) {
    //   this.setState({ error: false, searchedBreweries: [] })
    } else {
      this.setState({ error: true })
    }
  }

  clearSearchBreweries = (): void => {
    this.setState({ searchedBreweries: [], error: false })
  }

  render() {
    // const { breweries } = this.state
    // console.log(breweries)
    return (
      <main className='app'>
        {/* <h1>Brew Maps</h1> */}
        <NavBar searchBrewery={this.searchBrewery} clearSearchBreweries={this.clearSearchBreweries} />
        <Route exact path="/"
          render={() => {
            if (this.state.searchedBreweries.length && !this.state.error) {
              return (<Breweries newBrewery={this.state.searchedBreweries} />)
            } else if (this.state.searchedBreweries && !this.state.error) {
              return (<Breweries newBrewery={this.state.breweries} />)
            } else if (this.state.error) {
              return (<h1>Sorry, come back later!</h1>)
            }
          }}
          >
        </Route>
        <Route path="/:id" render={ ({match}) => <BreweryDetails id={match.params.id} /> } >
        </Route>
      </main>
    )
  }
}


export default App;
