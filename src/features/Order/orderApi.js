import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";

const useOrderApi = () => {
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyOrderHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/order/history/");
      return response.data;
    } catch (error) {
      setError("Failed to load history data. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/order/get/");
      return response.data;
    } catch (error) {
      setError("Failed to load history data. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

//   const createRestaurant = async (form) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.post("/restuarant/restaurants/create/", form);
//       return response.data;
//     } catch (error) {
//       setError("Failed to create restaurant. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateRestaurant = async (id, form) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.patch(`/restuarant/restaurants/${id}/update/`, form);
//       return response.data;
//     } catch (error) {
//       setError("Failed to update restaurant. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteRestaurant = async (id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.delete(`/restuarant/restaurants/${id}/delete/`);
//       if (response.status === 204) {
//         return id; // Return ID for deletion success
//       }
//     } catch (error) {
//       setError("Failed to delete restaurant. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return {
    getMyOrderHistory,
    getOrder,
    loading,
    error,
  };
};

export default useOrderApi;
