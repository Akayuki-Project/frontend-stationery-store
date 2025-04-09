import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_BANNER } from '../../utils/Endpoint';

const { Option } = Select;

const BannerUpdate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [banner, setBanner] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${URL_BANNER}/${id}`)
      .then((res) => {
        console.log(res);
        setBanner(res.data);
        form.setFieldsValue({
          description1: res.data.description1,
          description2: res.data.description2,
          discount: res.data.discount,
        });

        if (res.data.thumbnail) {
          setFileList([{
            uid: '-1',
            name: 'thumbnail.png',
            status: 'done',
            url: res.data.thumbnail,
          }]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = async (values) => {
    setLoading(true);

    if (fileList.length === 0 || (!fileList[0].originFileObj && !fileList[0].url)) {
        message.error("Please upload a thumbnail!");
        setLoading(false);
        return;
      }

    const data = new FormData();
    data.append('description1', values.description1);
    data.append('description2', values.description2);
    data.append('discount', values.discount || 0);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      data.append("thumbnail", fileList[0].originFileObj);
    }

    try {
      await axios.patch(`${URL_BANNER}/${id}`, data);
      message.success('Banner updated successfully ✨');
      form.resetFields();
      setFileList([]);
      navigate('/dashboard/banners');
    } catch (error) {
      message.error('Failed to update banner');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div>
      <h1>Edit Banner Promo</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          category: "electronics", // Menentukan kategori default
        }}
      >
        <Form.Item
          name="description1"
          label="Description 1"
          rules={[{ required: true, message: 'Please input description 1' }]}>
          <Input placeholder="Enter description 1" />
        </Form.Item>

        <Form.Item
          name="description2"
          label="Description 2"
          rules={[{ required: true, message: 'Please input description 2' }]}>
          <Input placeholder="Enter description 2" />
        </Form.Item>

        <Form.Item
          name="discount"
          label="Diskon (%)">
          <Input type="number" placeholder="Enter discount percentage" />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            listType="picture"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Banner
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BannerUpdate;
