import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PresentationDetails from '../components/PresentationDetails.jsx';
import PresentationList from '../components/PresentationList.jsx';
import Alert from '../components/Alert.jsx';


function PageDashboard({ token }) {
  const [store, setStore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMsg, setAlertMsg] = useState('');
  const [newPresentation, setNewPresentation] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    versions: [],
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
        setAlertType('error');
        setAlertMsg(error.response.data.error);
        setShowAlert(true);
      });
  };

    useEffect(() => {
      if (token) {
        axios.get('http://localhost:5005/store', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setStore(response.data.store);
        }) 
        . catch((error) => {
            localStorage.removeItem('token');
            navigate('/login');
            console.log(error.response.data.error);
        });
      }
    }, [token, navigate]);

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
    newPresentation.versions.push(
        // {
        //     id: uuidv4(),
        //     presentation_id: newPresentation.id,
        //     elements: [],
        // }
        {
          versionId: uuidv4(),
          presentationId: newPresentation.id,
          version: new Date().toLocaleString(),
          slides: [{
            id: uuidv4(),
            presentationId: newPresentation.id,
            elements: [],
            format: {format: 'solid', colour: '#FFFFFF'},
          }]
        }
    );
    newStore.presentations.push(newPresentation);
    setStoreFn(newStore);
    setIsModalOpen(false);
    setNewPresentation({
        id: "",
        title: "",
        description: "",
        thumbnail: "",
        versions: [],
      }); // Reset new presentation data
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {showAlert && (
        <Alert 
            message={alertMsg}
            type={alertType}
            onClose={() => setShowAlert(false)}
        />
      )}
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
      
      {/* {JSON.stringify(store)} */}
      {store?.presentations?.length > 0 && 
      (<PresentationList presentationList={store.presentations} />
)}
    </>
  );
}

export default PageDashboard