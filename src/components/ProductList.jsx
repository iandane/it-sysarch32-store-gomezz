import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import {
    getDocs, collection, addDoc,
    updateDoc,
    arrayUnion,
    doc,
    getDoc,
} from 'firebase/firestore';
import { FaCartPlus, FaSignInAlt } from 'react-icons/fa';

function ProductList({ setCartItems }) {
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState(null);
    const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const data = await getDocs(productsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductList(filteredData);
            } catch (err) {
                setError('Failed to fetch product list');
                console.error(err);
            }
        };

        fetchProductList();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const cartCollectionRef = collection(db, "cart");
            const cartDocRef = doc(cartCollectionRef, "Ffj7YU5cvPoxz3mtkpcE");

            const cartDocSnap = await getDoc(cartDocRef);
            if (!cartDocSnap.exists()) {
                await addDoc(cartCollectionRef, { items: [productId] });
            } else {
                await updateDoc(cartDocRef, { items: arrayUnion(productId) });
            }

            console.log("Product added to cart successfully!");
            setCartItems((prevCount) => prevCount + 1);
        } catch (error) {
            setError('Error adding product to cart');
            console.error("Error adding product to cart:", error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="header-img-container">
                <img 
                    className="header-image" 
                    src="https://th.bing.com/th/id/OIP.Yi6zqtW1y_ZhDw69YeN9WgHaEK?rs=1&pid=ImgDetMain" 
                    alt="Header" 
                />
            </div>
            <div className="product-container">
                {productList.map((product) => (
                    <div key={product.id} className="product-card">
                        <img className="prod-image" src={product.image_url[0]} alt={product.product_name} />
                        <h1>{product.product_name}</h1>
                        <p className='product-des'>{product.product_description}</p>
                        <div className="button-container">
                            <p className="price"><b>₱{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</b></p>
                            <button onClick={() => handleAddToCart(product.id)}>
                                <FaCartPlus />
                            </button>
                            <button>
                                <Link to={`/product/${product.id}`} className="view-details">
                                    <FaSignInAlt />
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;
