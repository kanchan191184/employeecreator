import type { EmployeeFormValues } from '../components/EmployeeForm';

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

/**
 * Maps backend error messages to form fields.
 */
// export const mapBackendErrors = (errorResponse: any): Record<string, string> => {
//     const backendErrors: Record<string, string> = {};

//     if (errorResponse && errorResponse.status === 400) {
//         const { field, message } = errorResponse.data;
//         if (field && message) {
//             backendErrors[field] = message;
//         }
//     }
//     return backendErrors;
// };

  export function mapBackendErrors(response: any): Record<string, string> {
    try {
      const data = response.data;

      if (data.field && data.message) {
        return {
          [data.field]: data.message,
        };
      }

      return {};
    } catch (e) {
      return {};
    }
  }

export const validateForm = (values: EmployeeFormValues, 
    backendErrors: Record<string, string> = {}
  ) : ValidationResult => {
    const errors: Record<string, string> = { ...backendErrors};

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
    if (!values.jobRecord.startDate) {
      errors['jobRecord.startDate'] = 'Start date is required.';
    }

    // end Date
    if (!values.jobRecord.endDate) {
      errors['jobRecord.endDate'] = 'End date is required.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
}