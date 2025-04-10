import React, { useEffect, useState } from "react";
import { Table, Button, Image, Card, Spin } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL_BANNER } from "../../utils/Endpoint";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchBanners = () => {
    setLoading(true);
    axios
      .get(URL_BANNER)
      .then((res) => {
        setBanners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching banners:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBanners();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${URL_BANNER}/${id}`)
      .then(() => window.location.reload())
      .catch((err) => console.log("err", err));
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (_, record) => <Image src={record.thumbnail} width={100} />,
    },
    {
      title: "Diskon",
      dataIndex: "discount",
      render: (text) => `${text}%`,
    },
    {
      title: "Description 1",
      dataIndex: "description1",
    },
    {
      title: "Description 2",
      dataIndex: "description2",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button type="primary">
            <Link to={`/dashboard/banners/${record?._id}`}>Update</Link>
          </Button>
          <Button
            className="ml-2 mt-2"
            type="primary"
            danger
            onClick={() => handleDelete(record?._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>List Banner</h1>
      <Link to="/dashboard/banners/create">
        <Button type="primary" className="mt-2 mb-4">
          Tambah Banner
        </Button>
      </Link>

      {loading ? (
        <div className="text-center py-10">
          <Spin />
        </div>
      ) : isMobile ? (
        <div className="flex flex-col gap-4">
          {banners.map((banner) => (
            <Card key={banner._id}>
              <Image src={banner.thumbnail} width={120} />
              <p className="mt-2">
                <strong>Diskon:</strong> {banner.discount}
              </p>
              <p>
                <strong>Description 1:</strong> {banner.description1}
              </p>
              <p>
                <strong>Description 2:</strong> {banner.description2}
              </p>
              <div className="flex gap-2 mt-2">
                <Button type="primary">
                  <Link to={`/dashboard/banners/${banner._id}`}>Update</Link>
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(banner._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Table
          className="mt-2"
          dataSource={banners}
          columns={columns}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default Banners;
