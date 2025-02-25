import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { Card, Button } from 'antd';

const products = [
  {
    name: 'Thức Ăn Hạt Cho Chó Con Poodle Royal Canin',
    price: '169.000₫',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Thức ăn cho mèo con và mẹ Royal Canin',
    price: '130.000₫',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Miếng Lưới Ghép Quây Chuồng Đa Năng',
    price: '90.000₫',
    image: '/images/products/thucanmeo.png',
  },
  {
    name: 'Bát Cho Chó Mèo Ăn Uống Nhựa Melamine Cao Cấp',
    price: '85.000₫',
    image: '/images/products/thucanmeo.png',
  },
];

export default function DogProduct() {
  return (
    <div className="p-6 px-[154px]">
      {/* Tiêu đề */}
      <div className="mx-auto flex h-[50px] w-full max-w-[900px] items-center justify-center rounded-[40px] bg-[#22A6DF] text-base font-medium text-white md:text-lg">
        MUA SẮM CHO CHÓ
      </div>

      {/* Danh sách sản phẩm */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:gap-[40px] lg:grid-cols-4">
        {products.map((product, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden rounded-lg border border-black p-3 text-center hover:border-[#22A6DF] md:p-4"
          >
            {/* Nút Yêu thích */}
            <div className="absolute left-2 top-2 cursor-pointer rounded-full border border-gray-500 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <FaHeart className="text-xl text-red-500" />
            </div>

            {/* Hình ảnh sản phẩm */}
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
              className="relative mx-auto h-32 w-32 md:h-[150px] md:w-[150px]"
            />

            {/* Giá sản phẩm */}
            <p className="mt-2 text-sm font-bold text-[#22A6DF] md:text-base">{product.price}</p>

            {/* Tên sản phẩm */}
            <p className="mt-1 text-xs md:text-sm">{product.name}</p>

            {/* Nút Mua ngay */}
            <Button
              type="primary"
              className="absolute bottom-16 left-1/2 w-max -translate-x-1/2 translate-y-[150px] transform rounded-md bg-[#22A6DF] px-3 py-1.5 text-sm text-white transition-all duration-300 group-hover:translate-y-0 md:bottom-20 md:px-4 md:py-2 md:text-base"
            >
              Mua ngay
            </Button>
          </Card>
        ))}
      </div>

      {/* Nút Xem thêm */}
      <div className="mt-6 text-center">
        <Button className="rounded-md border border-gray-300 px-6 py-5 text-base hover:bg-gray-100">
          Xem thêm sản phẩm <span className="font-semibold">dành cho chó</span>
        </Button>
      </div>
    </div>
  );
}
