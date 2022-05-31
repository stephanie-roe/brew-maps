import React from 'react';
import { Brewery } from "./App"

type DetailsProps = Pick<Brewery, "id">

type DetailsState = {
    brewery: Brewery
}

// type Brewery = {
//     id: string,
//     name: string,
//     brewery_type: string,
//     street: string,
//     address_2: string,
//     address_3: string,
//     city: string,
//     state: string,
//     county_province: string,
//     postal_code: string,
//     country: string,
//     longitude: string,
//     latitude: string,
//     phone: string,
//     website_url: string,
//     updated_at: string,
//     created_at: string
//   }

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
            <div>
                <h2>{this.state.brewery.name}</h2>
                <p>{this.state.brewery.website_url}</p>
                <p>{this.state.brewery.phone}</p>
                <p>{this.state.brewery.street}</p>
                <p>{`${this.state.brewery.city}, ${this.state.brewery.state} ${this.state.brewery.postal_code}`}</p>
                <button>{this.state.brewery.brewery_type}</button>
            </div>
        )
    }
}

export default BreweryDetails;
