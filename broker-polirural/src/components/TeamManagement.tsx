import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: {
    canEditFarmers: boolean;
    canEditCustomers: boolean;
    canManageTeam: boolean;
    canViewAnalytics: boolean;
  };
}

interface Props {
  onClose: () => void;
}

export const TeamManagement: React.FC<Props> = ({ onClose }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Admin',
      email: 'john@example.com',
      status: 'active',
      permissions: {
        canEditFarmers: true,
        canEditCustomers: true,
        canManageTeam: true,
        canViewAnalytics: true,
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Manager',
      email: 'jane@example.com',
      status: 'active',
      permissions: {
        canEditFarmers: true,
        canEditCustomers: true,
        canManageTeam: false,
        canViewAnalytics: true,
      },
    },
  ]);

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    role: 'Member',
  });

  const handlePermissionChange = (memberId: string, permission: keyof TeamMember['permissions']) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? {
              ...member,
              permissions: {
                ...member.permissions,
                [permission]: !member.permissions[permission],
              },
            }
          : member
      )
    );
  };

  const handleStatusChange = (memberId: string, status: TeamMember['status']) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? {
              ...member,
              status,
            }
          : member
      )
    );
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the invite to your backend
    console.log('Sending invite:', newInvite);
    setShowInviteForm(false);
    setNewInvite({ email: '', role: 'Member' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <button
          onClick={() => setShowInviteForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Invite Member
        </button>
      </div>

      {showInviteForm && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Invite New Member</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, role: e.target.value }))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Member">Member</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {teamMembers.map(member => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <select
                  value={member.status}
                  onChange={(e) => handleStatusChange(member.id, e.target.value as TeamMember['status'])}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={member.permissions.canEditFarmers}
                      onChange={() => handlePermissionChange(member.id, 'canEditFarmers')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Can Edit Farmers</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={member.permissions.canEditCustomers}
                      onChange={() => handlePermissionChange(member.id, 'canEditCustomers')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Can Edit Customers</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={member.permissions.canManageTeam}
                      onChange={() => handlePermissionChange(member.id, 'canManageTeam')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Can Manage Team</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={member.permissions.canViewAnalytics}
                      onChange={() => handlePermissionChange(member.id, 'canViewAnalytics')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Can View Analytics</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}; 