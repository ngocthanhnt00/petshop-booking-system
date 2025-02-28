import Image from 'next/image';
import { Card, Button } from 'antd';
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

interface APIProduct {
  _id: object;
  name: string;
  image_url: string;
  price: string;
}

export default function DogProduct(pros: { data: APIProduct[] }) {
  return (
    <>
      {/* Danh sách sản phẩm */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:gap-[40px] lg:grid-cols-4">
        {pros.data.map((product, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden rounded-lg border border-black p-3 text-center hover:border-[#22A6DF] md:p-4"
          >
            <Image
              src={`/images/products/${product.image_url[0]}`}
              alt={product.name}
              width={150}
              height={150}
              className="relative mx-auto h-32 w-32 md:h-[150px] md:w-[150px] object-cover transition-transform duration-500 hover:scale-125"
            />

            {/* Nút tim & cart */}
            <div className="absolute bottom-[100px] left-1/2 flex -translate-x-1/2 space-x-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Link href="#">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22A6DF] shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#1890ff] hover:shadow-lg active:scale-95">
                  <FaHeart className="text-xl text-white transition-colors hover:text-[#ff4d4f]" />
                </button>
              </Link>
              <Link href="#">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22A6DF] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#1890ff] hover:shadow-lg active:scale-95">
                  <FaShoppingCart className="text-xl transition-transform hover:rotate-12" />
                </button>
              </Link>
              <Link href={`/detail/${product._id}`}>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22A6DF] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#1890ff] hover:shadow-lg active:scale-95">
                  <IoEyeSharp className="text-xl transition-transform hover:rotate-12" />
                </button>
              </Link>
            </div>

            <p className="mt-2 text-sm font-bold text-[#22A6DF] md:text-base">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(Number(product.price))}
            </p>

            <p className="mt-1 text-xs md:text-sm">{product.name}</p>
          </Card>
        ))}
      </div>
    </>
  );
}
