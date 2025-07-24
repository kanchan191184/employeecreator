package project.employeecreator.jobRecord;

import java.time.LocalDate;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import project.employeecreator.employee.Employee.JobType;

public class UpdateJobRecordDTO {
 
    private Long id;

    @NotNull
    private JobType jobType;

    @NotNull
    private LocalDate startDate;

    
    @FutureOrPresent(message = "End date must be in the future or present")
    private LocalDate endDate;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public JobType getJobType() {
        return jobType;
    }

    public void setJobType(JobType jobType) {
        this.jobType = jobType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    private Long employeeId;

     // No-arg constructor
    public UpdateJobRecordDTO() {}

    // Full constructor
    public UpdateJobRecordDTO(Long id, JobType jobType, LocalDate startDate, LocalDate endDate, Long employeeId) {
        this.id = id;
        this.jobType = jobType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
    }

}
