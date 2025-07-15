package project.employeecreator.employee;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import io.restassured.http.ContentType;

import static org.hamcrest.Matchers.*;
// import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EmployeeEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private EmployeeRepository employeeRepository;

    private ArrayList<Employee> employees = new ArrayList<>();

    @BeforeEach
    public void setup() {

        RestAssured.port = this.port;

        this.employeeRepository.deleteAll();
        this.employees.clear();

        Employee emp1 = new Employee();
        emp1.setFirstName("John");
        emp1.setMiddleName("Anne");
        emp1.setLastName("Thomas");
        emp1.setEmail("john7@dummy.com");
        emp1.setPhoneNumber("40477009000");
        emp1.setAddress("123 King's road");
        emp1.setJobType(Employee.JobType.PERMANENT);
        emp1.setStartDate("2024-01-15");
        emp1.setFinishDate("2024-06-15");
        emp1.setJobStatus(Employee.JobStatus.PART_TIME);

        Employee emp2 = new Employee();
        emp2.setFirstName("Mary");
        emp2.setMiddleName("");
        emp2.setLastName("Johnson");
        emp2.setEmail("mary9@dummy.com");
        emp2.setPhoneNumber("40477009111");
        emp2.setAddress("12 Carter road");
        emp2.setJobType(Employee.JobType.CONTRACT);
        emp2.setStartDate("2023-01-15");
        emp2.setFinishDate("2025-08-15");
        emp2.setJobStatus(Employee.JobStatus.FULL_TIME);
        
        employeeRepository.save(emp1);
        employeeRepository.save(emp2);

        employees.add(emp1);
        employees.add(emp2);
    }

     //test for GET /todos
    @Test
    public void getAllEmployees_EmployeesInDB_ReturnsSuccess() {
        // Arrange
        // Act

        given()
            .when().get("/employees")
            .then().statusCode(HttpStatus.OK.value())
            .body("$", hasSize(2))
            .body("firstName", hasItems("John", "Mary"));
            // .body(matchesJsonSchemaInClasspath("schemas/todo-list-schema.json"));
    }

    @Test
    public void getAllEmployees_NoEmployeesInDB_ReturnsSuccessAndEmptyArray() {
        this.employeeRepository.deleteAll();
        given()
                .when().get("/employees")
                .then().statusCode(HttpStatus.OK.value())
                .body("$", hasSize(0));

    }

    @Test
    public void getById_InvalidID_BadRequest() {
        given()
                .when()
                .get("employees/gfiakrnoaoe")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void getById_IDNotInDB_NotFound() {
        Long largeID = 9746829100l;
        given()
            .when()
            .get("employees/" + largeID)
            .then()
            .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    public void getByID_IDInDB_Success() {
        Long existingId = this.employees.get(0).getId();

        given()
            .when()
            .get("/employees/" + existingId)
            .then()
            .statusCode(HttpStatus.OK.value())
            .body("firstName", equalTo("John"));
            // .body(matchesJsonSchemaInClasspath("schemas/todo-schema.json"));

    }

     // POST /todos

    @Test
    public void createEmployee_WhenPassedValidData_Created() {

        Map<String, Object> data = new HashMap<>();
        data.put("firstName", "Ravi");
        data.put("lastName", "Dubey");
        data.put("email", "ravi@dummy.com");
        data.put("phoneNumber", "40678936374");
        data.put("address", "45 Carter Road");
        data.put("startDate", "2022-01-15");
        data.put("finishDate", "2025-06-15");
        data.put("jobType", "PERMANENT");
        data.put("jobStatus","PART_TIME");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("firstName", equalTo("Ravi"));
    }

        // bad request

    @Test
    public void createEmployee_InvalidData_BadRequest() {
        Map<String, Object> data = new HashMap<>();
        data.put("firstName", "Ravi");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createEmployee_EmptyRequestBody_BadRequest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void createEmployee_InvalidRequestBodyType_UnsupportedMediaType() {
        given()
                .contentType(ContentType.TEXT)
                .when()
                .post("/employees")
                .then()
                .statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }


    //   // PATCH / todos

    // @Test
    // public void updateEmployee_WhenPassValidData_UpdatesAndReturnsEmployee() {

    //  // First, create a employee to update (or use an existing one)
    // String createJson = """
    // {
    //   "firstName": "Ravi",
    //   "lastName": "Kumar",
    //   "email": "ravi.kumar@example.com",
    //   "phoneNumber": "1234567890",
    //   "address": "123 Main St",
    //   "jobType": "PERMANENT",
    //   "startDate":"2023-01-15",
    //   "finishDate":"2025-06-23",
    //   "jobStatus":"PART_TIME"
    // }
    // """;

    // int employeeId = 
    //     given()
    //         .contentType(ContentType.JSON)
    //         .body(createJson)
    //         .when()
    //         .post("/employees")
    //         .then()
    //         .statusCode(HttpStatus.CREATED.value())
    //         .extract()
    //         .path("id");

    
    //   // Prepare update data
    // String updateJson = """
    // {
    //     "firstName": "Ravi",
    //   "lastName": "Dubey",
    //   "email": "ravi.kumar@example.com",
    //   "phoneNumber": "1234567890",
    //   "address": "123 Main St",
    //   "jobType": "PERMANENT",
    //   "startDate":"2023-01-15",
    //   "finishDate":"2025-06-23",
    //   "jobStatus":"PART_TIME"
    // }
    // """;

    // // Update the employee
    // given()
    //     .contentType(ContentType.JSON)
    //     .body(updateJson)
    //     .when()
    //     .put("/employees/" + employeeId)
    //     .then()
    //     .statusCode(HttpStatus.OK.value())
    //     .body("lastName", equalTo("Dubey"));
    // }
}
