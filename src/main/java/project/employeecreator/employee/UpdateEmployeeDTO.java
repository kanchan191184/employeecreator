package project.employeecreator.employee;

import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import project.employeecreator.employee.Employee.JobStatus;
import project.employeecreator.jobRecord.UpdateJobRecordDTO;

public class UpdateEmployeeDTO {
    
    @NotBlank
    @Pattern(regexp = ".*\\S.*", message = "First Name cannot be empty")
    private String firstName;

    private String middleName;

    @NotBlank
    @Pattern(regexp = ".*\\S.*", message = "Last Name cannot be empty")
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String address;

    private JobStatus jobStatus;

    private List<UpdateJobRecordDTO> jobRecords;

    public List<UpdateJobRecordDTO> getJobRecords() {
        return jobRecords;
    }

    public void setJobRecords(List<UpdateJobRecordDTO> jobRecords) {
        this.jobRecords = jobRecords;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }
    
}
