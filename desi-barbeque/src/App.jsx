import { useState, useEffect } from "react";
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Menu as MenuIcon,
  X,
  ChevronRight,
  Clock,
  Users,
  Truck,
  UtensilsCrossed,
  Star,
  Award,
  Leaf,
  CheckCircle2,
  Send,
  Quote,
  ArrowRight,
  MessageCircle,
  Download,
} from "lucide-react";

/* Gallery photos — see setup notes near GALLERY_ITEMS below for how to add
   these image files to your project. */
import tikkaSkewersRow from "./assets/gallery/tikka-skewers-row.jpg";
import tandooriOnCoals from "./assets/gallery/tandoori-on-coals.jpg";
import tikkaFlavoursGrill from "./assets/gallery/tikka-flavours-grill.jpg";
import tandooriPlate from "./assets/gallery/tandoori-plate.jpg";

/* lucide-react dropped brand/logo icons (trademark reasons), so Instagram
   and Facebook are small local SVG icons instead of package imports. */
function Instagram({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}
function Facebook({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* ---------- business constants ---------- */
const WHATSAPP_NUMBER = "918888821978"; // country code + number, no plus/spaces
const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const C = {
  bg: "#15100D",
  bgAlt: "#1E1712",
  card: "#271E17",
  border: "#3A2B1E",
  ember: "#D6480F",
  emberLight: "#F2884D",
  gold: "#C99A4A",
  cream: "#F3E9DA",
  creamDim: "#C9BBA8",
  deepRed: "#6E1B10",
  green: "#8FB86A",
};

const PAGES = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "party", label: "Party orders" },
  { id: "contact", label: "Contact" },
];

const GALLERY_ITEMS = [
  { title: "Chicken tikka skewers on the grill", img: tikkaSkewersRow, icon: UtensilsCrossed },
  { title: "Tandoori chicken over live coals", img: tandooriOnCoals, icon: Flame },
  { title: "Malai, Schezwan & Hariyali tikka", img: tikkaFlavoursGrill, icon: Flame },
  { title: "Tandoori chicken, plated fresh", img: tandooriPlate, icon: Flame },
  { title: "Tangadi Chicken", icon: Flame },
  { title: "Party combo tray", icon: Users },
];

const MAINS = [
  { name: "Tandoori Chicken", full: 300, half: 150 },
  { name: "Garlic Chicken", full: 300, half: 150 },
  { name: "Tangadi Chicken (Leg Ps.)", full: 250, half: 130 },
  { name: "Chicken Winglets", full: 130, half: 70 },
];

const CHICKEN_TIKKA = [
  "Chicken Masala Tikka",
  "Chicken Hariyali Tikka",
  "Chicken Malai Tikka",
  "Chicken Schezwan Tikka",
  "Chicken Kalimirch Tikka",
  "Chicken Kalmi Tikka",
  "Chicken Maggi Masala Tikka",
].map((name) => ({ name, price: 90 }));

const VEG_TIKKA = [
  { name: "Paneer Masala Tikka", price: 130 },
  { name: "Tandoori Gobhi Tikka", price: 120 },
];

const COMBOS = [
  { label: "Combo offer", title: "2 Tikka flavours", was: 230, now: 180, tone: C.ember },
  { label: "Combo offer", title: "4 Tikka flavours", was: 320, now: 280, tone: C.ember },
  {
    label: "Combo offer · ₹350",
    title: "6 sticks of Chicken Tikka",
    perk: "+ 1 Chicken Winglets FREE",
    tone: C.gold,
  },
  { label: "Combo offer · Veg", title: "2 Veg Tikka flavours", was: 260, now: 240, tone: C.green },
];

/* ---------- shared bits ---------- */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      * { font-family: 'Inter', sans-serif; }
      .disp { font-family: 'Oswald', sans-serif; }
      @keyframes emberPulse { 0%,100% { opacity:.55; transform:scale(1);} 50% { opacity:.85; transform:scale(1.06);} }
      @keyframes marquee { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }
      @keyframes fadeUp { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform: translateY(0);} }
      .fade-up { animation: fadeUp .6s ease both; }
      .marquee-track { display:flex; width:max-content; animation: marquee 22s linear infinite; }
      .dashed-top { border-top: 1px dashed ${C.border}; }
      .menu-card { transition: transform .25s ease, border-color .25s ease; }
      .menu-card:hover { transform: translateY(-3px); border-color: ${C.ember} !important; }
      .link-hover { transition: opacity .2s ease; }
      .link-hover:hover { opacity: 1 !important; }
      input, textarea { font-family: 'Inter', sans-serif; }
      ::selection { background: ${C.ember}; color: ${C.cream}; }
    `}</style>
  );
}

function Section({ id, children, className = "", style = {} }) {
  return (
    <section id={id} className={`px-5 md:px-8 ${className}`} style={style}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.3em] mb-2 text-center" style={{ color: C.gold }}>
      {children}
    </p>
  );
}

function H2({ children }) {
  return (
    <h2
      className="disp text-[32px] md:text-[42px] uppercase text-center mb-10"
      style={{ color: C.cream, fontWeight: 700 }}
    >
      {children}
    </h2>
  );
}

function PrimaryButton({ children, onClick, href, className = "" }) {
  const cls =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider " +
    className;
  const style = { background: C.ember, color: C.cream };
  return href ? (
    <a href={href} className={cls} style={style}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, href, className = "" }) {
  const cls =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider " +
    className;
  const style = { border: `1px solid ${C.border}`, color: C.cream };
  return href ? (
    <a href={href} className={cls} style={style}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

function ItemRow({ name, full, half, price }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 px-4 border-b last:border-b-0" style={{ borderColor: C.border }}>
      <div className="flex items-center gap-3 min-w-0">
        <Flame size={14} style={{ color: C.ember }} className="shrink-0" />
        <span className="text-[15px] truncate" style={{ color: C.cream }}>{name}</span>
      </div>
      {price !== undefined ? (
        <span className="text-[15px] font-semibold shrink-0" style={{ color: C.gold }}>₹{price}</span>
      ) : (
        <div className="flex items-center gap-3 shrink-0 text-[13px]" style={{ color: C.creamDim }}>
          <span>Full <b style={{ color: C.gold }}>₹{full}</b></span>
          <span className="opacity-40">|</span>
          <span>Half <b style={{ color: C.gold }}>₹{half}</b></span>
        </div>
      )}
    </div>
  );
}

function ComboCard({ combo }) {
  return (
    <div className="relative shrink-0 w-[240px] md:w-auto">
      <div className="relative overflow-hidden rounded-lg" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="disp px-4 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: combo.tone }}>
          {combo.label}
        </div>
        <div className="px-4 pb-4">
          <p className="text-[17px] leading-snug mb-3" style={{ color: C.cream }}>{combo.title}</p>
          {combo.perk && <p className="text-[12px] mb-3" style={{ color: C.gold }}>{combo.perk}</p>}
          <div className="flex items-end gap-2 dashed-top pt-3">
            {combo.was && <span className="text-[13px] line-through opacity-50" style={{ color: C.creamDim }}>₹{combo.was}</span>}
            {combo.now ? (
              <span className="disp text-[24px] font-bold" style={{ color: combo.tone }}>₹{combo.now}</span>
            ) : (
              <span className="disp text-[16px] font-bold" style={{ color: combo.tone }}>Free with combo</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppButton({ message = "Hi! I'd like to place an order.", children, className = "" }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider " +
        className
      }
      style={{ background: "#25D366", color: "#0B3D22" }}
    >
      <MessageCircle size={15} /> {children || "Order on WhatsApp"}
    </a>
  );
}

function GalleryTile({ title, icon: Icon, img }) {
  return (
    <div
      className="menu-card relative rounded-lg overflow-hidden flex items-center justify-center aspect-square"
      style={{ background: C.card, border: `1px solid ${C.border}` }}
    >
      {img ? (
        <img src={img} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <Icon size={26} style={{ color: C.ember }} />
          <p className="text-[12px] uppercase tracking-wider" style={{ color: C.creamDim }}>{title}</p>
        </div>
      )}
    </div>
  );
}

function Marquee() {
  const items = [
    "We take party orders",
    "Call 8888821978 / 9168055947",
    "Order on Swiggy & Zomato",
    "Fresh off the charcoal, daily",
  ];
  return (
    <div className="relative overflow-hidden py-3" style={{ background: C.ember, borderTop: `1px solid ${C.deepRed}`, borderBottom: `1px solid ${C.deepRed}` }}>
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {items.map((t, j) => (
              <span key={j} className="disp text-[13px] font-semibold uppercase tracking-wider px-6 whitespace-nowrap" style={{ color: C.cream }}>
                {t} <span className="opacity-60">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- layout ---------- */

function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id) => {
    setOpen(false);
    go(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || open ? "rgba(21,16,13,0.96)" : "rgba(21,16,13,0.55)",
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.ember }}>
            <Flame size={18} color={C.cream} />
          </div>
          <div className="leading-none text-left">
            <p className="disp text-[17px] tracking-wide" style={{ color: C.cream, fontWeight: 600 }}>DESI BARBEQUE</p>
            <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: C.gold }}>The real taste of barbeque</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(p.id)}
              className="link-hover text-[13px] uppercase tracking-wider"
              style={{ color: page === p.id ? C.cream : C.creamDim, opacity: page === p.id ? 1 : 0.85 }}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <WhatsAppButton className="!px-4 !py-2 normal-case tracking-wide">WhatsApp</WhatsAppButton>
          <a href="tel:8888821978" className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide" style={{ background: C.ember, color: C.cream }}>
            <Phone size={14} /> Order now
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} color={C.cream} /> : <MenuIcon size={22} color={C.cream} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={{ background: "rgba(21,16,13,0.98)", borderTop: `1px solid ${C.border}` }}>
          {PAGES.map((p) => (
            <button key={p.id} onClick={() => navigate(p.id)} className="text-left text-[14px] uppercase tracking-wider py-1" style={{ color: page === p.id ? C.ember : C.cream }}>
              {p.label}
            </button>
          ))}
          <div className="flex gap-2 mt-1">
            <WhatsAppButton className="!flex-1 normal-case">WhatsApp</WhatsAppButton>
            <a href="tel:8888821978" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold" style={{ background: C.ember, color: C.cream }}>
              <Phone size={14} /> Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="px-5 md:px-8 pt-14 pb-28 md:pb-8" style={{ background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.ember }}>
              <Flame size={15} color={C.cream} />
            </div>
            <p className="disp text-[16px]" style={{ color: C.cream, fontWeight: 600 }}>DESI BARBEQUE</p>
          </div>
          <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: C.creamDim }}>
            The real taste of barbeque — charcoal-grilled tandoori classics and tikka skewers,
            made fresh to order.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: C.gold }}>Quick links</p>
          <div className="flex flex-col gap-2">
            {PAGES.map((p) => (
              <button key={p.id} onClick={() => go(p.id)} className="text-left text-[13px] link-hover" style={{ color: C.creamDim, opacity: 0.9 }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: C.gold }}>Get in touch</p>
          <div className="flex items-center gap-2 mb-2 text-[13px]" style={{ color: C.creamDim }}>
            <Phone size={13} /> 8888821978 / 9168055947
          </div>
          <div className="flex items-center gap-2 mb-4 text-[13px]" style={{ color: C.creamDim }}>
            <Clock size={13} /> Open daily · 06 PM – 11 PM
          </div>
          <div className="flex items-center gap-3">
            <a href={whatsappLink("Hi! I'd like to place an order.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.border}` }}>
              <MessageCircle size={15} color={C.cream} />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.border}` }}>
              <Instagram size={15} color={C.cream} />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.border}` }}>
              <Facebook size={15} color={C.cream} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]" style={{ borderTop: `1px solid ${C.border}`, color: C.creamDim }}>
        <span className="flex items-center gap-1.5"><MapPin size={12} /> Serving fresh, charcoal-grilled barbeque</span>
        <span>© {new Date().getFullYear()} Desi Barbeque. All rights reserved.</span>
      </div>
    </footer>
  );
}

