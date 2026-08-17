import React, { useState } from 'react';
import { X, Sparkles, Shield, Tag, CreditCard, Smartphone, Check, ArrowRight, Lock, Building, Zap, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCodeDisplay from './QRCodeDisplay';
import { ADDONS, PROMO_CODES } from '../data/eventsData';
import { formatCurrency, generateBookingId } from '../utils/helpers';

export default function CheckoutModal({
  bookingDraft,
  onClose,
  onBookingSuccess
}) {
  const { event, selectedSeats, seatObjects, tier, totalSeatsPrice, venueArch } = bookingDraft;

  // Add-ons & Promo states
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Payment Method: 'upi' | 'card' | 'netbanking' | 'livora_pay'
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Credit Card Form states
  const [cardNumber, setCardNumber] = useState('4532 8920 1192 8492');
  const [cardHolder, setCardHolder] = useState('ROHIT MENON');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // UPI Form states
  const [upiVpa, setUpiVpa] = useState('rohit.menon@okhdfcbank');
  const [isUpiVerified, setIsUpiVerified] = useState(true);

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // 3D Secure Bank OTP Modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Toggle Addon
  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const platformFee = selectedSeats.length * 35;
  const preDiscountTotal = totalSeatsPrice + addonsTotal + platformFee;

  let discountAmount = 0;
  if (appliedPromo) {
    const promoData = PROMO_CODES[appliedPromo];
    if (promoData) {
      discountAmount = promoData.discountAmount || Math.min((totalSeatsPrice * (promoData.discountPercent || 0)) / 100, promoData.maxDiscount || 9999);
    }
  }

  const finalTotal = Math.max(0, preDiscountTotal - discountAmount);

  // Apply Promo
  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const promoData = PROMO_CODES[code];
      if (totalSeatsPrice < (promoData.minAmount || 0)) {
        setPromoError(`Minimum order of ${formatCurrency(promoData.minAmount)} required for this code.`);
        setAppliedPromo(null);
      } else {
        setAppliedPromo(code);
        setPromoError('');
      }
    } else {
      setPromoError('Invalid promo code. Try LIVORA20, EARLYBIRD or STAGEVIP.');
      setAppliedPromo(null);
    }
  };

  // Trigger 3D Secure Bank OTP flow
  const handleStartPayment = () => {
    setShowOtpModal(true);
    setEnteredOtp('');
  };

  // Submit OTP & finalize
  const handleVerifyOtp = () => {
    setIsAuthorizing(true);

    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });

      const confirmedBooking = {
        id: generateBookingId(),
        event,
        venueArch,
        selectedSeats,
        seatObjects,
        tier,
        selectedAddons,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiVpa})` : paymentMethod === 'card' ? `Card (•••• ${cardNumber.slice(-4)})` : paymentMethod === 'netbanking' ? selectedBank : 'Livora 1-Click Pay',
        appliedPromo,
        discountAmount,
        totalAmount: finalTotal,
        bookedAt: new Date().toISOString(),
        status: 'confirmed'
      };

      setIsAuthorizing(false);
      setShowOtpModal(false);
      onBookingSuccess(confirmedBooking);
    }, 1200);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="checkout-container">
            {/* Header */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--brand-primary)', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Shield size={14} />
                <span>256-Bit SSL Encrypted Checkout</span>
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Confirm Seats & Payment</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {event.title} • {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} ({selectedSeats.join(', ')})
              </div>
            </div>

            {/* Experience Add-ons */}
            <div>
              <div className="checkout-section-title">
                <Sparkles size={17} color="var(--brand-secondary)" />
                <span>Enhance Your Live Experience</span>
              </div>

              <div className="addons-grid">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`addon-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleAddon(addon)}
                    >
                      <div className="addon-header">
                        <span className="addon-title">{addon.name}</span>
                        <span className="addon-price">+{formatCurrency(addon.price)}</span>
                      </div>
                      <p className="addon-desc">{addon.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: isSelected ? 'var(--brand-secondary)' : 'var(--text-muted)' }}>
                        {isSelected ? <Check size={13} /> : '+'} {isSelected ? 'Added to Pass' : 'Add to Pass'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo Code Box */}
            <div>
              <div className="checkout-section-title">
                <Tag size={17} color="var(--brand-primary)" />
                <span>Apply Promo Discount</span>
              </div>

              <div className="promo-box">
                <input
                  type="text"
                  placeholder="Enter Promo Code (e.g. LIVORA20, EARLYBIRD)"
                  className="promo-input"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                />
                <button className="btn-apply-promo" onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div style={{ marginTop: '0.4rem', color: 'var(--brand-success)', fontSize: '0.82rem', fontWeight: 700 }}>
                  ✓ Promo <strong>{appliedPromo}</strong> applied! You saved {formatCurrency(discountAmount)}.
                </div>
              )}
              {promoError && (
                <div style={{ marginTop: '0.4rem', color: '#f87171', fontSize: '0.82rem' }}>
                  {promoError}
                </div>
              )}
            </div>

            {/* Payment Method Selector Tabs */}
            <div>
              <div className="checkout-section-title">
                <Lock size={17} color="var(--brand-cyan)" />
                <span>Choose Payment Mode</span>
              </div>

              <div className="payment-tabs-row">
                <button
                  className={`payment-tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => { setPaymentMethod('upi'); setIsCardFlipped(false); }}
                >
                  <Smartphone size={18} />
                  <span>UPI / GPay / QR</span>
                </button>

                <button
                  className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  className={`payment-tab-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => { setPaymentMethod('netbanking'); setIsCardFlipped(false); }}
                >
                  <Building size={18} />
                  <span>Net Banking</span>
                </button>

                <button
                  className={`payment-tab-btn ${paymentMethod === 'livora_pay' ? 'active' : ''}`}
                  onClick={() => { setPaymentMethod('livora_pay'); setIsCardFlipped(false); }}
                >
                  <Zap size={18} />
                  <span>Livora 1-Click Pay</span>
                </button>
              </div>

              {/* PAYMENT VIEW 1: UPI SCANNER & VPA */}
              {paymentMethod === 'upi' && (
                <div className="upi-pay-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-secondary)', fontWeight: 700, fontSize: '0.85rem' }}>
                    <Smartphone size={16} />
                    <span>Scan with Google Pay, PhonePe, Paytm or Any UPI App</span>
                  </div>

                  <div className="upi-qr-display">
                    <QRCodeDisplay value={`upi://pay?pa=livora.events@icici&pn=LivoraPasses&am=${finalTotal}&cu=INR`} size={130} />
                  </div>

                  <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left' }}>
                      Or Enter UPI ID / VPA
                    </label>
                    <div className="upi-vpa-row">
                      <input
                        type="text"
                        className="card-text-input"
                        style={{ flex: 1 }}
                        value={upiVpa}
                        onChange={(e) => setUpiVpa(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                      />
                      <button
                        className="btn-apply-promo"
                        onClick={() => setIsUpiVerified(true)}
                      >
                        {isUpiVerified ? '✓ Verified' : 'Verify'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT VIEW 2: 3D INTERACTIVE FLIPPING CARD */}
              {paymentMethod === 'card' && (
                <div>
                  {/* 3D Interactive Card Visualizer */}
                  <div className="credit-card-3d-wrapper">
                    <div className={`credit-card-inner ${isCardFlipped ? 'flipped' : ''}`}>
                      {/* Front of Card */}
                      <div className="card-front">
                        <div className="card-chip-row">
                          <div className="card-chip"></div>
                          <span style={{ fontWeight: 900, letterSpacing: '0.1em', fontSize: '1.1rem', color: '#ffffff' }}>
                            VISA
                          </span>
                        </div>

                        <div className="card-number-display">{cardNumber || '•••• •••• •••• ••••'}</div>

                        <div className="card-meta-row">
                          <div>
                            <div className="card-label">Cardholder</div>
                            <div className="card-val">{cardHolder || 'YOUR NAME'}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="card-label">Expires</div>
                            <div className="card-val">{cardExpiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className="card-back">
                        <div style={{ width: '100%', height: '38px', background: '#090a10', marginTop: '0.5rem' }}></div>
                        <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end' }}>
                          <div className="card-label">CVV / Security Code</div>
                          <div style={{ background: '#ffffff', color: '#090a10', padding: '0.35rem 0.75rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 900, fontSize: '0.95rem' }}>
                            {cardCvv || '•••'}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', padding: '0 1.5rem', textAlign: 'center' }}>
                          Authorized signature not required for digital e-mandate
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Input Controls */}
                  <div className="card-inputs-grid">
                    <div className="input-field-box" style={{ gridColumn: '1 / -1' }}>
                      <label>Card Number</label>
                      <input
                        type="text"
                        className="card-text-input"
                        value={cardNumber}
                        maxLength={19}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const parts = [];
                          for (let i = 0; i < v.length; i += 4) {
                            parts.push(v.substring(i, i + 4));
                          }
                          setCardNumber(parts.join(' '));
                        }}
                        placeholder="4532 8920 1192 8492"
                      />
                    </div>

                    <div className="input-field-box" style={{ gridColumn: '1 / -1' }}>
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        className="card-text-input"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="ROHIT MENON"
                      />
                    </div>

                    <div className="input-field-box">
                      <label>Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        className="card-text-input"
                        value={cardExpiry}
                        maxLength={5}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="input-field-box">
                      <label>CVV (3 Digits)</label>
                      <input
                        type="password"
                        className="card-text-input"
                        value={cardCvv}
                        maxLength={4}
                        onFocus={() => setIsCardFlipped(true)}
                        onBlur={() => setIsCardFlipped(false)}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT VIEW 3: NET BANKING */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Select Your Bank for Instant Net Banking Authorization:
                  </div>
                  <div className="netbanking-grid">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Federal Bank', 'Kotak Bank'].map((bank) => (
                      <div
                        key={bank}
                        className={`bank-choice-card ${selectedBank === bank ? 'selected' : ''}`}
                        onClick={() => setSelectedBank(bank)}
                      >
                        <Building size={20} color={selectedBank === bank ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                        <span style={{ fontSize: '0.8rem' }}>{bank}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAYMENT VIEW 4: LIVORA 1-CLICK PAY */}
              {paymentMethod === 'livora_pay' && (
                <div className="livora-wallet-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--brand-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        Livora VIP 1-Click Pay
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Available Balance: <strong style={{ color: 'var(--brand-success)' }}>₹15,450</strong> (Fast Biometric Check)
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800 }}>
                    ⚡ Instant Pre-Approved
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown-box">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Seat Allocation ({selectedSeats.length} {selectedSeats.length === 1 ? 'Pass' : 'Passes'})
                </div>
                {seatObjects && seatObjects.length > 0 ? (
                  seatObjects.map((seat) => (
                    <div key={seat.id} className="breakdown-row" style={{ fontSize: '0.82rem' }}>
                      <span>Seat {seat.id} ({seat.blockName || tier.name})</span>
                      <span>{formatCurrency(seat.price)}</span>
                    </div>
                  ))
                ) : (
                  <div className="breakdown-row">
                    <span>{tier.name} ({selectedSeats.length}x {formatCurrency(tier.price)})</span>
                    <span>{formatCurrency(totalSeatsPrice)}</span>
                  </div>
                )}
              </div>

              {addonsTotal > 0 && (
                <div className="breakdown-row" style={{ marginTop: '0.35rem', paddingTop: '0.35rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span>Selected Experience Add-ons ({selectedAddons.length})</span>
                  <span>+{formatCurrency(addonsTotal)}</span>
                </div>
              )}

              <div className="breakdown-row">
                <span>Fast-Track Turnstile & Platform Fee</span>
                <span>+{formatCurrency(platformFee)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="breakdown-row discount-text">
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="breakdown-row total">
                <span>Total Amount Payable</span>
                <span style={{ color: 'var(--brand-primary)' }}>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <button
              className="btn-proceed-checkout"
              style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
              onClick={handleStartPayment}
            >
              <Lock size={18} />
              <span>Proceed to Pay {formatCurrency(finalTotal)} & Generate Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D SECURE BANK OTP VERIFICATION MODAL */}
      {showOtpModal && (
        <div className="otp-auth-modal">
          <div className="otp-dialog-card">
            <div className="otp-bank-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#38bdf8' }}>
                <Shield size={18} />
                <span>3D Secure Payment Gateway</span>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}
              >
                ✕
              </button>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>Bank Authorization Required</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Enter the 6-digit OTP sent to your registered mobile number ending with <strong>•••210</strong>
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Merchant:</span>
              <strong style={{ color: '#ffffff' }}>Livora Live Passes</strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Amount:</span>
              <strong style={{ color: 'var(--brand-primary)', fontSize: '1rem' }}>{formatCurrency(finalTotal)}</strong>
            </div>

            {/* OTP Input Field */}
            <div>
              <input
                type="text"
                className="otp-input-field"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="••••••"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Resend in 0:42s</span>
                <button
                  style={{ color: 'var(--brand-secondary)', fontWeight: 700 }}
                  onClick={() => setEnteredOtp('749210')}
                >
                  ⚡ Auto-Fill Demo OTP (749210)
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="btn-proceed-checkout"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              disabled={isAuthorizing || enteredOtp.length < 4}
              onClick={handleVerifyOtp}
            >
              <ShieldCheck size={18} />
              <span>{isAuthorizing ? 'Authorizing with Bank...' : 'Submit OTP & Approve Payment'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
