import styles from "./EmployeeCard.module.scss";

export interface Employee {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    jobType: "CONTRACT" | "PERMANENT";
    startDate: string;
    finishDate: string;
    email: string;
    address: string;
    phoneNumber: string;
    jobStatus: "FULL_TIME" | "PART_TIME";
}

interface EmployeeCardProps { 
    employee: Employee;
    id: number,
    onBack : () => void;
}

const EmployeeDetailsCard: React.FC<EmployeeCardProps> = ({ employee, onBack }) => {

    return (
           <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.name}>
          <span className={styles.label}>Name:</span>
          {employee.firstName}{" "}
          {employee.middleName && <span>{employee.middleName} </span>}
          {employee.lastName}
        </div>
        <div>
          <span className={styles.label}>Job Type:</span>{" "}
          {employee.jobType === "CONTRACT" ? "Contract" : "Permanent"}{" "}
        </div>
        <div>
          <span className={styles.label}>Email:</span> {employee.email}
        </div>
         <div>
          <span className={styles.label}>Address:</span> {employee.address}
        </div>
         <div>
          <span className={styles.label}>Phone Number:</span> {employee.phoneNumber}
        </div>
         <div>
          <span className={styles.label}>Start Date:</span> {employee.startDate}
        </div>
         <div>
          <span className={styles.label}>Finish Date:</span> {employee.finishDate}
        </div>
         <div>
          <span className={styles.label}>Job Status:</span> {employee.jobStatus}
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onBack()}>Back</button>
      </div>
    </div>
    );
};

export default EmployeeDetailsCard;