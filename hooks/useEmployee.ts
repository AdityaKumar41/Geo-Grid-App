import { useMutation, useQuery } from '@tanstack/react-query';
import { graphqlClient } from '../client/app';

interface Employee {
  id: string;
  name: string;
  profileImage?: string;
  gender: string;
  age: number;
  phoneNo: string;
  email: string;
  position: string;
}

interface CreateEmployeeInput {
  name: string;
  profileImage: string;
  gender: string;
  age: number;
  phoneNo: string;
  email: string;
  position: string;
}

interface UpdateEmployeeInput {
  id: string;
  name?: string;
  profileImage?: string;
  gender?: string;
  age?: number;
  email?: string;
  position?: string;
}

interface EmployeesResponse {
  employees: Employee[];
}

interface CreateEmployeeResponse {
  createEmployee: Employee;
}

interface UpdateEmployeeResponse {
  updateEmployee: Employee;
}

export const useEmployees = () => {
  return useQuery<Employee[], Error>({
    queryKey: ['employees'],
    queryFn: async () => {
      const query = `
        query GetEmployees {
          employees {
            id
          name
          profileImage
          gender
          age
          phoneNo
          email
          position
        }
      }
    `;
    const response = await graphqlClient.request<EmployeesResponse>(query);
    return response.employees;}
  }); // Added missing closing parenthesis
}; // Added missing semicolon

export const useCreateEmployee = () => {
  return useMutation<Employee, Error, CreateEmployeeInput>({
    mutationFn: async (input) => {
      const mutation = `
        mutation CreateEmployee(
          $name: String!
          $profileImage: String!
          $gender: String!
          $age: Int!
          $phoneNo: String!
          $email: String!
          $position: String!
        ) {
          createEmployee(
            name: $name
            profileImage: $profileImage
            gender: $gender
            age: $age
            phoneNo: $phoneNo
            email: $email
            position: $position
          ) {
            id
            name
            email
            position
            profileImage
          }
        }
      `;
      const response = await graphqlClient.request<CreateEmployeeResponse>(mutation, input);
      return response.createEmployee;
    }
  });
};

export const useUpdateEmployee = () => {
  return useMutation<Employee, Error, UpdateEmployeeInput>({
    mutationFn: async (input) => {
      const mutation = `
        mutation UpdateEmployee(
          $id: ID!
          $name: String
          $profileImage: String
          $gender: String
          $age: Int
          $email: String
          $position: String
        ) {
          updateEmployee(
            id: $id
            name: $name
            profileImage: $profileImage
            gender: $gender
            age: $age
            email: $email
            position: $position
          ) {
            id
            name
            email
            position
            profileImage
          }
        }
      `;
      const response = await graphqlClient.request<UpdateEmployeeResponse>(mutation, input);
      return response.updateEmployee;
    }
  });
};