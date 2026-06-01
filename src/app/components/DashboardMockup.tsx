import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { v: 3200 }, { v: 4100 }, { v: 3800 }, { v: 5200 }, { v: 4700 },
  { v: 6300 }, { v: 5900 }, { v: 7100 }, { v: 6800 }, { v: 8200 },
  { v: 7600 }, { v: 9100 },
];

const sideItems = ["Dashboard", "Projects", "Clients", "Analytics", "Settings"];

export function DashboardMockup() {
  return (
    <div
      className="relative w-full max-w-2xl"
      style={{
        filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.10))",
      }}
    >
      {/* Browser chrome */}
      <div className="rounded-2xl overflow-hidden border border-gray-200/80 bg-white">
        {/* Title bar */}
        <div className="bg-zinc-50 border-b border-gray-200/80 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 border border-gray-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-xs text-zinc-500" style={{ fontFamily: "Inter, sans-serif" }}>
              medclinic-pro.com
            </span>
          </div>
        </div>

        {/* App layout */}
        <div className="flex h-72">
          {/* Sidebar */}
          <div className="w-36 bg-zinc-900 flex flex-col py-4 gap-1 px-2 shrink-0">
            <div className="px-2 py-1.5 mb-2">
              <div className="text-white text-xs" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>MedClinic</div>
              <div className="text-zinc-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Admin Panel</div>
            </div>
            {sideItems.map((item, i) => (
              <div
                key={item}
                className={`px-2 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  i === 0
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: i === 0 ? 500 : 400 }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 bg-white p-4 overflow-hidden">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-zinc-900 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                  Overview
                </div>
                <div className="text-zinc-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>May 2026</div>
              </div>
              <div className="flex gap-2">
                {["Week", "Month", "Year"].map((t, i) => (
                  <div
                    key={t}
                    className={`px-2 py-0.5 rounded text-xs ${i === 1 ? "bg-zinc-900 text-white" : "text-zinc-500 bg-zinc-100"}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "New Patients", value: "1,284", change: "+12%" },
                { label: "Revenue", value: "$48.2K", change: "+8.4%" },
                { label: "Appointments", value: "342", change: "+21%" },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-50 rounded-xl p-2.5 border border-zinc-100">
                  <div className="text-zinc-500 text-xs mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{stat.label}</div>
                  <div className="text-zinc-900 text-sm" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{stat.value}</div>
                  <div className="text-green-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
              <div className="text-zinc-700 text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>Revenue trend</div>
              {/* height explícito en px → evita warning de Recharts cuando el contenedor padre tiene display:none */}
              <div style={{ height: "64px", minHeight: "64px" }}>
                <ResponsiveContainer width="100%" height={64}>
                  <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#18181b" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ display: "none" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#18181b"
                      strokeWidth={1.5}
                      fill="url(#grad)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div
        className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 flex items-center gap-3"
        style={{ minWidth: "200px" }}
      >
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="text-zinc-900 text-xs" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>New inquiry received</div>
          <div className="text-zinc-400 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Via contact form • 2m ago</div>
        </div>
      </div>

      {/* Floating score card */}
      <div
        className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3"
        style={{ minWidth: "140px" }}
      >
        <div className="text-zinc-500 text-xs mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Performance</div>
        <div className="flex items-end gap-1">
          <span className="text-zinc-900" style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "22px" }}>98</span>
          <span className="text-zinc-400 text-xs mb-1" style={{ fontFamily: "Inter, sans-serif" }}>/100</span>
        </div>
        <div className="flex gap-0.5 mt-1.5">
          {[1,2,3,4,5,6,7,8,9,10].map((i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 9 ? "bg-green-500" : "bg-zinc-200"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
