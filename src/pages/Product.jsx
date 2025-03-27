import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image);
        return null;
      }
    });
  };
  useEffect(() => {
    console.log('Full URL:', location.pathname);

    console.log('Product ID from useParams:', productId);

    // More robust product finding

    if (productId) {
      const foundProduct = products.find((item) => item._id === productId);

      if (foundProduct) {
        setProductData(foundProduct);
      } else {
        console.error('No product found with ID:', productId);
      }
    }
  }, [productId, products, location]);
  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {productData.image.map((item, index) => (
            <img
              onClick={() => setImage(item)}
              src={item}
              key={index}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              alt={`Product thumbnail ${index + 1}`}
            />
          ))}
        </div>
        <div className="w-full sm:w-[80%]">
          <img className="w-full h-auto" src={image} alt="Selected product" />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4].map((star) => (
            <img
              key={star}
              src={assets.star_icon}
              alt="Star"
              className="w-3.5"
            />
          ))}
          <img src={assets.star_dull_icon} alt="Half star" className="w-3.5" />
          <p className="pl-2">(122)</p>
        </div>
        <p className="mt-5 text-3xl font-medium">
          {currency}
          {productData.price}
        </p>
        <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

        <div className="flex flex-col gap-4 my-8">
          <p>Select Size</p>
          <div className="flex gap-2">
            {productData.size.map((item, index) => (
              <button
                onClick={() => setSize(item)}
                className={`border py-2 px-4 bg-gray-100 ${
                  item === size ? 'border-orange-500' : ''
                }`}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
          ADD TO CART
        </button>

        <hr className="mt-8 sm:w-4/5" />

        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews {122}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum
            error nihil numquam sapiente vel illum dolores quae asperiores
            dolorum, dolor, ipsa earum molestias consequatur deleniti blanditiis
            dolore dicta esse!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            maiores ea sit minima voluptas soluta suscipit ut mollitia! Incidunt
            laboriosam molestiae nihil beatae error, fuga magni. Aliquam,
            doloribus voluptatum?
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
