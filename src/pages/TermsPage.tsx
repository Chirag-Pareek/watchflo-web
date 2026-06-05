import { Link } from 'react-router';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-container mx-auto px-6 max-w-3xl">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-8">
          &larr; Back to Home
        </Link>
        
        <h1 className="font-heading text-4xl md:text-5xl mb-4 text-text-primary">Terms of Service</h1>
        <p className="text-text-muted text-sm mb-12">Last Updated: May 28, 2026</p>

        <div className="space-y-12 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the WatchFlo application, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this app. The materials contained in this app are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on WatchFlo for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on WatchFlo.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">3. YouTube API Services</h2>
            <p>
              WatchFlo uses YouTube API Services to provide core functionality. By using our application, you are also agreeing to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer" className="text-text-primary underline underline-offset-2 hover:text-semantic-success transition-colors">YouTube Terms of Service</a>. We encourage you to review their terms as they govern your interaction with YouTube content accessed through WatchFlo.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">4. Subscriptions and Payments</h2>
            <p>
              Certain features of WatchFlo are available through a paid subscription (WatchFlo Pro). Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period. Your account will be charged for renewal within 24 hours prior to the end of the current period. You can manage and cancel your subscriptions by going to your account settings on the App Store or Google Play Store after purchase.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">5. Disclaimer</h2>
            <p>
              The materials on WatchFlo are provided on an 'as is' basis. WatchFlo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-text-primary mb-4">6. Limitations</h2>
            <p>
              In no event shall WatchFlo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WatchFlo, even if WatchFlo or a WatchFlo authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
