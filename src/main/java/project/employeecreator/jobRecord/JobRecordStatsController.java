package project.employeecreator.jobRecord;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/job-records")
public class JobRecordStatsController {

    private final JobRecordService jobRecordService;

    // ✅ Proper constructor, matching class name exactly (capitalized!)
    public JobRecordStatsController(JobRecordService jobRecordService) {
        this.jobRecordService = jobRecordService;
    }

    @GetMapping
    public List<JobRecord> getAllJobRecords() {
        return jobRecordService.getAll();
    }
}

