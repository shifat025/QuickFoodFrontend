import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const useMenuApi = () => {
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMenuItems = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/restuarant/menu-items/${id}`);
      return response.data;
    } catch (error) {
      setError("Failed to load menu. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createMenuItem = async (form) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/restuarant/menu-items/create/", form);
      return response.data;
    } catch (error) {
      setError("Failed to create menu item. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (id, form) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/restuarant/menu-items/${id}/update/`, form);
      return response.data;
    } catch (error) {
      setError("Failed to update menu item. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/restuarant/menu-items/${id}/delete/`);
      if (response.status === 204) {
        return id; // Return ID for deletion success
      }
    } catch (error) {
      setError("Failed to delete menu item. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    loading,
    error,
  };
};

export default useMenuApi;
