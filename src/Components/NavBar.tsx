import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Brewery } from "./App";
import '../Styles/NavBar.css';


type NavBarProps = {
  searchBrewery: (query: string, event: any) => void,
  clearSearchBreweries: () => void
}

type NavBarState={
  query: string,
  filter: string
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  state: NavBarState={
    query: '',
    filter: ''
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
    this.props.searchBrewery(this.state.query, event)
  }

  clearInputs = () => {
    // event.target.value = ''
    this.setState({ query: '' })
    this.props.clearSearchBreweries()
  }


    render() {
        return(
            <div className='nav-bar'>
                {/* <button>Home</button> */}
                <div className='home-btn-container'>
                    <Link to='/'>
                        <button className='home-btn' onClick={() => this.clearInputs()}>Home</button>
                    </Link>
                </div>
                <div className='title-container'>
                    <h1>Brew Maps</h1>
                </div>
                <div className='filter-search-container'>
                    <div className='dropdown'>
                        <button className='brew-types'>Filter</button>
                        <form className='dropdown-content'>
                            <a href='#'>Action</a>
                            <a href='#'>Adventure</a>
                            <a href='#'>Horror</a>
                            <a href='#'>Comedy</a>
                        </form>
                    </div>
                    <form>
                        <input className='search-bar' type='text' placeholder='ex: Banjo Brewing' onChange={(event) => this.handleChange(event)}></input>

                    </form>
                </div>
            </div>
        )
    }
}

export default NavBar
