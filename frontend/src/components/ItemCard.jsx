export default function ItemCard({ item, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{item.itemName}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-sm">📍 {item.location}</p>
      <p className="text-sm">Type: {item.type}</p>

      <button
        onClick={() => onDelete(item._id)}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}