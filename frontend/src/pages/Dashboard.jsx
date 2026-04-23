import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ FULL FORM
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    contactInfo: "",
  });

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ ADD ITEM
  const addItem = async () => {
    try {
      if (!form.itemName || !form.location || !form.type) {
        alert("Fill required fields");
        return;
      }

      await API.post("/items", form);

      setForm({
        itemName: "",
        description: "",
        type: "",
        location: "",
        contactInfo: "",
      });

      fetchItems();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to add item");
    }
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  const searchItems = async () => {
    const res = await API.get(`/items/search?name=${search}`);
    setItems(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* SEARCH */}
          <div className="flex gap-2 mb-6">
            <input
              value={search}
              placeholder="Search items..."
              className="flex-1 border p-3 rounded-md"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={searchItems}
              className="bg-blue-600 text-white px-5 rounded-md"
            >
              Search
            </button>
          </div>

          {/* ADD ITEM */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">

            <div className="grid md:grid-cols-2 gap-4">

              <input
                value={form.itemName}
                placeholder="Item Name"
                className="border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, itemName: e.target.value })
                }
              />

              <input
                value={form.location}
                placeholder="Location"
                className="border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />

              <input
                value={form.type}
                placeholder="Type"
                className="border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              />

              <input
                value={form.description}
                placeholder="Description"
                className="border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                value={form.contactInfo}
                placeholder="Contact Info"
                className="border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, contactInfo: e.target.value })
                }
              />

            </div>

            <button
              onClick={addItem}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
            >
              Add Item
            </button>
          </div>

          {/* ITEMS */}
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">{item.itemName}</h3>
                <p>{item.location}</p>
                <p>{item.type}</p>

                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}