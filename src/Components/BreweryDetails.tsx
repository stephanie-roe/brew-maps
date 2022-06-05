import React from 'react';
import "../Styles/BreweryDetails.css";
import ReviewForm from './ReviewForm';
import { Brewery } from "./App";
import { ReviewObject } from './ReviewForm';

type DetailsProps = {
  refresh: (reviews: ReviewObject[], filteredReviews: ReviewObject[]) => void,
  filteredReviews: ReviewObject[],
  id: string,
  reviews: ReviewObject[]

}

type DetailsState = {
  brewery: Brewery
}

class BreweryDetails extends React.Component<DetailsProps, DetailsState> {
    state: DetailsState ={
        brewery: { id: "",
            name: "",
            brewery_type: "",
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
            phone: "",
            website_url: "" }
    }

// add in error handling for when there is no phone number or url
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
      .catch(error => console.log("Error"))
    }

    render() {
        return(
            <div className="brewery-details">
                <div className="details-card">
                  <h2>{this.state.brewery.name}</h2>
                  <button>{this.state.brewery.brewery_type}</button>
                  <div className="contact-info">
                    <p>{this.state.brewery.website_url}</p>
                    <p className='phone'>Phone: {this.state.brewery.phone}</p>
                    <p>{this.state.brewery.street}</p>
                    <p className='address'>Address: {`${this.state.brewery.city}, ${this.state.brewery.state} ${this.state.brewery.postal_code}`}</p>
                  </div>
                </div>
                {this.props.filteredReviews === [] ?
                  <h1>waiting...</h1>
                : 
                  <ReviewForm refresh={this.props.refresh} filteredReviews={this.props.filteredReviews} reviews={this.props.reviews} id={this.props.id}/>
                }   
            </div>
        )
    }
}

export default BreweryDetails;
