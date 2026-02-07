// Role definitions based on requirements
export const ROLES = {
  TAXPAYER: 'TAXPAYER',
  CONTENT_ADMIN: 'CONTENT_ADMIN',
  TRAINING_ADMIN: 'TRAINING_ADMIN',
  COMM_OFFICER: 'COMM_OFFICER',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  MANAGER: 'MANAGER',
  AUDITOR: 'AUDITOR',
} as const;

export type UserRole = keyof typeof ROLES;

// Permission definitions
export const PERMISSIONS = {
  // Taxpayer permissions
  VIEW_COURSES: 'VIEW_COURSES',
  ENROLL_COURSES: 'ENROLL_COURSES',
  COMPLETE_MODULES: 'COMPLETE_MODULES',
  VIEW_RESOURCES: 'VIEW_RESOURCES',
  DOWNLOAD_RESOURCES: 'DOWNLOAD_RESOURCES',
  
  // Content Admin permissions
  UPLOAD_RESOURCES: 'UPLOAD_RESOURCES',
  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  ARCHIVE_RESOURCES: 'ARCHIVE_RESOURCES',
  
  // Training Admin permissions
  SCHEDULE_WEBINARS: 'SCHEDULE_WEBINARS',
  MANAGE_WEBINARS: 'MANAGE_WEBINARS',
  
  // Communication Officer permissions
  SEND_NOTIFICATIONS: 'SEND_NOTIFICATIONS',
  
  // Manager permissions
  VIEW_ANALYTICS: 'VIEW_ANALYTICS',
  EXPORT_REPORTS: 'EXPORT_REPORTS',
  
  // System Admin permissions
  MANAGE_USERS: 'MANAGE_USERS',
  MANAGE_ROLES: 'MANAGE_ROLES',
  SYSTEM_CONFIG: 'SYSTEM_CONFIG',
} as const;

export type Permission = keyof typeof PERMISSIONS;

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [ROLES.TAXPAYER]: [
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.ENROLL_COURSES,
    PERMISSIONS.COMPLETE_MODULES,
    PERMISSIONS.VIEW_RESOURCES,
    PERMISSIONS.DOWNLOAD_RESOURCES,
  ],
  
  [ROLES.CONTENT_ADMIN]: [
    PERMISSIONS.UPLOAD_RESOURCES,
    PERMISSIONS.UPDATE_RESOURCES,
    PERMISSIONS.ARCHIVE_RESOURCES,
    PERMISSIONS.VIEW_RESOURCES,
    PERMISSIONS.DOWNLOAD_RESOURCES,
  ],
  
  [ROLES.TRAINING_ADMIN]: [
    PERMISSIONS.SCHEDULE_WEBINARS,
    PERMISSIONS.MANAGE_WEBINARS,
    PERMISSIONS.VIEW_COURSES,
  ],
  
  [ROLES.COMM_OFFICER]: [
    PERMISSIONS.SEND_NOTIFICATIONS,
  ],
  
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_REPORTS,
  ],
  
  [ROLES.SYSTEM_ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.UPLOAD_RESOURCES,
    PERMISSIONS.UPDATE_RESOURCES,
    PERMISSIONS.ARCHIVE_RESOURCES,
    PERMISSIONS.SCHEDULE_WEBINARS,
    PERMISSIONS.MANAGE_WEBINARS,
    PERMISSIONS.SEND_NOTIFICATIONS,
  ],
  
  [ROLES.AUDITOR]: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_REPORTS,
  ],
};

// Check if user has specific permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

// Check if user has any of the given permissions
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

// Check if user has all of the given permissions
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

// Get readable role name
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    [ROLES.TAXPAYER]: 'Taxpayer',
    [ROLES.CONTENT_ADMIN]: 'Content Administrator',
    [ROLES.TRAINING_ADMIN]: 'Training Administrator',
    [ROLES.COMM_OFFICER]: 'Communication Officer',
    [ROLES.SYSTEM_ADMIN]: 'System Administrator',
    [ROLES.MANAGER]: 'Manager',
    [ROLES.AUDITOR]: 'Auditor',
  };
  
  return displayNames[role] || role;
}

