import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  AdminPanelSettings as RoleIcon,
} from '@mui/icons-material';
import { userRolesAPI, UserRole, UserWithRole } from '../../api/userRoles';
import { useApi } from '../../hooks/useApi';

const UserRoleManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roleDialog, setRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });
  
  const { callApi, loading, error } = useApi();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [rolesResult, usersResult] = await Promise.all([
      callApi({ method: 'GET', url: '/roles' }),
      callApi({ method: 'GET', url: '/users' }),
    ]);
    
    if (rolesResult.success) setRoles(rolesResult.data);
    if (usersResult.success) setUsers(usersResult.data);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenRoleDialog = (role?: UserRole) => {
    if (role) {
      setSelectedRole(role);
      setRoleForm({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions],
      });
    } else {
      setSelectedRole(null);
      setRoleForm({
        name: '',
        description: '',
        permissions: [],
      });
    }
    setRoleDialog(true);
  };

  const handleSaveRole = async () => {
    const method = selectedRole ? 'PUT' : 'POST';
    const url = selectedRole ? `/roles/${selectedRole.id}` : '/roles';
    
    const result = await callApi({
      method,
      url,
      data: roleForm,
    });
    
    if (result.success) {
      setRoleDialog(false);
      loadData();
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      const result = await callApi({
        method: 'DELETE',
        url: `/roles/${roleId}`,
      });
      
      if (result.success) {
        loadData();
      }
    }
  };

  const handleAssignRole = async (userId: number, roleId: number) => {
    await callApi({
      method: 'POST',
      url: `/users/${userId}/assign-role`,
      data: { roleId },
    });
    loadData();
  };

  const availablePermissions = [
    'VIEW_COURSES',
    'ENROLL_COURSES',
    'UPLOAD_RESOURCES',
    'MANAGE_WEBINARS',
    'SEND_NOTIFICATIONS',
    'VIEW_ANALYTICS',
    'MANAGE_USERS',
    'MANAGE_ROLES',
    'SYSTEM_CONFIG',
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          User & Role Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          UC-ADM-004: Manage system users and their roles
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab icon={<RoleIcon />} label="Roles" />
          <Tab icon={<PersonIcon />} label="Users" />
        </Tabs>

        {/* Roles Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">System Roles</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenRoleDialog()}
              >
                Add New Role
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{role.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {role.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {role.permissions.slice(0, 3).map((perm) => (
                            <Chip key={perm} label={perm} size="small" />
                          ))}
                          {role.permissions.length > 3 && (
                            <Chip label={`+${role.permissions.length - 3}`} size="small" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {users.filter(u => u.role === role.name).length} users
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenRoleDialog(role)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Users Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Users
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Current Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{user.fullName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          @{user.username}
                        </Typography>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip label={user.role} size="small" />
                      </TableCell>
                      <TableCell>
                        {user.active ? (
                          <Chip label="Active" color="success" size="small" />
                        ) : (
                          <Chip label="Inactive" color="default" size="small" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => {
                            const newRole = prompt('Enter new role for user:');
                            if (newRole) {
                              // Find role ID and assign
                              const role = roles.find(r => r.name === newRole);
                              if (role) {
                                handleAssignRole(user.id, role.id);
                              }
                            }
                          }}
                        >
                          Change Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>

      {/* Role Dialog */}
      <Dialog open={roleDialog} onClose={() => setRoleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Create New Role'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role Name"
                value={roleForm.name}
                onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={roleForm.description}
                onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Permissions
              </Typography>
              <Grid container spacing={1}>
                {availablePermissions.map((permission) => (
                  <Grid item xs={12} sm={6} md={4} key={permission}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={roleForm.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoleForm({
                                ...roleForm,
                                permissions: [...roleForm.permissions, permission],
                              });
                            } else {
                              setRoleForm({
                                ...roleForm,
                                permissions: roleForm.permissions.filter(p => p !== permission),
                              });
                            }
                          }}
                        />
                      }
                      label={permission}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveRole}
            disabled={loading || !roleForm.name}
          >
            {loading ? 'Saving...' : selectedRole ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserRoleManagement;