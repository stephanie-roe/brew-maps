import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css';

type NavBarState={
    query: string,
    filter: string
}

class NavBar extends Component {
    state: NavBarState={
        query: '',
        filter: ''
    }
    render() {
        return(
            <div className='nav-bar'>
                {/* <button>Home</button> */}
                <div className='home-btn-container'>
                    <Link to='/'>
                        <button className='home-btn'>Home</button>
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
                        <input type='text' placeholder='ex: Banjo Brewing'></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default NavBar