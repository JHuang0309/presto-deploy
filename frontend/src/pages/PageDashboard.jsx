import { useState, useEffect } from 'react';
import axios from 'axios';

function PageDashboard() {
    return (
        <>
            <div className="ml-4">
                <h3 className="text-balance text-3xl font-semibold">Start a new presentation</h3>
                <button className="bg-gray-200 text-white p-4 w-64 h-32 my-4 text-5xl hover:bg-[#e4627d]">+</button>
            </div>
            <hr className="ml-4"/>
            <div className="ml-4">
                <h3 className="text-balance text-3xl font-semibold">My presentations</h3>
            </div>
        </>
    )
}

export default PageDashboard