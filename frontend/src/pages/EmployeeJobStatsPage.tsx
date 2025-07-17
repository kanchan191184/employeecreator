import { useEffect, useState } from "react";
import EmployeeBarChart from "../components/EmployeeBarChart";
import styles from "./EmployeeJobStatsPage.module.scss";
import { getEmployees, type Employee } from "../services/employees";
import { useNavigate } from "react-router-dom";

const EmployeeJobStatsPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch(err => {
        console.error(err);
        setError("Failed to load employees");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>{error}</div>;

  const permanentCount = employees.filter(e => e.jobType === "PERMANENT").length;
  const contractCount = employees.filter(e => e.jobType === "CONTRACT").length;

  return (
    <div className={ styles.pageWrapper}>
    <div className= {styles.container}>
      <h2>Employee Type Breakdown</h2>
       
      <div>
        <EmployeeBarChart
            permanentCount={permanentCount}
            contractCount={contractCount}
        />
    </div>
    <button className={styles.edit} onClick={() => navigate("/")}>Back</button>
    </div>
    </div>
  );
};

export default EmployeeJobStatsPage;
