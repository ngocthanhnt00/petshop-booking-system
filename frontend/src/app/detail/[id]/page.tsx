'use client';
import { SetStateAction, useState } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function DetailProduct() {
  const params = useParams();
  const [currentImage, setCurrentImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetcher = (url: string | URL | Request) => fetch(url).then(res => res.json());
  const { data, error } = useSWR(`http://localhost:5000/api/v1/products/${params.id}`, fetcher, {
    refreshInterval: 15000,
  });

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

  // Loading states
  if (error) return <div>Lỗi load dữ liệu...</div>;
  if (!data) return <div>Đang tải...</div>;

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
