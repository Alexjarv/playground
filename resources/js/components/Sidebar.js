import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className='sidebar shadow-sm flex-column'>
            <div className='flex justify-content-between align-items-center px-4' style={{minHeight: "55px"}} >
                <a className="navbar-brand" onClick={(e) => {e.preventDefault(), navigate('/')}} href="/">
                        { process.env.MIX_REACT_APP_NAME ? process.env.MIX_REACT_APP_NAME : 'Laravel' }
                </a>
            </div>
            <div className='flex p-4'>
                asdadsads
            </div>
        </div>
    );
}

export default Sidebar;

