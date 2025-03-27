import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const handleAddToCart = () => {
    addToCart(productData._id, size);
  };

  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find(
        (item) =>
          item._id.toString() === productId ||
          item.name.toLowerCase().replace(/\s+/g, '-') === productId,
      );

      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
      }
    }
  }, [productId, products, location]);

  if (!productData) {
    return (
      <div className="text-center text-gray-500 mt-10">Product not found</div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Layout */}
      <div className="flex flex-col sm:flex-row sm:gap-12 gap-12">
        {/* Product Image & Thumbnails */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex overflow-x-auto sm:flex-col sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                alt={`Product thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full">
            <img className="w-full h-auto" src={image} alt="Selected product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="sm:w-1/2">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4].map((star) => (
              <img
                key={star}
                src={assets.star_icon}
                alt="Star"
                className="w-3.5"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="Half star"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.size?.length > 0 ? (
                productData.size.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? 'border-orange-500' : ''
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews {122}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
