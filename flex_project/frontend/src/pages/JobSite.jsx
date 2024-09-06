import React, { useEffect, useState } from "react";
import { Menu, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/Inventory.module.css";

const Inventory = () => {
  const [categories, setCategories] = useState([]);
  const [jobsite, setJobsite] = useState([]);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/Categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch(`http://localhost:5000/api/Jobsites/${id}`)
      .then((response) => response.json())
      .then((data) => setJobsite(data))
      .catch((error) => console.error("Error fetching jobsite:", error));
  }, []);

  const handleSave = () => {
    fetch(`http://localhost:5000/api/Jobsites/updateJobsite/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Jobsite status updated:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const categoryData = categories.map((item) => ({
    key: item.id,
    label: item.name,
    disabled: item.id !== jobsite.cateogory_id,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.menuWrapper}>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          mode="vertical"
          items={categoryData}
        />
      </div>
      <div className={styles.optionsWrapper}>
        <div className={styles.options}>
          <div
            className={`${styles.option} ${styles.onHold} ${
              status === "ONHOLD" ? styles.selected : ""
            }`}
            onClick={() => setStatus("ONHOLD")}
          >
            On Hold
          </div>
          <div
            className={`${styles.option} ${styles.onProgress} ${
              status === "ONPROGRESS" ? styles.selected : ""
            }`}
            onClick={() => setStatus("ONPROGRESS")}
          >
            On Progress
          </div>
          <div
            className={`${styles.option} ${styles.completed} ${
              status === "COMPLETED" ? styles.selected : ""
            }`}
            onClick={() => setStatus("COMPLETED")}
          >
            Completed
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.cancelButton}
            type="default"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            className={styles.saveButton}
            type="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
