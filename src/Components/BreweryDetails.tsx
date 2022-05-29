import React from 'react';

type BreweryDetailsState={
    brewery: Brewery[]
}

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

class BreweryDetails extends React.Component<{}, BreweryDetailsState> {
    state: BreweryDetailsState ={
        brewery: []
    }
    render() {
        return(
            <div>
                <h1>hi</h1>
            </div>
        )
    }
}

export default BreweryDetails;