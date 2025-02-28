'use client';
import { SetStateAction, useState } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

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

  // Handling functions
  const handleImageClick = (image: SetStateAction<string>) => {
    setCurrentImage(image);
  };

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

  const product = data.product;
  if (!product) return <div>Không tìm thấy sản phẩm. Vui lòng kiểm tra lại.</div>;

  // Breadcrumb items
  const breadcrumbItems = [
    {
      title: (
        <a href="#" className="hover:text-[#22A6DF]">
          Home
        </a>
      ),
    },
    {
      title: (
        <a href="#" className="hover:text-[#22A6DF]">
          Thức ăn
        </a>
      ),
    },
    {
      title: <span className="text-[#686868]">{product.name}</span>,
    },
  ];

  return (
    <div className="text-black">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-6xl p-4 text-sm text-[#686868]">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Hình ảnh sản phẩm */}
          <div className="flex w-full">
            <div className="flex flex-col space-y-6">
              {/* Render detail images */}
              {product.detail1 && (
                <img
                  src={`/images/products/${product.detail1}`}
                  className="w-20 cursor-pointer rounded-lg border border-[#22A6DF]"
                  onClick={() => handleImageClick(product.detail1)}
                />
              )}
              {product.detail2 && (
                <img
                  src={`/images/products/${product.detail2}`}
                  className="w-20 cursor-pointer rounded-lg border border-[#EAEAEA]"
                  onClick={() => handleImageClick(product.detail2)}
                />
              )}
              {product.detail3 && (
                <img
                  src={`/images/products/${product.detail3}`}
                  className="w-20 cursor-pointer rounded-lg border border-[#EAEAEA]"
                  onClick={() => handleImageClick(product.detail3)}
                />
              )}
              {product.detail4 && (
                <img
                  src={`/images/products/${product.detail4}`}
                  className="w-20 cursor-pointer rounded-lg border border-[#EAEAEA]"
                  onClick={() => handleImageClick(product.detail4)}
                />
              )}
            </div>
            <img
              src={currentImage || `/images/products/${product.image_url}`}
              className="ml-10 w-full rounded-lg border border-[#EAEAEA] shadow-md md:w-96"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-800">{product.name}</h1>
            <div className="mb-6 mt-2 text-lg font-bold text-[#22A6DF]">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(Number(product.price))}
              <span className="ml-2 text-sm text-[#686868] line-through">{product.oldPrice}</span>
              <span className="ml-2 rounded border border-[#FF0000] px-2 py-1 font-medium text-[#FF0000]">
                {product.discount}%
              </span>
            </div>

            {/* Số lượng */}
            <div className="mb-6 mt-4 flex gap-4">
              <span className="font-semibold">Số lượng:</span>
              <div className="flex items-center rounded-lg border">
                <Button onClick={handleDecrement} className="px-4 py-2">
                  -
                </Button>
                <input
                  min={1}
                  value={quantity}
                  onChange={handleChange}
                  className="w-4 border-none text-center md:w-12"
                />
                <Button onClick={handleIncrement} className="px-4 py-2">
                  +
                </Button>
              </div>
            </div>

            {/* Nút thêm vào giỏ hàng và mua ngay */}
            <div className="flex flex-col gap-4 md:flex-row">
              <Button className="rounded-lg bg-[#22A6DF] px-6 py-5 text-white">
                Thêm vào giỏ hàng
              </Button>
              <Button className="rounded-lg bg-[#FF0000] px-6 py-5 text-white">MUA NGAY</Button>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết sản phẩm */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Thông tin sản phẩm</h2>
          <p className="mt-2 text-[#686868]">{product.description}</p>
          <ul className="mt-2 list-disc pl-6 text-[#686868]">
            {product.details?.map((detail: string, index: number) => <li key={index}>{detail}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
// <div className="mt-8">
//   <h2 className="text-xl font-bold text-gray-800">Đánh giá sản phẩm</h2>
//   <div className="flex justify-between">
//     <div className="mt-2 flex flex-col items-start">
//       <div className="flex text-2xl text-yellow-500">★★★★★</div>
//       <p className="text-sm text-[#686868]">Dựa trên 2 đánh giá</p>
//     </div>

//     <div className="flex flex-wrap gap-2">
//       <Button className="rounded-lg bg-[#22A6DF] px-3 py-1 text-white">Tất cả</Button>
//       <Button className="rounded-lg border border-[#EAEAEA] px-3 py-1 text-[#686868]">
//         5 sao (2)
//       </Button>
//       <Button className="rounded-lg border border-[#EAEAEA] px-3 py-1 text-[#686868]">
//         4 sao (0)
//       </Button>
//       <Button className="rounded-lg border border-[#EAEAEA] px-3 py-1 text-[#686868]">
//         2 sao (0)
//       </Button>
//       <Button className="rounded-lg border border-[#EAEAEA] px-3 py-1 text-[#686868]">
//         1 sao (0)
//       </Button>
//       <Button className="rounded-lg border border-[#EAEAEA] px-3 py-1 text-[#686868]">
//         3 sao (0)
//       </Button>
//     </div>
//   </div>

//   <div className="mt-4 space-y-4">
//     <div className="rounded-lg border p-4 shadow-md">
//       <div className="flex items-center space-x-2">
//         <img
//           src="https://banner2.cleanpng.com/lnd/20240918/ko/164b0e8db7167fd67eee37afc67faa.webp"
//           className="h-10 w-10 rounded-full"
//         />
//         <div>
//           <p className="font-semibold">tinhvan2802</p>
//           <p className="text-sm text-[#686868]">12-01-2025 15:22</p>
//         </div>
//       </div>
//       <p className="mt-2 text-yellow-500">★★★★★</p>
//       <p className="mt-1 text-black">Mùi hương: thơm, dễ chịu</p>
//     </div>

//     <div className="rounded-lg border p-4 shadow-md">
//       <div className="flex items-center space-x-2">
//         <img
//           src="https://banner2.cleanpng.com/lnd/20240918/ko/164b0e8db7167fd67eee37afc67faa.webp"
//           className="h-10 w-10 rounded-full"
//         />
//         <div>
//           <p className="font-semibold">hanhan0610</p>
//           <p className="text-sm text-[#686868]">12-01-2025 15:22</p>
//         </div>
//       </div>
//       <p className="mt-2 text-yellow-500">★★★★★</p>
//       <p className="mt-1 text-black">
//         Hạt thơm, ngũi rất dễ chịu, shop đa dạng các mặt hàng, sẽ tiếp tục ủng hộ
//       </p>
//     </div>
//   </div>

//   <div className="mt-6 flex justify-center space-x-2">
//     <Button className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500">
//       ← Trước
//     </Button>
//     <Button className="rounded-lg border border-[#22A6DF] px-3 py-2 text-[#22A6DF]">
//       1
//     </Button>
//     <Button className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500">2</Button>
//     <Button className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500">3</Button>
//     <Button className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500">
//       Tiếp →
//     </Button>
//   </div>
// </div>

// <div className="mt-8">
//   <h2 className="text-center text-xl font-bold text-gray-800">Sản phẩm liên quan</h2>
//   <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
//     {Array(4)
//       .fill(null)
//       .map((_, index) => (
//         <Card key={index} className="rounded-lg border p-2 shadow-md">
//           <img src="https://picsum.photos/300/200" className="w-full rounded-lg" />
//           <p className="font-bold text-[#22A6DF]">130.000₫</p>
//           <p className="mt-2 font-medium text-gray-800">Thức ăn mèo ROYAL CANIN</p>
//         </Card>
//       ))}
//   </div>
// </div>
//       </div>
//     </div>
//   );
// }
