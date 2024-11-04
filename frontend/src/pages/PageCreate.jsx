import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Slide from '../components/Slide';

const Sidebar = () => {
    return (
        <>
        Hello
        </>
    );
}

function PageCreate() {
    return (
        <>
            <Header />
            <div className='flex'>
                <div className=''>
                    {/* sidebar */}
                    <Sidebar />
                </div>
                <div className='flex-1'>
                    <Slide />
                </div>
            </div>
            <div>
                {/* slide arrangement section */}
            </div>
        </>
    );
}

export default PageCreate;