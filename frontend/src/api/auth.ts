const mockUsers = [
  {
    id: 1,
    username: 'taxpayer',
    password: '123',
    fullName: 'John Taxpayer',
    email: 'taxpayer@example.com',
    userType: 'TAXPAYER' as const,
    taxNumber: 'TXN-123456',
    companyName: 'Doe Enterprises',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    username: 'admin',
    password: '123',
    fullName: 'System Admin',
    email: 'admin@itas.gov',
    userType: 'SYSTEM_ADMIN' as const,
    active: true,
    createdAt: new Date().toISOString(),
  },
];

export const authAPI = {
  login: async (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.username === username && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          resolve({
            data: {
              user: userWithoutPassword,
              token: 'mock-token-' + Date.now(),
            },
            message: 'Login successful',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: async (userData: any) => {
    return Promise.resolve({
      data: { ...userData, id: Date.now() },
      message: 'Registration successful',
    });
  },
};
