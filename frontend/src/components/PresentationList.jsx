function PresentationList({ presentationList }) {
  return (
    <div className="p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {presentationList.map((presentation) => (
          <div
            key={presentation.id}
            className="w-64 bg-white rounded-lg p-4 shadow-md"
          >
            <div className="text-center">
              {presentation.thumbnail ? (
                <img
                  src={presentation.thumbnail}
                  alt="Presentation Thumbnail"
                  className="w-20 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-400">No Thumbnail</p>
              )}
            </div>
            <h3 className="text-lg font-bold mt-4">{presentation.title}</h3>
            <p className="text-gray-500">{presentation.description}</p>
            <p className="text-gray-500">Slides: {presentation.slides.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PresentationList;