const cartReducer = (state, action) => {

    switch (action.type) {

        case 'TOGGLE_CART':
            return {
                ...state,
                isCartOpen: action.payload.toggle
            };


            case 'ADD_TO_CART':
                const newItemId = action.payload.item.id;
                const itemExist = state.cartItems.some(item => item.id === newItemId);
            
                let updatedCartItems = null;
            
                if (itemExist) {
                    updatedCartItems = state.cartItems.map(item => {
                        if (item.id === newItemId) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            };
                        }
                        return item;
                    });
                } else {
                    // Ensure the price property is correctly set when adding a new item to the cart
                    const newItem = {
                        ...action.payload.item,
                        // Assuming the price property exists in the item object, ensure it's a valid number
                        price: typeof action.payload.item.price === 'number' ? action.payload.item.price : 0,
                        quantity: 1 // Set initial quantity to 1 for new items
                    };
                    updatedCartItems = [...state.cartItems, newItem];
                }
            
                return {
                    ...state,
                    cartItems: updatedCartItems
                };
            


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.itemId)
            };


        case 'INCREMENT':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                })
            };


        case 'DECREMENT':
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item;
                }).filter(item => item.quantity !== 0)
            };


        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: []
            };


        default:
            return state;
    }

};

export default cartReducer;