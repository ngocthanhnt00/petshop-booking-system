import { Card, Col, Row } from 'antd';
import Link from 'next/link';
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
      {pros.data.map(product => (
        <Col xs={24} sm={12} md={12} lg={6} key={product.id}>
          <Card
            className="flex h-full w-full cursor-pointer flex-col justify-between rounded-lg border border-[#EAEAEA] bg-white"
            hoverable
          >
            <div className="mx-auto mb-3 flex items-center justify-center rounded-md">
              <Link href={`/detail/${product._id}`}>
                <img
                  src={`/images/products/${product.image_url}`}
                  className="mx-auto mb-3 rounded-md bg-[#EAEAEA] sm:h-36 sm:max-w-36 lg:h-44 lg:w-44"
                />
              </Link>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-[#22A6DF]">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(Number(product.price))}
              </p>
              <p className="pt-2 text-center leading-relaxed text-[#686868]">{product.name}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
