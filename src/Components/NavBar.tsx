// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Brewery } from "./App";
import '../Styles/NavBar.css';

type NavBarProps = {
  searchBrewery: (event: any) => void,
  clearSearchBreweries: () => void,
  query: string
}

const NavBar = ({ searchBrewery, clearSearchBreweries, query }: NavBarProps): JSX.Element => {
  return (
    <div className='nav-bar'>
      <div className='home-btn-container'>
          <Link to='/'>
              <button className='home-btn' onClick={() => clearSearchBreweries()}>Home</button>
          </Link>
      </div>
      <div className='title-container'>
          <h1>Brew Maps</h1>
      </div>
      <div className='search-container'>
            <form>
                <input id="search" className='search-bar' value={query} type='text' placeholder='ex: Banjo Brewing' onChange={(event) => searchBrewery(event)}></input>
            </form>
        </div>
      </div>
  )
}


export default NavBar
