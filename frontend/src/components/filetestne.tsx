'use client';
import { SetStateAction, useState } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

// Thêm component Loader
const Loader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="relative">
      {/* Loader container */}
      <div className="h-24 w-24">
        {/* Animated circles */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-t-4 border-[#22A6DF] opacity-20"></div>
        <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-4 border-t-[#22A6DF]"></div>
        
        {/* Paw print in center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <svg 
            className="h-10 w-10 animate-pulse text-[#22A6DF]" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12,8.5C12,6.567,10.433,5,8.5,5S5,6.567,5,8.5S6.567,12,8.5,12S12,10.433,12,8.5z M8.5,11C7.119,11,6,9.881,6,8.5
              S7.119,6,8.5,6S11,7.119,11,8.5S9.881,11,8.5,11z M15.5,5C13.567,5,12,6.567,12,8.5s1.567,3.5,3.5,3.5S19,10.433,19,8.5
              S17.433,5,15.5,5z M15.5,11C14.119,11,13,9.881,13,8.5S14.119,6,15.5,6S18,7.119,18,8.5S16.881,11,15.5,11z M12,13
              c-2.209,0-4,1.791-4,4v3h8v-3C16,14.791,14.209,13,12,13z M15,19h-6v-2c0-1.654,1.346-3,3-3s3,1.346,3,3V19z M7,13
              c-2.209,0-4,1.791-4,4v3h2v-3c0-1.195,0.392-2.297,1.051-3.193C5.933,13.392,5.696,13,5.414,13H7z M17,13h1.586
              c-0.282,0-0.519,0.392-0.637,0.807C18.608,14.703,19,15.805,19,17v3h2v-3C21,14.791,19.209,13,17,13z"/>
          </svg>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-[#22A6DF]">Đang tải</p>
        <div className="flex justify-center space-x-1">
          <div className="animate-bounce text-[#22A6DF] delay-0">.</div>
          <div className="animate-bounce text-[#22A6DF] delay-100">.</div>
          <div className="animate-bounce text-[#22A6DF] delay-200">.</div>
        </div>
      </div>
    </div>
  </div>
);

export default function DetailProduct() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetcher = (url: string | URL | Request) => fetch(url).then(res => res.json());
  const { data, error } = useSWR(`http://localhost:5000/api/v1/products/${params.id}`, fetcher, {
    refreshInterval: 15000,
  });

  // Loading and error states
  if (error) return (
    <div className="flex min-h-screen items-center justify-center text-red-500">
      Lỗi load dữ liệu...
    </div>
  );
  if (!data) return <Loader />;
}
  // Rest of your component code remains the same...