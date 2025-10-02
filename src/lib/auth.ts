export const getToken = (): string | null => {
    return localStorage.getItem("token")
  }
  
  export const setToken = (token: string): void => {
    localStorage.setItem("token", token)
  }
  
  export const removeToken = (): void => {
    localStorage.removeItem("token")
  }
  
  export const getUserRole = (): string | null => {
    return localStorage.getItem("role")
  }
  
  export const setUserRole = (role: string): void => {
    localStorage.setItem("role", role)
  }
  
  export const getUserName = (): string | null => {
    return localStorage.getItem("userName")
  }
  
  export const setUserName = (name: string): void => {
    localStorage.setItem("userName", name)
  }
  
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

export const checkAuth = async (): Promise<boolean> => {
  try {
    const { authAPI } = await import('./api')
    const response = await authAPI.me()
    
    // If successful, update user data from response
    if (response.data.user) {
      const { name, role } = response.data.user
      setUserName(name)
      setUserRole(role)
    }
    
    return true
  } catch (error) {
    // If /auth/me fails, clear stored auth data
    logout()
    return false
  }
}
  
  export const logout = (): void => {
    removeToken()
    localStorage.removeItem("role")
    localStorage.removeItem("userName")
  }
  