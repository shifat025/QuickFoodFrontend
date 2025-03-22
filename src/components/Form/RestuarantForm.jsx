import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../hooks/useAxios";
import Field from "../common/Field";
import useRestaurantApi from "../../features/Restuarant/restaurantApi";

export default function RestaurantForm({ onClose, editData, setRestaurantList, restaurantList }) {
  const { api } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createRestaurant, updateRestaurant, loading, error } = useRestaurantApi();

  // Pre-populate form fields if editData is available
  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setValue("description", editData.description);
      setValue("location", editData.location);
      // Note: For file input (image), it needs a different approach
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    if (data.image && data.image[0]) formData.append("image", data.image[0]);

    try {
      let response;
      if (editData) {
        // If editing, use the update API
        response = await api.patch(`/restuarant/restaurants/${editData.id}/update/`, formData);
      } else {
        // If adding, use the create API
        response = await api.post("/restuarant/restaurants/create/", formData);
      }

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        // Update the restaurant list with the response data (new or updated)
        const updatedRestaurantList = editData
          ? restaurantList.map((restaurant) =>
              restaurant.id === editData.id ? response.data : restaurant
            )
          : [...restaurantList, response.data];
        setRestaurantList(updatedRestaurantList);
        console.log(editData ? "Restaurant updated successfully!" : "Restaurant added successfully!");
      } else {
        console.error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all duration-300 ease-in-out relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {editData ? "Edit Restaurant" : "Add Restaurant"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Name" htmlFor="name" error={errors.name}>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </Field>

          <Field label="Description" htmlFor="description" error={errors.description}>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </Field>

          <Field label="Location" htmlFor="location" error={errors.location}>
            <input
              id="location"
              {...register("location", { required: "Location is required" })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </Field>

          <Field label="Image" htmlFor="image" error={errors.image}>
            <input
              id="image"
              type="file"
              {...register("image")}
              className="w-full p-2 border rounded cursor-pointer"
            />
          </Field>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {editData ? "Update Restaurant" : "Add Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}
