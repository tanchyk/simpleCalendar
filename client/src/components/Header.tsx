import React from 'react';

export const Header: React.FC = () => {
    return (
        <nav className="nav-wrapper blue darken-1">
            <ul>
                <a href="/" className="header-logo white-text">
                    CalendarTs
                </a>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/" onClick={() => localStorage.clear()} className={"logout white-text"}>Log out</a></li>
            </ul>
        </nav>
    );
}