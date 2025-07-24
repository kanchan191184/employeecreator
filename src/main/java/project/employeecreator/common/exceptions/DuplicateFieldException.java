package project.employeecreator.common.exceptions;

import org.springframework.dao.DataIntegrityViolationException;

public class DuplicateFieldException extends RuntimeException {

    private String fieldName;

    public DuplicateFieldException(String fieldName, String message) {

        super(message);
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }

    // Static method to handle DataIntegrityViolationException
    public static DuplicateFieldException fromDataIntegrityViolationException(DataIntegrityViolationException e) {
        if (e.getMessage().contains("email")) {
            return new DuplicateFieldException("email", "Email already exists.");
        } else if (e.getMessage().contains("phone_number")) {
            return new DuplicateFieldException("phoneNumber", "Phone number already exists.");
        }
        return new DuplicateFieldException("unknown", "Unique constraint violation.");
    }
}
