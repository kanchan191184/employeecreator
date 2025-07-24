import api from "../api/api";

export interface JobRecord {
  id: number;
  jobType: 'PERMANENT' | 'CONTRACT';
  startDate: string;
  endDate?: string;
}

export interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  jobStatus: "FULL_TIME" | "PART_TIME";
  email: string;
  phoneNumber: string;
  address: string;
  jobRecord: JobRecord;
  jobRecords: JobRecord[];
}

export type EmployeeData = Omit<Employee, "id">;


  export const getEmployees = async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  };

  export const getEmployeeById = async (id: number): Promise<Employee> => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  };

  export const addEmployee = async (data: EmployeeData): Promise<Employee> => {
    const response = await api.post<Employee>('/employees', data);
    return response.data;
  };

  export const updateEmployee = async (id: number, data: EmployeeData): Promise<Employee> => {
    const response = await api.patch<Employee>(`/employees/${id}`, data);
    return response.data;
  };

  export const deleteEmployee = async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  };
