import type { Metadata } from 'next';
import { ADDRESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Send us a message! Contact HIILLA Transit Services for delivery, dispatch, fleet, or business inquiries in Lagos, Nigeria.',
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <h1>Contact Us</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Have a question or looking to partner? Send us a message below.
          </p>
        </div>

        <div className="form-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! Your message has been received. Our team will contact you shortly.');
            }}
          >
            <h3 style={{ fontSize: 18, marginBottom: 20 }}>Personal Information</h3>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="first-name">First Name *</label>
                <input type="text" id="first-name" name="first_name" required placeholder="Adebayo" />
              </div>
              <div className="form-field">
                <label htmlFor="last-name">Last Name *</label>
                <input type="text" id="last-name" name="last_name" required placeholder="Ogunlesi" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="name@example.com" />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="+234 801 234 5678" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-type">Inquiry Type</label>
              <select id="inquiry-type" name="inquiry_type" defaultValue="general">
                <option value="general">General Inquiry</option>
                <option value="dispatch">Become a Dispatch Rider</option>
                <option value="fleet">Fleet Partnership</option>
                <option value="corporate">Corporate / Merchant Deliveries</option>
                <option value="support">Customer Support</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" required placeholder="Tell us how we can help you..." />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              Send Message
            </button>
          </form>
        </div>

        <div className="text-center" style={{ marginTop: 56 }}>
          <h4 style={{ marginBottom: 12 }}>Physical Office</h4>
          <p>{ADDRESS.line1}</p>
          <p>{ADDRESS.line2}</p>
        </div>
      </div>
    </section>
  );
}
