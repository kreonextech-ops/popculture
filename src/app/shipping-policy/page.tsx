import React from "react";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin, PackageCheck, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE] text-[#522C28] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAECE7] text-[#D73B3A] text-xs font-black uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>PAN-INDIA DISPATCH POLICY</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl uppercase text-[#25100E] tracking-tight">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#522C28]/70">
            Last Updated: November 2026 • Pop Culture Snacks
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#522C28]/85 pt-2">
            Every pouch of Pop Culture foxnut snacks is roasted in small batches to preserve its distinct crunch and aroma. We partner with India’s leading courier networks via <strong>Shiprocket</strong> to ensure your snacks reach your doorstep fresh, fast, and safely.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <Clock className="w-4 h-4" />
              <span>Same-Day Dispatch</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Orders placed before 2:00 PM IST dispatch the same business day from our roastery facility.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <Truck className="w-4 h-4" />
              <span>2–5 Business Days</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Express delivery across metro cities (Delhi, Mumbai, Bengaluru, Kolkata, Siliguri) &amp; nationwide.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#522C28]/15 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#D73B3A] font-bold text-sm">
              <PackageCheck className="w-4 h-4" />
              <span>Free Delivery Above ₹499</span>
            </div>
            <p className="text-xs font-semibold text-[#522C28]/75 mt-2">
              Enjoy 100% Free Shipping on orders over ₹499 across all serviceable Indian pin codes.
            </p>
          </div>
        </div>

        {/* Detailed Shipping Breakdown */}
        <div className="bg-white rounded-3xl border-2 border-[#522C28]/15 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Section 1: Dispatch & Processing Timelines */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              1. Order Processing &amp; Dispatch
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                All orders are packaged in protective multi-layer corrugated boxes and dispatched from our facility in Siliguri, West Bengal.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#522C28]/80">
                <li><strong>Cut-Off Time:</strong> Orders confirmed before 2:00 PM IST Monday to Saturday are processed and dispatched on the same day.</li>
                <li><strong>After Cut-Off &amp; Holidays:</strong> Orders placed after 2:00 PM or on Sundays and National Holidays will be dispatched on the next working day.</li>
                <li><strong>Verification:</strong> High-value orders or bulk boxes may undergo a quick telephone/WhatsApp confirmation before handover.</li>
              </ul>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 2: Estimated Delivery Timelines */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              2. Estimated Delivery Timelines
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-3">
              <p>
                Delivery schedules depend on your shipping destination. We partner with premium logistics carriers (BlueDart, Delhivery, DTDC, Xpressbees, Shadowfax) via Shiprocket:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#FFF8EE] border-b-2 border-[#522C28]/15 text-[#25100E]">
                      <th className="p-3 font-black uppercase">Region</th>
                      <th className="p-3 font-black uppercase">Courier Transit Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#522C28]/10 text-[#522C28]/85 font-semibold">
                    <tr>
                      <td className="p-3">West Bengal &amp; Eastern India</td>
                      <td className="p-3">1 to 3 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3">Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai)</td>
                      <td className="p-3">2 to 4 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3">Rest of India (Tier 2 &amp; Tier 3 Cities)</td>
                      <td className="p-3">3 to 6 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3">Special Locations (North-East, J&amp;K, Andaman &amp; Nicobar)</td>
                      <td className="p-3">5 to 8 Business Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 3: Shipping Charges */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              3. Shipping Charges
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-semibold text-[#522C28]/80">
                <li><strong>Orders Above ₹499:</strong> Free Standard Shipping across all serviceable pin codes in India.</li>
                <li><strong>Orders Below ₹499:</strong> A nominal flat shipping charge of ₹49 applies to cover logistics and tamper-proof packaging costs.</li>
                <li><strong>Cash on Delivery (COD):</strong> If COD is selected, an additional handling charge of ₹40 may be applied at checkout.</li>
              </ul>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 4: Live Order Tracking */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              4. Real-Time Order Tracking
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                As soon as your package leaves our facility, you will receive an automated tracking notification via <strong>Email, SMS, and WhatsApp</strong> containing:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-semibold text-[#522C28]/80">
                <li>Courier Partner Name (e.g. BlueDart, Delhivery)</li>
                <li>Air Waybill (AWB) Tracking Number</li>
                <li>Direct live tracking link to follow your parcel at every checkpoint</li>
              </ul>
              <p className="pt-1">
                You can also view your live order status by logging into your{" "}
                <Link href="/account" className="text-[#D73B3A] font-bold underline">
                  Pop Culture Account
                </Link>.
              </p>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 5: Delivery Attempts & Undelivered Shipments */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              5. Delivery Attempts &amp; Address Accuracy
            </h2>
            <div className="text-sm leading-relaxed text-[#522C28]/85 space-y-2">
              <p>
                Our courier partners will make up to <strong>3 delivery attempts</strong> before returning the shipment to our warehouse (RTO). The delivery executive will call your registered contact number prior to delivery.
              </p>
              <p>
                Please ensure complete and accurate delivery information, including house/flat number, street, landmark, and 6-digit postal PIN code. Pop Culture is not liable for delays caused by incorrect or incomplete addresses provided by the customer.
              </p>
            </div>
          </section>

          <hr className="border-[#522C28]/10" />

          {/* Section 6: Shipping Inquiries */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl uppercase text-[#25100E]">
              6. Need Help with Your Delivery?
            </h2>
            <p className="text-sm leading-relaxed text-[#522C28]/85">
              If your tracking hasn’t updated for over 48 hours or your package has been unexpectedly delayed, our dispatch desk will resolve it promptly:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#FFF8EE] border border-[#522C28]/15 flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D73B3A] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#25100E]">Shipping Support</div>
                  <a href="mailto:contact@snackpopculture.com" className="text-[#D73B3A] font-semibold hover:underline">
                    contact@snackpopculture.com
                  </a>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FFF8EE] border border-[#522C28]/15 flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D73B3A] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#25100E]">Dispatch Helpline</div>
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
