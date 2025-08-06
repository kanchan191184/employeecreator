package project.employeecreator.jobRecord;

import java.time.LocalDate;
import jakarta.validation.constraints.NotNull;
import project.employeecreator.employee.Employee.JobType;

public class CreateJobRecordDTO {
    
    private Long id;

    @NotNull
    private JobType jobType;

    @NotNull
    private LocalDate startDate;
    private LocalDate endDate;
    private Long employeeId;
    private Integer hoursPerWeek;

    // No-arg constructor
    public CreateJobRecordDTO() {}

    // Full constructor
    public CreateJobRecordDTO(Long id, JobType jobType, LocalDate startDate, LocalDate endDate, Long employeeId) {
        this.id = id;
        this.jobType = jobType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
    }

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

    public Integer getHoursPerWeek() {
        return hoursPerWeek;
    }

    public void setHoursPerWeek(Integer hoursPerWeek) {
        this.hoursPerWeek = hoursPerWeek;
    }

    
}
