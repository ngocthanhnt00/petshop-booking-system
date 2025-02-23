'use client';
import { useEffect, useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button, Row, Col, Typography, Input, Flex } from 'antd';
import Link from 'next/link';
const { Title, Text } = Typography;

export default function SignUp() {
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
        className="mx-auto min-h-[650px] w-full max-w-[830px] flex-col gap-4 overflow-hidden px-2 sm:gap-7 sm:px-0 lg:flex-row"
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
              <button className="h-full w-1/2 rounded-none border border-[#686868] text-sm hover:border-[#22A6DF] hover:text-[#22A6DF] sm:text-base">
                Đăng Nhập
              </button>
              <button className="h-full w-1/2 rounded-none border-[#22A6DF] bg-[#22A6DF] text-sm text-white sm:text-base">
                <Link href="/signup" passHref>
                  <span className="cursor-pointer">Đăng ký</span>
                </Link>
              </button>
            </div>

            <div className="p-3 sm:p-5">
              <div className="mb-2 pb-2 text-sm sm:text-base">
                <label htmlFor="fullname" className="font-bold uppercase">
                  Họ và Tên <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="Nhập họ và tên của bạn"
                  className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
                />
              </div>
              <div className="mb-2 pb-2 text-sm sm:text-base">
                <label htmlFor="email" className="font-bold uppercase">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Nhập email của bạn"
                  className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
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
                />
              </div>
              <div className="mb-2 pb-2 text-sm sm:text-base">
                <label htmlFor="confirm-password" className="font-bold uppercase">
                  Xác nhận mật khẩu <span className="text-red-600">*</span>
                </label>
                <Input
                  type="password"
                  id="confirm-password"
                  placeholder="Nhập lại mật khẩu"
                  className="mt-2 h-9 text-sm sm:h-10 sm:text-base"
                />
              </div>
              <div className="mb-3">
                <a href="#" className="text-sm sm:text-base">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center px-3 sm:px-5">
              <Flex justify="space-between" className="mb-2 w-full">
                <button className="h-9 w-[48%] rounded-md bg-black text-xs text-white hover:bg-[#22A6DF] sm:h-10 sm:text-sm">
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
                Pet Heaven cam kết bảo mật và sẽ không tiết lộ thông tin khách hàng khi không có sự
                cho phép.
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
