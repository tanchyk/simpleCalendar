import React from 'react';

export const Header: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <a href="/" className="header-logo black-text">TODO<span className="teal-text darken-1">TS</span></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/" onClick={() => localStorage.clear()} className={"logout"}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
}