package project.employeecreator.employee;

import java.util.DuplicateFormatFlagsException;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import project.employeecreator.common.exceptions.DuplicateFieldException;
import project.employeecreator.common.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    
    private EmployeeService employeeService;

    EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        List<Employee> allEmployees = this.employeeService.findAll();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Long id) throws NotFoundException {
            Optional<Employee> foundEmp = this.employeeService.findById(id);

            if(foundEmp.isPresent()) {
                return new ResponseEntity<>(foundEmp.get(), HttpStatus.OK);
            }

            throw new NotFoundException("Employee with id " + id + " does not exist");
    }

    @PostMapping
    public ResponseEntity<Employee> create(@Valid @RequestBody CreateEmployeeDTO data) {
         try {
            Employee saved = this.employeeService.create(data);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw DuplicateFieldException.fromDataIntegrityViolationException(e);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) throws NotFoundException {
        boolean deleted = this.employeeService.deleteById(id);

        if(deleted) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        throw new NotFoundException("Employee with id " + id + " does not exist");
    }

    @PatchMapping("{id}")
    public ResponseEntity<Employee> updateById(@PathVariable Long id, @Valid @RequestBody UpdateEmployeeDTO data) 
        throws NotFoundException {
            try {
                Optional<Employee> result = this.employeeService.updateById(id, data);

                Employee updated = result.orElseThrow (
                    () -> new NotFoundException("Could not update employee with id " + id + " , it does not exist"));

                return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw DuplicateFieldException.fromDataIntegrityViolationException(e);
        }
    }
}