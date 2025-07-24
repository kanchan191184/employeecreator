import { useEffect, useState } from "react";
import EmployeeForm, { type EmployeeFormValues } from "./EmployeeForm";
import { getEmployeeById, updateEmployee, type JobRecord } from "../services/employees";
import {getJobRecordsByEmployeeId} from "../services/jobRecord";
import { toast } from "react-toastify";

export default function EmployeeUpdateForm({ 
    id, 
    onSuccess,
    }: { 
        id: number, 
        onSuccess: () => void 
    }) {
    const [initialValues, setInitialValues] = useState<EmployeeFormValues | null>(null);
    const [jobRecords, setJobRecords] = useState<JobRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [emp, jobs] = await Promise.all([
                getEmployeeById(id),
                getJobRecordsByEmployeeId(id),
                ]);
                const { id: _, ...rest } = emp;

                // Ensure all jobRecords have endDate as a string
                const normalizedJobRecords = jobs.map(job => ({
                    ...job,
                    endDate: job.endDate ?? "", // Fallback to an empty string if undefined
                }));

                 setInitialValues({
                    ...rest,
                    middleName: rest.middleName ?? "", // Ensure it's always a string
                    jobRecord: normalizedJobRecords.length > 0
                        ? {
                            jobType: normalizedJobRecords[0].jobType,
                            startDate: normalizedJobRecords[0].startDate,
                            endDate: normalizedJobRecords[0].endDate,
                        }
                        : {
                            jobType: "CONTRACT",
                            startDate: "",
                            endDate: "",
                        },
                    jobRecords: normalizedJobRecords,
            });
                setJobRecords(normalizedJobRecords);
            } catch {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        }
            load();
    }, [id]);

      const handleFormSubmit = async (data: EmployeeFormValues) => {
        try {
            // Attach jobRecord id (if it exists)
            const jobRecordId = jobRecords[0]?.id;

              // Ensure jobRecords is always defined and matches the expected type
            const normalizedJobRecords = data.jobRecords?.map(job => ({
                ...job,
                id: jobRecordId, // Add missing ID if applicable
            })) || [];

             const payload = {
                ...data,
            jobRecord: {
                    ...data.jobRecord,
                    id: jobRecordId, // Add missing ID
                },
                jobRecords: normalizedJobRecords,
            }; 
            await updateEmployee(id, payload);
            toast.success("Employee Updated successfully!");
            onSuccess();
            } catch (error: any) {
                if (error?.response?.status === 400 && error.response?.data?.field && error.response?.data?.message) {
                    toast.error(`${error.response.data.message}`);
                } else {
                    toast.error("Error updating employee");
                }
            }
    };

    if (loading || !initialValues) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <EmployeeForm
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            submitLabel="Update Employee"
        />
    );
}