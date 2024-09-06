import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Table from "../components/Table";
import { Modal, Input, Dropdown, Button, Space } from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState({ label: "", key: "", value: "" });
  const [name, setName] = useState("");
  const [statusCounts, setStatusCounts] = useState({
    onHold: 0,
    onProgress: 0,
    completed: 0,
  });
  const [selectedstatus, setSelectedStatus] = useState({
    label: "",
    key: "",
    value: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/Jobsites/statusCounts")
      .then((response) => response.json())
      .then((data) => {
        setStatusCounts(data);
      })
      .catch((error) => {
        console.error("Error fetching status counts:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobsite = {
      name,
      cateogory_id: category.key,
      status: selectedstatus.value,
    };

    const response = await fetch("http://localhost:5000/api/Jobsites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobsite),
    });

    setIsModalOpen(false);

    if (response.ok) {
      const newJobsite = await response.json();
      console.log("Jobsite added:", newJobsite);
      setName("");
      setSelectedStatus({ label: "", key: "", value: "" });
      setCategory({ label: "", key: "", value: "" });
    } else {
      console.log("Failed to add jobsite");
    }
  };

  const handleCategoryClick = (e) => {
    setCategory(
      categories.find((item) => {
        return item.key === e.key;
      })
    );
  };

  const handleStatusClick = (e) => {
    setSelectedStatus(statuses.find((item) => item.key === e.key));
  };

  const categories = [
    {
      label: "category One",
      value: "categoryOne",
      key: "1",
    },
    {
      label: "Category Two",
      value: "categoryTwo",
      key: "2",
    },
    {
      label: "Category Three",
      value: "categoryThree",
      key: "3",
    },
    {
      label: "Category Four",
      value: "categoryFour",
      key: "4",
    },
  ];

  const statuses = [
    {
      label: "On Hold",
      value: "ONHOLD",
      key: "1",
    },
    { label: "Completed", value: "COMPLETED", key: "2" },
    { label: "On Progress", value: "ONPROGRESS", key: "3" },
  ];

  const categoryProps = {
    items: categories.map((category) => ({
      label: category.label,
      key: category.key,
      onClick: handleCategoryClick,
    })),
  };

  const statusProps = {
    items: statuses.map((status) => ({
      label: status.label,
      value: status.value,
      key: status.key,
      onClick: handleStatusClick,
    })),
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCategory({ key: "", label: "" });
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div
          className={`${styles.category} ${styles.one}`}
        >{`${statusCounts.onProgress} On Road`}</div>
        <div
          className={`${styles.category} ${styles.two}`}
        >{`${statusCounts.completed} Completed`}</div>
        <div
          className={`${styles.category} ${styles.three}`}
        >{`${statusCounts.onHold} On Hold`}</div>
      </div>
      <Table showModal={showModal} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        cancelText="Cancel Changes"
        cancelButtonProps={{ icon: <CloseOutlined /> }}
        okText="Create Jobsite"
        okButtonProps={{ icon: <CheckOutlined /> }}
      >
        <Input
          placeholder="Type The Jobsite Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.dropdowns}>
          <Dropdown menu={categoryProps}>
            <Button style={{ width: "58%", marginTop: "10px" }}>
              {category?.label || "Select A Category"}
              <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown menu={statusProps}>
            <Button style={{ width: "38%", marginTop: "10px" }}>
              {selectedstatus?.label || "Select A Status"}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
