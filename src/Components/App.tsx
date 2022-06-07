import React from 'react';
import '../Styles/App.css';
import Breweries from './Breweries';
import Brewery from './Brewery';
import ErrorMessage from "./ErrorMessage";
import BreweryDetails from './BreweryDetails';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { ReviewObject } from './ReviewForm';
import ConfirmationPage from './ConfirmationPage';

interface match {
  id: string
}

type State = {
  breweries: Brewery[],
  searchedBreweries: Brewery[],
  error: boolean,
  query: string,
  reviews: ReviewObject[],
  reviewsByBrewery: ReviewObject[]
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
    query: '',
    reviews: [],
    reviewsByBrewery: []
  }

  componentDidMount() {
    this.getAllBreweries().then(breweries => this.setState(state => ({ breweries: breweries })))
    this.fetchData().then(data => {
      this.setState({ reviews: data })
    })
  }

  fetchData = (): Promise<ReviewObject[]> => {
    return fetch(`http://localhost:3001/api/v1/reviews`)
      .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  getAllBreweries = (): Promise<Brewery[]> => {
    return fetch('https://api.openbrewerydb.org/breweries')
      .then(response => {
        return response.json()})
  }

  searchBrewery = (event: any): void => {
    this.setState({ query: event.target.value, searchedBreweries: this.state.breweries });
    const result = this.state.breweries.filter(brewery => {
      return brewery.name.toUpperCase().includes(event.target.value.toUpperCase());
    });
    this.setState({ searchedBreweries: result })
  }

  clearSearchBreweries = (): void => {
    this.setState({ searchedBreweries: [], query: "" })

  }

  refetch = (): any => {
    return fetch('http://localhost:3001/api/v1/reviews')
      .then(res => res.json())
      .then(data => data)
  }

  filterBreweryReviews = (id: string): any => {
    this.refetch()
      .then(data => {
        const filteredData = data.filter(review => {
          return review.id === id})
        this.setState({ reviewsByBrewery: filteredData })
      })
  }

  updateReviews = (reviews: ReviewObject[], filteredReviews: ReviewObject[]): void => {
    reviews.forEach(review => {
      if (!this.state.reviews.includes(review)) {
        this.setState({ reviews: [...this.state.reviews, review] })
      }
    })
    filteredReviews.forEach(review => {
      if (!this.state.reviewsByBrewery.includes(review)) {
        this.setState({ reviewsByBrewery: [...this.state.reviewsByBrewery, review] })
      }
    })
  }

  render() {
    if (this.state.error) {
      return (<ErrorMessage />)
    } else {
      return (
        <main className='app'>
          <NavBar searchBrewery={ this.searchBrewery } clearSearchBreweries={ this.clearSearchBreweries } query={ this.state.query }/>
          <Switch>
            <Route exact path="/"
              render={() => {
                if (!this.state.searchedBreweries.length && !this.state.query) {
                  return (<Breweries filterReviews={ this.filterBreweryReviews } newBrewery={ this.state.breweries } />)
                } else if (!this.state.searchedBreweries.length) {
                  return (<ErrorMessage/>)
                } else {
                  return (<Breweries filterReviews={ this.filterBreweryReviews } newBrewery={ this.state.searchedBreweries } />)
                }
              }} >
            </Route>
            <Route exact path="/:id" render={ ({ match }) => <BreweryDetails refresh={ this.updateReviews }  filteredReviews={ this.state.reviewsByBrewery } reviews={ this.state.reviews } id={ match.params.id } /> } >
            </Route>
          </Switch>
        </main>
      )
    }
  }
}

export default App;
