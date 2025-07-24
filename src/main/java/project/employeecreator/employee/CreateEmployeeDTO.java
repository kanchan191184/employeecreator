package project.employeecreator.employee;

import java.util.List;
import jakarta.validation.constraints.NotBlank;
import project.employeecreator.employee.Employee.JobStatus;
import project.employeecreator.jobRecord.CreateJobRecordDTO;

public class CreateEmployeeDTO {
   
    @NotBlank
    private String firstName;

    private String middleName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String address;

    private JobStatus jobStatus;

    // Add this to accept job records from client
    private List<CreateJobRecordDTO> jobRecords;

    public List<CreateJobRecordDTO> getJobRecords() {
        return jobRecords;
    }

    public void setJobRecords(List<CreateJobRecordDTO> jobRecords) {
        this.jobRecords = jobRecords;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }
}
