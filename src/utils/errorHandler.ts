// utils/errorHandler.ts
export class AuthErrorHandler {
  static handleLoginError(error: any): string {
    if (error.isAxiosError) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      
      switch (status) {
        case 400:
        case 401:
          return this.parseLoginErrorMessage(errorData);
        case 404:
          return 'User not found';
        case 422:
          return 'Validation error. Please check your input.';
        case 500:
        case 502:
        case 503:
          return 'Server error. Please try again later.';
        default:
          return 'Login failed. Please try again.';
      }
    }
    
    return 'Network error. Please check your connection.';
  }
  
  private static parseLoginErrorMessage(errorData: any): string {
    if (!errorData) return 'Invalid credentials';
    
    const errorMessage = String(errorData.message || errorData.title || '').toLowerCase();
    const errors = errorData.errors;
    
    // Check if there are specific field errors
    if (errors) {
      if (errors.email && errors.password) {
        return 'Invalid email and password';
      } else if (errors.email) {
        return 'Invalid email address';
      } else if (errors.password) {
        return 'Invalid password';
      }
    }
    
    // Check error message content
    if (errorMessage.includes('email') && errorMessage.includes('password')) {
      return 'Invalid credentials';
    } else if (errorMessage.includes('email')) {
      return 'Invalid email address';
    } else if (errorMessage.includes('password')) {
      return 'Invalid password';
    } else if (errorMessage.includes('credential') || errorMessage.includes('invalid')) {
      return 'Invalid credentials';
    }
    
    return 'Invalid credentials';
  }
}