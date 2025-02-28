import { Button, Card } from "antd";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const formatPrice = (amount) => {
  return amount.toLocaleString("vi-VN") + "₫";
};

const parsePrice = (price) => {
  return parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
};

export default function SaleProduct({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Data received in NewProduct:", data);
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
    let visibleItems = [...data];
    if (end > data.length) {
      visibleItems = [...data, ...data.slice(0, end - data.length)];
    }

    // Tính salePrice cho mỗi sản phẩm trong visibleItems
    const updatedVisibleItems = visibleItems.map((product) => {
      const originalPrice = parsePrice(product.price);
      const discountedPrice = originalPrice - (originalPrice * product.discount) / 100;
      return {
        ...product,
        salePrice: formatPrice(discountedPrice), // Thêm salePrice vào sản phẩm
      };
    });

    setVisibleProducts(updatedVisibleItems.slice(start, end));
  }, [currentIndex, windowWidth, data]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 2000); // Tăng thời gian giữa các lần chuyển slide

    return () => clearInterval(autoSlide);
  }, [data.length, isAnimating]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % data.length);
      setTimeout(() => setIsAnimating(false), 1000); // Đợi animation hoàn thành
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
      setTimeout(() => setIsAnimating(false), 1000); // Đợi animation hoàn thành
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative ml-[15px] w-[200px] rounded-t-lg border-l border-r border-t border-[#22A6DF] px-2 py-2 sm:ml-[30px] sm:w-[250px] sm:px-4 md:w-[300px]">
          <div className="absolute -top-7 left-3 z-10 bg-white px-2">
            <img
              src="/images/icons/paw.png"
              alt="Paw Icon"
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
            onClick={handlePrevSlide}
            className="border-black shadow-md transition-colors duration-300 hover:bg-[#22A6DF] hover:text-white"
            disabled={isAnimating || data.length === 0}
          />
          <Button
            shape="circle"
            icon={<FaChevronRight />}
            onClick={handleNextSlide}
            className="border-black shadow-md transition-colors duration-300 hover:bg-[#22A6DF] hover:text-white"
            disabled={isAnimating || data.length === 0}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="overflow-hidden rounded-xl border-2 px-2 py-[25px] sm:rounded-3xl sm:border-4 sm:px-4 sm:py-[50px]">
        <div className="flex transform gap-4 transition-all duration-1000 ease-in-out">
          {visibleProducts.map((product, index) => (
            <Card
              key={`${product.id}-${index}`}
              className={`min-w-0 flex-1 transform border-none shadow-none transition-all duration-1000 ease-in-out ${
                isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
              }`}
              styles={{ body: { padding: 0 } }}
            >
              <div className="flex">
                <div className="w-1/4">
                  <img
                    src={`/images/products/${product.image_url}`}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex w-3/4 flex-col justify-between p-2">
                  <p className="text-xs font-bold sm:text-sm">{product.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-sm text-gray-400 line-through sm:text-base">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(product.price))}
                    </p>
                    <p className="text-sm font-bold text-[#22A6DF] sm:text-base">
                      {product.salePrice}
                    </p>
                    <div className="border border-red-500 px-2 py-1 text-xs font-semibold text-[#FF0000]">
                      {product.discount}%
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
    </>
  );
}