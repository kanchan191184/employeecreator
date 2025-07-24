package project.employeecreator.common;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import project.employeecreator.common.exceptions.DuplicateFieldException;
import project.employeecreator.common.exceptions.NotFoundException;
import project.employeecreator.common.exceptions.ServiceValidationException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
 
    @ExceptionHandler(ServiceValidationException.class)
    public ResponseEntity<ValidationErrors> handleServiceValidationException(ServiceValidationException ex) {
        return new ResponseEntity<ValidationErrors>(ex.getErrors(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateFieldException.class)
    public ResponseEntity<Map<String,String>> handleDuplicateFieldException(DuplicateFieldException ex) {
        
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("field", ex.getFieldName()); // Field causing the error (e.g., "email" or "phoneNumber")
        errorResponse.put("message", ex.getMessage()); // Error message (e.g., "Email already exists.")
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        // return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
