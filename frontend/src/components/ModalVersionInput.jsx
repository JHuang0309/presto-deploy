const ModalVersionInput = ({ updateUserInput, slideVersions }) => {

  const handleInput = (event) => {
    const { name, value } = event.target;
    updateUserInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  }

  return (
    <div className="modal-content">
      <ul role="list" className="divide-y divide-gray-100 overflow-y-auto max-h-[600px] sm:justify-between">
        {slideVersions.map((version, index) => (
          <li key={version.versionId} className="flex justify-between gap-x-6 py-5 sm:justify-between">
            <div className="flex gap-x-4 flex-col">
              <div>Version {index + 1} - {version.version}</div>
              <div>Slides: {version.slides.length}</div>
            </div>
            <div className="flex flex-col justify-center items-center mr-2">
              <input
                type="radio"
                name="version"
                className="text-[#eb7b91]"
                value={version.versionId}
                onChange={handleInput}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>  
  );
};
  
export default ModalVersionInput;