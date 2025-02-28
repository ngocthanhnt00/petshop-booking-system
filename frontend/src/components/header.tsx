'use client';
import { Input, Dropdown, Menu, Space, Typography, Badge, Avatar, Drawer } from 'antd';
import { FaTruck, FaGift, FaCheckCircle, FaShoppingCart, FaUserAlt, FaPhoneAlt, FaSearch, FaBars,
} from 'react-icons/fa';
import { BsGeoAltFill } from 'react-icons/bs';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
    setSubMenu(false);
  };

  const showSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const menu = {
    items: [
      {
        key: '1',
        label: (
          <Link
            href="/product"
            className="flex w-[150px] cursor-pointer justify-between px-1 py-2 text-base font-bold hover:bg-gray-100"
          >
            Dành cho chó <span>&gt;</span>
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link
            href="#"
            className="flex w-[150px] cursor-pointer justify-between px-1 py-2 text-base font-bold hover:bg-gray-100"
          >
            Dành cho mèo <span>&gt;</span>
          </Link>
        ),
      },
    ],
  };

  const handleProductClick = () => {
    setSubMenu(true);
  };

  const handleBackClick = () => {
    setSubMenu(false);
  };

  return (
    <>
      <header className="w-full">
        {/* Menu 1 */}
        <div className="flex h-[34px] items-center justify-between bg-[#22A6DF] px-4 text-[10px] text-white sm:h-[34px] sm:px-[40px] sm:text-xs lg:px-[154px] lg:text-sm">
          <Space className="gap-4 sm:gap-4 lg:gap-10">
            <span className="flex items-center gap-1">
              <BsGeoAltFill className="h-3 w-3 sm:h-4 sm:w-4" /> Địa điểm
            </span>
            <span className="flex items-center gap-1">
              <FaTruck className="h-3 w-3 sm:h-4 sm:w-4" /> Trạng thái đơn hàng
            </span>
          </Space>
          <Space className="hidden items-center gap-1 text-xs sm:flex sm:text-xs">
            <div className="flex items-center rounded-xl bg-black px-2 py-1 font-semibold">
              %15 Off
            </div>{' '}
            khi mua tại cửa hàng
          </Space>
          <Space className="hidden gap-10 lg:flex">
            <span>VND ▼</span>
            <span>Tiếng Việt ▼</span>
          </Space>
        </div>

        {/* Menu 2 */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-[40px] sm:py-4 lg:px-[154px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="PetHeaven Logo"
              width={154}
              height={30}
              className="h-[40px] w-auto sm:h-[60px] lg:h-[100px]"
            />
          </Link>

          <Input.Search
            placeholder="Tìm kiếm..."
            enterButton={
              <button
                style={{
                  backgroundColor: '#22A6DF',
                  borderColor: '#22A6DF',
                  height: '32px',
                  width: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <FaSearch className="text-white" />
              </button>
            }
            className="custom-search hidden w-1/3 rounded-full md:flex"
          />

          <Space size={50} className="hidden xl:flex">
            <div className="flex flex-col items-center">
              <FaGift className="text-2xl text-[#22A6DF]" />
              <span>Free shipping</span>
              <span className="text-xs text-gray-500">Details & Restrictions</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-2xl text-[#22A6DF]" />
              <span>100% Satisfaction</span>
              <span className="text-xs text-gray-500">30 days no hassle</span>
            </div>
            <Link href="/cart">
              <Badge count={1}>
                <FaShoppingCart className="text-2xl" />
              </Badge>
            </Link>
            <Link href="/login">
              <Avatar icon={<FaUserAlt />} className="bg-[#22A6DF]" />
            </Link>
          </Space>

          <Space size={50} className="flex items-center xl:hidden">
            <button className="rounded-full p-2 hover:bg-gray-100 md:hidden" onClick={showSearch}>
              <Search className="h-6 w-6" />
            </button>
            <Link href="/cart">
              <Badge count={1}>
                <FaShoppingCart className="text-2xl" />
              </Badge>
            </Link>
            <Link href="/login">
              <Avatar icon={<FaUserAlt />} className="bg-[#22A6DF]" />
            </Link>
          </Space>
        </div>

        {/* Menu 3 */}
        <nav className="flex items-center justify-between bg-white px-4 text-black sm:px-[40px] lg:px-[154px]">
          <Space className="hidden items-center justify-between py-3 md:flex md:gap-[20px] lg:gap-[27px] xl:gap-[50px]">
            <Link href="/">
              <Typography.Text className="text-sm font-bold text-[#22A6DF] underline underline-offset-[5px] lg:text-sm xl:text-lg">
                Trang chủ
              </Typography.Text>
            </Link>
            <Dropdown menu={menu} placement="bottomLeft">
              <Typography.Text className="cursor-pointer text-sm font-bold hover:text-[#22A6DF] lg:text-sm xl:text-lg">
                Sản phẩm
              </Typography.Text>
            </Dropdown>
            <Link href="#">
              <Typography.Text className="whitespace-nowrap text-sm font-bold hover:text-[#22A6DF] lg:text-sm xl:text-lg">
                Dịch vụ thú cưng
              </Typography.Text>
            </Link>
            <Link href="#">
              <Typography.Text className="text-sm font-bold hover:text-[#22A6DF] lg:text-sm xl:text-lg">
                Blog
              </Typography.Text>
            </Link>
            <Link href="#">
              <Typography.Text className="text-sm font-bold hover:text-[#22A6DF] lg:text-sm xl:text-lg">
                Giới thiệu
              </Typography.Text>
            </Link>
            <Link href="#">
              <Typography.Text className="text-sm font-bold hover:text-[#22A6DF] lg:text-sm xl:text-lg">
                Liên hệ
              </Typography.Text>
            </Link>
          </Space>

          <FaBars className="cursor-pointer md:hidden" onClick={showDrawer} />

          <Space className="whitespace-nowrap text-sm font-bold sm:text-xs lg:text-sm xl:text-base">
            <FaPhoneAlt className="mr-1" />
            24/7 Hỗ trợ: <span className="ml-1 text-[#22A6DF]">0393153129</span>
          </Space>
        </nav>

        <hr className="mt-[5px] border-dashed border-gray-300" />
      </header>

      {/* Search Drawer */}
      <Drawer title="Tìm Kiếm" placement="top" onClose={closeSearch} open={searchOpen} height={400}>
        <div className="p-4">
          <Input.Search placeholder="Tìm kiếm..." size="large" className="mb-4" />
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-bold">TÌM KIẾM PHỔ BIẾN</h3>
            <Space wrap>
              <button className="rounded-full bg-gray-100 px-4 py-2">royal canin</button>
              <button className="rounded-full bg-gray-100 px-4 py-2">nutrience</button>
              <button className="rounded-full bg-gray-100 px-4 py-2">đồ chơi cho mèo</button>
            </Space>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold">SẢN PHẨM NỔI BẬT</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded bg-gray-50 p-4">
                <div className="mb-2 h-32 w-32 bg-gray-200"></div>
                <p className="font-bold">Nhà Cung Cấp</p>
                <p>Tiêu Đề Sản Phẩm Mẫu</p>
                <p className="text-[#22A6DF]">20đ</p>
              </div>
              <div className="rounded bg-gray-50 p-4">
                <div className="mb-2 h-32 w-32 bg-gray-200"></div>
                <p className="font-bold">Nhà Cung Cấp</p>
                <p>Tiêu Đề Sản Phẩm Mẫu</p>
                <p className="text-[#22A6DF]">20đ</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Menu Drawer */}
      <Drawer
        title={subMenu ? 'Sản phẩm' : 'Menu'}
        placement="left"
        onClose={onClose}
        open={open}
        extra={
          subMenu && (
            <button onClick={handleBackClick} className="flex items-center">
              <span className="mr-2">←</span> Quay lại
            </button>
          )
        }
      >
        {!subMenu ? (
          <Menu
            mode="vertical"
            items={[
              {
                key: 'home',
                label: <Link href="/">Trang chủ</Link>,
              },
              {
                key: 'products',
                label: <span onClick={handleProductClick}>Sản phẩm</span>,
              },
              {
                key: 'services',
                label: <Link href="#">Dịch vụ thú cưng</Link>,
              },
              {
                key: 'blog',
                label: <Link href="#">Blog</Link>,
              },
              {
                key: 'about',
                label: <Link href="#">Giới thiệu</Link>,
              },
              {
                key: 'contact',
                label: <Link href="#">Liên hệ</Link>,
              },
            ]}
          />
        ) : (
          <Menu
            mode="vertical"
            items={[
              {
                key: 'dogs',
                label: <Link href="/products/dogs">Dành cho chó</Link>,
              },
              {
                key: 'cats',
                label: <Link href="/products/cats">Dành cho mèo</Link>,
              },
            ]}
          />
        )}
      </Drawer>
    </>
  );
}
