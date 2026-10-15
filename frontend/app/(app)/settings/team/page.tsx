'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { useUIStore } from '@/store/ui.store';
import { Users, Plus, Mail, Shield, CheckCircle2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Marketing Lead' | 'Analyst' | 'Viewer';
  status: 'active' | 'invited';
}

const initialTeam: TeamMember[] = [
  { id: '1', name: 'Abhishek Sharma', email: 'admin@mentneo.com', role: 'Owner', status: 'active' },
  { id: '2', name: 'Priya Reddy', email: 'priya.reddy@mentneo.com', role: 'Marketing Lead', status: 'active' },
  { id: '3', name: 'Karthik Varma', email: 'karthik@mentneo.com', role: 'Analyst', status: 'active' },
];

export default function SettingsTeamPage() {
  const { addToast } = useUIStore();
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Marketing Lead' | 'Analyst' | 'Viewer'>('Marketing Lead');

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: Math.random().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'invited',
    };

    setTeam([...team, newMember]);
    addToast(`Invitation sent to ${inviteEmail}.`, 'success');
    setInviteEmail('');
    setInviteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#111] dark:text-[#EDEDED]">Team & Collaborators</h2>
          <p className="text-xs text-[#666] dark:text-[#888] mt-0.5">
            Manage teammates who have access to launch campaigns and review DIYA plans.
          </p>
        </div>

        <Button
          size="sm"
          variant="gradient"
          onClick={() => setInviteModalOpen(true)}
          className="text-xs font-semibold shadow-xs"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Invite Member
        </Button>
      </div>

      <div className="p-4 rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#333] shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EAEAEA] dark:border-[#333] text-[#888]">
              <th className="py-2.5 font-medium">User Name & Email</th>
              <th className="py-2.5 font-medium">Role</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA] dark:divide-[#222]">
            {team.map((member) => (
              <tr key={member.id}>
                <td className="py-3">
                  <p className="font-semibold text-[#111] dark:text-[#EDEDED]">{member.name}</p>
                  <p className="text-[11px] text-[#888]">{member.email}</p>
                </td>
                <td className="py-3">
                  <span className="text-[11px] font-medium text-[#111] dark:text-[#EDEDED] bg-[#FAFAFA] dark:bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#EAEAEA] dark:border-[#333]">
                    {member.role}
                  </span>
                </td>
                <td className="py-3">
                  <Badge variant={member.status === 'active' ? 'success' : 'warning'} size="sm" dot>
                    {member.status === 'active' ? 'Active' : 'Invited'}
                  </Badge>
                </td>
                <td className="py-3 text-right">
                  {member.role !== 'Owner' && (
                    <button
                      type="button"
                      onClick={() => {
                        setTeam(team.filter((m) => m.id !== member.id));
                        addToast('Member removed from workspace.', 'info');
                      }}
                      className="text-red-600 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-[#111] dark:text-[#EDEDED]">
              Invite Team Member
            </DialogTitle>
            <DialogDescription className="text-xs text-[#666] dark:text-[#888] pt-1">
              They will receive an email link to join the Mentneo Realty workspace.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendInvite} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Email Address</label>
              <Input
                type="email"
                required
                placeholder="colleague@mentneo.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#111] dark:text-[#EDEDED]">Role & Permissions</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="w-full rounded-md border border-[#EAEAEA] dark:border-[#333] bg-white dark:bg-[#141414] px-3 py-2 text-xs text-[#111] dark:text-[#EDEDED] focus:outline-none"
              >
                <option value="Marketing Lead">Marketing Lead (Can approve plans & launch ads)</option>
                <option value="Analyst">Analyst (Can view telemetry & export reports)</option>
                <option value="Viewer">Viewer (Read-only access)</option>
              </select>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" size="sm" variant="outline" onClick={() => setInviteModalOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="gradient" className="text-xs font-semibold shadow-xs">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
