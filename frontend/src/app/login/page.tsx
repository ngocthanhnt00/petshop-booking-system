'use client';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaCheckDouble } from 'react-icons/fa6';
import { Button, Row, Col, Typography, Input, Flex, message } from 'antd';
import { useRouter } from 'next/navigation';
const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Phản hồi từ API:', data);

      if (response.ok) {
        message.success('Đăng nhập thành công');
        localStorage.setItem('accessToken', data.accessToken);
        router.push('/');
      } else {
        message.error(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 py-4 sm:px-5 sm:py-6">
      {/* Title */}
      <div className="mx-auto pb-4 text-center sm:pb-7">
        <Title level={4} className="text-xl sm:text-2xl">
          {' '}
          Đăng Nhập
        </Title>
        <Flex justify="center" className="gap-1 sm:gap-2">
          <span className="text-sm sm:text-base">
            Trang chủ <span className="px-1 sm:px-2">/</span>
            <span className="text-base sm:text-lg"> Đăng nhập</span>
          </span>
        </Flex>
      </div>

      <Row
        justify="center"
        className="mx-auto min-h-[450px] w-full max-w-[830px] flex-col gap-4 overflow-hidden px-2 sm:gap-7 sm:px-0 lg:flex-row"
      >
        {/* left */}
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
              <li className="flex items-center gap-2">
                <FaCheckDouble className="h-3 w-3 shrink-0 text-[#22A6DF] sm:h-4 sm:w-4" />
                <span>Mua hàng nhanh chóng, dễ dàng</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckDouble className="h-3 w-3 shrink-0 text-[#22A6DF] sm:h-4 sm:w-4" />
                <span>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckDouble className="h-3 w-3 shrink-0 text-[#22A6DF] sm:h-4 sm:w-4" />
                <span>Nhận nhiều chương trình ưu đãi từ chúng tôi</span>
              </li>
            </ul>
          </div>
        </Col>

        {/* right */}
        <Col className="flex w-full flex-col justify-between shadow-inner lg:w-[400px]">
          <div>
            <div className="mb-3 flex h-10 sm:h-12">
              <button className="h-full w-1/2 rounded-none border-[#22A6DF] bg-[#22A6DF] text-sm text-white sm:text-base">
                Đăng Nhập
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="h-full w-1/2 rounded-none border border-[#686868] text-sm hover:border-[#22A6DF] hover:text-[#22A6DF] sm:text-base"
              >
                Đăng Ký
              </button>
            </div>
            <div className="p-3 sm:p-5">
              <div className="mb-2 pb-2 text-sm sm:text-base">
                <label htmlFor="email" className="font-bold uppercase">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Nhập email của bạn"
                  className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2 pb-2 text-sm sm:text-base">
                <label htmlFor="password" className="font-bold uppercase">
                  Mật khẩu <span className="text-red-600">*</span>
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu của bạn"
                  className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <a href="#" className="text-sm sm:text-base">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-3 sm:px-5">
            <Flex justify="space-between" className="mb-2 w-full">
              <button
                className="h-9 w-[48%] rounded-md bg-black text-xs text-white hover:bg-[#22A6DF] sm:h-10 sm:text-sm"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
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
              Pet Heaven cam kết bảo mật và sẽ không tiết lộ thông tin khách hàng khi không có sự
              cho phép.
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}
