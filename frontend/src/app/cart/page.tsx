'use client';
import React, { useState } from 'react';
import { Button, Card, Input, Breadcrumb, Typography, Divider } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;

const breadcrumbItems = [
  {
    title: (
      <a href="#" className="hover:text-[#22A6DF]">
        Home
      </a>
    ),
  },
  { title: <span className="text-[#686868]">Giỏ hàng</span> },
];

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    if (/^\d+$/.test(value)) {
      setQuantity(Math.max(1, Number(value)));
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl py-8">
        <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
          <Title level={3} className="!mb-0 text-gray-800">
            Giỏ hàng của bạn
          </Title>
          <Text className="text-[#686868]">(1 sản phẩm)</Text>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <div className="mb-4 border-b pb-4">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="h-28 w-28 overflow-hidden rounded-lg">
                    <img
                      src="https://picsum.photos/200/200?random=1"
                      alt="Thức ăn mèo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Text
                          strong
                          className="block max-w-[500px] break-words text-lg text-gray-800"
                        >
                          Thức ăn cho mèo con và mèo mẹ ROYAL CANIN Mother & Babycat
                        </Text>
                        <Text className="block text-[#686868]">2kg</Text>
                      </div>
                      <Button type="text" danger>
                        Xóa
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Text className="text-lg font-medium text-[#22A6DF]">100,500đ</Text>
                      <div className="flex items-center gap-2">
                        <Button onClick={handleDecrement}>-</Button>
                        <input
                          className="w-4 border-none bg-white text-center text-gray-800 md:w-7"
                          min={1}
                          value={quantity}
                          onChange={handleChange}
                        />
                        <Button onClick={handleIncrement}>+</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-white shadow-lg">
              <Title level={4} className="text-gray-800">
                Thông tin đơn hàng
              </Title>
              <Divider />
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Text strong className="text-gray-800">
                    Tạm tính
                  </Text>
                  <Text strong className="text-xl text-[#22A6DF]">
                    100,500đ
                  </Text>
                </div>
              </div>
              <TextArea
                placeholder="Ghi chú đơn hàng (không bắt buộc)"
                className="mb-6 bg-white text-gray-800"
                rows={4}
              />
              <div className="space-y-3">
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ backgroundColor: '#22A6DF', borderColor: '#22A6DF' }}
                >
                  Tiến hành đặt hàng
                </Button>
                <Button
                  size="large"
                  block
                  style={{
                    border: '1px solid #ccc',
                    color: '#333',
                    backgroundColor: 'white',
                    transition: 'border 0.3s, color 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#22A6DF';
                    e.currentTarget.style.border = '1px solid #22A6DF';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#333';
                    e.currentTarget.style.border = '1px solid #ccc';
                  }}
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
