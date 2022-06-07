import React from 'react';
import "../Styles/BreweryDetails.css";
import ReviewForm from './ReviewForm';
import { Brewery } from "./App";
import { ReviewObject } from './ReviewForm';
import ErrorMessage from './ErrorMessage';

type DetailsProps = {
  refresh: (reviews: ReviewObject[], filteredReviews: ReviewObject[]) => void,
  filteredReviews: ReviewObject[],
  id: string,
  reviews: ReviewObject[]
}

type DetailsState = {
  brewery: Brewery,
  error: boolean
}

class BreweryDetails extends React.Component<DetailsProps, DetailsState> {
  state: DetailsState = {
    brewery: { id: "",
      name: "",
      brewery_type: "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      phone: "",
      website_url: "" },
    error: false
  }

  componentDidMount() {
    fetch(`https://api.openbrewerydb.org/breweries/${this.props.id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(data => {
    this.setState({ brewery: data })
    })
    .catch(error => {
    this.setState({ error: true })
    })
  }

  render() {
    if (this.state.error) {
      return (<ErrorMessage/>)
    } else  {
      return (
        <div className="brewery-details">
          <div className="details-card">
            <h2>{ this.state.brewery.name }</h2>
            <div className="contact-info">
              <p><a href={ this.state.brewery.website_url } target="_blank">{ this.state.brewery.website_url }</a></p>
              <p className='phone'>Phone: { this.state.brewery.phone }</p>
              { this.state.brewery.street ? <p className='address'>Location: {`${this.state.brewery.street} ${this.state.brewery.city}, ${this.state.brewery.state} ${this.state.brewery.postal_code}`}</p> :  <p className='address'>Location: {`${this.state.brewery.city}, ${this.state.brewery.state} ${this.state.brewery.postal_code}`}</p> }
            </div>
          </div>
          <ReviewForm refresh={ this.props.refresh } filteredReviews={ this.props.filteredReviews } reviews={ this.props.reviews } id={ this.props.id }/>
        </div>
      )
    }
  }
}

export default BreweryDetails;
