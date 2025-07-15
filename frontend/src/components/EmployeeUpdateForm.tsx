import { useEffect, useState } from "react";
import EmployeeForm, { type EmployeeFormValues } from "./EmployeeForm";
import { getEmployeeById, updateEmployee } from "../services/employees";
import { toast } from "react-toastify";

export default function EmployeeUpdateForm({ 
    id, 
    onSuccess,
    }: { 
        id: number, 
        onSuccess: () => void 
    }) {
    const [initialValues, setInitialValues] = useState<EmployeeFormValues | null>(null);

    useEffect(() => {
        getEmployeeById(id).then(emp => {
            // Remove id property if present
            const { id: _, ...rest } = emp;
            setInitialValues(rest as EmployeeFormValues);
        });
    }, [id]);

      const handleFormSubmit = async (data: EmployeeFormValues) => {
        try {
            await updateEmployee(id, data);
            toast.success("Employee Updated successfully!");
            onSuccess();
            } catch (error) {
            toast.error("Error updating employee");
            }
    };

    if (!initialValues) return <div>Loading...</div>;

    return (
        <EmployeeForm
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            submitLabel="Update Employee"
        />
    );
}