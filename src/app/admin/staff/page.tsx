'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Shield, Check, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminStaffPage() {
  const { addToast } = useApp();

  const roles = ['Super Admin', 'Operations Manager', 'Booking Staff', 'Accounts', 'Driver Manager'];
  const permissions = [
    'View Revenue Charts',
    'Manage Bookings & Assign Fleet',
    'Edit Tour Packages & Pricing',
    'Access WhatsApp Live Inbox',
    'Manage Staff & System Roles',
    'Issue Refund & Discount Vouchers',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">Staff Roles & Access Matrix</h1>
        <p className="text-xs text-ink-300">Granular permission matrix across operational modules</p>
      </div>

      <div className="rounded-3xl bg-ink-900 border border-teal-900/40 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-200">
            <thead className="bg-ink-950 text-ink-300 uppercase tracking-wider font-semibold border-b border-ink-800">
              <tr>
                <th className="p-4">Permission Module</th>
                {roles.map((r) => (
                  <th key={r} className="p-4 text-center">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {permissions.map((perm, idx) => (
                <tr key={perm} className="hover:bg-ink-950/60">
                  <td className="p-4 font-semibold text-white">{perm}</td>
                  {roles.map((r, rIdx) => {
                    const isAllowed = rIdx === 0 || (rIdx === 1 && idx < 4) || (rIdx === 2 && (idx === 1 || idx === 3));

                    return (
                      <td key={r} className="p-4 text-center">
                        <input
                          type="checkbox"
                          defaultChecked={isAllowed}
                          onChange={() => addToast({ title: 'Permission Updated', description: `${perm} for ${r}`, type: 'info' })}
                          className="accent-teal-400 cursor-pointer"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
