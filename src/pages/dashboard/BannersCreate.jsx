import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL_BANNER } from "../../utils/Endpoint";

const { Option } = Select;

const BannerCreate = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    console.log("values", values);
    const data = new FormData();
    data.append("description1", values.description1);
    data.append("description2", values.description2);
    data.append("discount", values.discount || 0);
    data.append("thumbnail", values.thumbnail[0].originFileObj);

    try {
      await axios.post(URL_BANNER, data);
      message.success("Banner added successfully ✨");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/banners");
    } catch (error) {
      console.error("Failed to add banner:");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newList }) => setFileList(newList);

  return (
    <div>
      <h1>Add Banner</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="description1"
          label="Description 1"
          rules={[{ required: true, message: "Please input description 1" }]}
        >
          <Input placeholder="Enter description 1" />
        </Form.Item>

        <Form.Item
          name="description2"
          label="Deskripsi 2"
          rules={[{ required: true, message: "Please input description 2" }]}
        >
          <Input placeholder="Enter description 2" />
        </Form.Item>

        <Form.Item name="discount" label="Diskon (%)">
          <Input type="number" placeholder="Enter discount percentage" />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          valuePropName="fileList"
          getValueFromEvent={({ fileList }) => fileList}
          rules={[{ required: true, message: "Please upload a thumbnail" }]}
        >
          <Upload
            action="/uploads/banners" // Atur sesuai endpoint upload file Anda
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false} // Menghindari upload otomatis
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Banner
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BannerCreate;
