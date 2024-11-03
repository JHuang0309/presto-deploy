import { useState, useEffect } from 'react';
import axios from 'axios';

function PageDashboard({token}) {

    const [store, setStore] = useState(null);

    const setStoreFn = (newStore) => {
        axios.put(
            'http://localhost:5005/store',
            {
                store: newStore,
            },
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        .then(function (response) {
            setStore(newStore);
        })
        .catch(function (error) {
            alert(error.response.data.error);
        })
    }

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5005/store', {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then(function (response) {
                setStore(response.data.store);
            }) 
            . catch(function (error) {
                alert(error.response.data.error);
            });
        }
    }, [token]);

    const newPresentation = () => {
        const newStore = {...store};
        if (!('presentations' in newStore)) {
            newStore['presentations'] = [];
        }
        newStore['presentations'].push({
            title: "",
            description: "",
        })
        setStoreFn(newStore);
    }

    return (
        <>
            <div className="ml-6">
                <h3 className="text-balance text-3xl font-semibold my-4">Start a new presentation</h3>
                <button 
                    className="bg-gray-300 text-white p-4 w-64 h-32 my-4 text-5xl hover:bg-[#e4627d]"
                    onClick={newPresentation}>+</button>
                <p className="text-balance font-semibold mb-4">Blank presentation</p>
            </div>
            <hr className="mx-6"/>
            <div className="ml-6">
                <h3 className="text-balance text-3xl font-semibold my-4">My presentations</h3>
            </div>
        </>
    )
}

export default PageDashboard