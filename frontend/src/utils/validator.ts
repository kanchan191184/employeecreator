
import type { EmployeeFormValues } from '../components/EmployeeForm';

interface ValidationResult {
    isValid: boolean;
    errors: Partial<Record<keyof EmployeeFormValues, string>>;
}

export const validateForm = (values: EmployeeFormValues) : ValidationResult => {
    const errors: Partial<Record<keyof EmployeeFormValues, string>> = {};

    // First Name

    if (!values.firstName.trim()) {
        errors.firstName = 'First name is required';
    } else if (values.firstName.length < 3) {
        errors.firstName = "First Name must be at least 3 characters";
    }

    //Last Name

    if (!values.lastName.trim()) {
        errors.lastName = 'Last name is required';
    } else if (values.lastName.length < 3) {
        errors.lastName = "Last Name must be at least 3 characters";
    }

    // Email 

    if(!values.email.trim()) {
        errors.email = 'Email is required';
    } 

    //phone number

    if(!values.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required';
    } 

    // Address
    if (!values.address.trim()) {
      errors.address = 'Address is required.';
    }

    // Start Date
    if (!values.startDate) {
      errors.startDate = 'Start date is required.';
    }

    // finish Date
    if (!values.finishDate) {
      errors.finishDate = 'Finish date is required.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };

}