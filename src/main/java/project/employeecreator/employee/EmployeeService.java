package project.employeecreator.employee;

import java.time.LocalDate;
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

    private void validateJobRecordDates(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && !endDate.isAfter(startDate)) {
            throw new IllegalArgumentException("End date must be after start date.");
        }
    }

    public Employee create(CreateEmployeeDTO data) {
    // Map basic employee fields
        Employee newEmp = modelMapper.map(data, Employee.class);

        newEmp.getJobRecords().clear(); 

        if (data.getJobRecords() != null) {
            for (CreateJobRecordDTO jrDto : data.getJobRecords()) {

                validateJobRecordDates(jrDto.getStartDate(), jrDto.getEndDate()); 

                JobRecord jr = new JobRecord();
                jr.setJobType(jrDto.getJobType());
                jr.setStartDate(jrDto.getStartDate());
                jr.setEndDate(jrDto.getEndDate());
                jr.setHoursPerWeek(jrDto.getHoursPerWeek());
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
        if (existingEmp.isEmpty()) return Optional.empty();

        Employee emp = existingEmp.get();

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

        // 🔁 Update basic fields
        emp.setFirstName(data.getFirstName());
        emp.setMiddleName(data.getMiddleName());
        emp.setLastName(data.getLastName());
        emp.setEmail(data.getEmail());
        emp.setPhoneNumber(data.getPhoneNumber());
        emp.setAddress(data.getAddress());
        emp.setJobStatus(data.getJobStatus());

        // 🔁 Update or add job records
        if (data.getJobRecords() != null && !data.getJobRecords().isEmpty()) {
            for (UpdateJobRecordDTO jrDto : data.getJobRecords()) {
                if (jrDto.getId() != null) {
                    // 🔄 Update existing job
                    emp.getJobRecords().stream()
                        .filter(jr -> jr.getId().equals(jrDto.getId()))
                        .findFirst()
                        .ifPresent(existingJob -> {
                            boolean startChanged = !existingJob.getStartDate().equals(jrDto.getStartDate());
                            boolean endChanged = (existingJob.getEndDate() != null && !existingJob.getEndDate().equals(jrDto.getEndDate()))
                                            || (existingJob.getEndDate() == null && jrDto.getEndDate() != null);
                            
                            // Only validate if start or end date has changed
                            if (startChanged || endChanged) {
                                validateJobRecordDates(jrDto.getStartDate(), jrDto.getEndDate());
                            }

                            existingJob.setJobType(jrDto.getJobType());
                            existingJob.setStartDate(jrDto.getStartDate());
                            existingJob.setEndDate(jrDto.getEndDate());
                            existingJob.setHoursPerWeek(jrDto.getHoursPerWeek());
                        });
                } else {
                    //  Add new job
                    validateJobRecordDates(jrDto.getStartDate(), jrDto.getEndDate());

                    // Check for ongoing job
                    boolean hasOngoingJob = emp.getJobRecords().stream()
                        .anyMatch(jr -> jr.getEndDate() == null);
                    if (hasOngoingJob) {
                        throw new IllegalArgumentException("Employee is already assigned to a job with no end date.");
                    }

                    // Validate start date after latest endDate
                    emp.getJobRecords().stream()
                        .map(JobRecord::getEndDate)
                        .filter(ed -> ed != null)
                        .max(LocalDate::compareTo)
                        .ifPresent(latestEndDate -> {
                            if (!jrDto.getStartDate().isAfter(latestEndDate)) {
                                throw new IllegalArgumentException("Start date must be after previous job's end date.");
                            }
                        });

                    JobRecord newRecord = new JobRecord();
                    newRecord.setJobType(jrDto.getJobType());
                    newRecord.setStartDate(jrDto.getStartDate());
                    newRecord.setEndDate(jrDto.getEndDate());
                    newRecord.setHoursPerWeek(jrDto.getHoursPerWeek());
                    newRecord.setEmployee(emp);
                    emp.addJobRecord(newRecord);
                }
            }
        }

        return Optional.of(employeeRepository.save(emp));
    }
}