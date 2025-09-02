const SuccessStoriesSection = () => {
  const successStories = [
    {
      name: "@fashion_boutique",
      followers: "25K",
      achievement: "Built a 6-figure online business",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "@tech_accessories",
      followers: "18K",
      achievement: "Launched professional brand website",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "@home_decor_co",
      followers: "32K",
      achievement: "Scaled beyond social media limitations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entrepreneurs Who Made It</h2>
          <p className="text-lg text-gray-600">Real business owners who transformed their online presence into thriving enterprises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={story.image}
                alt={story.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg mb-1">{story.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{story.followers} followers</p>
              <p className="text-gray-700 font-medium">{story.achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;