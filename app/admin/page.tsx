"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Lock,
  Download,
  Search,
  ExternalLink,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { InquiryRecord, AggregatedStats } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Check saved session token
  useEffect(() => {
    const saved = sessionStorage.getItem("kurmi_admin_token");
    if (saved) {
      verifyAndLoad(saved);
    }
  }, []);

  const verifyAndLoad = async (token: string) => {
    setIsLoading(true);
    try {
      const [resInq, resStats] = await Promise.all([
        fetch("/api/admin/inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/stats"),
      ]);

      if (resInq.ok && resStats.ok) {
        const inqs = await resInq.json();
        const statData = await resStats.json();
        setInquiries(inqs);
        setStats(statData);
        setIsAuthenticated(true);
        sessionStorage.setItem("kurmi_admin_token", token);
      } else {
        setAuthError("Invalid access token");
        sessionStorage.removeItem("kurmi_admin_token");
      }
    } catch {
      setAuthError("Failed to connect to admin API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAndLoad(passcode.trim());
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted" | "converted") => {
    const token = sessionStorage.getItem("kurmi_admin_token") || passcode;
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
      }
    } catch {}
  };

  const handleExportCsv = () => {
    const token = sessionStorage.getItem("kurmi_admin_token") || passcode;
    window.open(`/api/admin/export?token=${encodeURIComponent(token)}`, "_blank");
  };

  // If not authenticated, render calm secure login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-bg">
        <div className="w-full max-w-md p-8 rounded-card bg-surface border border-line shadow-card text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-sand/60 text-forest mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
              AUTHORIZED PERSONNEL ONLY
            </span>
            <h1 className="font-fraunces text-scale-28 font-bold text-ink mt-1">
              Field Launch Dashboard
            </h1>
            <p className="text-scale-12 text-muted mt-1">
              Enter the administrative security secret to access real demand ledgers.
            </p>
          </div>

          {authError && (
            <p className="text-scale-12 text-red-600 font-semibold">{authError}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Secret Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full h-11 px-4 rounded-input border border-line bg-surface text-ink text-scale-14 text-center tracking-widest focus:outline-none focus:border-terracotta"
              autoFocus
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Authenticate
            </Button>
          </form>
          <p className="text-[11px] text-muted">
            Default sandbox secret: <code className="bg-sand px-1.5 py-0.5 rounded">kurmi_admin_secret_2026</code>
          </p>
        </div>
      </div>
    );
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.whatsapp.includes(q) ||
      inq.city.toLowerCase().includes(q) ||
      (inq.email && inq.email.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // Chart data
  const designBarData = Object.entries(stats?.productInterest || {}).map(([id, count]) => ({
    name: id.replace(/-/g, " "),
    inquiries: count,
  }));

  const sizeBarData = Object.entries(stats?.sizeDistribution || {}).map(([size, count]) => ({
    size,
    count,
  }));

  const genderPieData = [
    { name: "Men", value: stats?.genderSplit.men || 0, color: "#1F3D2B" },
    { name: "Women", value: stats?.genderSplit.women || 0, color: "#D2693A" },
  ];

  return (
    <div className="w-full py-10 bg-bg text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Control Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-line gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                LIVE DEMAND METRICS
              </span>
            </div>
            <h1 className="font-fraunces text-scale-40 font-bold text-ink">
              Drop 01 Operations Ledger
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={handleExportCsv}
              icon={<Download className="w-4 h-4 text-terracotta" />}
            >
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                sessionStorage.removeItem("kurmi_admin_token");
                setIsAuthenticated(false);
              }}
            >
              Sign out
            </Button>
          </div>
        </div>

        {/* 1. Milestone Goal Progress Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-card bg-surface border border-line shadow-xs">
            <span className="text-scale-12 text-muted font-medium block">Total Supporters</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-fraunces text-scale-40 font-bold text-ink">
                {inquiries.length}
              </span>
              <span className="text-scale-12 text-muted">/ 1,000 goal</span>
            </div>
            <div className="mt-3 h-2 w-full bg-sand/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (inquiries.length / 1000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="p-6 rounded-card bg-surface border border-line shadow-xs">
            <span className="text-scale-12 text-muted font-medium block">New Inquiries</span>
            <span className="font-fraunces text-scale-40 font-bold text-forest mt-1 block">
              {inquiries.filter((i) => i.status === "new").length}
            </span>
            <span className="text-[11px] text-muted">Needs first contact</span>
          </div>

          <div className="p-6 rounded-card bg-surface border border-line shadow-xs">
            <span className="text-scale-12 text-muted font-medium block">Contacted</span>
            <span className="font-fraunces text-scale-40 font-bold text-terracotta mt-1 block">
              {inquiries.filter((i) => i.status === "contacted").length}
            </span>
            <span className="text-[11px] text-muted">Acknowledged via WhatsApp/Email</span>
          </div>

          <div className="p-6 rounded-card bg-surface border border-line shadow-xs">
            <span className="text-scale-12 text-muted font-medium block">Top City</span>
            <span className="font-fraunces text-scale-28 font-bold text-ink mt-1 block truncate">
              {stats?.topCities[0]?.city || "Bengaluru"}
            </span>
            <span className="text-[11px] text-muted">
              {stats?.topCities[0]?.count || 0} pledged supporters
            </span>
          </div>
        </div>

        {/* 2. Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Wanted Species Bar Chart */}
          <div className="p-6 rounded-card bg-surface border border-line shadow-xs space-y-4">
            <h3 className="font-fraunces text-scale-20 font-bold text-ink">
              Species Demand Breakdown
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={designBarData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="inquiries" fill="#1F3D2B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Size Distribution */}
          <div className="p-6 rounded-card bg-surface border border-line shadow-xs space-y-4">
            <h3 className="font-fraunces text-scale-20 font-bold text-ink">
              Requested Sizes Distribution
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sizeBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="size" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#D2693A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Inquiries Data Table */}
        <div className="p-6 rounded-card bg-surface border border-line shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-fraunces text-scale-20 font-bold text-ink">
                All Pledged Inquiries
              </h3>
              <p className="text-scale-12 text-muted">
                Showing {filteredInquiries.length} of {inquiries.length} records
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search Box */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-surface text-scale-14">
                <Search className="w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search name, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none text-scale-12 w-36 sm:w-48"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-line bg-surface text-scale-12 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-scale-12 text-left">
              <thead className="bg-sand/60 text-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Supporter</th>
                  <th className="p-3">WhatsApp</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Selections</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted">
                      No inquiries found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-sand/20 transition-colors">
                      <td className="p-3 font-mono font-bold text-muted">
                        #{inq.supporterNumber}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-ink block">{inq.name}</span>
                        {inq.email && <span className="text-[11px] text-muted">{inq.email}</span>}
                      </td>
                      <td className="p-3 font-mono">
                        +91 {inq.whatsapp}
                      </td>
                      <td className="p-3">{inq.city}</td>
                      <td className="p-3">
                        <div className="space-y-0.5 max-w-xs">
                          {inq.items.map((it, idx) => (
                            <span key={idx} className="block text-[11px] text-muted truncate">
                              • {it.productId} ({it.size} x {it.quantity})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            inq.status === "new"
                              ? "bg-amber-100 text-amber-800 border-amber-300"
                              : inq.status === "contacted"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : "bg-emerald-100 text-emerald-800 border-emerald-300"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/91${inq.whatsapp}?text=Hi%20${encodeURIComponent(
                              inq.name
                            )},%20this%20is%20the%20KURMI%20FASHIONS%20team!%20Thank%20you%20for%20pledging%20supporter%20%23${
                              inq.supporterNumber
                            }.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-700"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          {inq.email && (
                            <a
                              href={`mailto:${inq.email}?subject=KURMI%20FASHIONS%20Drop%20Update`}
                              className="p-1.5 rounded-full hover:bg-blue-100 text-blue-700"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
