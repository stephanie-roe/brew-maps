import React, { Component } from 'react';
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
                    <button className='home-btn'>Home</button>
                    <h1>Brew Maps</h1>
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
        )
    }
}

export default NavBar