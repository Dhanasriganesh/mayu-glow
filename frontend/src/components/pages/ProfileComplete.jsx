import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapPin, ArrowRight, Building, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

function ProfileComplete() {
  const { userProfile, updateProfileData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [addressData, setAddressData] = useState({
    address: userProfile?.address || '',
    postalCode: userProfile?.postalCode || '',
    city: userProfile?.city || '',
    state: userProfile?.state || '',
    country: userProfile?.country || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await updateProfileData(addressData);
      
      // Redirect to original destination (e.g. checkout / cart) or storefront
      const from = location.state?.from?.pathname || '/cart';
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Failed to complete profile:", err);
      setError(err.message || 'Failed to save address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-mesh flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-100/80 text-sage-700 mb-4 shadow-sm">
            <MapPin className="w-7 h-7 text-gold-500" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-sage-950 font-bold tracking-tight">
            Complete Your Shipping Address
          </h1>
          <p className="text-sage-600 text-sm mt-2">
            Please provide your shipping details to complete checkout
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-white/60 shadow-xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Line */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                Address Line
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
                <input
                  type="text"
                  name="address"
                  required
                  value={addressData.address}
                  onChange={handleChange}
                  placeholder="123 Botanical Way, Suite 400"
                  className="input-premium pl-12"
                />
              </div>
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
                  <input
                    type="text"
                    name="city"
                    required
                    value={addressData.city}
                    onChange={handleChange}
                    placeholder="San Francisco"
                    className="input-premium pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={addressData.state}
                  onChange={handleChange}
                  placeholder="California"
                  className="input-premium"
                />
              </div>
            </div>

            {/* Postal Code & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={addressData.postalCode}
                  onChange={handleChange}
                  placeholder="94107"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sage-700 mb-2">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
                  <input
                    type="text"
                    name="country"
                    required
                    value={addressData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className="input-premium pl-12"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base mt-4 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Saving Address...</span>
              ) : (
                <>
                  <span>Save & Continue to Checkout</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileComplete;
