import { Link } from 'react-router';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-8">
          &larr; Back to Home
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl mb-4 text-text-primary">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-12">Last Updated: May 28, 2026</p>

        <div className="space-y-12 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">1. Introduction</h2>
            <p>
              Welcome to WatchFlo. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our application and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">2. The Data We Collect</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-text-primary">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong className="text-text-primary">Contact Data:</strong> includes email address.</li>
              <li><strong className="text-text-primary">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong className="text-text-primary">Usage Data:</strong> includes information about how you use our application, including YouTube channel preferences, watched history, and watch queue.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To register you as a new user.</li>
              <li>To manage our relationship with you.</li>
              <li>To provide personalized YouTube channel recommendations using AI.</li>
              <li>To improve our app, products/services, marketing, and user relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">4. Third-Party Services & Payments</h2>
            <p className="mb-4">
              Our app integrates with third-party services, notably YouTube (Google) for video content and syncing subscriptions. By using WatchFlo, you also agree to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer" className="text-text-primary underline underline-offset-2 hover:text-semantic-success transition-colors">YouTube Terms of Service</a> and Google Privacy Policy. We use your Google account data strictly to provide the core functionality of our application and do not sell your data to third parties.
            </p>
            <p>
              Additionally, if you purchase a WatchFlo Pro subscription, your payments are processed securely through the Apple App Store or Google Play Store. We do not collect or store your credit card information or direct financial data.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent. You can contact us to exercise any of these rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
