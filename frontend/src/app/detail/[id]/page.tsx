'use client';
import { SetStateAction, useState } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Loader from '@/components/loader';

export default function DetailProduct() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetcher = (url: string | URL | Request) => fetch(url).then(res => res.json());
  const { data, error } = useSWR(`http://localhost:5000/api/v1/products/${params.id}`, fetcher, {
    refreshInterval: 15000,
  });

  console.log('API Data:', data);

  if (error) return (
    <div className="flex min-h-screen items-center justify-center text-red-500">
      Lỗi load dữ liệu...
    </div>
  );
  if (!data) return <Loader />;if (error) return (
    <div className="flex min-h-screen items-center justify-center text-red-500">
      Lỗi load dữ liệu...
    </div>
  );
  if (!data) return <Loader />;

  // Handling functions
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
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
    <h1>fack u</h1>
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
              {product.image_url[0] && (
                <img

                  src={`/images/products/${product.image_url[0]}`}
                  alt="Detail 1"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.image_url[0] ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.image_url[0])}

                  src={`/images/products/${product.detail1}`}
                  alt="Detail 1"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.detail1 ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.detail1)}

                />
              )}
              {product.image_url[1] && (
                <img

                  src={`/images/products/${product.image_url[1]}`}
                  alt="Detail 2"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.image_url[1] ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.image_url[1])}

                  src={`/images/products/${product.detail2}`}
                  alt="Detail 2"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.detail2 ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.detail2)}

                />
              )}
              {product.image_url[2] && (
                <img

                  src={`/images/products/${product.image_url[2]}`}
                  alt="Detail 3"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.image_url[2] ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.image_url[2])}

                  src={`/images/products/${product.detail3}`}
                  alt="Detail 3"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.detail3 ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.detail3)}

                />
              )}
              {product.image_url[3] && (
                <img

                  src={`/images/products/${product.image_url[3]}`}
                  alt="Detail 4"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.image_url[3] ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.image_url[3])}

                  src={`/images/products/${product.detail4}`}
                  alt="Detail 4"
                  className={`w-20 cursor-pointer rounded-lg border transition-all duration-300 ${
                    selectedImage === product.detail4 ? 'border-[#22A6DF]' : 'border-[#EAEAEA] hover:border-[#22A6DF]'
                  }`}
                  onClick={() => handleImageClick(product.detail4)}

                />
              )}
            </div>
            <div className="ml-10 w-full md:w-96">
              <img

                src={selectedImage ? `/images/products/${selectedImage}` : `/images/products/${product.image_url[0]}`}
=======
                src={selectedImage ? `/images/products/${selectedImage}` : `/images/products/${product.image_url}`}

                alt="Main product"
                className="w-full rounded-lg border border-[#EAEAEA] shadow-md transition-all duration-300"
              />
            </div>
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