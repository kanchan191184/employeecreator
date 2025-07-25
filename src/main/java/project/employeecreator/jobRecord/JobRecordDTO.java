package project.employeecreator.jobRecord;

import java.time.LocalDate;

public class JobRecordDTO {
    private String jobType; // or JobType enum
    private LocalDate startDate;
    private LocalDate endDate;
    public String getJobType() {
        return jobType;
    }
    public void setJobType(String jobType) {
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
}
