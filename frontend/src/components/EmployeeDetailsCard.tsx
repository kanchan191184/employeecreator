import styles from "./EmployeeDetailsCard.module.scss";

export interface JobRecord {
  id: number;
  jobType: 'PERMANENT' | 'CONTRACT';
  startDate: string;    
  endDate?: string;    // nullable
}

export interface Employee {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    jobStatus: "FULL_TIME" | "PART_TIME";
}

interface EmployeeCardProps { 
    employee: Employee;
    jobRecords: JobRecord[];
    onBack : () => void;
}

const formatDate = (d: string | undefined) => d ? new Date(d).toLocaleDateString() : 'Present';

const EmployeeDetailsCard: React.FC<EmployeeCardProps> = ({ employee, jobRecords, onBack }) => {

    return (
      <div className={styles.card}>
      {/* Basic info */}
      <div className={styles.infoBlock}>
        <h2 className={styles.name}>
          {employee.firstName} {employee.middleName ?? ''} {employee.lastName}
        </h2>
        <div><span className={styles.label}>Email: </span> {employee.email}</div>
        <div><span className={styles.label}>Phone: </span> {employee.phoneNumber}</div>
        <div><span className={styles.label}>Address: </span> {employee.address}</div>
        <div><span className={styles.label}>Job Status: </span>{employee.jobStatus}</div>
      </div>

      {/* Job history */}
      <div className={styles.jobHistoryBlock}>
        <h3>Job History</h3>
        <table className={styles.jobTable}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {jobRecords.map((jr) => (
              <tr key={jr.id}>
                <td>{jr.jobType.charAt(0) + jr.jobType.slice(1).toLowerCase()}</td>
                <td>{formatDate(jr.startDate)}</td>
                <td>{formatDate(jr.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back button */}
      <div className={styles.actions}>
        <button onClick={onBack} className={styles.backButton}>
          Back
        </button>
      </div>
    </div>
    );
};

export default EmployeeDetailsCard;