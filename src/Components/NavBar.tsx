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

type NavBarState={
  query: string,
  filter: string,
  counter: number
}

// class NavBar extends React.Component<NavBarProps, NavBarState> {
//   state: NavBarState={
//     query: '',
//     filter: '',
//     counter: 0
//   }

//   handleChange = (event) => {
//     this.setState({ query: event.target.value, 
//                     counter: (this.state.counter += 1) })
//     this.props.searchBrewery(this.state.query, event, this.state.counter )
//   }

//   clearInputs = () => {
//     // event.target.value = ''
//     this.setState({ query: '' })
//     this.props.clearSearchBreweries()
//   }


//     render() {
//         return(
//             <div className='nav-bar'>
//                 {/* <button>Home</button> */}
//                 <div className='home-btn-container'>
//                     <Link to='/'>
//                         <button className='home-btn' onClick={() => this.clearInputs()}>Home</button>
//                     </Link>
//                 </div>
//                 <div className='title-container'>
//                     <h1>Brew Maps</h1>
//                 </div>
//                 <div className='filter-search-container'>
//                     <div className='dropdown'>
//                         <button className='brew-types'>Filter</button>
//                         <form className='dropdown-content'>
//                             <a href='#'>Action</a>
//                             <a href='#'>Adventure</a>
//                             <a href='#'>Horror</a>
//                             <a href='#'>Comedy</a>
//                         </form>
//                     </div>
//                     <form>
//                         <input id="search" className='search-bar' value={this.state.query} type='text' placeholder='ex: Banjo Brewing' onChange={(event) => this.handleChange(event)}></input>

//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }



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
                <input id="search" className='search-bar' value={query} type='text' placeholder='ex: Banjo Brewing' onChange={(event) => searchBrewery(event)}></input>
            </form>
        </div>
      </div>
  )
}


export default NavBar
