const StoreHeader = ({ store }) => {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Background image */}
      {store.banner && (
        <img
          src={store?.banner}
          alt={store?.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 h-full">
        <div className="relative z-10 flex items-center space-x-5 h-full">
          <div className="w-20 h-20 rounded-full">
            <img className="rounded-full" src={store?.logo} alt="" srcset="" />
          </div>
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-2">{store.name}</h1>
            <p className="text-lg opacity-90">
              {store.description || "No description provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;