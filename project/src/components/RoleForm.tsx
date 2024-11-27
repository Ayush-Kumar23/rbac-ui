import React, { useState, useEffect } from 'react';
import { Role, Resource, Permission } from '../types';
import { resources } from '../data/mockData';

interface RoleFormProps {
  role?: Role;
  onSubmit: (role: Role) => void;
  onCancel: () => void;
}

const availablePermissions: Permission[] = ['create', 'read', 'update', 'delete'];

export default function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState<Omit<Role, 'id'>>({
    name: '',
    description: '',
    permissions: {},
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    }
  }, [role]);

  const handlePermissionChange = (
    resource: Resource,
    permission: Permission,
    checked: boolean
  ) => {
    const currentPermissions = formData.permissions[resource.id] || [];
    const newPermissions = checked
      ? [...currentPermissions, permission]
      : currentPermissions.filter((p) => p !== permission);

    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [resource.id]: newPermissions,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: role?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Permissions
        </label>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.id} className="border rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {resource.name}
              </h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {availablePermissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions[resource.id]?.includes(
                        permission
                      )}
                      onChange={(e) =>
                        handlePermissionChange(
                          resource,
                          permission,
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {permission}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {role ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}