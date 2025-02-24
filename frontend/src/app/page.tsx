'use client';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Button, Row, Col, Typography, Input } from 'antd';
import ListCard from '../components/listcard';

const { Title, Text } = Typography;

interface APIProduct {
  category: string;
  id: any;
  name: string;
  category_id: object;
  image: string;
  image_url: string;
  detail1: string;
  detail2: string;
  detail3: string;
  detail4: string;
  price: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  brand_id: object;
  status: string;
}

function getPageNumbers(currentPage: number, totalPages: number, maxVisible: number = 7) {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  pageNumbers.push(1);
  let left = currentPage - 2;
  let right = currentPage + 2;
  if (left < 2) left = 2;
  if (right > totalPages - 1) right = totalPages - 1;
  if (left > 2) {
    pageNumbers.push('...');
  }
  for (let i = left; i <= right; i++) {
    pageNumbers.push(i);
  }
  if (right < totalPages - 1) {
    pageNumbers.push('...');
  }
  pageNumbers.push(totalPages);

  return pageNumbers;
}

export default function Products() {
  const [data, setData] = useState<APIProduct[]>([]);
  const [sort, setSort] = useState<'newest' | 'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const responseData = await response.json();
        console.log('API response data:', responseData);

        if (responseData.result && Array.isArray(responseData.result)) {
          setData(responseData.result);
        } else {
          console.error('Unexpected response structure:', responseData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const filteredData = data.filter(item => {
    const priceNumber = Number(item.price);
    const matchCategory = category ? item.category?.toLowerCase() === category.toLowerCase() : true;
    const matchPrice = priceNumber >= minPrice && priceNumber <= maxPrice;
    return matchCategory && matchPrice;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'asc') {
      return Number(a.price) - Number(b.price);
    } else {
      return Number(b.price) - Number(a.price);
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages, 7);

  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-full sm:px-3 md:px-7 lg:px-14 xl:px-[154px]">
      <div className="flex h-[120px] items-center justify-center bg-[#22A6DF] p-4 text-center">
        <Title level={1} style={{ color: 'white' }}>
          Mua sắm cho chó
        </Title>
      </div>

      <Row className="mt-6" style={{ width: '100%' }}>
        <Col xs={24} sm={8} md={6} lg={4} className="hidden lg:block">
          <Title level={4} className="mb-4">
            Danh mục sản phẩm
          </Title>
          <ul className="cursor-pointer space-y-2 border-b pb-4">
            <li
              className={`hover:text-[#22A6DF] ${category === 'Thức ăn' ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick('Thức ăn')}
            >
              Thức ăn
            </li>
            <li
              className={`hover:text-[#22A6DF] ${category === 'Phụ kiện - Đồ chơi' ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick('Phụ kiện - Đồ chơi')}
            >
              Phụ kiện - Đồ chơi
            </li>
            <li
              className={`hover:text-[#22A6DF] ${category === 'Chuồng - Vận chuyển' ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick('Chuồng - Vận chuyển')}
            >
              Chuồng - Vận chuyển
            </li>
            <li
              className={`hover:text-[#22A6DF] ${category === 'Sức khoẻ - Vệ sinh' ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick('Sức khoẻ - Vệ sinh')}
            >
              Sức khoẻ - Vệ sinh
            </li>
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
                className="w-full rounded-md border border-[#EAEAEA] text-center"
                onChange={e => {
                  setMinPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Text className="w-10">Đến:</Text>
              <Input
                type="number"
                className="w-full rounded-md border border-[#EAEAEA] text-center"
                onChange={e => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button className="w-full rounded-md border border-[#EAEAEA] hover:border-[#22A6DF] hover:text-[#22A6DF]">
              Áp dụng
            </Button>
          </div>
        </Col>

        <Col className="px-4" xs={24} sm={24} md={24} lg={20}>
          <div className="flex justify-end border-b pb-2">
            <div className="space-x-2">
              <Button
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
                onClick={() => setSort('newest')}
              >
                Mới nhất
              </Button>
              <Button
                icon={<FaArrowUp />}
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
                onClick={() => setSort('asc')}
              >
                Giá tăng dần
              </Button>
              <Button
                icon={<FaArrowDown />}
                className="bg-[#f3f4f6] text-[#686868] hover:bg-[#22A6DF] hover:text-white"
                type="default"
                onClick={() => setSort('desc')}
              >
                Giá giảm dần
              </Button>
            </div>
          </div>

          {/* Sản phẩm trang hiện tại */}
          <ListCard pros={{ data: currentPageData }} />

          {/* Thanh phân trang Ellipsis */}
          <div className="mt-4 flex items-center justify-center space-x-1">
            <Button disabled={currentPage === 1} onClick={handlePrevPage}>
              &lt; Trước
            </Button>

            {pageNumbers.map((page, idx) => {
              if (page === '...') {
                return (
                  <span key={idx} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              } else {
                const pageNumber = page as number;
                return (
                  <Button
                    key={pageNumber}
                    type={pageNumber === currentPage ? 'primary' : 'default'}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              }
            })}

            <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
              Tiếp &gt;
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
