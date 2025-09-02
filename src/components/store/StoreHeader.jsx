const StoreHeader = ({ store }) => {
  return (
    <div className="bg-white py-12 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">{store.name}</h1>
            <p className="text-gray-600">{store.description || "No description provided"}</p>
          </div>
          {store.imageUrl && (
            <img
              src={store.imageUrl}
              alt={store.name}
              className="h-24 w-24 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;