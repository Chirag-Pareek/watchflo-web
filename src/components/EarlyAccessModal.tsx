import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Check, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasAndroid, setHasAndroid] = useState<'yes' | 'no' | null>(null);
  const [timeline, setTimeline] = useState('immediately');
  const [reason, setReason] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const key = import.meta.env.VITE_WEB3FORMS_KEY || 'a655c71a-8c10-49c1-9d07-801a302ed8e1';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in your name and email.');
      return;
    }
    
    if (hasAndroid === null) {
      toast.error('Please specify if you have an Android device.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: key,
          subject: `WatchFlo Early Access Application: ${name}`,
          from_name: 'WatchFlo waitlist',
          name,
          email,
          has_android: hasAndroid === 'yes' ? 'Yes' : 'No',
          testing_timeline: timeline === 'immediately' 
            ? 'Immediately (Alpha/Beta)' 
            : timeline === 'public-beta' 
            ? 'When public beta launches' 
            : 'Near official release',
          why_test: reason || 'Not specified',
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        toast.success('Application submitted successfully!');
        // Clear form
        setName('');
        setEmail('');
        setHasAndroid(null);
        setTimeline('immediately');
        setReason('');
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = (open: boolean) => {
    onClose(open);
    // Reset success state when closing modal
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 300);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleModalClose}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
        />
        
        {/* Modal content container */}
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto pointer-events-none">
          <Dialog.Content 
            className="w-full max-w-md rounded-card border pointer-events-auto p-7 md:p-9 shadow-phone select-none relative overflow-hidden transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)'
            }}
          >
            {/* Close button */}
            <Dialog.Close 
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--bg-card-hover)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {!isSuccess ? (
              <>
                <Dialog.Title 
                  className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-2 pr-6"
                >
                  Apply for Early Access
                </Dialog.Title>
                <Dialog.Description 
                  className="text-sm font-medium mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  WatchFlo is currently in private testing. Fill out the details below to join the waitlist and secure your spot on the alpha team.
                </Dialog.Description>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)]"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)]"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Android device selection */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Do you have an Android device?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasAndroid('yes')}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                          hasAndroid === 'yes'
                            ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]'
                            : 'border-[var(--border-medium)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasAndroid('no')}
                        className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                          hasAndroid === 'no'
                            ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]'
                            : 'border-[var(--border-medium)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                        }`}
                      >
                        No
                      </button>
                    </div>
                    {hasAndroid === 'no' && (
                      <div className="mt-1 p-3 rounded-lg border flex items-start gap-2 text-xs" style={{ borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-card)' }}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-secondary)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Note: WatchFlo is an Android-only app. You will be added to the waitlist for future platform announcements.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Testing Timeline */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      When do you want to become a tester?
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)] appearance-none cursor-pointer"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <option value="immediately" className="bg-[var(--bg-primary)]">Immediately (Alpha/Beta testing)</option>
                      <option value="public-beta" className="bg-[var(--bg-primary)]">When the public beta launches</option>
                      <option value="official" className="bg-[var(--bg-primary)]">Near the official store release</option>
                    </select>
                  </div>

                  {/* Why test WatchFlo? */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Why are you interested in WatchFlo?
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g., I want to reduce YouTube screen time, block distractions..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--text-primary)] resize-none"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      'Apply for Early Access'
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success screen */
              <div className="py-8 flex flex-col items-center text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500"
                  style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight mb-3">
                  Application Sent!
                </h3>
                <p 
                  className="text-sm font-medium max-w-[280px] mb-8 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Thank you for applying to test WatchFlo. Your registration details have been sent to our developer team.
                </p>
                <button
                  onClick={() => handleModalClose(false)}
                  className="px-8 py-3.5 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  Close Window
                </button>
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
