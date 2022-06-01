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
                <button>Home</button>
                <div className='dropdown'>
                    <button className='brew-types'>Filter</button>
                    <form className='dropdown-content'>
                        <a href='#'>Action</a>
                        <a href='#'>Adventure</a>
                        <a href='#'>Horror</a>
                        <a href='#'>Comedy</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default NavBar