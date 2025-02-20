'use client';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Button, Row, Col, Typography, Input, Card } from 'antd';
const { Title, Text } = Typography;

const products = [
  {
    id: 1,
    price: '130.000đ',
    name: 'Thức ăn cho mèo con và mèo mẹ ROYAL CANIN Mother & Babycat',
    image: 'link_to_image_1.jpg',
  },
  {
    id: 2,
    price: '150.000đ',
    name: 'Thức ăn cho chó con và chó mẹ ROYAL CANIN',
    image: 'link_to_image_2.jpg',
  },
  {
    id: 3,
    price: '170.000đ',
    name: 'Thức ăn cho chó con và chó mẹ ROYAL CANIN',
    image: 'link_to_image_2.jpg',
  },
  {
    id: 4,
    price: '200.000đ',
    name: 'Thức ăn cho chó con và chó mẹ ROYAL CANIN',
    image: 'link_to_image_2.jpg',
  },
];

export default function Products() {
  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-full sm:px-3 md:px-7 lg:px-14 xl:px-[154px]">
      {/* Banner */}
      <div className="flex h-[120px] items-center justify-center bg-[#22A6DF] p-4 text-center">
        <Title level={1} style={{ color: 'white' }}>
          Mua sắm cho chó
        </Title>
      </div>

      <Row className="mt-6" style={{ width: '100%' }}>
        {/* Aside */}
        <Col xs={24} sm={8} md={6} lg={4} className="hidden lg:block">
          <Title level={4} className="mb-4">
            Danh mục sản phẩm
          </Title>
          <ul className="cursor-pointer space-y-2 border-b pb-4">
            <li className="hover:text-[#22A6DF]">Thức ăn</li>
            <li className="hover:text-[#22A6DF]">Phụ kiện - Đồ chơi</li>
            <li className="hover:text-[#22A6DF]">Chuồng - Vận chuyển</li>
            <li className="hover:text-[#22A6DF]">Sức khoẻ - Vệ sinh</li>
          </ul>
          <Title level={4} className="mb-4 mt-6">
            Giá
          </Title>
          <Text className="mb-2 block">Chọn khoảng giá (VNĐ):</Text>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Text className="w-10">Từ:</Text>
              <Input
                type="number"
                placeholder=""
                className="w-full rounded-md border border-[#EAEAEA] text-center"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Text className="w-10">Đến:</Text>
              <Input
                type="number"
                placeholder=""
                className="w-full rounded-md border border-[#EAEAEA] text-center"
              />
            </div>
            <Button className="w-full rounded-md border border-[#EAEAEA] hover:border-[#22A6DF] hover:text-[#22A6DF]">
              Áp dụng
            </Button>
          </div>
        </Col>
        {/* Main */}
        <Col className="px-4" xs={24} sm={24} md={24} lg={20}>
          {/* Sắp xếp */}
          <div className="flex justify-end border-b pb-2">
            <div className="space-x-2">
              <Button
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
              >
                Mới nhất
              </Button>
              <Button
                icon={<FaArrowUp />}
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
              >
                Giá tăng dần
              </Button>
              <Button
                icon={<FaArrowDown />}
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
              >
                Giá giảm dần
              </Button>
            </div>
          </div>

          {/* Products */}
          <Row className="p-4" gutter={[16, 16]}>
            {products.map(product => (
              <Col xs={24} sm={12} md={12} lg={6} key={product.id}>
                <Card
                  className="flex h-full w-full cursor-pointer flex-col justify-between rounded-lg border border-[#EAEAEA] bg-white"
                  hoverable
                >
                  <div className="mx-auto mb-3 flex items-center justify-center rounded-md">
                    <img
                      src={product.image}
                      alt="Sản phẩm"
                      className="mx-auto mb-3 rounded-md bg-[#EAEAEA] sm:h-36 sm:max-w-36 lg:h-44 lg:w-44"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-[#22A6DF]">{product.price}</p>
                    <p className="pt-2 text-center leading-relaxed text-[#686868]">
                      {product.name}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Button className="mx-2" disabled>
              &lt; Trước
            </Button>
            <Button className="mx-2">1</Button>
            <Button className="mx-2">2</Button>
            <Button className="mx-2">3</Button>
            <Button className="mx-2">Tiếp &gt;</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