// Get role description
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    [ROLES.TAXPAYER]: 'Individual taxpayers who can access educational resources and courses',
    [ROLES.CONTENT_ADMIN]: 'Manages educational content, resources, and materials',
    [ROLES.TRAINING_ADMIN]: 'Schedules and manages webinars and training sessions',
    [ROLES.COMM_OFFICER]: 'Sends notifications and communications to users',
    [ROLES.SYSTEM_ADMIN]: 'Manages system configuration, users, and roles',
    [ROLES.MANAGER]: 'Views analytics and generates reports',
    [ROLES.AUDITOR]: 'Audits system usage and compliance',
  };
  
  return descriptions[role] || '';
}

// Get routes accessible by role
export function getAccessibleRoutes(role: UserRole): string[] {
  const routes: Record<UserRole, string[]> = {
    [ROLES.TAXPAYER]: [
      '/taxpayer/dashboard',
      '/taxpayer/courses',
      '/taxpayer/courses/:id',
      '/taxpayer/resources',
      '/profile',
    ],
    
    [ROLES.CONTENT_ADMIN]: [
      '/admin/dashboard',
      '/admin/upload-resource',
      '/admin/resource-version',
      '/admin/resources',
      '/profile',
    ],
    
    [ROLES.TRAINING_ADMIN]: [
      '/admin/dashboard',
      '/admin/webinar-management',
      '/admin/webinars',
      '/profile',
    ],
    
    [ROLES.COMM_OFFICER]: [
      '/admin/dashboard',
      '/admin/notification-center',
      '/profile',
    ],
    
    [ROLES.MANAGER]: [
      '/admin/dashboard',
      '/admin/analytics',
      '/profile',
    ],
    
    [ROLES.SYSTEM_ADMIN]: [
      '/admin/dashboard',
      '/admin/user-management',
      '/admin/role-management',
      '/admin/system-config',
      '/admin/analytics',
      '/profile',
    ],
    
    [ROLES.AUDITOR]: [
      '/admin/dashboard',
      '/admin/audit-logs',
      '/admin/analytics',
      '/profile',
    ],
  };
  
  return routes[role] || [];
}

// Check if route is accessible by role
export function canAccessRoute(role: UserRole, route: string): boolean {
  const accessibleRoutes = getAccessibleRoutes(role);
  
  // Exact match
  if (accessibleRoutes.includes(route)) {
    return true;
  }
  
  // Pattern match for dynamic routes
  return accessibleRoutes.some(accessibleRoute => {
    if (accessibleRoute.includes(':')) {
      // Convert route pattern to regex
      const pattern = accessibleRoute
        .replace(/:[^/]+/g, '([^/]+)')
        .replace(/\//g, '\\/');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(route);
    }
    return false;
  });
}

// Get menu items for role
export function getMenuItems(role: UserRole) {
  const allMenuItems = {
    taxpayer: [
      { label: 'Dashboard', path: '/taxpayer/dashboard', icon: 'Dashboard' },
      { label: 'Courses', path: '/taxpayer/courses', icon: 'School' },
      { label: 'Resources', path: '/taxpayer/resources', icon: 'Description' },
      { label: 'Certificates', path: '/taxpayer/certificates', icon: 'Verified' },
      { label: 'Profile', path: '/profile', icon: 'Person' },
    ],
    
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: 'Dashboard' },
      { label: 'User Management', path: '/admin/user-management', icon: 'People', roles: [ROLES.SYSTEM_ADMIN] },
      { label: 'Role Management', path: '/admin/role-management', icon: 'AdminPanelSettings', roles: [ROLES.SYSTEM_ADMIN] },
      { label: 'Upload Resource', path: '/admin/upload-resource', icon: 'Upload', roles: [ROLES.CONTENT_ADMIN, ROLES.SYSTEM_ADMIN] },
      { label: 'Resource Version', path: '/admin/resource-version', icon: 'History', roles: [ROLES.CONTENT_ADMIN, ROLES.SYSTEM_ADMIN] },
      { label: 'Webinar Management', path: '/admin/webinar-management', icon: 'VideoCall', roles: [ROLES.TRAINING_ADMIN, ROLES.SYSTEM_ADMIN] },
      { label: 'Notification Center', path: '/admin/notification-center', icon: 'Notifications', roles: [ROLES.COMM_OFFICER, ROLES.SYSTEM_ADMIN] },
      { label: 'Analytics', path: '/admin/analytics', icon: 'Analytics', roles: [ROLES.MANAGER, ROLES.SYSTEM_ADMIN, ROLES.AUDITOR] },
      { label: 'System Config', path: '/admin/system-config', icon: 'Settings', roles: [ROLES.SYSTEM_ADMIN] as UserRole[] },
      { label: 'Audit Logs', path: '/admin/audit-logs', icon: 'ListAlt', roles: [ROLES.AUDITOR, ROLES.SYSTEM_ADMIN] },
      { label: 'Profile', path: '/profile', icon: 'Person' },
    ],
  };
  
  if (role === ROLES.TAXPAYER) {
    return allMenuItems.taxpayer;
  } else {
    return allMenuItems.admin.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(role);
    });
  }
}

