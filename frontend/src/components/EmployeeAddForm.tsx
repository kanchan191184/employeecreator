import EmployeeForm, { type EmployeeFormValues } from "./EmployeeForm.tsx";

const defaultValues: EmployeeFormValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    jobType: 'CONTRACT',
    startDate: '',
    finishDate: '',
    jobStatus: 'FULL_TIME'
};

export default function EmployeeAddForm({ onFormSubmit }: { onFormSubmit: (data: EmployeeFormValues) => void }) {
    return (
        <EmployeeForm
            initialValues={defaultValues}
            onSubmit={onFormSubmit}
            submitLabel="Register"
        />
    );
}