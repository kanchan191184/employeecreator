import EmployeeAddForm from "../components/EmployeeAddForm";
import type { EmployeeFormValues } from "../components/EmployeeForm";
import styles from './EmployeeAddPage.module.scss';
import { addEmployee } from "../services/employees";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeAddPage: React.FC = () => {

    const navigate = useNavigate();

    const handleFormSubmit = async (data: EmployeeFormValues) => {
      
          try {
            await addEmployee(data);
            toast.success("Employee added successfully!");
            navigate("/"); // redirect to employee list or home
          } catch (error) {
            toast.error("Failed to add employee.");
          }
    };

  return (
    <div className={styles.wrapper}>
        <h2 className={styles.heading}>Employee Details</h2>
        <EmployeeAddForm onFormSubmit={handleFormSubmit}/>
    </div>
  )
}

export default EmployeeAddPage;