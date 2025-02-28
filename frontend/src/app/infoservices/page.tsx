'use client';
import { Table, Card, Breadcrumb, Button, Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;
import { HomeOutlined } from '@ant-design/icons';

const PetSpaServices = () => {
  const breadcrumbItems = [
    {
      title: (
        <a href="#" className="hover:text-[#22A6DF]">
          Home
        </a>
      ),
    },
    { title: <span className="text-[#686868]">Dịch vụ thú cưng</span> },
  ];

  // Bảng giá tắm cho chó
  const dogBathColumns = [
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Lông ngắn',
      dataIndex: 'shortFur',
      key: 'shortFur',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Lông dài',
      dataIndex: 'longFur',
      key: 'longFur',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
  ];

  const dogBathData = [
    { key: '1', weight: '< 5kg', shortFur: '100k', longFur: '150k' },
    { key: '2', weight: '5 - 10kg', shortFur: '150k', longFur: '250k' },
    { key: '3', weight: '10 - 20kg', shortFur: '250k', longFur: '350k' },
    { key: '4', weight: '20 - 40kg', shortFur: '350k', longFur: '500k' },
    { key: '5', weight: '> 40kg', shortFur: '500k', longFur: '650k' },
  ];

  // Bảng giá tắm cho mèo
  const catBathColumns = [
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Lông ngắn/dài',
      dataIndex: 'price',
      key: 'price',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
  ];

  const catBathData = [
    { key: '1', weight: '< 5kg', price: '200k' },
    { key: '2', weight: '5 - 10kg', price: '300k' },
  ];

  // Bảng giá combo
  const comboBathColumns = [
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Tắm - Cắt, tỉa lông',
      dataIndex: 'shortFur',
      key: 'shortFur',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Tắm - Cạo lông',
      dataIndex: 'longFur',
      key: 'longFur',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
  ];

  const comboBathData = [
    { key: '1', weight: '< 5kg', shortFur: '320k', longFur: '300k' },
    { key: '2', weight: '5 - 10kg', shortFur: '520k', longFur: '500k' },
    { key: '3', weight: '10 - 20kg', shortFur: '620k', longFur: '600k' },
    { key: '4', weight: '20 - 40kg', shortFur: '720k', longFur: '700k' },
    { key: '5', weight: '> 40kg', shortFur: '820k', longFur: '800k' },
  ];

  // Bảng giá cắt tỉa cạo lông
  const serviceBathColumns = [
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
    {
      title: 'Giá tiền',
      dataIndex: 'shortFur',
      key: 'shortFur',
      render: (text: any) => <span style={{ color: '#22A6DF' }}>{text}</span>,
    },
  ];

  const serviceBathData = [
    { key: '1', weight: '< 5kg', shortFur: '150k' },
    { key: '2', weight: '5 - 10kg', shortFur: '250k' },
    { key: '3', weight: '10 - 20kg', shortFur: '350k' },
    { key: '4', weight: '20 - 40kg', shortFur: '450k' },
    { key: '5', weight: '> 40kg', shortFur: '550k' },
  ];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            DỊCH VỤ SPA CHUYÊN NGHIỆP CHO THÚ CƯNG TẠI PET HEAVEN
          </h1>
          <Button type="primary" size="large" className="bg-[#22A6DF] hover:opacity-90">
            ĐẶT LỊCH NGAY
          </Button>
        </div>

        <Card className="mb-7">
          <h2 className="mb-6 text-xl font-semibold">Quy trình tắm vệ sinh bao gồm 12 bước:</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <ol className="list-inside list-decimal space-y-2">
                {[
                  'Kiểm tra sức khỏe cơ bản',
                  'Vệ sinh tai, nhổ lông tai',
                  'Cạo lông bàn chân',
                  'Cạo lông bụng, vùng vệ sinh',
                  'Cắt móng, dũa móng',
                  'Vắt tuyến hôi',
                ].map((step, index) => (
                  <li key={index} className="text-red-800">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <ol className="list-inside list-decimal space-y-2" start={7}>
                {[
                  'Tắm và dưỡng xả lông',
                  'Sấy khô lông',
                  'Gỡ rối, đánh tơi lông',
                  'Kiểm tra tai sau khi tắm',
                  'Tỉa gọn lông vùng mắt',
                  'Thoa dưỡng và thơm lông',
                ].map((step, index) => (
                  <li key={index} className="text-red-800">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Card>

        <Text className="mb-7 text-gray-800">
          <strong className="mb-2 text-xl">I. NHỮNG CAM KẾT TẠI PET HEAVEN VỚI KHÁCH HÀNG:</strong>
          <br />
          <strong className="ml-2 text-lg">
            1. Đội ngũ nhân viên tại Pet Heaven làm việc nhiệt huyết và trách nhiệm với công việc:
          </strong>
          <Paragraph className="ml-2 text-base text-gray-700">
            - Với tiêu chí đặt khách hàng lên hàng đầu, Pet Haven cố gắng để tất cả Khách hàng đều
            cảm thấy thoải mái và hài lòng khi đến trải nghiệm dịch vụ.
            <br />- Bên cạnh việc tư vấn dịch vụ spa, các bạn nhân viên luôn sẵn lòng chia sẻ kinh
            nghiệm chăm sóc khi thú cưng của bạn gặp các vấn đề về sức khỏe. Các dịch vụ và sản phẩm
            phân phối tại Pet Heaven luôn được cam kết về chất lượng, trách nhiệm khi đến tay Khách
            hàng.
          </Paragraph>
          <strong className="ml-2 text-lg">2. Giá dịch vụ rẻ và vẫn chất lượng nhất:</strong>
          <Paragraph className="ml-2 text-base text-gray-700">
            - Chi phí cho dịch vụ spa chó mèo tại Pet Heaven luôn đảm bảo hợp lý và cạnh tranh nhất
            hiện nay để tất cả thú cưng đều có thể đến và trải nghiệm dịch vụ.
            <br />
            - Bên cạnh chi phí hợp lý, còn có rất nhiều ưu đãi kèm theo ví dụ như: giảm giá 30% cho
            các dịch vụ ...
            <br />- Pet Heaven không ngừng phát triển trình độ và tay nghề của nhân viên spa để đem
            lại kết quả tốt nhất khi làm dịch vụ. Tại Pet Heaven, chúng tôi không cam kết mức giá
            dịch vụ rẻ nhất nhưng với mức giá đó, đảm bảo Khách hàng sẽ hài lòng nhất khi chọn dịch
            vụ tại Pet Heaven.
          </Paragraph>
          <strong className="mb-2 text-xl">
            III. BẢNG GIÁ DỊCH VỤ TẮM VỆ SINH, CẠO CẮT TỈA LÔNG CHO CHÓ MÈO:
          </strong>
          <br />
          <Paragraph className="ml-2 text-base text-gray-700">
            Bảng giá đã bao gồm đầy đủ quy trình 12 bước spa tại Pet Heaven. Dịch vụ có thể phát
            sinh thêm phụ phí theo yêu cầu thêm của Khách hàng như: Gỡ rối lông hay làm ngoài giờ.
          </Paragraph>
        </Text>

        <div className="mb-7 grid gap-8 md:grid-cols-2">
          <Card title="BẢNG GIÁ TẮM CHO CHÓ" bordered={false}>
            <Table columns={dogBathColumns} dataSource={dogBathData} pagination={false} />
          </Card>
          <Card title="BẢNG GIÁ TẮM CHO MÈO" bordered={false}>
            <Table columns={catBathColumns} dataSource={catBathData} pagination={false} />
          </Card>
          <Card title="BẢNG GIÁ THEO COMBO" bordered={false}>
            <Table columns={comboBathColumns} dataSource={comboBathData} pagination={false} />
          </Card>
          <Card title="BẢNG GIÁ CẮT, TỈA, CẠO LÔNG" bordered={false}>
            <Table columns={serviceBathColumns} dataSource={serviceBathData} pagination={false} />
          </Card>
        </div>

        {/* Notes Section */}
        <Text className="mb-7 text-gray-800">
          <strong className="mb-2 text-xl">
            IV. NHỮNG LƯU Ý KHI SỬ DỤNG DỊCH VỤ SPA TẠI PET HEAVEN:
          </strong>
          <br />
          <Paragraph className="ml-2 text-base text-gray-700">
            - Pet Heaven không nhận spa khi các bé đang mang thai, đang điều trị bệnh, mới phẫu
            thuật, có tiểu sử bệnh hen, co giật hay các bệnh lý khác khiến thú cưng không có khả
            năng tự chủ.
            <br />
            - Để đảm bảo sức khỏe cho thú cưng đến làm dịch vụ spa, khi đưa các bé đến Khách hàng
            lưu ý: Không để thú cưng quá đói, quá no hay vận động quá sức trước khi đến spa. Nếu thú
            cưng có những biểu hiện bất thường xin hãy liên hệ với Pet Heaven để được hỗ trợ.
            <br />- Làm xong dịch vụ, Khách hàng vui lòng kiểm tra thật kỹ thú cưng của mình khi đến
            đón về. Điều này nhằm đảm bảo nhân viên spa tại Pet Heaven đã hoàn thành đúng quy trình
            spa cho các bé. Nếu có bất cứ điều gì chưa hài lòng, hãy liên hệ với Pet Heaven qua
            hotline, fanpage Pet Heaven để được hỗ trợ.
          </Paragraph>
        </Text>
      </div>
    </div>
  );
};

export default PetSpaServices;
