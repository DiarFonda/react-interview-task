import { Input, Table, Button, Divider, Tag } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";

const myTable = ({ showModal, setIsFullScreenModalOpen }) => {
  const [searchInput, setSearchInput] = useState("");

  const [jobsites, setJobsites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Jobsites")
      .then((response) => response.json())
      .then((data) => setJobsites(data))
      .catch((error) => console.error("Error fetching jobsites:", error));
  }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case "ONHOLD":
        return (
          <Tag color="#FE4C4A" className={styles.tag}>
            On Hold
          </Tag>
        );
      case "COMPLETED":
        return (
          <Tag color="#7AC14D" className={`${styles.tag} ${styles.completed}`}>
            Completed
          </Tag>
        );
      case "ONPROGRESS":
        return (
          <Tag color="#ECDE7C" className={`${styles.tag} ${styles.onprogress}`}>
            On Progress
          </Tag>
        );
      default:
        return null;
    }
  };

  const jobsitesData = jobsites.map((item) => ({
    ...item,
    key: item.id,
    status: getStatusTag(item.status),
  }));

  const getSelectedJobsiteId = (text) => {
    const selectedJobsite = jobsitesData.find((item) => {
      return item.name === text;
    });
    return selectedJobsite.id;
  };

  const columns = [
    {
      title: "Jobsite Name",
      dataIndex: "name",
      key: "jobsite",
      align: "center",
      render: (text) => (
        <Link
          to={`/jobsite/${getSelectedJobsiteId(text)}`}
          className={styles.jobsiteText}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const tableData = useMemo(
    () =>
      searchInput !== ""
        ? jobsitesData.filter((data) => {
            return data.name.toLowerCase().includes(searchInput.toLowerCase());
          })
        : jobsitesData,
    [searchInput, jobsitesData]
  );

  return (
    <div className={styles.table}>
      <Table
        title={() => (
          <div className={styles.input}>
            <Input
              placeholder={`Search jobsite`}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                marginBottom: 8,
                marginRight: 10,
                width: "40%",
              }}
            />
            <Button className={styles.createButton} onClick={showModal}>
              Create <Divider type="vertical" style={{ height: "25px" }} /> +
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default myTable;
