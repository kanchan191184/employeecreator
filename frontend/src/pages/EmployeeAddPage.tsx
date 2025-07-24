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
                const normalizedJobRecord = {
                ...data.jobRecord,
                id: Date.now(),
            };

            const employeeData = {
                ...data,
                jobRecord: normalizedJobRecord,
                jobRecords: [normalizedJobRecord], 
            };
            // Add a generated id to jobRecord before submitting
            // const employeeData = {
            //     ...data,
            //     jobRecord: {
            //         ...data.jobRecord,
            //         id: Date.now(), // or use a better id generation logic if needed
            //     }
            // };
            await addEmployee(employeeData);
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