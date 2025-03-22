import {
  ChefHat,
  Clock,
  DollarSign,
  Plus,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import AddMenuModal from "./AddMenuModal";
import MenuList from "./MenuList";

const AddMenuItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [edit, setEdit] = useState(null);


  const handleEdit = (item) => {
    setEdit(item);  // Set the data of the menu item to be edited
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="text-center text-white space-y-4">
            <div className="flex justify-center items-center gap-3 mb-6">
              <UtensilsCrossed className="h-12 w-12" />
              <ChefHat className="h-12 w-12" />
            </div>
            <h1 className="text-5xl font-bold font-serif">La Belle Cuisine</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-100">
              Experience the finest French cuisine in the heart of the city. Our
              award-winning chefs craft exquisite dishes using only the freshest
              seasonal ingredients.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Open Daily: 11am - 11pm</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span>Fine Dining</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Menu Item
          </button>
        </div>

        {isModalOpen && (
          <AddMenuModal
            setIsModalOpen={setIsModalOpen}
            setMenuItems={setMenuItems}
            menuItems={menuItems}
            edit={edit}
            setEdit={setEdit}
          />
        )}

        <MenuList menuItems={menuItems} setMenuItems={setMenuItems} handleEdit={handleEdit} />
      </main>
    </div>
  );
};

export default AddMenuItemPage;
