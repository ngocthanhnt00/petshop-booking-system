'use client';
import { Button, Row, Col, Typography, Input } from 'antd';
import { FaChevronRight, FaInbox } from 'react-icons/fa';

const { Title, Text } = Typography;
const paymentMethods = [
  {
    id: 'cod',
    label: 'Thanh toán khi nhận hàng (COD)',
    icon: 'https://picsum.photos/300/200',
  },
  {
    id: 'bank_transfer',
    label: 'Chuyển khoản qua ngân hàng',
    icon: 'https://picsum.photos/300/200',
  },
  {
    id: 'card',
    label: 'Thanh toán qua thẻ ngân hàng',
    icon: 'https://picsum.photos/300/200',
  },
];

export default function Payment() {
  return (
    <div className="px-4 md:px-[154px]">
      {/* breadcrumb */}
      <nav className="breadcrumb w-full rounded-lg bg-white py-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hover:text-gray-900">Home</span>
          <FaChevronRight className="text-gray-400" />
          <span className="text-gray-900">Thông tin giao hàng</span>
        </div>
      </nav>

      {/* Note */}
      <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm">
        <span>
          Bạn đã có tài khoản?
          <span className="cursor-pointer font-bold text-blue-600 hover:text-blue-800">
            {' '}
            Đăng nhập
          </span>
        </span>
      </div>

      {/* container */}
      <Row className="mt-4 flex flex-col justify-between gap-8 lg:flex-row">
        {/* left */}
        <Col className="w-full lg:w-[58%]">
          {/* Info */}
          <div>
            <Title level={5} className="mb-6">
              Thông tin giao hàng
            </Title>
            {/* name */}
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Họ và tên"
                className="rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500"
              />
            </div>
            {/* email + phone number */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500 sm:w-3/5"
              />
              <Input
                type="number"
                placeholder="Số điện thoại"
                className="w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500 sm:w-2/5"
              />
            </div>
            {/* address */}
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Địa chỉ"
                className="w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500"
              />
            </div>
            {/* conscious, district, commune */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="text"
                placeholder="Chọn tỉnh thành"
                className="flex-1 rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500"
              />
              <Input
                type="text"
                placeholder="Chọn quận, huyện"
                className="flex-1 rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500"
              />
              <Input
                type="text"
                placeholder="Chọn phường, xã"
                className="flex-1 rounded-lg border border-gray-300 p-3 hover:border-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* ship method */}
          <div className="mt-8">
            <Title level={5} className="mb-4">
              Phương thức vận chuyển
            </Title>
            <div className="flex h-[196px] w-full flex-col items-center justify-center rounded-lg border bg-white text-[#686868] shadow-sm">
              <FaInbox className="mb-4 h-16 w-28 text-gray-400" />
              <span className="px-4 text-center">
                Vui lòng chọn tỉnh, thành để có danh sách chi phí và phương thức vận chuyển
              </span>
            </div>
          </div>

          {/* payment method */}
          <div className="mt-8">
            <Title level={5} className="mb-4">
              Phương thức thanh toán
            </Title>
            <div className="rounded-lg bg-white shadow-sm">
              {paymentMethods.map((method, index) => (
                <label
                  key={method.id}
                  className="flex cursor-pointer items-center gap-4 border-b p-4 transition hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    defaultChecked={index === 0}
                    className="h-4 w-4 text-blue-600"
                  />
                  <img
                    src={method.icon}
                    alt={method.label}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </Col>

        {/* right */}
        <Col className="w-full lg:w-[38%]">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {/* Sản phẩm */}
            <div className="flex items-center gap-4 border-b pb-6">
              <div className="relative h-36 w-32 overflow-hidden rounded-lg">
                <img
                  src="https://picsum.photos/300/200"
                  alt="Royal Canin"
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>
              <div>
                <h2 className="font-semibold leading-tight">
                  Thức ăn cho mèo con và mèo mẹ
                  <br />
                  <span className="text-gray-500">ROYAL CANIN Mother & Babycat</span>
                </h2>
                <p className="mt-1 text-gray-400">2kg</p>
                <p className="mt-2 font-semibold text-[#22A6DF]">100.500₫</p>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-6 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="flex-1 rounded-lg border hover:border-blue-500 focus:border-blue-500"
              />
              <Button className="h-auto rounded-lg bg-[#22A6DF] px-6 py-2 text-white hover:bg-[#1a85b6]">
                Áp dụng
              </Button>
            </div>

            {/* Các loại giá */}
            <div className="mt-6 space-y-3 border-t pt-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-black">100.500₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-gray-400">Đang tính...</span>
              </div>
              <div className="flex justify-between">
                <span>Giá giảm</span>
                <span className="text-gray-400">Chưa áp dụng</span>
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="mt-6 flex justify-between border-t pt-6 text-lg font-bold">
              <span>Tổng tiền</span>
              <span className="text-[#22A6DF]">100.500₫</span>
            </div>
          </div>
        </Col>
      </Row>
      {/* Completed cart */}
      <div className="flex justify-end py-4">
        <Button className="h-auto rounded-lg bg-[#22A6DF] px-6 py-3 text-white hover:bg-[#1a85b6]">
          Hoàn tất đơn hàng
        </Button>
      </div>
    </div>
  );
}
