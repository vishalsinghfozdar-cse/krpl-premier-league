import { useEffect, useId, useRef, useState } from "react";
import { useRegisterTeam } from "../hooks/useRegisterTeam";
import type { TeamRegistration } from "../types";

// ── Countdown ─────────────────────────────────────────────────────────────────
const TOURNAMENT_DATE = new Date("April 28, 2026 00:00:00").getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const distance = TOURNAMENT_DATE - Date.now();
      if (distance <= 0) {
        setTimeLeft("टूर्नामेंट शुरू हो चुका है!");
        return;
      }
      const d = Math.floor(distance / 86_400_000);
      const h = Math.floor((distance % 86_400_000) / 3_600_000);
      const m = Math.floor((distance % 3_600_000) / 60_000);
      const s = Math.floor((distance % 60_000) / 1_000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const RULES = [
  "सभी खिलाड़ी एक ही गाँव के होना अनिवार्य हैं (ID जरूरी)।",
  "नगरपालिका में केवल 2 वार्ड के खिलाड़ी खेल सकते हैं।",
  "प्रत्येक मैच में 'मैन ऑफ द मैच' शिल्ड।",
  "मैच 8-8 ओवर के होंगे (पावर प्ले 2 ओवर)।",
  "एक बॉलर अधिकतम 2 ओवर डाल सकता है।",
  "बाहरी खिलाड़ी पाए जाने पर टीम डिस्क्वालीफाई।",
  "हैट्रिक (विकेट/छक्के) पर ₹ 151 नकद।",
  "फन्टी बैट अलाऊ है। निविया बॉल का उपयोग।",
];

const CONTACTS = [
  { name: "रामवीर", phone: "9116892312" },
  { name: "विष्णु", phone: "8104646750" },
  { name: "मनीष", phone: "8058500561" },
];

const EMPTY_FORM: TeamRegistration = {
  teamName: "",
  captainName: "",
  villageName: "",
  phone: "",
  playerCount: "11 Players",
};

// ── Registration Modal ────────────────────────────────────────────────────────
interface ModalProps {
  onClose: () => void;
  onSuccess: (teamName: string) => void;
}

function RegistrationModal({ onClose, onSuccess }: ModalProps) {
  const [form, setForm] = useState<TeamRegistration>(EMPTY_FORM);
  const { mutate: registerTeam, isPending } = useRegisterTeam();
  const overlayRef = useRef<HTMLDivElement>(null);

  const teamId = useId();
  const captainId = useId();
  const villageId = useId();
  const phoneId = useId();
  const playerCountId = useId();

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    registerTeam(form, {
      onSuccess: (record) => {
        const name = record.teamName;
        setForm(EMPTY_FORM);
        onClose();
        onSuccess(name);
      },
    });
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const inputStyle = {
    background: "rgba(0,0,0,0.3)",
    border: "1px solid #444",
    color: "white",
  };

  return (
    <div
      ref={overlayRef}
      data-ocid="home.register.dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <dialog
        open
        className="relative w-full max-w-md rounded-3xl p-7 text-foreground bg-transparent border-0 m-0"
        style={{
          background: "oklch(0.10 0.05 270)",
          border: "3px solid var(--gold)",
          animation: "modal-slide 0.4s ease both",
          borderRadius: "1.5rem",
          maxWidth: "28rem",
          width: "100%",
        }}
        aria-labelledby="modal-title"
      >
        {/* Close */}
        <button
          data-ocid="home.register.close_button"
          type="button"
          aria-label="बंद करें"
          className="absolute top-4 right-5 text-3xl leading-none cursor-pointer transition-smooth hover:text-white border-0 bg-transparent"
          style={{ color: "#aaa" }}
          onClick={onClose}
        >
          &times;
        </button>

        <h2
          id="modal-title"
          className="font-display font-bold text-xl pb-3 mb-5"
          style={{
            color: "var(--gold)",
            borderBottom: "2px solid var(--gold)",
          }}
        >
          टीम रजिस्ट्रेशन फॉर्म
        </h2>

        <form
          data-ocid="home.register.form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor={teamId}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--gold)" }}
            >
              टीम का नाम (Team Name)
            </label>
            <input
              id={teamId}
              data-ocid="home.register.teamname.input"
              type="text"
              required
              placeholder="जैसे: Kherli Warriors"
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor={captainId}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--gold)" }}
            >
              कप्तान का नाम (Captain Name)
            </label>
            <input
              id={captainId}
              data-ocid="home.register.captainname.input"
              type="text"
              required
              placeholder="कप्तान का नाम"
              value={form.captainName}
              onChange={(e) =>
                setForm({ ...form, captainName: e.target.value })
              }
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor={villageId}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--gold)" }}
            >
              गाँव/वार्ड का नाम (Village/Ward)
            </label>
            <input
              id={villageId}
              data-ocid="home.register.villagename.input"
              type="text"
              required
              placeholder="नियम के अनुसार गाँव का नाम"
              value={form.villageName}
              onChange={(e) =>
                setForm({ ...form, villageName: e.target.value })
              }
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor={phoneId}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--gold)" }}
            >
              मोबाइल नंबर (WhatsApp No.)
            </label>
            <input
              id={phoneId}
              data-ocid="home.register.phone.input"
              type="tel"
              required
              pattern="[0-9]{10}"
              placeholder="10 अंकों का नंबर"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              htmlFor={playerCountId}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--gold)" }}
            >
              खिलाड़ियों की संख्या
            </label>
            <select
              id={playerCountId}
              data-ocid="home.register.playercount.select"
              value={form.playerCount}
              onChange={(e) =>
                setForm({ ...form, playerCount: e.target.value })
              }
              className={inputClass}
              style={inputStyle}
            >
              <option value="11 Players">11 Players</option>
              <option value="12 Players (+Sub)">12 Players (+Sub)</option>
            </select>
          </div>

          <p className="text-xs mt-1" style={{ color: "#aaa" }}>
            * फॉर्म जमा करने के बाद कमेटी आपसे एंट्री फीस जमा करने के लिए संपर्क करेगी.
          </p>

          <button
            data-ocid="home.register.submit_button"
            type="submit"
            disabled={isPending}
            className="w-full font-display font-bold text-lg py-4 rounded-full cursor-pointer transition-smooth hover:scale-105 border-0 mt-1"
            style={{
              background: "linear-gradient(90deg, var(--gold), #ff8c00)",
              color: "#000",
              boxShadow: "var(--shadow-gold)",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "जमा हो रहा है..." : "रजिस्ट्रेशन जमा करें"}
          </button>
        </form>
      </dialog>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const countdown = useCountdown();
  const [showModal, setShowModal] = useState(false);
  const [successTeam, setSuccessTeam] = useState<string | null>(null);

  function handleSuccess(teamName: string) {
    setSuccessTeam(teamName);
    setTimeout(() => setSuccessTeam(null), 4000);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* ── Success popup ── */}
      {successTeam && (
        <div
          data-ocid="home.register.success_state"
          role="alert"
          aria-live="assertive"
          className="fixed top-5 right-5 z-[2000] rounded-xl px-6 py-4 text-base font-bold text-white shadow-lg"
          style={{
            background: "#4CAF50",
            animation: "fadeInDown 0.3s ease both",
          }}
        >
          🎉 टीम &ldquo;{successTeam}&rdquo; रजिस्टर हो गई है! धन्यवाद.
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {/* ── Main Container ── */}
      <div
        data-ocid="home.page"
        className="shine-container relative rounded-3xl p-6 md:p-10 text-center"
        style={{
          background: "rgba(10, 15, 40, 0.92)",
          border: "4px solid var(--gold)",
          boxShadow: "var(--container-glow)",
        }}
      >
        {/* Devotional */}
        <p
          className="font-display font-bold text-lg"
          style={{ color: "var(--gold)" }}
        >
          ।। जय श्री श्याम ।।
        </p>

        {/* Main Title */}
        <h1
          className="font-display font-black tracking-widest mt-2 text-gold-gradient"
          style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            lineHeight: 1.1,
            textShadow: "0px 4px 0px rgba(0,0,0,0.5)",
          }}
        >
          KRPL PREMIER LEAGUE
        </h1>

        <p className="mt-2 text-lg" style={{ color: "#ddd" }}>
          खेरली तर्फ रेला, कठूमर (अलवर)
        </p>

        <p className="mt-1 text-xl font-display">
          क्रिकेट प्रतियोगिता -{" "}
          <span
            className="inline-block font-bold text-lg px-4 py-1 rounded-md"
            style={{ background: "var(--ipl-red)", color: "#fff" }}
          >
            रात्रि कालीन
          </span>
        </p>

        {/* ── Prize Cards ── */}
        <div
          data-ocid="home.prize.section"
          className="flex flex-col sm:flex-row gap-5 my-10 justify-center"
        >
          {[
            {
              label: "प्रथम पुरस्कार",
              amount: "₹ 51,000",
              ocid: "home.prize.card.1",
            },
            {
              label: "द्वितीय पुरस्कार",
              amount: "₹ 21,000",
              ocid: "home.prize.card.2",
            },
          ].map((prize) => (
            <div
              key={prize.ocid}
              data-ocid={prize.ocid}
              className="prize-card flex-1 p-6 text-center"
            >
              <h3
                className="text-sm font-medium"
                style={{ color: "#aaa", margin: 0 }}
              >
                {prize.label}
              </h3>
              <div
                className="font-display font-bold mt-1"
                style={{
                  fontSize: "2.6rem",
                  color: "var(--gold)",
                  textShadow: "0 0 10px oklch(0.82 0.18 65 / 0.5)",
                }}
              >
                {prize.amount}
              </div>
              <p className="mt-1 text-sm" style={{ color: "#888" }}>
                + ट्रॉफी
              </p>
            </div>
          ))}
        </div>

        {/* ── Entry Fee ── */}
        <div
          data-ocid="home.entry_fee"
          className="inline-block font-display font-bold text-2xl px-12 py-4 rounded-full transition-smooth hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
            color: "white",
            boxShadow: "0 5px 20px rgba(255, 75, 43, 0.4)",
          }}
        >
          एंट्री फीस: ₹ 2,100/-
        </div>

        {/* ── Countdown ── */}
        <div
          data-ocid="home.countdown"
          className="mt-6 rounded-2xl p-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #333",
          }}
        >
          <p
            style={{ color: "#aaa", margin: "0 0 8px 0", fontSize: "0.95rem" }}
          >
            टूर्नामेंट शुरू होने में समय शेष:
          </p>
          <div
            className="font-display font-bold tracking-widest"
            style={{
              fontSize: "1.8rem",
              color: "var(--gold)",
              letterSpacing: "2px",
            }}
            aria-live="polite"
          >
            {countdown || "Loading..."}
          </div>
          <p className="mt-2 font-bold text-foreground">📅 28 अप्रैल 2026</p>
        </div>

        {/* ── Rules ── */}
        <div
          data-ocid="home.rules.panel"
          className="rounded-2xl p-6 text-left mt-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #222",
          }}
        >
          <h2
            className="font-display font-bold text-xl pb-3 mb-4"
            style={{ color: "var(--gold)", borderBottom: "1px solid #444" }}
          >
            📋 मुख्य नियम व शर्तें
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {RULES.map((rule) => (
              <p
                key={rule}
                data-ocid={`home.rules.item.${RULES.indexOf(rule) + 1}`}
                className="relative pl-8 text-sm leading-relaxed text-foreground"
                style={{ margin: "6px 0" }}
              >
                <span className="absolute left-0" aria-hidden="true">
                  🏏
                </span>
                {rule}
              </p>
            ))}
          </div>
        </div>

        {/* ── Register Button ── */}
        <button
          data-ocid="home.register.open_modal_button"
          type="button"
          className="font-display font-bold text-xl px-10 py-4 rounded-full cursor-pointer transition-smooth hover:scale-110 mt-8 border-0"
          style={{
            background: "linear-gradient(90deg, var(--gold), #ff8c00)",
            color: "#000",
            boxShadow: "var(--shadow-gold)",
          }}
          onClick={() => setShowModal(true)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 25px oklch(0.82 0.18 65 / 0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "var(--shadow-gold)";
          }}
        >
          अपनी टीम रजिस्टर करें
        </button>

        {/* ── Contact ── */}
        <div
          data-ocid="home.contact.panel"
          className="rounded-2xl p-6 text-left mt-8"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #222",
          }}
        >
          <h3
            className="font-display font-bold text-lg pb-3 mb-4"
            style={{ color: "var(--gold)", borderBottom: "1px solid #444" }}
          >
            📞 सम्पर्क सूत्र (संपर्क करें)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CONTACTS.map((c) => (
              <a
                key={c.phone}
                data-ocid={`home.contact.card.${CONTACTS.indexOf(c) + 1}`}
                href={`tel:${c.phone}`}
                className="bg-foreground rounded-xl p-4 font-bold text-center transition-smooth hover:scale-105 block"
                style={{ color: "#333" }}
              >
                {c.name}: {c.phone}
              </a>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          className="mt-10"
          style={{ color: "#888", fontSize: "0.85rem" }}
        >
          <p>विनीत: समस्त ग्रामवासी, रेला खेड़ली, कठूमर (अलवर) राज.</p>
          <p className="mt-2">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:text-primary underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
