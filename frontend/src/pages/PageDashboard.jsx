import { useState, useEffect } from 'react';
import axios from 'axios';
import PresentationDetails from '../components/PresentationDetails.jsx';

function PageDashboard({ token }) {
  const [store, setStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresentation, setNewPresentation] = useState({
    title: "",
    description: "",
  });

  const setStoreFn = (newStore) => {
    axios.put(
      'http://localhost:5005/store',
      {
        store: newStore,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(function (response) {
        setStore(newStore);
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
  };

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

  const newPresentationClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    setNewPresentation({
      ...newPresentation,
      [event.target.name]: event.target.value,
    });
  };

  const createPresentation = () => {
    const newStore = { ...store };
    if (!('presentations' in newStore)) {
      newStore.presentations = [];
    }
    newStore.presentations.push(newPresentation);
    setStoreFn(newStore);
    setIsModalOpen(false);
    setNewPresentation({ title: "", description: "" }); // Reset new presentation data
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="ml-6">
        <h3 className="text-balance text-3xl font-semibold my-4">
          Start a new presentation
        </h3>
        <button
          className="bg-gray-300 text-white p-4 w-64 h-32 my-4 text-5xl hover:bg-[#e4627d]"
          onClick={newPresentationClick}
        >
          +
        </button>
        <p className="text-balance font-semibold mb-4">Blank presentation</p>
      </div>
      <hr className="mx-6" />
      <div className="ml-6">
        <h3 className="text-balance text-3xl font-semibold my-4">
          My presentations
        </h3>
      </div>

      {isModalOpen && (
        <PresentationDetails
        isOpen={isModalOpen}
        newPresentation={newPresentation}
        handleInputChange={handleInputChange}
        createPresentation={createPresentation}
        closeModal={closeModal}
      />
      )}
      
      {JSON.stringify(store)}
    </>
  );
}

export default PageDashboard