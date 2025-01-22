import { createEmployee, deleteEmployee, fetchEmployees, updateEmployee } from "@/app/(dashboard)/employees/employee-actions"
import { EmployeeType } from "@/backend/interfaces/employee-type"
import { CustomeResponseType } from "@/helpers/response-message"
import { create } from "zustand"


interface EmployeeStore {
    employees: EmployeeType[]
    selectedEmployee: EmployeeType | null
    setSelectedEmployee: (employee: EmployeeType | null) => void
    clearSelectedEmployee: () => void
    fetchEmployees: (companyUuid: string, forceFetch?: boolean) => Promise<void>
    timeStamp: number
    createEmployee: (data: EmployeeType) => Promise<CustomeResponseType>
    updateEmployee: (data: EmployeeType) => Promise<CustomeResponseType>
    deleteEmployee: (uuid: string) => Promise<CustomeResponseType>
}


const useEmployeeStore = create<EmployeeStore>((set, get) => ({
    employees: [],
    selectedEmployee: null,
    setSelectedEmployee: (employee: EmployeeType | null) => set({ selectedEmployee: employee }),
    clearSelectedEmployee: () => set({ selectedEmployee: null }),
    timeStamp: 0,
    fetchEmployees: async (companyUuid: string, forceFetch?: boolean) => {
        const timeStamp = Date.now();
        const shouldFetch = forceFetch || timeStamp - get().timeStamp > 300000; // 5 dakika
        if (shouldFetch) {
            const employees = await fetchEmployees(companyUuid);
            set({ employees: employees.data, timeStamp });
        }
    },
    createEmployee: async (data: EmployeeType) => {
        const response = await createEmployee(data);
        if (response.status) {
            set({ employees: [...get().employees, response.data] });
        }
        return response
    },
    updateEmployee: async (data: EmployeeType) => {
        const response = await updateEmployee(data);
        if (response.status) {
            set({ employees: get().employees.map(employee => employee.uuid === data.uuid ? response.data : employee) });
        }
        return response
    },
    deleteEmployee: async (uuid: string) => {
        const response = await deleteEmployee(uuid);
        if (response.status) {
            get().employees = get().employees.filter(employee => employee.uuid !== uuid);
        }
        return response
    }
}))


export default useEmployeeStore