import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '../client/app';

interface Admin {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  profileImage?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  user: Admin | Employee;
  token: string;
}

// Custom type guard to check if user is admin
const isAdmin = (user: Admin | Employee): user is Admin => {
  return !('position' in user);
};

export const useUser = () => {
  const queryClient = useQueryClient();

  // Verify Admin
  const verifyAdmin = useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const query = `
        query VerifyAdmin($email: String!, $password: String!) {
          VerifyAdmin(email: $email, password: $password) {
            id
            name
            email
            profileImage
          }
        }
      `;
      const response = await graphqlClient.request<{ VerifyAdmin: Admin }>(query, credentials);
      return response.VerifyAdmin;
    },
    onSuccess: (data: Admin, variables: LoginInput) => {
        // Store user data in localStorage or other state management
        localStorage.setItem('user', JSON.stringify(data));
        // You might want to store the token received from your actual backend
        localStorage.setItem('userType', 'admin');
      },
    }
  );

  // Verify Employee
  const verifyEmployee = useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const query = `
        query VerifyEmployee($email: String!, $password: String!) {
          VerifyEmployee(email: $email, password: $password) {
            id
            name
            email
            position
            profileImage
          }
        }
      `;
      const response = await graphqlClient.request<{ VerifyEmployee: Employee }>(query, credentials);
      return response.VerifyEmployee;
    },
    onSuccess: (data: Employee, variables: LoginInput) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('userType', 'employee');
      },
    }
  );

  // Login handler that attempts both admin and employee login
  const login = async (credentials: LoginInput) => {
    try {
      // Try admin login first
      const adminResult = await verifyAdmin.mutateAsync(credentials);
      return { user: adminResult, type: 'admin' };
    } catch (error) {
      // If admin login fails, try employee login
      try {
        const employeeResult = await verifyEmployee.mutateAsync(credentials);
        return { user: employeeResult, type: 'employee' };
      } catch (employeeError) {
        throw new Error('Invalid credentials');
      }
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    queryClient.clear(); // Clear all React Query caches
  };

  // Get current user from localStorage
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    const userType = localStorage.getItem('userType');
    if (!userStr || !userType) return null;

    const user = JSON.parse(userStr);
    return {
      user,
      type: userType,
      isAdmin: userType === 'admin',
    };
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!getCurrentUser();
  };

  // Update user profile
  const updateProfile = useMutation({
    mutationFn: async (data) => {
      const currentUser = getCurrentUser();
      if (!currentUser) throw new Error('Not authenticated');

      const mutation = currentUser.isAdmin
        ? `
          mutation UpdateAdmin($id: ID!, $name: String, $email: String, $profileImage: String) {
            updateAdmin(
              id: $id
              name: $name
              email: $email
              profileImage: $profileImage
            ) {
              id
              name
              email
              profileImage
            }
          }
        `
        : `
          mutation UpdateEmployee($id: ID!, $name: String, $email: String, $profileImage: String) {
            updateEmployee(
              id: $id
              name: $name
              email: $email
              profileImage: $profileImage
            ) {
              id
              name
              email
              profileImage
            }
          }
        `;

      const response = await graphqlClient.request(mutation, {
        id: currentUser.user.id,
        ...data,
      });

      return response;
    },
    onSuccess: (data: { updateAdmin?: any; updateEmployee?: any }) => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const updatedUserData = data.updateAdmin || data.updateEmployee;
        localStorage.setItem(
          'user',
          JSON.stringify({ ...currentUser.user, ...data })
        );
      }
    }
  });

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    updateProfile,
    isLoading: verifyAdmin.status === 'pending' || verifyEmployee.status === 'pending',
    isError: verifyAdmin.status === 'error' || verifyEmployee.status === 'error',
  };
};

// Custom hook for protected routes
export const useProtectedRoute = () => {
  const { isAuthenticated, getCurrentUser } = useUser();

  const checkAccess = (requiredRole?: 'admin' | 'employee') => {
    const isAuth = isAuthenticated();
    if (!isAuth) return false;

    if (requiredRole) {
      const currentUser = getCurrentUser();
      return currentUser?.type === requiredRole;
    }

    return true;
  };

  return { checkAccess };
};