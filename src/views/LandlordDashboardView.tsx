import React, { useState } from 'react';
import { Home, Receipt, Wrench, Users, MessageSquare, Plus, CheckCircle2, Clock, AlertTriangle, Send, Phone, Edit, Trash2 } from 'lucide-react';
import { Property, RentRecord, MaintenanceRequest, Enquiry, User } from '../types';
import { storageService } from '../services/storageService';

interface LandlordDashboardViewProps {
  currentUser: User | null;
  properties: Property[];
  onNavigate: (tab: string) => void;
  onViewDetails: (property: Property) => void;
}

export const LandlordDashboardView: React.FC<LandlordDashboardViewProps> = ({
  currentUser,
  properties,
  onNavigate,
  onViewDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'rent' | 'maintenance' | 'enquiries'>('rent');
  const [rentRecords, setRentRecords] = useState<RentRecord[]>(storageService.getRentRecords());
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>(storageService.getMaintenanceRequests());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(storageService.getEnquiries());
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  // Filter properties belonging to owner or sample owner
  const myProperties = properties;

  const handleUpdateRentStatus = (id: string, status: 'Paid' | 'Pending' | 'Overdue') => {
    const updated = storageService.updateRentStatus(id, status);
    setRentRecords(updated);
  };

  const handleSendReminder = (tenantName: string, amount: number) => {
    setReminderToast(`Payment reminder dispatched to ${tenantName} for ₹${amount.toLocaleString('en-IN')}.`);
    setTimeout(() => setReminderToast(null), 3000);
  };

  const handleUpdateMaintenance = (id: string, status: 'Open' | 'In Progress' | 'Resolved') => {
    const updated = storageService.updateMaintenanceStatus(id, status);
    setMaintenance(updated);
  };

  // Financial summary calculations
  const totalCollected = rentRecords
    .filter(r => r.paymentStatus === 'Paid')
    .reduce((sum, r) => sum + r.amount, 0);

  const pendingCollection = rentRecords
    .filter(r => r.paymentStatus === 'Pending' || r.paymentStatus === 'Overdue')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#17365D] text-white flex items-center justify-center font-bold text-lg">
            {currentUser?.avatarInitials || 'VR'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#17365D]">
                {currentUser?.name || 'V. Ramanjaneyulu'}
              </h1>
              <span className="text-[11px] font-semibold text-[#F28C28] bg-[#FFF1E4] px-2 py-0.5 rounded-sm">
                Property Owner & Landlord
              </span>
            </div>
            <p className="text-xs text-[#68778A] mt-0.5">
              Markapur Portfolio · {myProperties.length} Registered Units · Verified Host
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('for-owners')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Rental Unit</span>
        </button>
      </div>

      {/* Reminder Notification Toast */}
      {reminderToast && (
        <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{reminderToast}</span>
          </div>
          <button onClick={() => setReminderToast(null)} className="text-emerald-900 underline text-[11px]">
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Stat Cards (Zero-Pill, tabular numbers) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs text-[#68778A]">Active Properties</div>
          <div className="text-2xl font-bold text-[#17365D] tabular-nums mt-1">
            {myProperties.length}
          </div>
          <div className="text-[11px] text-[#68778A] mt-1">Units in Markapur</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs text-[#68778A]">Rent Collected (Oct 2026)</div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#68778A] mt-1">Recorded via UPI / Cash</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs text-[#68778A]">Pending / Overdue</div>
          <div className="text-2xl font-bold text-[#F28C28] tabular-nums mt-1">
            ₹{pendingCollection.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#68778A] mt-1">Awaiting tenant transfer</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div className="text-xs text-[#68778A]">Open Repairs</div>
          <div className="text-2xl font-bold text-[#17365D] tabular-nums mt-1">
            {maintenance.filter(m => m.status !== 'Resolved').length}
          </div>
          <div className="text-[11px] text-[#68778A] mt-1">Active maintenance tickets</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E2E8F0] gap-6 text-sm font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('rent')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'rent'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Rent Tracking & Dues ({rentRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'listings'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>My Listings ({myProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'maintenance'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Maintenance Tickets ({maintenance.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 cursor-pointer transition-colors relative whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
              : 'text-[#68778A] hover:text-[#17365D]'
          }`}
        >
          <span>Tenant Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: RENT TRACKING LEDGER */}
      {activeTab === 'rent' && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17365D]">Monthly Rent Collection Ledger</h2>
              <p className="text-xs text-[#68778A]">Track payments, record receipts, and trigger courtesy reminders</p>
            </div>
            <span className="text-[11px] font-semibold text-[#17365D] bg-[#F2F7FF] px-2.5 py-1 rounded-sm">
              October 2026 Cycle
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#263445]">
              <thead className="bg-slate-50 border-b border-[#E2E8F0] text-[#68778A] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Property & Tenant</th>
                  <th className="px-5 py-3.5">Monthly Rent</th>
                  <th className="px-5 py-3.5">Due Date</th>
                  <th className="px-5 py-3.5">Payment Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {rentRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#17365D]">{r.propertyTitle}</div>
                      <div className="text-[11px] text-[#68778A]">{r.tenantName} · {r.tenantPhone}</div>
                    </td>
                    <td className="px-5 py-4 font-bold text-[#17365D] tabular-nums">
                      ₹{r.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-[#68778A] tabular-nums">
                      {r.dueDate}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-sm ${
                        r.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : r.paymentStatus === 'Pending'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {r.paymentStatus}
                      </span>
                      {r.paidDate && (
                        <div className="text-[10px] text-[#68778A] mt-0.5">
                          Paid on {r.paidDate}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      {r.paymentStatus !== 'Paid' ? (
                        <>
                          <button
                            onClick={() => handleUpdateRentStatus(r.id, 'Paid')}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => handleSendReminder(r.tenantName, r.amount)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#17365D] bg-[#F2F7FF] hover:bg-[#E2E8F0] rounded-md transition-colors cursor-pointer"
                          >
                            Send Reminder
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUpdateRentStatus(r.id, 'Pending')}
                          className="text-[11px] text-[#68778A] hover:underline cursor-pointer"
                        >
                          Revoke / Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProperties.map((prop) => (
              <div key={prop.id} className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#68778A]">
                    <span className="font-semibold text-[#17365D]">{prop.propertyType}</span>
                    <span className="font-mono">{prop.status}</span>
                  </div>
                  <h3
                    onClick={() => onViewDetails(prop)}
                    className="text-sm font-bold text-[#17365D] hover:text-[#3678C8] cursor-pointer mt-1 line-clamp-2"
                  >
                    {prop.title}
                  </h3>
                  <div className="text-xs text-[#68778A] mt-1">{prop.location}</div>
                  <div className="text-base font-bold text-[#17365D] mt-2 tabular-nums">
                    ₹{prop.monthlyRent.toLocaleString('en-IN')}/mo
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <button
                    onClick={() => onViewDetails(prop)}
                    className="text-xs font-semibold text-[#17365D] hover:underline cursor-pointer"
                  >
                    View Public Page
                  </button>
                  <span className="text-[11px] text-[#68778A]">
                    Listed: {prop.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MAINTENANCE TICKETS */}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#17365D]">Maintenance & Repair Desk</h2>
            <p className="text-xs text-[#68778A]">Manage tenant repair requests with category and status controls</p>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {maintenance.map((m) => (
              <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#17365D]">{m.category} Issue</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                      m.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {m.priority} Priority
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                      m.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : m.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#263445]">{m.propertyTitle}</div>
                  <p className="text-xs text-[#68778A]">{m.description}</p>
                  <div className="text-[11px] text-[#68778A]">
                    Reported by {m.tenantName} on {m.reportedDate}
                    {m.resolvedDate && ` · Resolved on ${m.resolvedDate}`}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {m.status !== 'In Progress' && m.status !== 'Resolved' && (
                    <button
                      onClick={() => handleUpdateMaintenance(m.id, 'In Progress')}
                      className="px-3 py-1.5 text-xs font-semibold text-[#17365D] bg-[#F2F7FF] hover:bg-[#E2E8F0] rounded-md transition-colors cursor-pointer"
                    >
                      Assign Plumber/Electrician
                    </button>
                  )}
                  {m.status !== 'Resolved' ? (
                    <button
                      onClick={() => handleUpdateMaintenance(m.id, 'Resolved')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateMaintenance(m.id, 'Open')}
                      className="text-xs text-[#68778A] hover:underline cursor-pointer"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#17365D]">Incoming Tenant Inquiries</h2>
            <p className="text-xs text-[#68778A]">Respond directly to verified prospective tenants</p>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {enquiries.map((enq) => (
              <div key={enq.id} className="p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#17365D]">{enq.tenantName}</span>
                    <span className="text-xs text-[#68778A]">({enq.tenantType})</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {enq.status}
                  </span>
                </div>
                <div className="text-xs text-[#17365D] font-medium">{enq.propertyTitle}</div>
                <p className="text-xs text-[#263445] bg-slate-50 p-3 rounded-md border border-[#E2E8F0]">
                  “{enq.message}”
                </p>
                <div className="flex flex-wrap items-center justify-between text-xs text-[#68778A] pt-1 gap-2">
                  <div className="flex items-center gap-3">
                    <span>Phone: {enq.tenantPhone}</span>
                    <span>Email: {enq.tenantEmail}</span>
                  </div>
                  <a
                    href={`tel:${enq.tenantPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs font-semibold text-[#3678C8] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Tenant</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
