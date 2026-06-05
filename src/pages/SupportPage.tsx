import { Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

export default function SupportPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-6">
            &larr; Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-text-primary">Support & Feedback</h1>
          <p className="text-text-secondary text-lg">
            Need help with WatchFlo? Have a feature request? We're here to help you get the most out of your AI-powered YouTube assistant.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <a href="mailto:chiragpareek677@gmail.com" className="p-8 rounded-card border border-border-medium bg-bg-card hover:bg-bg-card-hover transition-colors group">
            <div className="w-12 h-12 rounded-full bg-semantic-success-soft text-semantic-success flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl mb-2 text-text-primary">Email Support</h3>
            <p className="text-text-secondary mb-4">Get help with your account, billing, or technical issues.</p>
            <span className="text-semantic-success font-medium">chiragpareek677@gmail.com</span>
          </a>

          <a href="mailto:chiragpareek677@gmail.com?subject=WatchFlo%20Feedback" className="p-8 rounded-card border border-border-medium bg-bg-card hover:bg-bg-card-hover transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] text-text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl mb-2 text-text-primary">Give Feedback</h3>
            <p className="text-text-secondary mb-4">Have an idea to make WatchFlo better? Let us know!</p>
            <span className="text-text-primary font-medium flex items-center gap-1">Send Feedback <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
          </a>
        </div>

        <div className="bg-bg-elevated p-8 rounded-card border border-border-medium">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-text-secondary" />
            <h3 className="font-heading text-xl text-text-primary">Frequently Asked Questions</h3>
          </div>
          <p className="text-text-secondary mb-6">
            Find answers to common questions about syncing channels, AI credits, and more in our FAQ section.
          </p>
          <Link to="/#faq" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-text-primary text-[var(--bg-primary)] font-medium hover:opacity-90 transition-opacity">
            View FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
