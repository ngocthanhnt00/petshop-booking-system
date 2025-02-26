'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button, Row, Col, Typography, Input, Flex } from 'antd';

const { Title, Text } = Typography;

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json(); // Log response từ server
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại!');
      }

      alert('Đăng ký thành công!');
      setFormData({ fullname: '', email: '', password: '', confirmPassword: '' });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Lỗi:', error);
      alert(`Đã xảy ra lỗi: ${error.message}`);
    }
  };
  return (
    <div className="px-2 py-4 sm:px-5 sm:py-6">
      {/* Title */}
      <div className="mx-auto pb-4 text-center sm:pb-7">
        <Title level={4} className="text-xl sm:text-2xl">
          Đăng Ký
        </Title>
        <Flex justify="center" className="gap-1 sm:gap-2">
          <span className="text-sm sm:text-base">
            Trang chủ <span className="px-1 sm:px-2">/</span>
            <span className="text-base sm:text-lg">Đăng ký</span>
          </span>
        </Flex>
      </div>

      <Row
        justify="center"
        className="mx-auto w-full max-w-[830px] flex-col gap-4 px-2 sm:gap-7 sm:px-0 lg:flex-row"
      >
        {/* Left */}
        <Col className="flex w-full flex-col justify-between gap-4 sm:gap-0 lg:w-[400px]">
          <div className="h-[200px] sm:h-1/2">
            <img
              src="https://picsum.photos/300/200"
              alt="Login form"
              className="h-full w-full bg-[#EAEAEA] object-cover"
            />
          </div>
          <div className="h-auto bg-[#EAEAEA] p-3 text-xs sm:h-1/2 sm:p-4 sm:text-sm">
            <Title level={5} className="text-sm sm:text-base">
              Quyền lợi thành viên
            </Title>
            <ul className="list-disc space-y-2 pl-4 sm:space-y-4">
              {[
                'Mua hàng nhanh chóng, dễ dàng',
                'Theo dõi đơn hàng, địa chỉ thanh toán dễ dàng',
                'Nhận nhiều ưu đãi',
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheckDouble className="h-3 w-3 text-[#22A6DF] sm:h-4 sm:w-4" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        {/* Right */}
        <Col className="flex w-full flex-col justify-between shadow-inner lg:w-[400px]">
          <div>
            <div className="mb-3 flex h-10 sm:h-12">
              <button
                onClick={() => router.push('/login')}
                className="h-full w-1/2 border border-[#686868] text-sm hover:border-[#22A6DF] hover:text-[#22A6DF] sm:text-base"
              >
                Đăng Nhập
              </button>
              <button className="h-full w-1/2 border-[#22A6DF] bg-[#22A6DF] text-sm text-white sm:text-base">
                Đăng ký
              </button>
            </div>

            <div className="p-3 sm:p-5">
              {['fullname', 'email', 'password', 'confirmPassword'].map((field, index) => (
                <div key={index} className="mb-2 pb-2 text-sm sm:text-base">
                  <label htmlFor={field} className="font-bold uppercase">
                    {field === 'fullname'
                      ? 'Họ và Tên'
                      : field === 'email'
                        ? 'Email'
                        : field === 'password'
                          ? 'Mật khẩu'
                          : 'Xác nhận mật khẩu'}{' '}
                    <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type={field.includes('password') ? 'password' : 'text'}
                    id={field}
                    placeholder={`Nhập ${field === 'fullname' ? 'họ và tên' : field}`}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center px-3 sm:px-5">
              <Flex justify="space-between" className="mb-2 w-full">
                <button
                  onClick={handleSubmit}
                  className="h-9 w-[48%] rounded-md bg-black text-xs text-white hover:bg-[#22A6DF] sm:h-10 sm:text-sm"
                >
                  Tạo tài khoản
                </button>
                <span className="my-auto px-1 text-sm sm:text-base">Hoặc</span>
                <Button
                  type="default"
                  icon={<FcGoogle className="h-6 w-6 sm:h-8 sm:w-8" />}
                  className="flex h-9 w-[48%] items-center justify-center text-xs sm:h-10 sm:text-sm"
                >
                  Google
                </Button>
              </Flex>
            </div>

            <div className="px-3 pt-3 text-center sm:px-5 sm:pt-5">
              <Text type="secondary" className="text-[10px] sm:text-xs">
                Pet Heaven cam kết bảo mật thông tin khách hàng.
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
