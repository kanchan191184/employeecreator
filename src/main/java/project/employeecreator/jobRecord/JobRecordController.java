package project.employeecreator.jobRecord;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees/{employeeId}/jobs")
public class JobRecordController {
    
    private final JobRecordService jobRecordService;

    public JobRecordController(JobRecordService jobRecordService) {
        this.jobRecordService = jobRecordService;
    }
    
    @GetMapping
    public List<JobRecord> getAll(@PathVariable Long employeeId) {
        return jobRecordService.getByEmployeeId(employeeId);
    }

    @PostMapping
    public ResponseEntity<JobRecord> create(@PathVariable Long employeeId, @RequestBody JobRecord jobRecord) {
        JobRecord saved = jobRecordService.create(employeeId, jobRecord);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
