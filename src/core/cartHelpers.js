export const addItem = (item, next) => {
    let cart = [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item, 
            count: 1
        });

        // remove duplicates
        //build an array from new set and turn it back into array using array.from
        // re-map it
        // new set will only allow unique values
        // pass ids of each object/product
        //if the loop tries to add same value again, it will be ignored
        // ... with the array of ids we got when first map() was used
        // run map() on it again and return the actual product from the cart



        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};


export const itemTotal = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')){
           return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};


export const getCart = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')){
           return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};


export const updateItem = (productId, count) => {
    let cart = []
    if (typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((p,i) =>{
            if(p._id === productId){
                cart[i].count = count
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    };
};