// Get dashboard statistics based on role
export function getDashboardStats(role: UserRole) {
  const stats = {
    [ROLES.TAXPAYER]: [
      { label: 'Enrolled Courses', key: 'enrolledCourses' },
      { label: 'Completed Courses', key: 'completedCourses' },
      { label: 'Certificates', key: 'certificates' },
      { label: 'Progress', key: 'averageProgress' },
    ],
    
    [ROLES.CONTENT_ADMIN]: [
      { label: 'Total Resources', key: 'totalResources' },
      { label: 'Uploaded This Month', key: 'resourcesThisMonth' },
      { label: 'Total Downloads', key: 'totalDownloads' },
      { label: 'Resource Views', key: 'resourceViews' },
    ],
    
    [ROLES.TRAINING_ADMIN]: [
      { label: 'Scheduled Webinars', key: 'scheduledWebinars' },
      { label: 'Total Registrations', key: 'webinarRegistrations' },
      { label: 'Attendance Rate', key: 'attendanceRate' },
      { label: 'Upcoming Webinars', key: 'upcomingWebinars' },
    ],
    
    [ROLES.COMM_OFFICER]: [
      { label: 'Sent Notifications', key: 'sentNotifications' },
      { label: 'Open Rate', key: 'notificationOpenRate' },
      { label: 'This Month', key: 'notificationsThisMonth' },
      { label: 'Campaigns', key: 'activeCampaigns' },
    ],
    
    [ROLES.MANAGER]: [
      { label: 'Total Users', key: 'totalUsers' },
      { label: 'Active Users', key: 'activeUsers' },
      { label: 'Course Completions', key: 'courseCompletions' },
      { label: 'System Uptime', key: 'systemUptime' },
    ],
    
    [ROLES.SYSTEM_ADMIN]: [
      { label: 'Total Users', key: 'totalUsers' },
      { label: 'System Health', key: 'systemHealth' },
      { label: 'Active Sessions', key: 'activeSessions' },
      { label: 'Storage Usage', key: 'storageUsage' },
    ],
    
    [ROLES.AUDITOR]: [
      { label: 'Audit Logs', key: 'auditLogs' },
      { label: 'Compliance Score', key: 'complianceScore' },
      { label: 'Security Events', key: 'securityEvents' },
      { label: 'User Activities', key: 'userActivities' },
    ],
  };
  
  return stats[role] || stats[ROLES.TAXPAYER];
}