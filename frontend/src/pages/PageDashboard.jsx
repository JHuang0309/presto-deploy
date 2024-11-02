import { useState, useEffect } from 'react';
import axios from 'axios';

function PageDashboard() {
    return (
        <>
            <div className="ml-4">
                <h3 className="text-balance text-3xl font-semibold">Start a new presentation</h3>
                {/* <div class="plus-sign"></div> */}
                <button class="bg-gray-400 text-white p-4 rounded-md">+</button>
            </div>
            <hr className="ml-4"/>
            <div className="ml-4">
                <h3 className="text-balance text-3xl font-semibold">My presentations</h3>
            </div>
        </>
    )
}

export default PageDashboard