import { useState, useEffect } from 'react';
import axios from 'axios';
import PresentationDetails from '../components/PresentationDetails.jsx';
import PresentationList from '../components/PresentationList.jsx';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function PageDashboard({ token }) {
  const [store, setStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresentation, setNewPresentation] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    slides: [],
  });

  const navigate = useNavigate();
  useEffect(() => {
      if (localStorage.getItem('token') == null) {
          navigate('/login');
      }
  }, [navigate]);

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
                // TODO: redirect to login and display a component alert
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

    newPresentation.id = uuidv4();
    newStore.presentations.push(newPresentation);
    setStoreFn(newStore);
    setIsModalOpen(false);
    setNewPresentation({
        id: "",
        title: "",
        description: "",
        thumbnail: "",
        slides: [],
      }); // Reset new presentation data
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
      {/* <PresentationList presentations={store.presentations} /> */}
    </>
  );
}

export default PageDashboard