import { useState, useEffect } from "react";
import classes from './EmployeeAddForm.module.scss';
import { useNavigate } from "react-router-dom";
import { mapBackendErrors, validateForm } from "../utils/validator";

export interface JobRecordFormValues {
    jobType: "CONTRACT" | "PERMANENT";
    startDate: string;
    endDate?: string;
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
    }

export default function EmployeeForm({ initialValues, onSubmit, submitLabel }: EmployeeFormProps) {
    const [formValues, setFormValues] = useState<EmployeeFormValues>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    // If initialValues change (e.g. when loading for update), update form
    useEffect(() => {
        // Always ensure jobRecord is present
        setFormValues({
            ...initialValues,
            jobRecord: initialValues.jobRecord ?? {
                jobType: "CONTRACT",
                startDate: "",
                endDate: "",
            },
        });
    }, [initialValues]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form values
        const validation = validateForm(formValues);
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
        const field = name.split(".")[1] as keyof typeof prev.jobRecord;
        newValues.jobRecord = {
            ...prev.jobRecord,
            [field]: value,
        };
        } else {
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