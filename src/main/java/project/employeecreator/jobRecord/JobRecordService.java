package project.employeecreator.jobRecord;

import java.util.List;
import org.springframework.stereotype.Service;
import project.employeecreator.employee.Employee;
import project.employeecreator.employee.EmployeeRepository;

@Service
public class JobRecordService {
    
    private final JobRecordRepository jobRecordRepository;
    private final EmployeeRepository employeeRepository;

    public JobRecordService(JobRecordRepository jobRecordRepository, EmployeeRepository employeeRepository) {
        this.jobRecordRepository = jobRecordRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<JobRecord> getAll() {
        return jobRecordRepository.findAll();
    }

    public List<JobRecord> getByEmployeeId(Long employeeId) {
        return jobRecordRepository.findByEmployeeIdOrderByStartDate(employeeId);
    }

    public JobRecord create(Long employeeId, JobRecord jobRecord) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        jobRecord.setEmployee(employee);

        return jobRecordRepository.save(jobRecord);
    }
}
