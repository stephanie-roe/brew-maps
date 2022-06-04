import React from 'react';
import '../Styles/App.css';
import Breweries from './Breweries';
import Brewery from './Brewery';
import BreweryDetails from './BreweryDetails'
import NavBar from './NavBar';
import { Route, RouteComponentProps } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { ReviewObject } from './ReviewForm';
// import { threadId } from 'worker_threads';

interface match {
  id: string
}

type State = {
  breweries: Brewery[],
  searchedBreweries: Brewery[],
  error: boolean,
  query: string
}

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

class App extends React.Component<{}, State> {
  state: State = {
    breweries: [],
    searchedBreweries: [],
    error: false,
    query: ""
  }


  componentDidMount() {
    this.getAllBreweries().then(breweries => this.setState(state => ({ breweries: breweries })))
  }

  async function fetchData(): any {
    fetch(`http://localhost:3001/api/v1/reviews`)
      .then(response => {
          if (response.ok) {
              return response.json()
          } else {
              throw Error(response.statusText)
          }
      })
      .then(data => {
        console.log("ressssD", data);
        return data
      })
      .catch(error => console.log("error"))

  }

  getAllBreweries = (): Promise<Brewery[]> => {
    return fetch('https://api.openbrewerydb.org/breweries')
      .then(response => {
        console.log(response)
        return response.json()})
  }

  searchBrewery = (event: any): void => {
    this.setState({query: event.target.value, searchedBreweries: this.state.breweries});

    const result = this.state.breweries.filter(brewery => {
      return brewery.name.toUpperCase().includes(event.target.value.toUpperCase());
    });

    this.setState({searchedBreweries: result})
  }

  clearSearchBreweries = (): void => {
    this.setState({ searchedBreweries: [], error: false, query: "" })
  }

  render() {
    return (
      <main className='app'>
        <NavBar searchBrewery={this.searchBrewery} clearSearchBreweries={this.clearSearchBreweries} query={this.state.query}/>
        <Route exact path="/"
          render={() => {
            if (!this.state.searchedBreweries.length && !this.state.query) {
              return (<Breweries newBrewery={this.state.breweries} />)
            } else if (!this.state.searchedBreweries.length) {
              return (<h1>Oops, try again later!</h1>)
            } else {
              return (<Breweries newBrewery={this.state.searchedBreweries} />)
            }
          }}
          >
        </Route>
        <Route path="/:id" render={ ({match}) => <BreweryDetails fetchData={this.fetchData} id={match.params.id} /> } >
        </Route>
      </main>
    )
  }
}


export default App;
