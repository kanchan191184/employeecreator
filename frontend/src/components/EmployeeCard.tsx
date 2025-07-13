import styles from "./EmployeeCard.module.scss";

export interface Employee {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    jobType: "CONTRACT" | "PERMANENT";
    startDate: string;
    email: string;
}

interface EmployeeCardProps { 
    employee: Employee;
    onEdit: (id: number) => void;
    onRemove: (id: number) => void;
}

function getYearsFromStart(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const m = now.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < start.getDate())) {
    years--;
  }
  return years;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onRemove }) => {

    const years = getYearsFromStart(employee.startDate);
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
          <span className={styles.years}>({years} year{years !== 1 ? "s" : ""})</span>
        </div>
        <div>
          <span className={styles.label}>Email:</span> {employee.email}
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(employee.id)}>Edit</button>
        <button className={styles.remove} onClick={() => onRemove(employee.id)}>Remove</button>
      </div>
    </div>
    );
};

export default EmployeeCard;