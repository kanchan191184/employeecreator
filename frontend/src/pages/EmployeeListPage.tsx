import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import styles from "./EmployeeListPage.module.scss";
import { useNavigate } from "react-router-dom";
import { type Employee, getEmployees, deleteEmployee } from "../services/employees";

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch((err) => {
        console.error("Failed to fetch employees", err);
        setEmployees([]);
      })
      .finally(() => setLoading(false));
  }, []);

   const handleEdit = (id: number) => {
     navigate(`/updateEmployee/${id}`);
    };

    const handleRemove = (id: number) => {
       deleteEmployee(id)
      .then(() => setEmployees((prev) => prev.filter((emp) => emp.id !== id)))
      .catch((err) => {
        console.error("Failed to delete employee", err);
      });
    };

  return (
       <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>Employee's List</h1>
        <button className={styles.addBtn} onClick={() => navigate("/addEmployee")}>
          Add Employee
        </button>
      </div>
      <div className={styles.list}>
        {loading ? (
          <div>Loading...</div>
        ) : employees.length === 0 ? (
          <div>No employees found.</div>
        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeListPage;