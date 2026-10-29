import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'Tenant' | 'Landlord' | 'Other'>('Tenant');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !subject || !message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
          Contact RentEase
        </h1>
        <p className="text-xs sm:text-sm text-[#68778A] leading-relaxed">
          Have an enquiry about rental homes, property listings, or partnership in Markapur? Our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Info & Desk Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F2F7FF] rounded-2xl p-6 sm:p-8 border border-[#3678C8]/20 space-y-6">
            <h2 className="text-lg font-bold text-[#17365D]">
              Markapur Regional Pilot Office
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#263445]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#17365D]">Office Address</div>
                  <div className="text-[#68778A] mt-0.5 leading-relaxed">
                    College Road, Near Samuel George Campus,<br />
                    Markapur, Prakasam District,<br />
                    Andhra Pradesh — 523316
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#17365D]">Enquiry Email</div>
                  <div className="text-[#68778A] mt-0.5">contact@rentease-ap.in</div>
                  <div className="text-[11px] text-[#68778A]">Response within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#17365D]">Helpline & WhatsApp Support</div>
                  <div className="text-[#68778A] mt-0.5">+91 8596 200000</div>
                  <div className="text-[11px] text-[#68778A]">Monday to Saturday, 9:00 AM – 6:30 PM</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#3678C8]/20 space-y-2">
              <div className="text-xs font-semibold text-[#17365D]">Wadhwani Ignite Entrepreneurship Desk</div>
              <p className="text-xs text-[#68778A] leading-relaxed">
                For educational tie-ups, college hostel partnerships, or university housing coordination in Andhra Pradesh, contact our campus liaison desk.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Enquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] shadow-md p-6 sm:p-8">
          {submitted ? (
            <div className="p-8 bg-[#EAF7EE] rounded-xl border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">Thank You, {name}!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Your message regarding “<strong>{subject}</strong>” has been recorded. Our Markapur desk will review your enquiry and get back to you at <strong>{email}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 text-xs font-semibold text-emerald-900 underline cursor-pointer"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-[#17365D]">Send Us a Message</h2>
                <p className="text-xs text-[#68778A]">
                  Leave your details and enquiry topic below.
                </p>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-md border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. K. Sai Krishna"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">Mobile Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99887 76655"
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#263445] mb-1">I am a *</label>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] bg-white text-[#263445]"
                  >
                    <option value="Tenant">Prospective Tenant / Student</option>
                    <option value="Landlord">Property Owner / Landlord</option>
                    <option value="Other">College Representative / Partner / Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263445] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question about 2BHK rental listings near Samuel George College"
                  className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263445] mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for or how we can help..."
                  className="w-full text-xs px-3 py-2 border border-[#E2E8F0] rounded-md focus:border-[#3678C8] focus:outline-hidden leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#17365D] hover:bg-[#22487A] rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
