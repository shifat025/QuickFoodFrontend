// User object
const user = {
    id: 'string',
    name: 'string',
    email: 'string',
    role: 'user', // or 'restaurant_owner'
    avatar: 'string', // optional
    address: 'string', // optional
    phone: 'string', // optional
    createdAt: new Date(), // Date object
  };
  
  // Restaurant object
  export const restaurant = {
    id: 'string',
    name: 'string',
    description: 'string',
    location: 'string',
    image: 'string',
    rating: 0, // number
    deliveryTime: 'string',
    minimumOrder: 0, // number
    ownerId: 'string',
    cuisine: ['string'], // array of strings
    isOpen: true, // boolean
  };
  
  // MenuItem object
  export const menuItem = {
    id: 'string',
    name: 'string',
    description: 'string',
    price: 0, // number
    image: 'string', // optional
    category: 'string',
    isAvailable: true, // boolean
    allergens: ['string'], // optional
    spicyLevel: 1, // 1, 2, or 3 (optional)
    isVegetarian: true, // boolean
  };
  
  // OrderItem object
  const orderItem = {
    menuItem: menuItem, // referencing the menuItem object
    quantity: 0, // number
    specialInstructions: 'string', // optional
  };
  
  // Order object
  const order = {
    id: 'string',
    restaurantId: 'string',
    items: [orderItem], // array of OrderItem
    status: 'Preparing', // 'Preparing', 'Out for Delivery', 'Delivered'
    customerName: 'string',
    address: 'string',
    total: 0, // number
    createdAt: new Date(), // Date object
    estimatedDeliveryTime: new Date(), // optional Date object
    paymentMethod: 'card', // 'card' or 'cash'
    deliveryInstructions: 'string', // optional
    contactNumber: 'string',
  };
  
  // Category object
  const category = {
    id: 'string',
    name: 'string',
    description: 'string', // optional
  };
  
  // AuthState object (For managing user authentication state)
  const authState = {
    user: user || null,
    isAuthenticated: false, // boolean
    loading: false, // boolean
    error: null, // string or null
  };
  