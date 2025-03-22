import { Edit, Trash2 } from "lucide-react"; // Import Lucide's Edit and Trash2 icons
import { useEffect } from "react";
import useMenuApi from "../../features/Menuitem/menuApi";
import { useParams } from "react-router-dom";

export default function MenuList({ menuItems, setMenuItems, handleEdit }) {
  const {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    loading,
    error,
  } = useMenuApi();
  const {id} = useParams()

  useEffect(() => {
    const loadMenuItems = async () => {
      const items = await getMenuItems(id);
      if (items) {
        setMenuItems(items);
      }
    };
    loadMenuItems();
  }, []);

  const handleDelete = async (id) => {
    const deletedItemId = await deleteMenuItem(id);
    if (deletedItemId) {
      // On successful deletion, remove the deleted item from the menuItems state
      setMenuItems(menuItems.filter((item) => item.id !== deletedItemId));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader text"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center ">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
        <p className="font-semibold">Error loading data!</p>
        <p>{error}</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-md">
        <p className="font-semibold">Error loading data!</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <section className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-serif font-bold mb-10 text-gray-800 text-center">
        Our Menu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 w-72 mx-auto relative"
          >
            <img
              src={`http://127.0.0.1:8000/${item.image}`}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-serif font-bold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-2 line-clamp-2 text-sm">
                {item.description}
              </p>
              <p className="text-xl font-semibold text-indigo-600">
                ${item.price}
              </p>

              {/* Edit and Delete icons */}
              <div className="absolute bottom-5 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Edit size={20} /> {/* Edit icon */}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} /> {/* Trash (delete) icon */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
