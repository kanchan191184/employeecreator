import { useEffect, useState } from "react";
import EmployeeDetailsCard from "../components/EmployeeDetailsCard";
import styles from "./EmployeeListPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, type Employee, type JobRecord } from "../services/employees";
import {getJobRecordsByEmployeeId} from "../services/jobRecord";

const EmployeeDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [jobRecords, setJobRecords] = useState<JobRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);
    const navigate = useNavigate();

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
    Promise.all([
          getEmployeeById(empId),
          getJobRecordsByEmployeeId(empId)
        ])
          .then(([emp, jobs]) => {
            setEmployee(emp);
            setJobRecords(jobs);
          })
          .catch(() => setError('Failed to load data'))
          .finally(() => setLoading(false));

      }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!employee) return <div>Employee not found</div>;

  return (
      <div className={styles.wrapper}>
      <h1 className={styles.heading}>Employee Details</h1>
      <EmployeeDetailsCard
        employee={employee}
        jobRecords={jobRecords}
        onBack={() => navigate("/")}
      />
    </div>
  );
};

export default EmployeeDetailsPage;