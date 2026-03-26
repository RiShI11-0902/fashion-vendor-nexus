const StoreHeader = ({ store }) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "340px" }}>
      {/* Banner / gradient background */}
      {store.banner ? (
        <img
          src={store.banner}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      )}

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Decorative glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-10 pt-16">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-2 ring-primary/40 shadow-xl shadow-primary/10">
              {store?.logo ? (
                <img
                  className="w-full h-full object-cover"
                  src={
                    store.logo?.startsWith("http://")
                      ? store.logo.replace("http://", "https://")
                      : store.logo
                  }
                  alt={store?.name || "Store Logo"}
                />
              ) : (
                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                  {store?.name?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            {/* online dot */}
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-background" />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1 leading-tight">
              {store.name}
            </h1>
            {store.description && (
              <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
                {store.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
