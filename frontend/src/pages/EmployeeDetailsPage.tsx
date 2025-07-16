import { useEffect, useState } from "react";
import EmployeeDetailsCard from "../components/EmployeeDetailsCard";
import styles from "./EmployeeListPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, type Employee } from "../services/employees";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);
    const navigate = useNavigate();

     if (!id) return <div>Invalid employee ID</div>;

    useEffect(() => {
    if (!id) {
      setError('Invalid employee ID');
      setLoading(false);
      return;
    }

     const empId = parseInt(id, 10);

      if (isNaN(empId)) {
      setError('Invalid employee ID');
      setLoading(false);
      return;
    }

      getEmployeeById(empId)
      .then(emp => {
        setEmployee(emp);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load employee data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!employee) return <div>Employee not found</div>;

  return (
      <div className={styles.wrapper}>
      <h1 className={styles.heading}>Update Employee</h1>
      <EmployeeDetailsCard
        id={employee.id}
        employee={employee}
        onBack={() => navigate("/")}
      />
    </div>
  );
};

export default EmployeeDetailsPage;