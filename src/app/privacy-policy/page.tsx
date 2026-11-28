import React from "react";
import Link from "next/link";
import { Lock, Shield, Eye, Database, FileCheck, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAECE7] text-[#D73B3A] text-xs font-black uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>DATA PRIVACY &amp; SECURITY ASSURANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#25100E] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70">
            Last Updated: November 2026 • Pop Culture Snacks
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#522C28]/85 pt-2">
            At <strong>Pop Culture</strong>, protecting your personal data and ensuring full transparency about how your information is handled is of paramount importance to us. This Privacy Policy details the types of data we collect, why we collect it, and the security protocols protecting your privacy.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-8 text-sm text-[#522C28]/85 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">1. Information We Collect</h2>
            <p>We only collect personal information necessary to deliver your snack orders and provide a personalized experience:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#522C28]/80">
              <li><strong>Contact &amp; Delivery Information:</strong> Your full name, delivery address, pincode, contact telephone/WhatsApp number, and email address when you place an order or create an account.</li>
              <li><strong>Authentication Data:</strong> When logging in via email or Google Single Sign-On (GIS), we receive your basic verified profile name and email address.</li>
              <li><strong>Transaction Information:</strong> Details of the snack pouches or combo boxes purchased, order amount, invoice numbers, and payment status.</li>
              <li><strong>Contest Scores:</strong> Recorded distance scores and timestamps from the Fox Runner monthly hamper contest.</li>
            </ul>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">2. Payment Processing &amp; Card Security</h2>
            <p>
              <strong>We never store, capture, or have access to your complete credit card numbers, debit card PINs, CVVs, or NetBanking passwords.</strong>
            </p>
            <p>
              All online payments are processed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways—including <strong>PayU</strong> and <strong>Shiprocket Fastrr Checkout</strong>. Communication between your browser and the payment gateway is protected with 256-bit SSL encryption.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">3. Purpose of Data Processing</h2>
            <p>We use your information strictly for legitimate commercial and operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-semibold text-[#522C28]/80">
              <li>Processing, packing, and dispatching your orders through Shiprocket courier partners.</li>
              <li>Sending transactional order confirmations, tracking links, and password reset instructions via Resend.</li>
              <li>Delivering customer support, handling replacement inquiries, and issuing refunds.</li>
              <li>Maintaining leaderboard rankings and verifying monthly hamper contest winners.</li>
            </ul>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">4. Information Sharing &amp; Third Parties</h2>
            <p>
              <strong>We do not sell, rent, or trade your personal information to third-party advertisers.</strong>
            </p>
            <p>
              Your information is shared only with verified operational service providers bound by strict confidentiality:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-semibold text-[#522C28]/80">
              <li><strong>Logistics Partners:</strong> Shiprocket and courier networks (BlueDart, Delhivery, DTDC) to fulfill door delivery.</li>
              <li><strong>Payment Gateways:</strong> PayU for transaction authorization and settlement.</li>
              <li><strong>Communication Infrastructure:</strong> Resend for delivering transactional notification emails.</li>
              <li><strong>Legal Authorities:</strong> Only when strictly mandated by Indian law or judicial court orders.</li>
            </ul>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">5. Cookies &amp; Browser Storage</h2>
            <p>
              Our website uses essential cookies and local storage tokens strictly to maintain your active shopping cart items, keep you signed into your account, and prevent CSRF security attacks. We do not deploy invasive third-party cross-site tracking cookies.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="font-display text-xl uppercase text-[#25100E]">6. Your Data Rights &amp; Deletion Requests</h2>
            <p>
              Under the Digital Personal Data Protection Act (DPDP), you have full control over your personal data. You may request access to, correction of, or permanent deletion of your account and personal details by contacting us at{" "}
              <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] font-bold underline">
                contact@snackpopculture.com
              </a>. All legitimate requests are processed within 7 business days.
            </p>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-display text-xl uppercase text-[#25100E]">7. Privacy Officer Contact Details</h2>
            <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#522C28]/15 space-y-1.5 text-xs sm:text-sm font-semibold">
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Entity Name</span> COREPINE VENTURES LLP (Brand: Pop Culture Snacks)</p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">GSTIN</span> 19AAXFC0336J1Z2</p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Registered Address</span> Ghoshpukur Kharibari Road, Near Dhamvita Bus Stand, Village Dhamvita, PO Buraganj, Foudigachh, District Darjeeling, West Bengal - 734434, India</p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Privacy Inquiries</span> <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] underline">contact@snackpopculture.com</a></p>
              <p><span className="text-[#522C28]/60 uppercase font-black text-[11px] block">Support Telephone</span> +91 90023 88080 (Monday – Saturday, 10:00 AM – 6:00 PM IST)</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
