'use client';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Button, Row, Col, Typography, Select, Drawer, Checkbox, Pagination } from 'antd';
import ListCard from '@/components/listcard';

const { Title } = Typography;
const { Option } = Select;

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

export default function Products() {
  const [data, setData] = useState<APIProduct[]>([]);
  const [sort, setSort] = useState<'newest' | 'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('');
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const responseData = await response.json();
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
    setOpenFilter(false);
  };

  const togglePriceRange = (value: string) => {
    setPriceRanges(prev =>
      prev.includes(value) ? prev.filter(range => range !== value) : [...prev, value],
    );
  };

  const getPriceRangeFilter = (price: number) => {
    if (priceRanges.length === 0) return true;
    return priceRanges.some(range => {
      switch (range) {
        case 'under200':
          return price < 200000;
        case '200to500':
          return price >= 200000 && price <= 500000;
        case '500to1000':
          return price > 500000 && price <= 1000000;
        case 'above1000':
          return price > 1000000;
        default:
          return false;
      }
    });
  };

  const filteredData = data.filter(item => {
    const priceNumber = Number(item.price);
    const matchCategory = category ? item.category?.toLowerCase() === category.toLowerCase() : true;
    const matchPrice = getPriceRangeFilter(priceNumber);
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

  const [tempPriceRanges, setTempPriceRanges] = useState<string[]>([]);

  const toggleTempPriceRange = (value: string) => {
    setTempPriceRanges(prev =>
      prev.includes(value) ? prev.filter(range => range !== value) : [...prev, value],
    );
  };

  const applyFilters = () => {
    setPriceRanges(tempPriceRanges);
    setOpenFilter(false); // Đóng drawer sau khi áp dụng
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-full sm:px-3 md:px-7 lg:px-14 xl:px-[154px]">
      {/* Header */}
      <div className="flex h-[120px] items-center justify-center bg-[#22A6DF] p-4 text-center">
        <Title level={1} style={{ color: 'white' }}>
          Mua sắm cho chó
        </Title>
      </div>

      {/* Bộ lọc và sắp xếp (Mobile & Desktop) */}
      <Row className="mt-6" style={{ width: '100%' }}>
        <div className="flex w-full items-center justify-end gap-2 px-4 pb-2">
          <Button className="flex items-center gap-2 lg:hidden" onClick={() => setOpenFilter(true)}>
            <FaFilter /> Bộ lọc
          </Button>
          <Select className="w-full sm:w-auto" value={sort} onChange={value => setSort(value)}>
            <Option value="newest">Mới nhất</Option>
            <Option value="asc">Giá tăng dần</Option>
            <Option value="desc">Giá giảm dần</Option>
          </Select>
        </div>

        {/* Bộ lọc (Desktop) */}
        <Col xs={24} sm={8} md={6} lg={4} className="hidden px-4 lg:block">
          <Title level={4} className="mb-4">
            Danh mục sản phẩm
          </Title>
          <ul className="cursor-pointer space-y-2 border-b pb-4">
            {['Thức ăn', 'Phụ kiện - Đồ chơi', 'Chuồng - Vận chuyển', 'Sức khoẻ - Vệ sinh'].map(
              item => (
                <li
                  key={item}
                  className={`hover:text-[#22A6DF] ${category === item ? 'font-bold' : ''}`}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item}
                </li>
              ),
            )}
          </ul>

          <Title level={4} className="mb-4 mt-6">
            Giá
          </Title>
          <Checkbox
            onChange={() => togglePriceRange('under200')}
            checked={priceRanges.includes('under200')}
          >
            Dưới 200.000
          </Checkbox>
          <Checkbox
            onChange={() => togglePriceRange('200to500')}
            checked={priceRanges.includes('200to500')}
          >
            200.000 - 500.000
          </Checkbox>
          <Checkbox
            onChange={() => togglePriceRange('500to1000')}
            checked={priceRanges.includes('500to1000')}
          >
            500.000 - 1.000.000
          </Checkbox>
          <Checkbox
            onChange={() => togglePriceRange('above1000')}
            checked={priceRanges.includes('above1000')}
          >
            Trên 1.000.000
          </Checkbox>
        </Col>

        {/* Danh sách sản phẩm */}
        <Col className="px-4" xs={24} sm={24} md={24} lg={20}>
          <ListCard pros={{ data: currentPageData }} />
        </Col>
      </Row>
      {/* Phân trang */}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={sortedData.length}
          pageSize={itemsPerPage}
          onChange={page => setCurrentPage(page)}
        />
      </div>
      {/* Drawer cho Bộ lọc (Mobile) */}
      <Drawer placement="left" onClose={() => setOpenFilter(false)} open={openFilter}>
        <Title level={4} className="mb-4">
          Danh mục sản phẩm
        </Title>
        {['Thức ăn', 'Phụ kiện - Đồ chơi', 'Chuồng - Vận chuyển', 'Sức khoẻ - Vệ sinh'].map(
          item => (
            <p
              key={item}
              className={`cursor-pointer text-lg hover:text-[#22A6DF] ${category === item ? 'font-bold' : ''}`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </p>
          ),
        )}

        <Title level={4} className="mb-4 mt-6">
          Giá
        </Title>
        <Checkbox
          onChange={() => toggleTempPriceRange('under200')}
          checked={tempPriceRanges.includes('under200')}
          className="flex text-lg"
        >
          Dưới 200.000
        </Checkbox>
        <Checkbox
          onChange={() => toggleTempPriceRange('200to500')}
          checked={tempPriceRanges.includes('200to500')}
          className="flex text-lg"
        >
          200.000 - 500.000
        </Checkbox>
        <Checkbox
          onChange={() => toggleTempPriceRange('500to1000')}
          checked={tempPriceRanges.includes('500to1000')}
          className="flex text-lg"
        >
          500.000 - 1.000.000
        </Checkbox>
        <Checkbox
          onChange={() => toggleTempPriceRange('above1000')}
          checked={tempPriceRanges.includes('above1000')}
          className="flex text-lg"
        >
          Trên 1.000.000
        </Checkbox>

        {/* Nút Áp dụng */}
        <Button type="primary" className="mt-4 w-full" onClick={applyFilters}>
          Áp dụng
        </Button>
      </Drawer>
    </div>
  );
}
