"use client";

import { useState } from "react";
import { Plus, Shield } from "lucide-react";

export default function AdminUsersPage() {
  const [users] = useState([
    { name: "Shafin Mahida", email: "shafin@dayarehabib.com", role: "Owner", status: "Active" },
    { name: "Farhan Bumedia", email: "farhan@dayarehabib.com", role: "Super Admin", status: "Active" },
    { name: "Abdullah Coordinator", email: "abdullah@dayarehabib.com", role: "Sales Agent", status: "Active" }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Staff & User Management
          </h1>
          <p className="text-xs text-stone-500">
            Control user access roles, coordinator accounts, and permissions.
          </p>
        </div>
        <button
          onClick={() => alert("Creating staff accounts requires Supabase auth system in subsequent sprints.")}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 dark:bg-stone-900/10 text-[10px] uppercase font-bold text-stone-400 border-b border-stone-100 dark:border-stone-900">
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-900 text-xs">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-stone-50/30 dark:hover:bg-stone-900/20 text-stone-605 dark:text-stone-400">
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-0.5">
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{user.name}</span>
                      <span className="text-[10px] text-stone-400">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1.5 text-stone-700 dark:text-stone-300">
                      <Shield className="h-3.5 w-3.5 text-stone-400" />
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert("Settings adjustments are disabled in SPRINT 1.")}
                      className="text-[10px] font-bold text-stone-450 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                    >
                      Manage Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
