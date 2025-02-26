import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

interface APIProduct {
  _id: object;
  image: string | undefined;
  category: any;
  id: string | number;
  name: string;
  category_id: object;
  image_url: string;
  detail1: string;
  detail2: string;
  detail3: string;
  detail4: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  brand_id: object;
  status: string;
}

export default function ListCard({ pros }: { pros: { data: APIProduct[] } }) {
  return (
    <Row className="p-4" gutter={[16, 16]}>
      {pros.data.map((product, index) => (
        <Col xs={24} sm={12} md={12} lg={6} key={product.id || index}>
          <Card
            className="group relative flex h-full w-full cursor-pointer flex-col justify-between rounded-lg border border-[#EAEAEA] bg-white transition-all hover:shadow-lg"
            hoverable
          >
            {/* Icon Trái tim */}
            <div className="relative mx-auto mb-3 flex items-center justify-center rounded-md">
              <img
                src={`/images/products/${product.image_url}`}
                className="mx-auto mb-3 rounded-md bg-[#EAEAEA] transition-transform duration-300 group-hover:scale-105 sm:h-36 sm:max-w-36 lg:h-44 lg:w-44"
                alt={product.name}
              />

              {/* Nút tim & cart */}
              <div className="absolute bottom-[-10px] left-1/2 flex -translate-x-1/2 space-x-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <Link href="">
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
            </div>

            <div className="flex-1">
              <p className="text-lg font-semibold text-[#22A6DF] transition-colors duration-300 group-hover:text-[#1890ff]">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(Number(product.price))}
              </p>
              <p className="pt-2 text-center leading-relaxed text-[#686868] transition-colors duration-300 group-hover:text-[#333]">
                {product.name}
              </p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
