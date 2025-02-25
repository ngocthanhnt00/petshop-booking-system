'use client';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, Card } from 'antd';
import { useState, useEffect } from 'react';

const products = [
  {
    name: 'Thức ăn cho mèo ROYAL CANIN',
    oldPrice: '130.000₫',
    newPrice: '100.500₫',
    salePer: '-15%',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Hạt dinh dưỡng Whiskas',
    oldPrice: '125.000₫',
    newPrice: '95.000₫',
    salePer: '-20%',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Thức ăn mèo Me-O',
    oldPrice: '110.000₫',
    newPrice: '85.000₫',
    salePer: '-22%',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Snack cho mèo Temptations',
    oldPrice: '90.000₫',
    newPrice: '70.000₫',
    salePer: '-18%',
    image: '/images/products/thucanmeo.png',
  },
];

export default function SaleProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getVisibleCount = () => {
      if (windowWidth >= 1280) return 4; // xl
      if (windowWidth >= 1024) return 3; // lg
      if (windowWidth >= 768) return 2; // md
      return 1; // sm
    };

    const visibleCount = getVisibleCount();
    const start = currentIndex;
    const end = start + visibleCount;

    // Create circular array for infinite scroll
    let visibleItems = [...products];
    if (end > products.length) {
      visibleItems = [...products, ...products.slice(0, end - products.length)];
    }

    setVisibleProducts(visibleItems.slice(start, end));
  }, [currentIndex, windowWidth]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="relative mt-[30px] rounded-lg p-6 px-4 sm:px-[40px] lg:px-[154px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative ml-[15px] w-[200px] rounded-t-lg border-l border-r border-t border-[#22A6DF] px-2 py-2 sm:ml-[30px] sm:w-[250px] sm:px-4 md:w-[300px]">
          <div className="absolute -top-7 left-3 z-10 bg-white px-2">
            <Image
              src="/images/products/paw.png"
              alt="Paw Icon"
              width={50}
              height={50}
              className="h-8 w-8 sm:h-12 sm:w-12 md:h-[50px] md:w-[50px]"
            />
          </div>
          <h2 className="relative z-20 text-center text-base font-semibold sm:text-lg">
            SẢN PHẨM GIẢM GIÁ
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            shape="circle"
            icon={<FaChevronLeft />}
            onClick={prevSlide}
            className="border-black shadow-md hover:bg-[#22A6DF] hover:text-white"
          />
          <Button
            shape="circle"
            icon={<FaChevronRight />}
            onClick={nextSlide}
            className="border-black shadow-md hover:bg-[#22A6DF] hover:text-white"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="rounded-xl border-2 px-2 py-[25px] sm:rounded-3xl sm:border-4 sm:px-4 sm:py-[50px]">
        <div className="flex gap-4 transition-all duration-300 ease-in-out">
          {visibleProducts.map((product, index) => (
            <Card
              key={`${product.name}-${index}`}
              className="min-w-0 flex-1 border-none shadow-none"
              styles={{ body: { padding: 0 } }}
            >
              <div className="flex">
                <div className="w-1/4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={128}
                    height={140}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-3/4 flex-col justify-between p-2">
                  <p className="text-xs font-bold sm:text-sm">{product.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm text-gray-400 line-through sm:text-base">
                      {product.oldPrice}
                    </p>
                    <p className="text-sm font-bold text-[#22A6DF] sm:text-base">
                      {product.newPrice}
                    </p>
                    <div className="border border-red-500 px-2 py-1 text-xs font-semibold text-[#FF0000]">
                      {product.salePer}
                    </div>
                  </div>
                  <Button
                    type="primary"
                    className="mt-2 w-[90px] border-none bg-[#22A6DF] text-xs sm:w-[120px] sm:text-sm"
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
