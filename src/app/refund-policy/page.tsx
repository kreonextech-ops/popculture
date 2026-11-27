import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Clock, CreditCard, HelpCircle, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAECE7] text-[#D73B3A] text-xs font-black uppercase tracking-wider">
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>PAYU &amp; SHIPROCKET COMPLIANT POLICY</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#25100E] tracking-tight">
            Refund, Cancellation &amp; Return Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70">
            Last Updated: November 2026 • Pop Culture Snacks
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#522C28]/85 pt-2">
            At <strong>Pop Culture</strong>, we stand behind the crunch, taste, and freshness of our slow-roasted makhana snacks. We strive to provide a seamless shopping experience. Please read our cancellation, return, and refund policies below.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>48-Hour Window</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Report transit damage, missing items, or defective packaging within 48 hours of delivery.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <CreditCard className="w-4 h-4" />
              <span>5–7 Working Days</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Refunds are credited directly back to your original payment method (Bank, UPI, or Card).
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Replacement</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Fast, hassle-free replacement dispatched immediately upon photo verification.
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Section 1: Cancellation */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E] flex items-center gap-2">
              <span>1. Order Cancellation Policy</span>
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                <strong>Before Dispatch:</strong> You can cancel your order anytime before it has been processed and handed over to our courier partner (typically within 2 to 4 hours of placing the order). To cancel, reach out via WhatsApp at{" "}
                <a href="tel:+919002388080" className="text-[#D73B3A] font-bold hover:underline">+91 90023 88080</a> or email us at{" "}
                <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] font-bold hover:underline">contact@snackpopculture.com</a> with your Order ID. Upon timely cancellation, 100% of your order amount will be refunded immediately.
              </p>
              <p>
                <strong>After Dispatch:</strong> Once your parcel is dispatched from our roastery facility and a courier AWB is generated, orders cannot be cancelled in-transit.
              </p>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 2: Returns Policy */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E] flex items-center gap-2">
              <span>2. Return Policy (Food &amp; Perishables)</span>
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                Because our makhana (foxnut) snacks are food and consumable grocery products, <strong>we cannot accept physical returns of opened or unsealed snack packs</strong> due to strict FSSAI hygiene and public health safety standards.
              </p>
              <p>
                However, you are 100% covered under our <strong>Fresh Crunch Guarantee</strong> under the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#522C28]/80">
                <li>The parcel arrived physically crushed, ripped, or damaged during transit.</li>
                <li>The pouch seal was broken, leaking, or tampered with upon delivery.</li>
                <li>You received an incorrect flavour, wrong pack size, or incomplete combo box.</li>
                <li>The product has passed its printed Best Before / Expiry date.</li>
              </ul>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 3: How to Claim */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E] flex items-center gap-2">
              <span>3. How to Request a Replacement or Refund</span>
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-3">
              <p>
                If your order meets any of the conditions above, please follow these simple steps within <strong>48 hours</strong> of receiving delivery:
              </p>
              <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#522C28]/15 space-y-2 text-xs sm:text-sm">
                <p><strong>Step 1:</strong> Take clear photographs or a short video showing the outer shipping box, shipping label (with AWB), and the damaged or wrong product.</p>
                <p><strong>Step 2:</strong> Email the photos along with your Order ID to <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] font-bold underline">contact@snackpopculture.com</a> or WhatsApp our support line at <a href="tel:+919002388080" className="text-[#D73B3A] font-bold underline">+91 90023 88080</a>.</p>
                <p><strong>Step 3:</strong> Our customer support team will inspect the request within 12–24 business hours and approve either a free express replacement or a full refund.</p>
              </div>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 4: Refund Process & Timelines */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E] flex items-center gap-2">
              <span>4. Refund Timelines &amp; Mode of Settlement</span>
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                Once your refund is approved by our team:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#522C28]/80">
                <li>
                  <strong>Prepaid Orders (UPI, NetBanking, Debit/Credit Cards):</strong> Refunds are initiated through our payment gateway (PayU / Shiprocket) within 24 to 48 business hours. Funds will reflect in your original payment account within <strong>5 to 7 working days</strong>, subject to your issuing bank’s clearing schedule.
                </li>
                <li>
                  <strong>Cash on Delivery (COD) Orders:</strong> If a refund is approved on a COD order, our team will request your bank account details (Account Number &amp; IFSC) or UPI ID. The refund will be credited via IMPS/NEFT transfer within 48 to 72 business hours.
                </li>
              </ul>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 5: Need Assistance */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E] flex items-center gap-2">
              <span>5. Grievance &amp; Customer Support</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#522C28]/85">
              If you have any questions or have not received your approved refund within 7 working days, please reach out to our dedicated resolution desk:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#FFF8EE] border border-[#522C28]/15 flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D73B3A] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#25100E]">Email Support</div>
                  <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] font-semibold hover:underline">
                    contact@snackpopculture.com
                  </a>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FFF8EE] border border-[#522C28]/15 flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D73B3A] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#25100E]">Customer Care / WhatsApp</div>
                  <a href="tel:+919002388080" className="text-[#25100E] font-semibold hover:text-[#D73B3A]">
                    +91 90023 88080 (Mon–Sat, 10 AM – 6 PM)
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
