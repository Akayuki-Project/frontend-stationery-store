import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL_PRODUCT } from '../../utils/Endpoint'; // Ganti dengan URL backend Anda
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani submit form
  const handleSubmit = async (values) => {
    setLoading(true);

    console.log('values', values);
    const data = new FormData();
    data.append('name', values.name);
    data.append('price', values.price);
    data.append('description', values.description);
    data.append('discount', values.discount || 0); // default 0 jika kosong
    data.append('stock', values.stock);
    data.append('thumbnail', values.thumbnail[0].originFileObj);

    try {
        await axios.post(URL_PRODUCT, data);
        message.success('Product added successfully');
        form.resetFields();
        setFileList([]);
        navigate('/dashboard/products');
    } catch (error) {
        console.error('Failed to add product');
    } finally {
        setLoading(false);
    }
};

// Fungsi untuk menangani perubahan file upload
const handleChange = ({ fileList: newFileList}) => setFileList(newFileList);
    
return (
    <div>
        <h1>Add Product</h1>
        <Form
            form={form}
            layout='vertical'
            onFinish={handleSubmit}
            initialValues={{ 
                category: "electronics", // Menentukan kategori default
             }}>
                <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please input product name' }]}>
                    <Input placeholder='Enter product name' />
                </Form.Item>

                <Form.Item
                name='price'
                label='Price'
                rules={[{ required: true, message: 'Please input product price' }]}>
                    <Input type='number' placeholder='Enter product price' />
                </Form.Item>

                {/* <Form.Item
                    name='category'
                    label='Category'
                    rules={[{ required: true, message: 'Please select a category' }]}
                    >
                    <Select>
                    <Option value='electronics'>Electronics</Option>
                    <Option value='fashion'>Fashion</Option>
                    <Option value='home'>Home</Option>
                    <Option value='beauty'>Beauty</Option>
                    </Select>
                    </Form.Item> */}

                <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter product description' }]}>
                <Input.TextArea placeholder="Enter product description" rows={4} />
                </Form.Item>

                <Form.Item
                name="discount"
                label="Discount (%)">
                <Input type="number" placeholder="Enter discount percentage" />
                </Form.Item>

                <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Please enter product stock' }]}>
                <Input type="number" placeholder="Enter stock quantity" />
                </Form.Item>

                <Form.Item
                name='thumbnail'
                label='Thumbnail'
                valuePropName='fileList'
                getValueFromEvent={({ fileList }) => fileList}
                rules={[{ required: true, message: 'Please upload a thumbnail' }]}>
                <Upload
                    action='/uploads/products' // Atur sesuai endpoint upload file Anda
                    listType='picture'
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false} // Menghindari upload otomatis
                    maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Add Product
                    </Button>
                </Form.Item>
             </Form>
        </div>
    );
};

export default AddProduct;