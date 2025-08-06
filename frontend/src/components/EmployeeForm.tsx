import { useState, useEffect } from "react";
import classes from './EmployeeAddForm.module.scss';
import { useNavigate } from "react-router-dom";
import { mapBackendErrors, validateForm } from "../utils/validator";
import type { JobRecord } from "./EmployeeCard";

export interface JobRecordFormValues {
    jobType: "CONTRACT" | "PERMANENT";
    startDate: string;
    endDate?: string;
    hoursPerWeek: number;
}

export interface EmployeeFormValues {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    jobStatus: "FULL_TIME" | "PART_TIME";
    jobRecord: JobRecordFormValues;
    jobRecords?: JobRecordFormValues[];

}
    interface EmployeeFormProps {
        initialValues: EmployeeFormValues;
        onSubmit: (data: EmployeeFormValues) => void;
        submitLabel: string;
        jobHistory?: JobRecord[];
    }

export default function EmployeeForm({ initialValues, onSubmit, submitLabel, jobHistory = [] }: EmployeeFormProps) {
    const [formValues, setFormValues] = useState<EmployeeFormValues>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    // If initialValues change (e.g. when loading for update), update form
    useEffect(() => {
        // Always ensure jobRecord is present
        setFormValues({
        ...initialValues,
        jobRecord: {
            jobType: initialValues.jobRecord?.jobType ?? "CONTRACT",
            startDate: initialValues.jobRecord?.startDate ?? "",
            endDate: initialValues.jobRecord?.endDate ?? "",
            hoursPerWeek: initialValues.jobRecord?.hoursPerWeek ?? 38, // <-- handle default
        },
        });
    }, [initialValues]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form values
        const validation = validateForm(formValues, {}, initialValues); // Pass original values
        setErrors(validation.errors);

        // Mark all fields as touched to show errors
        const allTouched: Record<string, boolean> = {};
        Object.keys(formValues).forEach((key) => {
            allTouched[key] = true;
        });

        // Mark nested fields like jobRecord.startDate as touched
        Object.keys(formValues.jobRecord).forEach((key) => {
            allTouched[`jobRecord.${key}`] = true;
        });

        setTouched(allTouched);

         // ✅ Business Logic Check
        const jobType = formValues.jobRecord.jobType;
        const startDate = new Date(formValues.jobRecord.startDate);

        // 1. Check for active contract
        const activeContract = jobHistory?.find(
            jr => jr.jobType === "CONTRACT" && !jr.endDate
        );
        if (activeContract && jobType === "CONTRACT") {
            setErrors(prev => ({
            ...prev,
            "jobRecord.jobType": "Employee is already assigned to a contract."
            }));
            return;
        }

        
        // 2. Check new startDate > latest endDate (only if startdate has changed)
        const latestEndDate = jobHistory
            ?.filter(jr => jr.endDate)
            .map(jr => new Date(jr.endDate!))
            .sort((a, b) => b.getTime() - a.getTime())[0];

        // if (latestEndDate && startDate <= latestEndDate) {
         if (
            latestEndDate &&
            initialValues.jobRecord.startDate !== formValues.jobRecord.startDate && // Check if startDate has changed
            startDate <= latestEndDate
        ) {
            setErrors(prev => ({
            ...prev,
            "jobRecord.startDate": "Start date must be after previous job's end date."
            }));
            return;
        }
        if (!validation.isValid) return;

        try {
            await onSubmit({
                ...formValues,
                jobRecords: [formValues.jobRecord], // ✅ send array to match backend
            });
        } catch (error: any) { 
            if (error.response && error.response.status === 400) {
                // Map backend errors to form fields
                const backendErrors = mapBackendErrors(error.response);
                const validationWithBackendErrors = validateForm(formValues, backendErrors);
                setErrors(validationWithBackendErrors.errors);
            } 
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormValues(prev => {
            const newValues = { ...prev };

            if (name.startsWith("jobRecord.")) {
            const field = name.split(".")[1];

            if (field === "hoursPerWeek") {
                // Convert to number and update hours
                newValues.jobRecord = {
                ...prev.jobRecord,
                hoursPerWeek: parseInt(value) || 38,
                };
            } else if (field === "jobType") {
                // Update job type and auto-set hours for PERMANENT
                const newJobType = value as "PERMANENT" | "CONTRACT";
                newValues.jobRecord = {
                ...prev.jobRecord,
                jobType: newJobType,
                hoursPerWeek: newJobType === "PERMANENT" ? 38 : 0,
                };
            } else {
                // Default handling for other jobRecord fields
                newValues.jobRecord = {
                ...prev.jobRecord,
                [field]: value,
                };
            }

            } else {
            // Non-nested fields like firstName, email, etc.
            (newValues as any)[name] = value;
            }

            // 🧠 Validate as user types
            const validation = validateForm(newValues);
            setErrors(validation.errors);

            return newValues;
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    
        const validation = validateForm(formValues);
        setErrors(validation.errors);
    };

    const renderError = (field: string) => {
        return touched[field] && errors[field] ? (
            <span className={classes.error}>{errors[field]}</span>
        ) : null;
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.field}>
                <label htmlFor="firstNameInput">First Name</label>
                <input
                    id="firstNameInput"
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("firstName")}
            </div>
            <div className={classes.field}>
                <label htmlFor="middleNameInput">Middle Name</label>
                <input
                    id="middleNameInput"
                    type="text"
                    name="middleName"
                    value={formValues.middleName}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
            </div>
            <div className={classes.field}>
                <label htmlFor="lastNameInput">Last Name</label>
                <input
                    id="lastNameInput"
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("lastName")}
            </div>
            <div className={classes.field}>
                <label htmlFor="emailInput">Email</label>
                <input
                    id="emailInput"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("email")}
            </div>
            <div className={classes.field}>
                <label htmlFor="phoneNumberInput">Phone Number</label>
                <input
                    id="phoneNumberInput"
                    type="text"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("phoneNumber")}
            </div>
            <div className={classes.field}>
                <label htmlFor="addressInput">Address</label>
                <input
                    id="addressInput"
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("address")}
            </div>
            <div className={classes.field}>
                <label>What is Contract type?</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="jobRecord.jobType"
                            value="PERMANENT"
                            checked={formValues.jobRecord.jobType === "PERMANENT"}
                            onChange={onInputChange}
                        />
                        Permanent
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobRecord.jobType"
                            value="CONTRACT"
                            checked={formValues.jobRecord.jobType === "CONTRACT"}
                            onChange={onInputChange}
                        />
                        Contract
                    </label>
                </div>
            </div>
            <div className={classes.field}>
                <label htmlFor="startDateInput">Start Date</label>
                <input
                    id="startDateInput"
                    type="date"
                    name="jobRecord.startDate"
                    value={formValues.jobRecord.startDate}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("jobRecord.startDate")}
            </div>
            <div className={classes.field}>
                <label htmlFor="endDateInput">End Date</label>
                <input
                    id="endDateInput"
                    type="date"
                    name="jobRecord.endDate"
                    value={formValues.jobRecord.endDate}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("jobRecord.endDate")}
            </div>
            <div className={classes.field}>
                <label htmlFor="hoursPerWeekInput">Hours per Week</label>
                <input
                    id="hoursPerWeekInput"
                    type="number"
                    name="jobRecord.hoursPerWeek"
                    value={formValues.jobRecord.hoursPerWeek}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                    disabled={formValues.jobRecord.jobType === "PERMANENT"}
                />
                {renderError("jobRecord.hoursPerWeek")}
            </div>
            <div className={classes.field}>
                <label>Is this on a Full-time or Part-time basis?</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="jobStatus"
                            value="PART_TIME"
                            checked={formValues.jobStatus === "PART_TIME"}
                            onChange={onInputChange}
                        />
                        Part-Time
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobStatus"
                            value="FULL_TIME"
                            checked={formValues.jobStatus === "FULL_TIME"}
                            onChange={onInputChange}
                        />
                        Full-Time
                    </label>
                </div>
            </div>
            <div>
                <button className={classes.btn} type="submit">{submitLabel}</button>
                <button className={classes.btn} type="button" onClick={() => navigate("/")}>Back</button>
            </div>
        </form>
    );
}