package project.employeecreator.employee;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import project.employeecreator.common.exceptions.DuplicateFieldException;
import project.employeecreator.jobRecord.CreateJobRecordDTO;
import project.employeecreator.jobRecord.JobRecord;
import project.employeecreator.jobRecord.UpdateJobRecordDTO;

@Service
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;
    
    public EmployeeService(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    public List<Employee> findAll() {
        return this.employeeRepository.findAll();
    }

    public Optional<Employee> findById(Long id) {
        return this.employeeRepository.findById(id);
    }

    public Employee create(CreateEmployeeDTO data) {
    // Map basic employee fields
        Employee newEmp = modelMapper.map(data, Employee.class);

        newEmp.getJobRecords().clear(); 

        if (data.getJobRecords() != null) {
            for (CreateJobRecordDTO jrDto : data.getJobRecords()) {
                JobRecord jr = new JobRecord();
                jr.setJobType(jrDto.getJobType());
                jr.setStartDate(jrDto.getStartDate());
                jr.setEndDate(jrDto.getEndDate());
                newEmp.addJobRecord(jr);
            }
        }
        return employeeRepository.save(newEmp);
    }

    public boolean deleteById(Long id) {
        // check if the employee exists
        Optional<Employee> foundemp = this.findById(id);
        if (foundemp.isEmpty()) {
            return false;
        }
        Employee empFromDb = foundemp.get();
        this.employeeRepository.delete(empFromDb);
        return true;
    }

    public Optional<Employee> updateById(Long id, UpdateEmployeeDTO data) {
        Optional<Employee> existingEmp = employeeRepository.findById(id);

        if (existingEmp.isPresent()) {
            Employee emp = existingEmp.get();
            //modelMapper.map(data, emp);

            
        // ✅ Check for duplicate email
        if (employeeRepository.existsByEmail(data.getEmail()) && 
            !emp.getEmail().equalsIgnoreCase(data.getEmail())) {
            throw new DuplicateFieldException("email", "Email already exists.");
        }

        // ✅ Check for duplicate phone number
        if (employeeRepository.existsByPhoneNumber(data.getPhoneNumber()) && 
            !emp.getPhoneNumber().equals(data.getPhoneNumber())) {
            throw new DuplicateFieldException("phoneNumber", "Phone number already exists.");
        }

            // 🔁 Update values
            emp.setFirstName(data.getFirstName());
            emp.setMiddleName(data.getMiddleName());
            emp.setLastName(data.getLastName());
            emp.setEmail(data.getEmail());
            emp.setPhoneNumber(data.getPhoneNumber());
            emp.setAddress(data.getAddress());
            emp.setJobStatus(data.getJobStatus());

            // 🔁 Update job records
            if (data.getJobRecords() != null) {
                emp.getJobRecords().clear();
                for (UpdateJobRecordDTO jrDto : data.getJobRecords()) {
                    JobRecord jr = new JobRecord();
                    jr.setId(jrDto.getId()); // Ensure existing job record is updated
                    jr.setJobType(jrDto.getJobType());
                    jr.setStartDate(jrDto.getStartDate());
                    jr.setEndDate(jrDto.getEndDate()); // Ensure endDate is updated
                    jr.setEmployee(emp);
                    emp.addJobRecord(jr);
                }
            }
            return Optional.of(employeeRepository.save(emp));
        }
        return Optional.empty();
    }
}