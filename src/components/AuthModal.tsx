import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, UserCheck, KeyRound, Building, CheckCircle2, ArrowRight } from 'lucide-react';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

type AuthMode = 'login' | 'register-tenant' | 'register-landlord' | 'forgot-password';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'forgot-password') {
        if (!email) {
          setErrorMsg('Please enter your registered email address.');
          return;
        }
        setResetSent(true);
        return;
      }

      if (mode === 'login') {
        // Quick check against demo or arbitrary credentials in demo mode
        const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        const userToSet: User = found || {
          id: `user-${Date.now()}`,
          name: email.split('@')[0] || 'RentEase User',
          email,
          phone: '+91 98765 43210',
          role: email.toLowerCase().includes('landlord') ? 'landlord' : 'tenant',
          avatarInitials: (email[0] || 'U').toUpperCase(),
          joinedDate: 'October 2026',
        };

        storageService.setCurrentUser(userToSet);
        onLoginSuccess(userToSet);
        onClose();
        return;
      }

      // Registration
      const role = mode === 'register-landlord' ? 'landlord' : 'tenant';
      const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'RE';

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: fullName || 'RentEase Member',
        email,
        phone,
        role,
        avatarInitials: initials,
        joinedDate: 'October 2026',
      };

      storageService.setCurrentUser(newUser);
      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'tenant' | 'landlord') => {
    const demoUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    storageService.setCurrentUser(demoUser);
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#17365D]/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#17365D] text-white flex items-center justify-center font-bold text-sm">
              R
            </div>
            <h2 className="text-base font-bold text-[#17365D]">
              {mode === 'login' && 'Sign in to RentEase'}
              {mode === 'register-tenant' && 'Tenant Registration'}
              {mode === 'register-landlord' && 'Property Owner Registration'}
              {mode === 'forgot-password' && 'Reset Your Password'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#68778A] hover:text-[#17365D] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Mode Switcher Tabs for Registration / Login */}
          {mode !== 'forgot-password' && (
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); }}
                className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                  mode === 'login' ? 'bg-white text-[#17365D] shadow-xs font-semibold' : 'text-[#68778A]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register-tenant'); setErrorMsg(''); }}
                className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                  mode === 'register-tenant' ? 'bg-white text-[#17365D] shadow-xs font-semibold' : 'text-[#68778A]'
                }`}
              >
                Join as Tenant
              </button>
              <button
                type="button"
                onClick={() => { setMode('register-landlord'); setErrorMsg(''); }}
                className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                  mode === 'register-landlord' ? 'bg-white text-[#17365D] shadow-xs font-semibold' : 'text-[#68778A]'
                }`}
              >
                List Property
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-md border border-red-200">
              {errorMsg}
            </div>
          )}

          {resetSent ? (
            <div className="p-5 bg-[#EAF7EE] rounded-lg border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-950">Password Reset Email Dispatched</h3>
              <p className="text-xs text-emerald-800">
                If an account exists for <strong>{email}</strong>, instructions to reset your password have been sent.
              </p>
              <button
                type="button"
                onClick={() => { setResetSent(false); setMode('login'); }}
                className="text-xs font-semibold text-[#17365D] underline cursor-pointer"
              >
                Return to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name if Registering */}
              {(mode === 'register-tenant' || mode === 'register-landlord') && (
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. K. Sai Krishna"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#263445] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                />
              </div>

              {/* Phone if Registering */}
              {(mode === 'register-tenant' || mode === 'register-landlord') && (
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Mobile Number (for SMS Alerts) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99887 76655"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
              )}

              {/* Password */}
              {mode !== 'forgot-password' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-[#263445]">Password *</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-[11px] text-[#3678C8] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-[#68778A] hover:text-[#263445] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>
                      {mode === 'login' && 'Sign In to Account'}
                      {mode === 'register-tenant' && 'Create Tenant Account'}
                      {mode === 'register-landlord' && 'Register as Property Owner'}
                      {mode === 'forgot-password' && 'Send Reset Link'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Forgot password back link */}
              {mode === 'forgot-password' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-[#3678C8] hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </form>
          )}

          {/* 1-Click Demo Profiles (Essential for Wadhwani Pitch evaluation & demo testing) */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <div className="text-[11px] text-[#68778A] text-center mb-2 font-medium">
              Demonstration & Evaluation Access
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('tenant')}
                className="p-2 border border-[#E2E8F0] rounded-md bg-slate-50 hover:bg-[#F2F7FF] text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-semibold text-[#17365D]">Demo Tenant</div>
                <div className="text-[10px] text-[#68778A]">K. Sai Krishna (Student)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('landlord')}
                className="p-2 border border-[#E2E8F0] rounded-md bg-slate-50 hover:bg-[#FFF1E4] text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-semibold text-[#17365D]">Demo Landlord</div>
                <div className="text-[10px] text-[#68778A]">V. Ramanjaneyulu (Owner)</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
