import React from 'react';
import { Data } from './data';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul className='sidebar-list'>
                {Data.map((item, idx) => (
                    <li key={idx} onClick={() => { window.location.pathname = item.link }} className='row' id={ window.location.pathname === item.link ? 'active' : '' }>
                        {" "}
                        <div id='icon'>{item.icon}</div>
                        <div id='title'>{item.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
