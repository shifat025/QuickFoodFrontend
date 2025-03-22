import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMenuApi from "../../features/Menuitem/menuApi";

export default function AddMenuModal({
  setIsModalOpen,
  setMenuItems,
  menuItems,
  edit,
  setEdit,
}) {
  const { id } = useParams();
  const { createMenuItem, updateMenuItem, loading, error } = useMenuApi();

  const [formData, setFormData] = useState({
    restaurant: id || "",
    name: "",
    description: "",
    price: "",
    image: null,
  });

  // When in edit mode, pre-fill the form fields
  useEffect(() => {
    if (edit) {
      setFormData({
        restaurant: id || "",
        name: edit.name || "",
        description: edit.description || "",
        price: edit.price || "",
        image: null, // Image cannot be pre-filled for security reasons
      });
    }
  }, [edit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("restaurant", formData.restaurant);
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", parseFloat(formData.price));
  
    if (formData.image) {
      form.append("image", formData.image); // Append new image only if selected
    }
  
    try {
      let response;
  
      if (edit) {
        // Edit existing menu item
        response = await updateMenuItem(edit.id, form);
      } else {
        // Create new menu item
        response = await createMenuItem(form);
      }
  
      if (response) {
        if (edit) {
          setMenuItems(menuItems.map((item) => (item.id === edit.id ? response : item)));
        } else {
          setMenuItems([...menuItems, response]);
        }
      }
  
      // Reset form and close modal
      setFormData({
        restaurant: id || "",
        name: "",
        description: "",
        price: "",
        image: null,
      });
      setIsModalOpen(false);
      setEdit(null);
    } catch (error) {
      console.error("Error adding/updating menu item:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl m-4 transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            {edit ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setEdit(null);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="e.g., Coq au Vin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    step="0.01"
                    placeholder="29.99"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                rows={3}
                placeholder="Describe your dish..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                required={!edit} // Image is only required for new items
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEdit(null);
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg hover:shadow-xl"
              >
                {edit ? "Update Menu Item" : "Add to Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
