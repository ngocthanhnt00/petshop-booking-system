'use client';

import { Input, Button, Form, message } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

export default function ContactPage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ lại sớm!');
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: <EnvironmentOutlined className="text-2xl text-blue-500" />,
      title: "Địa chỉ",
      content: "116 Nguyễn Văn Thủ, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam"
    },
    {
      icon: <PhoneOutlined className="text-2xl text-blue-500" />,
      title: "Số điện thoại",
      content: "0393153129"
    },
    {
      icon: <MailOutlined className="text-2xl text-blue-500" />,
      title: "Email",
      content: "contact@petheaven.com"
    },
    {
      icon: <ClockCircleOutlined className="text-2xl text-blue-500" />,
      title: "Thời gian làm việc",
      content: "8h - 21h từ thứ 2 đến thứ 7\n8h - 19h chủ nhật"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 p-4 bg-white rounded-lg shadow-sm">
          <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
            Trang chủ
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Liên hệ</span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
            {/* Contact Information */}
            <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-gray-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Thông tin liên hệ
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 mt-1 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              {/* <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Kết nối với chúng tôi</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={`/${social}-icon.png`}
                        alt={social}
                        className="w-6 h-6"
                      />
                    </a>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Contact Form */}
            <div className="p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Gửi thắc mắc cho chúng tôi
              </h2>
              <p className="text-gray-600 mb-6">
                Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                >
                  <Input
                    placeholder="Tên của bạn"
                    className="h-12 rounded-lg"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input
                      placeholder="Email của bạn"
                      className="h-12 rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                  >
                    <Input
                      placeholder="Số điện thoại"
                      className="h-12 rounded-lg"
                    />
                  </Form.Item>
                </div>


                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                  <Input.TextArea
                    placeholder="Nội dung tin nhắn"
                    className="rounded-lg"
                    rows={4}
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-12 px-8 text-base font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors w-full sm:w-auto"
                  >
                    Gửi cho chúng tôi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}