package manoj.fullstack.ems.mapper;

import manoj.fullstack.ems.dto.EmployeeDto;
import manoj.fullstack.ems.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getSurName(),
                employee.getEmail()
        );
    }
    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getSurName(),
                employeeDto.getEmail()
        );
    }
}
