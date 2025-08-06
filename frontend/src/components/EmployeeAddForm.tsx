import EmployeeForm, { type EmployeeFormValues } from "./EmployeeForm.tsx";

const defaultValues: EmployeeFormValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    jobStatus: 'FULL_TIME',
    jobRecord: { // Updated to include jobRecord
        jobType: 'CONTRACT',
        startDate: '',
        endDate: '', // Use endDate to match the form's structure
        hoursPerWeek: 0,
    },
};

export default function EmployeeAddForm({ onFormSubmit }: { onFormSubmit: (data: EmployeeFormValues) => void }) {
    return (
        <EmployeeForm
            initialValues={defaultValues}
            jobHistory={defaultValues.jobRecords}
            onSubmit={onFormSubmit}
            submitLabel="Register"
        />
    );
}