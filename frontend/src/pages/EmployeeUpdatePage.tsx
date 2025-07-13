import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeUpdateForm from "../components/EmployeeUpdateForm";
import styles from "./EmployeeAddPage.module.scss";

const EmployeeUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <div>Invalid employee ID</div>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Update Employee</h1>
      <EmployeeUpdateForm
        id={parseInt(id, 10)}
        onSuccess={() => navigate("/")}
      />
    </div>
  );
};

export default EmployeeUpdatePage;