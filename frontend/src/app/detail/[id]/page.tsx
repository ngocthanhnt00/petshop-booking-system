"use client";
import { useState } from "react";
import { Breadcrumb, Button, InputNumber, Card } from "antd";

export default function DetailProduct() {
    const breadcrumbItems = [
        {
          title: <a href="#" className="hover:text-[#22A6DF]">Home</a>,
        },
        {
          title: <a href="#" className="hover:text-[#22A6DF]">Thức ăn</a>,
        },
        {
          title: <span className="text-[#686868]">Thức ăn cho mèo ROYAL CANIN</span>,
        },
    ];
    const [quantity, setQuantity] = useState(1);

    const handleChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
      if (/^\d+$/.test(value)) { 
        setQuantity(Math.max(1, Number(value)));
      }
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); 
    };
    return (
    <div className="text-black">
        <nav className="max-w-6xl mx-auto text-sm text-[#686868] p-4">
            <Breadcrumb items={breadcrumbItems} />
        </nav>

        <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex w-full">
            <div className="flex flex-col space-y-6">
                <img src="https://bizweb.dktcdn.net/100/091/443/products/royal-canin-mother-baby-cat.jpg?v=1555301088897"
                className="w-20 border border-[#22A6DF] rounded-lg cursor-pointer" />
                <img src="https://bizweb.dktcdn.net/100/091/443/products/royal-canin-mother-baby-cat.jpg?v=1555301088897"
                className="w-20 border border-[#EAEAEA] rounded-lg cursor-pointer" />
                <img src="https://bizweb.dktcdn.net/100/091/443/products/royal-canin-mother-baby-cat.jpg?v=1555301088897"
                className="w-20 border border-[#EAEAEA] rounded-lg cursor-pointer" />
                <img src="https://bizweb.dktcdn.net/100/091/443/products/royal-canin-mother-baby-cat.jpg?v=1555301088897"
                className="w-20 border border-[#EAEAEA] rounded-lg cursor-pointer" />
            </div>
            <img src="https://bizweb.dktcdn.net/100/091/443/products/royal-canin-mother-baby-cat.jpg?v=1555301088897"
                className="w-full md:w-96 border border-[#EAEAEA] rounded-lg shadow-md ml-10" />
            </div>

            <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Thức ăn cho mèo ROYAL CANIN Mother & Babycat</h1>
            <div className="text-lg text-[#22A6DF] font-bold mt-2 mb-6">100.500₫ 
                <span className="text-[#686868] line-through text-sm ml-2">130.000₫</span> 
                <span className="text-[#FF0000] font-medium border border-[#FF0000] px-2 py-1 rounded ml-2">-15%</span>
            </div>
            <div className="mt-4 mb-6">
                <span className="font-semibold">Size:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Button type="default">1kg</Button>
                    <Button type="default">2kg</Button>
                    <Button type="default">4kg</Button>
                </div>
            </div>

            <div className="flex gap-4 mt-4 mb-6">
                <span className="font-semibold">Số lượng:</span>
                <div className="flex items-center border rounded-lg">
                <Button onClick={handleDecrement} className="px-4 py-2">-</Button>
                <input min={1}
                    value={quantity}
                    onChange={handleChange} 
                    className="w-4 md:w-12 text-center border-none" />
                <Button onClick={handleIncrement} className="px-4 py-2">+</Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <Button className="bg-[#22A6DF] text-white px-6 py-5 rounded-lg">Thêm vào giỏ hàng</Button>
                <Button className="bg-[#FF0000] text-white px-6 py-5 rounded-lg">MUA NGAY</Button>
            </div>
            </div>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800">Thông tin sản phẩm</h2>
            <p className="mt-2 text-[#686868]">THỨC ĂN CHO MÈO ROYAL CANIN MOTHER & BABY CAT
            MOTHER & BABY CAT là sản phẩm thức ăn khô dành cho mèo đang mang thai, đang chăm sóc con và mèo con dưới 4 tháng tuổi của Royal Canin, Pháp.
            Thức ăn mèo MOTHER & BABY CAT là thức ăn phù hợp được thiết kế riêng cho các bé mèo ở sau quá trình cai sữa và ở giai đoạn mới phát triển (0 – 4 tháng).
            Hạt MOTHER & BABY CAT đặc biệt nhỏ giúp các bé dễ ăn hơn hỗ trợ thói quen nhai thức ăn của các bé. Ở giai đoạn này phát triển này, mèo con rất cần nguồn dưỡng chất đặc biệt dễ tiêu hóa và hấp thu. Babycat là sự kết hợp độc đáo các chất dinh dưỡng hỗ trợ tăng miễn dịch cho mèo con.
            </p>
            <ul className="list-disc pl-6 mt-2 text-[#686868]">
            <li>Mèo mẹ mang thai hoặc cho con bú; mèo con từ 1 đến 4 tháng tuổi</li>
            <li>Được nghiên cứu dựa trên nhu cầu dinh dưỡng của mèo mẹ đang mang thai và trong quá trình cho con bú. Công thức của ROYAL CANIN MOTHER AND BABYCAT là sự cân bằng tối ưu giữa protein, chất béo và carbohydrate nhằm hỗ trợ ngon miệng và bổ sung chất dinh dưỡng cần thiết.</li>
            <li>Hỗ trợ sức khỏe hệ thống miễn dịch</li>
            <li>Duy trì sức khỏe tiêu hóa</li>
            <li>Đặc biệt cai sữa dễ dàng</li>
            <li>100% dinh dưỡng cân bằng</li>
            <li>100% đảm bảo an toàn</li>
            </ul>
            <ul className="list-disc pl-6 mt-2 text-[#686868]"><strong className="text-black">Tác dụng chính:</strong>
            <li>Tăng cường sức đề kháng</li>
            <li>Hỗ trợ trong việc cai sữa</li>
            <li>Kích thích tiêu hóa</li>
            </ul>
            <ul className="list-disc pl-6 mt-2 text-[#686868]"><strong className="text-black">Thành phần:</strong>
            <li>Protein gia cầm, chất béo động vật, bột bắp, gạo, protein thực vật*, protein động vật, men, dầu cá, củ cải đường, xơ thực vật, dầu đậu nành, khoáng chất, fructo-oligo-sacarit (0,35%), men thủy phân (nguồn manno-oligo-sacarit), chiết xuất men (nguồn betaglucan), chiết xuất cúc vạn thọ (nguồn lutein).</li>
            <li>Phụ gia dinh dưỡng: Vitamin A, Vitamin D3, Vitamin E, E1 (Sắt), E2 (I ốt), E4 (Đồng), E5 (Mangan), E6 (Kẽm), E8 (Selen)</li>
            <li>Phụ gia kỹ thuật: Clinoptilolite - Chất chống oxi hóa</li>
            <li>Trên mỗi kg: DHA: 1,87 g.  
                *L.I.P.: Protein có độ tiêu hóa cao.</li>
            </ul>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800">Đánh giá sản phẩm</h2>
            <div className="flex justify-between">
            <div className="flex flex-col items-start mt-2">
                <div className="flex text-yellow-500 text-2xl">
                ★★★★★
                </div>
                <p className="text-[#686868] text-sm">Dựa trên 2 đánh giá</p>
            </div>

            <div className="flex flex-wrap gap-2">
                <Button className="px-3 py-1 bg-[#22A6DF] text-white rounded-lg">Tất cả</Button>
                <Button className="px-3 py-1 border border-[#EAEAEA] text-[#686868] rounded-lg">5 sao (2)</Button>
                <Button className="px-3 py-1 border border-[#EAEAEA] text-[#686868] rounded-lg">4 sao (0)</Button>
                <Button className="px-3 py-1 border border-[#EAEAEA] text-[#686868] rounded-lg">2 sao (0)</Button>
                <Button className="px-3 py-1 border border-[#EAEAEA] text-[#686868] rounded-lg">1 sao (0)</Button>
                <Button className="px-3 py-1 border border-[#EAEAEA] text-[#686868] rounded-lg">3 sao (0)</Button>
            </div>
            </div>

            <div className="mt-4 space-y-4">
            <div className="border p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                <img src="https://banner2.cleanpng.com/lnd/20240918/ko/164b0e8db7167fd67eee37afc67faa.webp" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold">tinhvan2802</p>
                    <p className="text-sm text-[#686868]">12-01-2025 15:22</p>
                </div>
                </div>
                <p className="mt-2 text-yellow-500">★★★★★</p>
                <p className="mt-1 text-black">Mùi hương: thơm, dễ chịu</p>
            </div>

            <div className="border p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                <img src="https://banner2.cleanpng.com/lnd/20240918/ko/164b0e8db7167fd67eee37afc67faa.webp" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold">hanhan0610</p>
                    <p className="text-sm text-[#686868]">12-01-2025 15:22</p>
                </div>
                </div>
                <p className="mt-2 text-yellow-500">★★★★★</p>
                <p className="mt-1 text-black">Hạt thơm, ngũi rất dễ chịu, shop đa dạng các mặt hàng, sẽ tiếp tục ủng hộ</p>
            </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
            <Button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg">← Trước</Button>
            <Button className="px-3 py-2 border border-[#22A6DF] text-[#22A6DF] rounded-lg">1</Button>
            <Button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg">2</Button>
            <Button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg">3</Button>
            <Button className="px-3 py-2 border border-gray-300 text-gray-500 rounded-lg">Tiếp →</Button>
            </div>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 text-center">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {Array(4).fill(null).map((_, index) => (
                <Card key={index} className="border rounded-lg shadow-md p-2">
                <img src="https://picsum.photos/300/200" className="w-full rounded-lg" />
                <p className="text-[#22A6DF] font-bold">130.000₫</p>
                <p className="mt-2 text-gray-800 font-medium">Thức ăn mèo ROYAL CANIN</p>
                </Card>
            ))}
            </div>
        </div>
        </div>
    </div>
    );
  }
  