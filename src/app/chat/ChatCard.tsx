import type { Restaurant } from "./ChatBox";

const ChatCard = ({ data }: { data: Restaurant[] }) => {
  if (!Array.isArray(data)) return null;

  return (
    <div className="mt-4 space-y-4">
      {/* ✅ Display Restaurant Cards */}
      <div className="grid gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-3xl shadow-lg"
          >
            {/* Header with Restaurant Name */}
            <h3 className="text-lg font-bold uppercase">{item.name}</h3>
            <p className="text-sm font-light">{item.cuisine}</p>

            {/* Details Section */}
            <div className="mt-3 space-y-2">
              {item.address && (
                <p className="flex items-center text-sm">
                  📍 <span className="ml-2">{item.address}</span>
                </p>
              )}
              {item.ratings && (
                <p className="flex items-center text-sm">
                  ⭐ <span className="ml-2">{item.ratings}</span>
                </p>
              )}
              {item.phone && (
                <p className="flex items-center text-sm">
                  📞 <span className="ml-2">{item.phone}</span>
                </p>
              )}
            </div>

            {/* Links Section */}
            <div className="mt-4 space-y-2">
              {item.website && item.website !== "N/A" && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white text-sm underline transition hover:opacity-80"
                >
                  🌍 Website
                </a>
              )}
              {item.googleMapsUrl && (
                <a
                  href={item.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white text-sm underline transition hover:opacity-80"
                >
                  📍 Google Maps
                </a>
              )}
            </div>

            {/* Fancy Box Overlay Effect */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white opacity-30"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
