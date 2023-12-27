package manoj.fullstack.ems.service.implementation;

import lombok.AllArgsConstructor;
import manoj.fullstack.ems.dto.EmployeeDto;
import manoj.fullstack.ems.entity.Employee;
import manoj.fullstack.ems.exception.ResourceNotFoundException;
import manoj.fullstack.ems.mapper.EmployeeMapper;
import manoj.fullstack.ems.repository.EmployeeRepository;
import manoj.fullstack.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImplementation implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById((employeeId))
                .orElseThrow(()-> new ResourceNotFoundException("For the given ID, there are no employees"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setSurName(updatedEmployee.getSurName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(
                    () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
                );

        employeeRepository.deleteById(employeeId);
    }

}