function MobileOrderBar() {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-2">
      <a
        href="tel:8888821978"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider shadow-lg"
        style={{ background: C.ember, color: C.cream }}
      >
        <Phone size={14} /> Call
      </a>
      <a
        href={whatsappLink("Hi! I'd like to place an order.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wider shadow-lg"
        style={{ background: "#25D366", color: "#0B3D22" }}
      >
        <MessageCircle size={14} /> WhatsApp
      </a>
    </div>
  );
}

/* ---------- pages ---------- */

function HomePage({ go }) {
  return (
    <div className="fade-up">
      <div className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28 px-5">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.ember}55 0%, ${C.ember}00 70%)`, animation: "emberPulse 4.5s ease-in-out infinite", filter: "blur(10px)" }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, ${C.bg}00 0%, ${C.bg} 92%)` }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] uppercase tracking-[0.2em]" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.gold }}>
            <Flame size={12} /> Charcoal-grilled, table &amp; party ready
          </div>
          <h1 className="disp text-[42px] leading-[1.05] md:text-[76px] md:leading-[0.95] uppercase mb-6" style={{ color: C.cream, fontWeight: 700 }}>
            Desi <span style={{ color: C.ember }}>Barbeque</span>
          </h1>
          <p className="text-[15px] md:text-[18px] max-w-xl mx-auto mb-9" style={{ color: C.creamDim }}>
            Tandoori chicken, smoky tikka skewers and party-sized combos, marinated fresh and
            grilled over real charcoal — every single order.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton onClick={() => go("menu")}>View the menu <ChevronRight size={15} /></PrimaryButton>
            <GhostButton href="tel:8888821978"><Phone size={14} /> 8888821978</GhostButton>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 -mt-6 md:-mt-10 mb-4 relative grid grid-cols-3 gap-3 md:gap-4">
        {[
          { src: tandooriOnCoals, alt: "Tandoori chicken over live charcoal" },
          { src: tikkaSkewersRow, alt: "Tikka skewers grilling in a row" },
          { src: tikkaFlavoursGrill, alt: "Chicken tikka flavours on the grill" },
        ].map((photo, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden aspect-[4/3]"
            style={{ border: `1px solid ${C.border}` }}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <Marquee />

      <Section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          [Flame, "Real charcoal grill", "Smoked low and slow for that char"],
          [UtensilsCrossed, "7+ tikka flavours", "Malai, Schezwan, Hariyali and more"],
          [Users, "Party orders", "Bulk skewers for events, made to order"],
          [Truck, "Swiggy & Zomato", "Doorstep delivery across the city"],
        ].map(([Icon, title, sub], i) => (
          <div key={i} className="rounded-lg p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <Icon size={20} style={{ color: C.ember }} className="mb-3" />
            <p className="text-[14px] font-semibold mb-1" style={{ color: C.cream }}>{title}</p>
            <p className="text-[12px]" style={{ color: C.creamDim }}>{sub}</p>
          </div>
        ))}
      </Section>

      <Section className="py-16">
        <Eyebrow>Fan favourites</Eyebrow>
        <H2>Bestsellers</H2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Tandoori Chicken", desc: "Our founding recipe — smoky, char-edged, spiced overnight.", price: "₹300 full", img: tandooriPlate },
            { name: "Mixed Tikka Skewers", desc: "Malai, Schezwan and Hariyali flavours, grilled to order.", price: "₹90 / stick", img: tikkaFlavoursGrill },
            { name: "Fresh Off The Coals", desc: "Every order finished over real charcoal, never a shortcut.", price: "₹150 full", img: tikkaSkewersRow },
          ].map((item, i) => (
            <div key={i} className="menu-card rounded-lg overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <Star size={14} style={{ color: C.gold }} className="mb-2" />
                <p className="disp text-[17px] mb-1.5" style={{ color: C.cream, fontWeight: 500 }}>{item.name}</p>
                <p className="text-[13px] mb-3" style={{ color: C.creamDim }}>{item.desc}</p>
                <p className="text-[13px] font-semibold" style={{ color: C.ember }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <GhostButton onClick={() => go("menu")}>See full menu <ArrowRight size={14} /></GhostButton>
        </div>
      </Section>

      <Section className="py-16" style={{ background: C.bgAlt }}>
        <div className="rounded-2xl p-8 md:p-12 text-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <Users size={26} style={{ color: C.ember }} className="mx-auto mb-4" />
          <h3 className="disp text-[24px] md:text-[30px] uppercase mb-3" style={{ color: C.cream, fontWeight: 700 }}>Planning an event?</h3>
          <p className="text-[14px] max-w-md mx-auto mb-7" style={{ color: C.creamDim }}>We grill bulk tikka skewers and combos fresh for parties of any size.</p>
          <PrimaryButton onClick={() => go("party")}>Plan a party order <ChevronRight size={15} /></PrimaryButton>
        </div>
      </Section>
    </div>
  );
}

function MenuPage() {
  const [tab, setTab] = useState("mains");
  const tabs = [
    { id: "mains", label: "Mains & wings" },
    { id: "skewers", label: "Chicken tikka skewers" },
    { id: "veg", label: "Veg tikka" },
  ];
  return (
    <div className="fade-up pt-28">
      <Section className="pb-6">
        <Eyebrow>Straight off the tandoor</Eyebrow>
        <H2>Our menu</H2>
        <div className="text-center mb-6">
          {/* Add a real menu.pdf to your public/ folder, then this link will work as-is. */}
          <a
            href="/menu.pdf"
            download
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider link-hover"
            style={{ color: C.gold, opacity: 0.9 }}
          >
            <Download size={13} /> Download full menu (PDF)
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-full text-[12px] uppercase tracking-wider font-semibold"
              style={{
                background: tab === t.id ? C.ember : "transparent",
                color: tab === t.id ? C.cream : C.creamDim,
                border: `1px solid ${tab === t.id ? C.ember : C.border}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {tab === "mains" && (
            <div className="grid md:grid-cols-2 gap-4">
              {MAINS.map((item) => (
                <div key={item.name} className="menu-card rounded-lg overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                  <div className="px-4 pt-4 pb-1 flex items-center gap-2">
                    <Star size={13} style={{ color: C.gold }} />
                    <p className="disp text-[16px]" style={{ color: C.cream, fontWeight: 500 }}>{item.name}</p>
                  </div>
                  <ItemRow name="Full" price={item.full} />
                  <ItemRow name="Half" price={item.half} />
                </div>
              ))}
            </div>
          )}
          {tab === "skewers" && (
            <div className="rounded-lg overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="px-4 py-3 text-[12px] uppercase tracking-widest" style={{ color: C.gold, borderBottom: `1px solid ${C.border}` }}>
                Chicken tikka · priced per stick
              </div>
              {CHICKEN_TIKKA.map((item) => <ItemRow key={item.name} name={item.name} price={item.price} />)}
            </div>
          )}
          {tab === "veg" && (
            <div className="rounded-lg overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="px-4 py-3 text-[12px] uppercase tracking-widest" style={{ color: C.green, borderBottom: `1px solid ${C.border}` }}>
                Veg tikka · priced per stick
              </div>
              {VEG_TIKKA.map((item) => <ItemRow key={item.name} name={item.name} price={item.price} />)}
            </div>
          )}
        </div>
      </Section>

      <Section className="py-16" style={{ background: C.bgAlt }}>
        <Eyebrow>Best value</Eyebrow>
        <H2>Combo offers</H2>
        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
          {COMBOS.map((c, i) => <ComboCard key={i} combo={c} />)}
        </div>
      </Section>
    </div>
  );
}

function AboutPage({ go }) {
  return (
    <div className="fade-up pt-28">
      <Section className="pb-16">
        <Eyebrow>Our story</Eyebrow>
        <H2>Why Desi Barbeque</H2>
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden mb-10" style={{ border: `1px solid ${C.border}` }}>
          <img src={tandooriOnCoals} alt="Tandoori chicken over live charcoal" className="w-full h-full object-cover max-h-[340px]" />
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
          <p className="text-[14px] leading-relaxed" style={{ color: C.creamDim }}>
            Desi Barbeque started with one idea: barbeque should taste like it came off real
            charcoal, not a fryer. Every order is marinated fresh, threaded by hand and grilled
            over live coals — the same way it's been done for generations.
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: C.creamDim }}>
            From a single Tandoori Chicken recipe, the menu grew into a full spread of tikka
            flavours, wings and party combos, all built around the same promise: real fire,
            real flavour, every plate.
          </p>
        </div>
      </Section>

      <Section className="py-16 grid md:grid-cols-3 gap-4" style={{ background: C.bgAlt }}>
        {[
          [Flame, "Live charcoal grill", "Every skewer and cut is finished over real coals for genuine char, not a shortcut."],
          [Leaf, "Marinated fresh daily", "Batches are made same-day so nothing sits — flavour stays bright and fresh."],
          [Award, "Consistent recipes", "The same marinades and grill time on every order, whether it's one plate or a party."],
        ].map(([Icon, title, sub], i) => (
          <div key={i} className="rounded-lg p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <Icon size={22} style={{ color: C.ember }} className="mb-4" />
            <p className="disp text-[16px] mb-2" style={{ color: C.cream, fontWeight: 500 }}>{title}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.creamDim }}>{sub}</p>
          </div>
        ))}
      </Section>

      <Section className="py-16">
        <Eyebrow>What people say</Eyebrow>
        <H2>Straight from regulars</H2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["The Tangadi Chicken is smoky in a way most places just can't get right.", "Regular customer"],
            ["Ordered the 350 combo for a get-together — everyone asked where it was from.", "Party order"],
            ["Malai Tikka is my go-to. Consistent every single time.", "Weekly regular"],
          ].map(([quote, who], i) => (
            <div key={i} className="rounded-lg p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <Quote size={18} style={{ color: C.gold }} className="mb-3" />
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.creamDim }}>"{quote}"</p>
              <p className="text-[12px] uppercase tracking-wider" style={{ color: C.ember }}>{who}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-16" style={{ background: C.bgAlt }}>
        <div className="rounded-2xl p-8 md:p-12 text-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <h3 className="disp text-[24px] md:text-[30px] uppercase mb-3" style={{ color: C.cream, fontWeight: 700 }}>Come taste it for yourself</h3>
          <p className="text-[14px] max-w-md mx-auto mb-7" style={{ color: C.creamDim }}>Browse the full menu or get in touch to place an order.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton onClick={() => go("menu")}>View the menu <ChevronRight size={15} /></PrimaryButton>
            <GhostButton onClick={() => go("contact")}>Contact us</GhostButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

function PartyOrdersPage({ go }) {
  return (
    <div className="fade-up pt-28">
      <Section className="pb-16">
        <Eyebrow>Feeding a crowd</Eyebrow>
        <H2>Party orders</H2>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[14px] leading-relaxed" style={{ color: C.creamDim }}>
            Birthdays, office get-togethers, festive gatherings — we grill bulk tikka skewers,
            wings and combos fresh to order. Call ahead with your headcount and we'll help you
            build a spread.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {[
            [Users, "Any group size", "From small get-togethers to large events, portioned to fit."],
            [Clock, "Advance ordering", "Call ahead so everything is grilled fresh and ready on time."],
            [UtensilsCrossed, "Mixed flavour trays", "Combine chicken and veg tikka flavours in one order."],
          ].map(([Icon, title, sub], i) => (
            <div key={i} className="rounded-lg p-6 text-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <Icon size={22} style={{ color: C.ember }} className="mx-auto mb-3" />
              <p className="disp text-[15px] mb-2" style={{ color: C.cream, fontWeight: 500 }}>{title}</p>
              <p className="text-[13px]" style={{ color: C.creamDim }}>{sub}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto rounded-lg overflow-hidden mb-14" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="px-4 py-3 text-[12px] uppercase tracking-widest" style={{ color: C.gold, borderBottom: `1px solid ${C.border}` }}>
            Popular for parties
          </div>
          {[
            ["6 Chicken Tikka sticks + 1 Winglets free", "₹350"],
            ["4 Tikka flavours combo", "₹280"],
            ["Tandoori Chicken (Full)", "₹300"],
          ].map(([name, price]) => (
            <div key={name} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0" style={{ borderColor: C.border }}>
              <span className="flex items-center gap-2 text-[14px]" style={{ color: C.cream }}>
                <CheckCircle2 size={14} style={{ color: C.green }} /> {name}
              </span>
              <span className="text-[14px] font-semibold" style={{ color: C.gold }}>{price}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 md:p-12 text-center" style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
          <h3 className="disp text-[22px] md:text-[26px] uppercase mb-3" style={{ color: C.cream, fontWeight: 700 }}>Call to book your party order</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
            <PrimaryButton href="tel:8888821978"><Phone size={14} /> 8888821978</PrimaryButton>
            <GhostButton href="tel:9168055947"><Phone size={14} /> 9168055947</GhostButton>
          </div>
          <button onClick={() => go("contact")} className="mt-6 text-[12px] uppercase tracking-wider link-hover" style={{ color: C.creamDim, opacity: 0.85 }}>
            Or send us your details instead →
          </button>
        </div>
      </Section>
    </div>
  );
}

function GalleryPage({ go }) {
  return (
    <div className="fade-up pt-28">
      <Section className="pb-16">
        <Eyebrow>A taste of what's coming</Eyebrow>
        <H2>Gallery</H2>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-[14px] leading-relaxed" style={{ color: C.creamDim }}>
            Straight off our grill — a look at the tikka skewers, tandoori and combos before
            they hit the plate.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <GalleryTile key={item.title} title={item.title} icon={item.icon} img={item.img} />
          ))}
        </div>
        <div className="text-center mt-10">
          <GhostButton onClick={() => go("menu")}>See the menu <ArrowRight size={14} /></GhostButton>
        </div>
      </Section>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    const lines = [
      "Hi! I'd like to request a callback.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.date && `Event date: ${form.date}`,
      form.guests && `Guests: ${form.guests}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputStyle = {
    background: C.bgAlt,
    border: `1px solid ${C.border}`,
    color: C.cream,
  };

  return (
    <div className="fade-up pt-28">
      <Section className="pb-20">
        <Eyebrow>We'd love to hear from you</Eyebrow>
        <H2>Contact us</H2>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div>
            <div className="rounded-lg p-6 mb-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: C.gold }}>Call or order</p>
              <div className="flex items-center gap-2 mb-3 text-[14px]" style={{ color: C.cream }}>
                <Phone size={15} style={{ color: C.ember }} /> 8888821978 / 9168055947
              </div>
              <div className="flex items-center gap-2 mb-3 text-[14px]" style={{ color: C.cream }}>
                <Mail size={15} style={{ color: C.ember }} /> hello@desibarbeque.in
              </div>
              <div className="flex items-center gap-2 mb-3 text-[14px]" style={{ color: C.cream }}>
                <Clock size={15} style={{ color: C.ember }} /> Open daily · 06 PM – 11 PM
              </div>
              <div className="flex items-center gap-2 text-[14px]" style={{ color: C.cream }}>
                <MapPin size={15} style={{ color: C.ember }} /> Serving across the city
              </div>
            </div>
            <div className="rounded-lg p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: C.gold }}>Order online</p>
              <div className="flex items-center gap-3">
                <a href="#" className="px-4 h-9 rounded-full flex items-center text-[12px] font-semibold uppercase" style={{ border: `1px solid ${C.border}`, color: C.cream }}>Swiggy</a>
                <a href="#" className="px-4 h-9 rounded-full flex items-center text-[12px] font-semibold uppercase" style={{ border: `1px solid ${C.border}`, color: C.cream }}>Zomato</a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.border}` }}><Instagram size={15} color={C.cream} /></a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: `1px solid ${C.border}` }}><Facebook size={15} color={C.cream} /></a>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 size={28} style={{ color: C.green }} className="mb-3" />
                <p className="disp text-[18px] mb-2" style={{ color: C.cream, fontWeight: 500 }}>Sent on WhatsApp</p>
                <p className="text-[13px]" style={{ color: C.creamDim }}>
                  Check the WhatsApp tab that just opened, hit send, and we'll confirm shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <p className="text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: C.gold }}>Request a callback</p>
                <input required placeholder="Your name" value={form.name} onChange={update("name")} className="w-full px-3 py-2.5 rounded-md text-[13px] outline-none" style={inputStyle} />
                <input required placeholder="Phone number" value={form.phone} onChange={update("phone")} className="w-full px-3 py-2.5 rounded-md text-[13px] outline-none" style={inputStyle} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" placeholder="Event date" value={form.date} onChange={update("date")} className="w-full px-3 py-2.5 rounded-md text-[13px] outline-none" style={inputStyle} />
                  <input placeholder="No. of guests" value={form.guests} onChange={update("guests")} className="w-full px-3 py-2.5 rounded-md text-[13px] outline-none" style={inputStyle} />
                </div>
                <textarea placeholder="Anything else we should know?" rows={3} value={form.message} onChange={update("message")} className="w-full px-3 py-2.5 rounded-md text-[13px] outline-none resize-none" style={inputStyle} />
                <button type="submit" className="mt-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[13px] font-semibold uppercase tracking-wider" style={{ background: "#25D366", color: "#0B3D22" }}>
                  <MessageCircle size={14} /> Send via WhatsApp
                </button>
                <p className="text-[11px] text-center" style={{ color: C.creamDim }}>Opens WhatsApp with your details pre-filled — just hit send.</p>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ---------- app shell ---------- */

export default function App() {
  const [page, setPage] = useState("home");

  const go = (id) => setPage(id);

  let content;
  if (page === "menu") content = <MenuPage />;
  else if (page === "gallery") content = <GalleryPage go={go} />;
  else if (page === "about") content = <AboutPage go={go} />;
  else if (page === "party") content = <PartyOrdersPage go={go} />;
  else if (page === "contact") content = <ContactPage />;
  else content = <HomePage go={go} />;

  return (
    <div className="w-full min-h-screen" style={{ background: C.bg }}>
      <GlobalStyle />
      <Navbar page={page} go={go} />
      {content}
      <Footer go={go} />
      <MobileOrderBar />
    </div>
  );
}