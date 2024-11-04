import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const Header = () => {
    return (
        <div className='bg-[#e4627d]'>
            <Link to="/dashboard">Back</Link>
            <button>Change thumbnail</button>
            <button>Edit History</button>
            <span>Presentation Title</span>
            <button>Edit-Title</button>
            <button>Delete Presentation</button>
        </div>
        
    );
};

export default Header;