import { useState, useEffect } from "react";
import classes from './EmployeeAddForm.module.scss';
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validator";

export interface EmployeeFormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    jobType: "CONTRACT" | "PERMANENT"; // ⬅ literal types
    startDate: string;
    finishDate: string;
    jobStatus: "FULL_TIME" | "PART_TIME"; // ⬅ literal types
}

interface EmployeeFormProps {
    initialValues: EmployeeFormValues;
    onSubmit: (data: EmployeeFormValues) => void;
    submitLabel: string;
}

export default function EmployeeForm({ initialValues, onSubmit, submitLabel }: EmployeeFormProps) {
    const [formValues, setFormValues] = useState<EmployeeFormValues>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormValues, string>>>({});
    const navigate = useNavigate();

    // If initialValues change (e.g. when loading for update), update form
    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validateForm(formValues);
        setErrors(validation.errors);

         // Mark all fields as touched to show errors
        const allTouched: Record<string, boolean> = {};
        Object.keys(formValues).forEach((key) => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        if (!validation.isValid) return;

        onSubmit(formValues);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const updatedValues = { ...formValues, [name]: value };
            const validation = validateForm(updatedValues);
            setErrors(validation.errors);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        // setTouched({ ...touched, [name]: true });

        
        // Mark this field as touched
        const updatedTouched = { ...touched, [name]: true };
        setTouched(updatedTouched);

        // Re-validate form to update errors
        const updatedValues = { ...formValues };
        const validation = validateForm(updatedValues);
        setErrors(validation.errors);
    };

    const renderError = (field: keyof EmployeeFormValues) => {
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
                            name="jobType"
                            value="PERMANENT"
                            checked={formValues.jobType === "PERMANENT"}
                            onChange={onInputChange}
                        />
                        Permanent
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobType"
                            value="CONTRACT"
                            checked={formValues.jobType === "CONTRACT"}
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
                    name="startDate"
                    value={formValues.startDate}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("startDate")}
            </div>
            <div className={classes.field}>
                <label htmlFor="finishDateInput">Finish Date</label>
                <input
                    id="finishDateInput"
                    type="date"
                    name="finishDate"
                    value={formValues.finishDate}
                    onChange={onInputChange}
                    onBlur={handleBlur}
                />
                {renderError("finishDate")}
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