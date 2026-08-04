import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';

function SalesStats() {
  const [windowDays, setWindowDays] = useState(30); // 7, 30, or 90 days
  const [loading, setLoading] = useState(true);
  const [bestSellers, setBestSellers] = useState([]);
  const [worstSellers, setWorstSellers] = useState([]);

  useEffect(() => {
    async function fetchSalesStats() {
      try {
        setLoading(true);
        // GET /api/admin/stats/sales?range=7|30|90
        const res = await axiosClient.get(`/admin/stats/sales?range=${windowDays}`);
        setBestSellers(res.data.bestSellers || []);
        setWorstSellers(res.data.worstSellers || []);
      } catch (err) {
        console.error("Error computing sales aggregation:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSalesStats();
  }, [windowDays]);

  const maxQty = Math.max(...bestSellers.map(s => s.qtySold), 1);

  return (
    <div className="space-y-8">
      {/* Header & Window Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-sage-950 font-bold flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-emerald-600" />
            Sales Performance Stats
          </h1>
          <p className="text-sage-600 text-sm mt-1">
            Server-side aggregated units sold per product across selectable date windows (Express API)
          </p>
        </div>

        {/* Date Window Toggle (Section 6 & 7d) */}
        <div className="glass-card p-1.5 rounded-2xl border border-white/70 inline-flex items-center gap-1 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-sage-500 ml-2" />
          <button
            onClick={() => setWindowDays(7)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              windowDays === 7
                ? 'bg-sage-700 text-white shadow-sm'
                : 'text-sage-700 hover:bg-sage-100'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setWindowDays(30)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              windowDays === 30
                ? 'bg-sage-700 text-white shadow-sm'
                : 'text-sage-700 hover:bg-sage-100'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setWindowDays(90)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              windowDays === 90
                ? 'bg-sage-700 text-white shadow-sm'
                : 'text-sage-700 hover:bg-sage-100'
            }`}
          >
            Last 90 Days
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sage-600 font-medium">
          Fetching sales aggregation stats for the last {windowDays} days from Express API...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top 5 Best Sellers (Ranked Descending) */}
          <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-sage-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-sage-950">Top 5 Best Sellers</h2>
                <p className="text-xs text-sage-500">Highest unit volume sold (Last {windowDays} days)</p>
              </div>
            </div>

            {bestSellers.length === 0 ? (
              <div className="text-center py-8 text-sage-500 text-sm">No sales recorded in this window.</div>
            ) : (
              <div className="space-y-4">
                {bestSellers.map((item, idx) => {
                  const percentage = Math.round((item.qtySold / maxQty) * 100);
                  return (
                    <div key={item.productId} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-semibold text-sage-900">
                          <span className="w-5 text-xs text-sage-400 font-mono">#{idx + 1}</span>
                          <span>{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sage-950">{item.qtySold} units</span>
                          <span className="text-xs text-sage-500 block">${item.totalRevenue.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Visual Bar Indicator */}
                      <div className="w-full bg-sage-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-sage-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 8)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom 5 Worst Sellers (Ranked Ascending) */}
          <div className="glass-card p-6 rounded-3xl border border-white/70 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-sage-100">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-sage-950">Bottom 5 Worst Sellers</h2>
                <p className="text-xs text-sage-500">Lowest unit volume sold (Last {windowDays} days)</p>
              </div>
            </div>

            {worstSellers.length === 0 ? (
              <div className="text-center py-8 text-sage-500 text-sm">No inventory records found.</div>
            ) : (
              <div className="space-y-4">
                {worstSellers.map((item, idx) => (
                  <div key={item.productId} className="flex items-center justify-between p-3 rounded-2xl bg-white/60 border border-sage-100 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-xs text-sage-400 font-mono">#{idx + 1}</span>
                      <div>
                        <div className="font-semibold text-sage-900">{item.name}</div>
                        <div className="text-xs text-sage-500">${item.price.toFixed(2)} per unit</div>
                      </div>
                    </div>
                    <div className="text-right font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      {item.qtySold} sold
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesStats;
