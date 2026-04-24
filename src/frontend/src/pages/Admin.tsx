import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, RefreshCw, Trophy, Users } from "lucide-react";
import { useRegistrations } from "../hooks/useRegistrations";

const TABLE_HEADERS = [
  { key: "num", label: "#" },
  { key: "team", label: "टीम का नाम" },
  { key: "captain", label: "कप्तान" },
  { key: "village", label: "गाँव/वार्ड" },
  { key: "phone", label: "मोबाइल" },
  { key: "players", label: "खिलाड़ी" },
  { key: "time", label: "रजिस्ट्रेशन समय" },
];

function formatDateHindi(iso: string): string {
  try {
    return new Intl.DateTimeFormat("hi-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function Admin() {
  const { data: registrations = [], isLoading, isError } = useRegistrations();
  const queryClient = useQueryClient();

  const total = registrations.length;

  return (
    <div className="min-h-screen py-8 px-4" data-ocid="admin.page">
      <div className="max-w-6xl mx-auto">
        {/* Main card */}
        <div
          className="shine-container relative rounded-3xl p-6 sm:p-10"
          style={{
            background: "rgba(10, 15, 40, 0.94)",
            border: "4px solid var(--gold)",
            boxShadow: "var(--container-glow)",
          }}
          data-ocid="admin.panel"
        >
          {/* Top nav bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-foreground transition-smooth group"
              data-ocid="admin.back_link"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-smooth"
              />
              होम पेज पर वापस जाएं
            </Link>
            <button
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["registrations"] })
              }
              type="button"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm"
              data-ocid="admin.refresh_button"
            >
              <RefreshCw size={14} />
              रिफ्रेश
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <p
              className="font-bold text-sm tracking-widest mb-1"
              style={{ color: "var(--gold)" }}
            >
              ।। जय श्री श्याम ।।
            </p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy size={28} style={{ color: "var(--gold)" }} />
              <h1
                className="font-display font-black tracking-wider text-gold-gradient"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
              >
                KRPL PREMIER LEAGUE
              </h1>
              <Trophy size={28} style={{ color: "var(--gold)" }} />
            </div>
            <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground/75">
              टीम रजिस्ट्रेशन - एडमिन पैनल
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              खेरली तर्फ रेला, कठूमर (अलवर)
            </p>
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 mb-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(253,187,45,0.25)",
            }}
            data-ocid="admin.stats_section"
          >
            <div className="flex items-center gap-3">
              <Users size={22} style={{ color: "var(--gold)" }} />
              <div>
                <p className="text-xs text-muted-foreground">कुल रजिस्ट्रेशन</p>
                <p
                  className="font-display font-black"
                  style={{ fontSize: "2rem", color: "var(--gold)" }}
                >
                  {isLoading ? "—" : total}
                  <span className="text-base font-medium text-foreground/60 ml-2">
                    टीमें
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground/70 text-sm">
              <Calendar size={16} style={{ color: "var(--gold)" }} />
              <span className="font-medium">📅 28 अप्रैल 2026</span>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="space-y-3" data-ocid="admin.loading_state">
              {[1, 2, 3, 4].map((n) => (
                <Skeleton
                  key={n}
                  className="h-12 w-full rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div
              className="text-center rounded-2xl p-10"
              style={{
                background: "rgba(255,50,50,0.07)",
                border: "1px solid rgba(255,50,50,0.3)",
              }}
              data-ocid="admin.error_state"
            >
              <p className="text-xl font-bold text-destructive-foreground">
                डेटा लोड करने में समस्या हुई।
              </p>
              <p className="text-sm mt-1 text-muted-foreground">
                कृपया पेज रिफ्रेश करें।
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && total === 0 && (
            <div
              className="text-center rounded-2xl p-14"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px dashed rgba(253,187,45,0.3)",
              }}
              data-ocid="admin.empty_state"
            >
              <p className="text-5xl mb-4">🏏</p>
              <p
                className="font-display font-bold text-xl"
                style={{ color: "var(--gold)" }}
              >
                अभी तक कोई टीम रजिस्टर नहीं हुई है
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                जब टीमें रजिस्ट्रेशन करेंगी, वे यहाँ दिखाई देंगी।
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && total > 0 && (
            <div
              className="overflow-x-auto rounded-2xl"
              style={{ border: "1px solid rgba(253,187,45,0.35)" }}
              data-ocid="admin.table"
            >
              <table className="w-full text-sm min-w-[680px]">
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid rgba(253,187,45,0.6)",
                      background: "rgba(253,187,45,0.07)",
                    }}
                  >
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h.key}
                        className="text-left px-4 py-3 font-display font-bold whitespace-nowrap"
                        style={{ color: "var(--gold)" }}
                      >
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, idx) => (
                    <tr
                      key={reg.id}
                      className="transition-smooth hover:bg-white/5"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                      data-ocid={`admin.item.${idx + 1}`}
                    >
                      <td
                        className="px-4 py-3 font-bold font-mono text-xs"
                        style={{ color: "var(--gold)" }}
                      >
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-display font-semibold text-foreground">
                        <span className="block truncate max-w-[160px]">
                          {reg.teamName}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground/90">
                        {reg.captainName}
                      </td>
                      <td className="px-4 py-3 text-foreground/75">
                        {reg.villageName}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`tel:${reg.phone}`}
                          className="font-mono transition-smooth hover:text-primary whitespace-nowrap"
                          style={{ color: "var(--gold-bright)" }}
                        >
                          {reg.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className="whitespace-nowrap text-xs"
                          style={{
                            borderColor: "rgba(253,187,45,0.4)",
                            color: "var(--gold)",
                          }}
                        >
                          {reg.playerCount}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {formatDateHindi(reg.registeredAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-10 text-center text-xs text-muted-foreground space-y-1">
            <p>यह पेज केवल कमेटी सदस्यों के लिए है।</p>
            <p>
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-smooth hover:text-primary underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
