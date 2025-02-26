'use client';
import Image from 'next/image';
import { FaUserEdit, FaCalendarAlt } from 'react-icons/fa';
import { Card, Button, Typography, Space } from 'antd';
import { useState, useEffect } from 'react';
import NewProduct from '@/components/newproduct';
import SaleProduct from '@/components/saleproduct';
import HotProduct from '@/components/hotproduct';
import DogProduct from '@/components/dogproduct';
import CatProduct from '@/components/catproduct';
import Link from 'next/link';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newProduct, setNewProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [hotProduct, setHotProduct] = useState([]);
  const [dogProduct, setDogProduct] = useState([]);
  const [catProduct, setCatProduct] = useState([]);

  const images = [
    '/images/banners/1.png',
    '/images/banners/2.png',
    '/images/banners/3.png',
    '/images/banners/4.png',
    '/images/banners/5.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const newProductResponse = await fetch('http://localhost:5000/api/v1/newproducts', {
          cache: 'no-store',
        });
        const newProductData = await newProductResponse.json();
        console.log('API Data in homepage:', newProductData);
        setNewProduct(newProductData.products || []);

        const saleProductResponse = await fetch('http://localhost:5000/api/v1/saleproducts', {
          cache: 'no-store',
        });
        const saleProductData = await saleProductResponse.json();
        console.log('API Data in homepage:', saleProductData);
        setSaleProduct(saleProductData.products || []);

        const hotProductResponse = await fetch('http://localhost:5000/api/v1/hotproducts', {
          cache: 'no-store',
        });
        const hotProductData = await hotProductResponse.json();
        console.log('API Data in homepage:', hotProductData);
        setHotProduct(hotProductData.products || []);

        const dogProductResponse = await fetch('http://localhost:5000/api/v1/dog-products', {
          cache: 'no-store',
        });
        const dogProductData = await dogProductResponse.json();
        console.log('API Data in homepage:', dogProductData);
        setDogProduct(dogProductData.products || []);

        const catProductResponse = await fetch('http://localhost:5000/api/v1/cat-products', {
          cache: 'no-store',
        });
        const catProductData = await catProductResponse.json();
        console.log('API Data in homepage:', catProductData);
        setCatProduct(catProductData.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="mt-4 px-4 sm:px-[40px] lg:px-[154px]">
        <Image
          src={images[currentImageIndex]}
          alt="Banner"
          width={1420}
          height={0}
          className="w-full"
        />
      </div>

      {/* Sản phẩm mới */}
      <div className="relative mt-[30px] rounded-lg p-6 px-4 sm:px-[40px] lg:px-[154px]">
        <NewProduct data={newProduct} />
      </div>

      {/* Sản phẩm giảm giá */}
      <div className="relative mt-[30px] rounded-lg p-6 px-4 sm:px-[40px] lg:px-[154px]">
        <SaleProduct data={saleProduct} />
      </div>

      {/* Sản phẩm bán chạy */}
      <div className="relative mt-[30px] rounded-lg p-6 px-4 sm:px-[40px] lg:px-[154px]">
        <HotProduct data={hotProduct} />
      </div>

      {/* Sản phẩm dành cho chó */}
      <div className="p-6 px-[154px]">
        <div className="mx-auto flex h-[50px] w-full max-w-[900px] items-center justify-center rounded-[40px] bg-[#22A6DF] text-base font-medium text-white md:text-lg">
          MUA SẮM CHO CHÓ
        </div>

        <DogProduct data={dogProduct} />

        {/* Nút Xem thêm */}
        <div className="mt-6 text-center">
          <Link href="/product">
            <Button className="rounded-md border border-gray-300 px-6 py-5 text-base hover:bg-gray-100">
              Xem thêm sản phẩm <span className="font-semibold">dành cho chó</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Sản phẩm dành cho mèo */}
      <div className="p-6 px-[154px]">
        {/* Tiêu đề */}
        <div className="mx-auto flex h-[50px] w-full max-w-[900px] items-center justify-center rounded-[40px] bg-[#22A6DF] text-base font-medium text-white md:text-lg">
          MUA SẮM CHO MÈO
        </div>

        <CatProduct data={catProduct} />

        {/* Nút Xem thêm */}
        <div className="mt-6 text-center">
          <Button className="rounded-md border border-gray-300 px-6 py-5 text-base hover:bg-gray-100">
            Xem thêm sản phẩm <span className="font-semibold">dành cho mèo</span>
          </Button>
        </div>
      </div>

      {/* PetNews */}
      <div className="bg-white p-4 px-4 sm:p-6 sm:px-[40px] lg:px-[154px]">
        {/* Danh sách logo thương hiệu */}
        <div className="mb-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex items-center justify-center">
            <Image
              src="/images/news/royalcanin.png"
              alt="Royal Canin"
              width={250}
              height={100}
              className="h-auto w-auto"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/news/kitcat.png"
              alt="Kit Cat"
              width={250}
              height={100}
              className="h-auto w-auto"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/news/gimcat.png"
              alt="Gim Cat"
              width={250}
              height={100}
              className="h-auto w-auto"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/news/lapaw.png"
              alt="LaPaw"
              width={250}
              height={100}
              className="h-auto w-auto"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/news/tropiclean.png"
              alt="TropiClean"
              width={250}
              height={100}
              className="h-auto w-auto"
            />
          </div>
        </div>

        {/* Phần tin tức */}
        <div className="rounded-lg border bg-white px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-base font-semibold sm:text-lg">CÓ THỂ BẠN MUỐN BIẾT</h3>
            <h3 className="cursor-pointer text-xs font-semibold text-gray-500 hover:underline sm:text-sm">
              Tin tức khác »
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Ảnh bài viết chính */}
            <div className="lg:col-span-6">
              <div className="relative h-[200px] w-full sm:h-[250px] md:h-[300px]">
                <Image
                  src="/images/news/concho.png"
                  alt="Main Article"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Nội dung bài viết chính */}
            <div className="flex flex-col lg:col-span-6">
              <h4 className="mb-2 text-base font-bold sm:text-lg">
                Lợi ích khi tiêm phòng đầy đủ cho thú cưng
              </h4>

              <Space size="middle" className="mb-3 flex flex-wrap text-xs text-gray-500 sm:text-sm">
                <span className="flex items-center gap-2">
                  <FaUserEdit className="text-[#22A6DF]" />
                  <span className="flex gap-2">
                    by <p className="font-bold">Admin</p>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#22A6DF]" />
                  <span>01/01/2025</span>
                </span>
              </Space>

              <p className="mb-4 text-xs text-gray-700 sm:text-sm">
                Tiêm phòng sẽ giúp thú cưng giữ được thể trạng tốt và khỏe mạnh! Bảo vệ con người
                khỏi sự lây nhiễm của các bệnh truyền lây giữa động vật và ...
              </p>

              <button className="self-start rounded border border-[#22A6DF] px-4 py-2 text-xs transition-colors hover:bg-[#22A6DF] hover:text-white sm:text-sm">
                Đọc thêm »
              </button>
            </div>
          </div>

          {/* Danh sách bài viết liên quan */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Bài viết liên quan 1 */}
            <div className="flex items-center gap-4">
              <div className="relative h-[80px] w-[100px] min-w-[100px] sm:h-[104px] sm:w-[145px] sm:min-w-[145px]">
                <Image
                  src="/images/news/concho.png"
                  alt="Related Article"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="w-full text-xs font-medium leading-tight sm:w-48 sm:text-sm">
                  Lợi ích khi tiêm phòng đầy đủ cho thú cưng
                </p>
                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">01/01/2025</p>
              </div>
            </div>

            {/* Bài viết liên quan 2 */}
            <div className="flex items-center gap-4">
              <div className="relative h-[80px] w-[100px] min-w-[100px] sm:h-[104px] sm:w-[145px] sm:min-w-[145px]">
                <Image
                  src="/images/news/concho.png"
                  alt="Related Article"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="w-full text-xs font-medium leading-tight sm:w-48 sm:text-sm">
                  Lợi ích khi tiêm phòng đầy đủ cho thú cưng
                </p>
                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">01/01/2025</p>
              </div>
            </div>

            {/* Bài viết liên quan 3 */}
            <div className="flex items-center gap-4">
              <div className="relative h-[80px] w-[100px] min-w-[100px] sm:h-[104px] sm:w-[145px] sm:min-w-[145px]">
                <Image
                  src="/images/news/concho.png"
                  alt="Related Article"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="w-full text-xs font-medium leading-tight sm:w-48 sm:text-sm">
                  Lợi ích khi tiêm phòng đầy đủ cho thú cưng
                </p>
                <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">01/01/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
