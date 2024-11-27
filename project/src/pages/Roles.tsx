import React, { useState } from 'react';
import RoleList from '../components/RoleList';
import RoleForm from '../components/RoleForm';
import Modal from '../components/Modal';
import { Role } from '../types';
import { Plus } from 'lucide-react';
import { useRBAC } from '../context/RBACContext';

export default function Roles() {
  const { state, addRole, updateRole, deleteRole } = useRBAC();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  const filteredRoles = state.roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole(roleId);
    }
  };

  const handleSubmit = (role: Role) => {
    if (selectedRole) {
      updateRole(role);
    } else {
      addRole(role);
    }
    setIsModalOpen(false);
    setSelectedRole(undefined);
  };

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => {
              setSelectedRole(undefined);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search roles..."
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <RoleList
          roles={filteredRoles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(undefined);
        }}
        title={selectedRole ? 'Edit Role' : 'Add Role'}
      >
        <RoleForm
          role={selectedRole}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedRole(undefined);
          }}
        />
      </Modal>
    </div>
  );
}