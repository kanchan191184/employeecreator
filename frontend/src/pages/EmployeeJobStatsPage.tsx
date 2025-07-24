import { useEffect, useState } from "react";
import EmployeeBarChart from "../components/EmployeeBarChart";
import styles from "./EmployeeJobStatsPage.module.scss";
import { useNavigate } from "react-router-dom";
import { getAllJobRecords } from "../services/jobRecord";
import type { JobRecord } from "../services/employees";

const EmployeeJobStatsPage: React.FC = () => {
  const [jobRecords, setJobRecords] = useState<JobRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllJobRecords()
      .then(setJobRecords)
      .catch(err => {
        console.error(err);
        setError("Failed to load employees");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>{error}</div>;

  const permanentCount = jobRecords.filter(j => j.jobType === "PERMANENT").length;
  const contractCount = jobRecords.filter(j => j.jobType === "CONTRACT").length;

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
