const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  jobType: "CONTRACT" | "PERMANENT";
  startDate: string;
  finishDate: string;
  jobStatus: "FULL_TIME" | "PART_TIME";
  email: string;
  phoneNumber: string;
  address: string;
}

export type EmployeeData = Omit<Employee, "id">;

// Get all employees
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employees`, {
  });
  if (!response.ok) throw new Error("Failed to fetch employees");
  return await response.json();
};

// Get employee by ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
  });
  if (!response.ok) throw new Error("Failed to fetch employee");
  return await response.json();
};

// Add new employee
export const addEmployee = async (data: EmployeeData): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to add employee");
  return await response.json();
};

// Update employee
export const updateEmployee = async (id: number, data: EmployeeData): Promise<Employee> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return await response.json();
};

// Delete employee
export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Failed to delete employee");
};