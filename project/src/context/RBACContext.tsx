import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Role } from '../types';
import { users as initialUsers, roles as initialRoles } from '../data/mockData';

interface RBACState {
  users: User[];
  roles: Role[];
}

type RBACAction =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_ROLE'; payload: Role }
  | { type: 'UPDATE_ROLE'; payload: Role }
  | { type: 'DELETE_ROLE'; payload: string }
  | { type: 'LOAD_DATA'; payload: RBACState };

interface RBACContextType {
  state: RBACState;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (roleId: string) => void;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

function rbacReducer(state: RBACState, action: RBACAction): RBACState {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'ADD_ROLE':
      return { ...state, roles: [...state.roles, action.payload] };
    case 'UPDATE_ROLE':
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case 'DELETE_ROLE':
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
      };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
}

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rbacReducer, {
    users: initialUsers,
    roles: initialRoles,
  });

  useEffect(() => {
    const savedData = localStorage.getItem('rbacData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rbacData', JSON.stringify(state));
  }, [state]);

  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const deleteUser = (userId: string) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  const addRole = (role: Role) => {
    dispatch({ type: 'ADD_ROLE', payload: role });
  };

  const updateRole = (role: Role) => {
    dispatch({ type: 'UPDATE_ROLE', payload: role });
  };

  const deleteRole = (roleId: string) => {
    dispatch({ type: 'DELETE_ROLE', payload: roleId });
  };

  return (
    <RBACContext.Provider
      value={{
        state,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}