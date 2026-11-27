import React from "react";
import Link from "next/link";
import { FileText, Shield, Scale, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAECE7] text-[#D73B3A] text-xs font-black uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>PAYU &amp; E-COMMERCE COMPLIANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#25100E] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70">
            Last Updated: November 2026 • Pop Culture Snacks
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#522C28]/85 pt-2">
            Welcome to <strong>Pop Culture</strong> (website: <span className="underline">snackpopculture.com</span>). These Terms and Conditions govern your access to and use of our website, digital platforms, services, and the purchase of any of our slow-roasted makhana snacks and gift hampers.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-8 text-sm text-[#522C28]/85 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">1. Merchant Identity &amp; Platform Operation</h2>
            <p>
              This website is owned and operated by <strong>Pop Culture Snacks</strong> (operating under registered business entity <em>Dayal Constructions &amp; Co. / Pop Culture LLP</em>), having its principal operational establishment in Siliguri, West Bengal, India. Throughout these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to Pop Culture.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">2. User Eligibility &amp; Account Obligations</h2>
            <p>
              By accessing our website or placing an order, you represent that you are at least 18 years of age, or that you are accessing the site under the supervision of a parent or legal guardian. You agree to provide accurate, current, and complete purchase, billing, and contact details for all transactions.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">3. Product Pricing, Availability &amp; Taxes</h2>
            <p>
              All prices displayed on our website are stated in <strong>Indian Rupees (INR ₹)</strong> and are inclusive of applicable Goods and Services Tax (GST) unless specified otherwise. We reserve the right to modify prices, introduce promotional discounts, or discontinue product lines without prior notice.
            </p>
            <p>
              In the unlikely event that a product is listed at an incorrect price due to a clerical or technical error, Pop Culture reserves the right to cancel any orders placed for such items and issue a prompt 100% refund.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">4. Orders, Payment Gateway &amp; Security</h2>
            <p>
              We partner with trusted, PCI-DSS Level 1 compliant payment service providers—including <strong>PayU Payments Private Limited</strong> and <strong>Shiprocket Fastrr Checkout</strong>—to process digital payments safely.
            </p>
            <p>
              Supported payment methods include UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards, Debit Cards, Net Banking, and Wallets. Pop Culture never captures, stores, or processes sensitive card security PINs or CVVs on its local infrastructure.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">5. Shipping, Returns &amp; Cancellation Policies</h2>
            <p>
              Our shipping procedures, delivery timeframes, cancellation protocols, and refund mechanisms are strictly governed by our dedicated policies:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-semibold text-[#522C28]/80">
              <li>
                <Link href="/shipping-policy" className="text-[#D73B3A] underline font-bold">Shipping Policy</Link> — Pan-India courier transit times, same-day dispatch terms, and delivery fees.
              </li>
              <li>
                <Link href="/refund-policy" className="text-[#D73B3A] underline font-bold">Refund &amp; Return Policy</Link> — 48-hour transit damage claims, non-returnability of opened food packets, and 5–7 working days refund timelines.
              </li>
            </ul>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">6. Food Quality &amp; FSSAI Compliance</h2>
            <p>
              Pop Culture takes food hygiene and safety with the utmost seriousness. Our foxnut (makhana) snacks are slow-roasted in sanitary, food-grade manufacturing units under stringent quality supervision in adherence to Food Safety and Standards Authority of India (FSSAI) standards.
            </p>
            <p className="text-xs text-[#522C28]/70">
              Please inspect the ingredient declarations and allergen callouts on each product page or physical packaging before consumption, particularly if you have specific food sensitivities.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">7. Fox Runner Monthly Hamper Contest</h2>
            <p>
              The Fox Runner game available on our website is a promotional monthly score contest. Any customer can play for fun. Registered users who record verified runs qualify for the monthly leaderboard. The player holding the highest score at the end of each calendar month will be awarded a curated Pop Culture Snack Hamper. Pop Culture reserves the right to disqualify automated scripts, botting, or fraudulent score manipulations.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">8. Intellectual Property</h2>
            <p>
              All content on this website—including logos, trademarks (&ldquo;Pop Culture&rdquo;), mascot illustrations (&ldquo;Fox Mascot&rdquo;), packaging artwork, product photographs, digital typography, and website code—is the proprietary intellectual property of Pop Culture Snacks and protected under applicable Indian and international copyright and trademark laws.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 9 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">9. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms &amp; Conditions and any dispute or claim arising out of your purchase or use of the website shall be governed by and construed in accordance with the laws of <strong>India</strong>. The courts at <strong>Siliguri, West Bengal</strong> shall have exclusive jurisdiction over all matters arising hereunder.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl uppercase text-[#25100E]">10. Grievance Redressal Officer</h2>
            <p>
              In compliance with the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, the contact details of the Grievance Officer are set forth below:
            </p>
            <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#522C28]/15 space-y-1.5 text-xs sm:text-sm font-semibold">
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Officer Name</span> Grievance Officer, Pop Culture Snacks</p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Operational Address</span> Siliguri, West Bengal - 734001, India</p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Email</span> <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] underline">contact@snackpopculture.com</a></p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Helpline</span> +91 90023 88080 (Monday – Saturday, 10:00 AM – 6:00 PM IST)</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
