import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FaCartPlus, FaSignInAlt } from 'react-icons/fa';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const productDocRef = doc(db, "products", id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [productList, setProductList] = useState([]);
    const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const getProductList = async () => {
            try {
                const data = await getDocs(productsCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setProductList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        getProductList();
    }, []);

    const handleAddToCart = (product) => {
        console.log("Adding product to cart:", product);
    };

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const docSnap = await getDoc(productDocRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.error(err);
            }
        };
        getProductDetails();
    }, [id]);


    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };
    return (
        <div>
            {product && (
                <div className='prod-dets-container'>
                    <div className="product-details-container">
                        <div className="selected-image-container">
                            <img
                                src={product.image_url[selectedImageIndex]}
                                alt={`Image ${selectedImageIndex + 1}`}
                                style={{ width: '600px', height: '600px' }}
                            />
                        </div>
                        <div className="product-info">
                            <h2>{product.product_name}</h2>
                            <p>₱{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                            <p>Cubic Capacity: {product.product_cubicCap} CC</p>

                        </div>
                    </div>
                    <div>
                        {product.image_url.map((imageUrl, index) => (
                            <img className='thumbnail-img'
                                key={index}
                                src={imageUrl}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div >
                    <h1>Related Items</h1>
                    <div className="product-container">
                        {productList.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image_url[0]} alt={product.product_name} />
                                <h1>{product.product_name}</h1>
                                <p>{product.product_description}</p>
                                <div className="button-container">
                                    <p><b>₱ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</b></p>
                                    <button onClick={() => handleAddToCart(product)}><FaCartPlus /> </button>
                                    <button><Link to={`/product/${product.id}`} className="view-details"><FaSignInAlt /></Link></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

    );
}

export default ProductDetails;