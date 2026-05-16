import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  Globe2,
  Mail,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  TestTube2,
} from "lucide-react";

const services = [
  {
    title: "Extractables & Leachables (E&L)",
    text: "Strategy, study oversight and compliance pathways for product safety.",
    icon: FlaskConical,
    detail: "Comprehensive E&L consulting focused on identifying, evaluating, and controlling chemical risks associated with pharmaceutical packaging, delivery systems, and medical devices.",
    capabilities: ["E&L strategy development", "Material characterization support", "Container closure system evaluation", "Single-use system assessments", "Toxicological risk evaluation", "Study oversight and CRO coordination", "Regulatory gap analysis", "Submission support documentation"],
    groupTitle: "Ideal For",
    group: ["Drug products", "Combination products", "Injectable systems", "Medical devices", "Packaging materials", "Biopharmaceutical systems"],
  },
  {
    title: "Regulatory Consulting",
    text: "Guidance aligned with USFDA, EMA, WHO, USP and ISO expectations.",
    icon: ShieldCheck,
    detail: "Strategic regulatory guidance for pharmaceutical and medical device organizations navigating global compliance requirements.",
    capabilities: ["USFDA / EMA / WHO guidance interpretation", "USP compliance alignment", "ISO framework consulting", "Regulatory pathway planning", "Technical documentation review", "Deficiency response support", "Audit and inspection preparation", "Compliance risk mitigation"],
    groupTitle: "Standards & Frameworks",
    group: ["USP <1663> / <1664>", "ISO 10993", "USFDA guidance", "EMA expectations", "WHO standards", "ICH principles"],
  },
  {
    title: "Protocol Design",
    text: "Scientifically justified protocols for devices, packaging and combination products.",
    icon: ClipboardCheck,
    detail: "Scientifically defensible protocol development tailored to product risk, material composition, intended use, and regulatory expectations.",
    capabilities: ["E&L protocol preparation", "Analytical strategy planning", "Toxicological justification frameworks", "Sampling plan development", "Simulation condition selection", "Device-specific protocol customization", "Method selection guidance", "Statistical and scientific rationale support"],
    groupTitle: "Benefits",
    group: ["Reduced study delays", "Improved submission readiness", "Better scientific defensibility", "Stronger regulatory confidence"],
  },
  {
    title: "Analytical Testing Support",
    text: "CRO coordination, method selection, data review and interpretation.",
    icon: TestTube2,
    detail: "Technical oversight and coordination for analytical testing activities performed across internal teams and external CRO laboratories.",
    capabilities: ["CRO coordination and communication", "Method selection and review", "Analytical workflow guidance", "Data trending and interpretation", "Unknown compound assessment", "Laboratory result evaluation", "Study monitoring support", "Reporting consistency checks"],
    groupTitle: "Testing Areas",
    group: ["GC-MS", "LC-MS", "ICP-MS", "FTIR", "Headspace analysis", "Targeted and untargeted screening"],
  },
  {
    title: "Global Compliance Guidance",
    text: "Submission roadmaps for technical files and lifecycle support.",
    icon: Globe2,
    detail: "End-to-end support for building sustainable compliance strategies across international regulatory landscapes.",
    capabilities: ["Submission roadmap planning", "Lifecycle compliance support", "Technical file alignment", "Regional requirement guidance", "Change impact assessment", "Documentation structure planning", "Regulatory communication support", "Cross-functional compliance coordination"],
    groupTitle: "Global Alignment",
    group: ["United States", "European Union", "WHO-regulated regions", "International submission frameworks"],
  },
  {
    title: "Lab Setup Guidance",
    text: "Workflow and quality-system direction for capable E&L programs.",
    icon: Building2,
    detail: "Strategic consulting for organizations establishing or enhancing analytical laboratories and E&L capabilities.",
    capabilities: ["Laboratory workflow planning", "Instrument selection guidance", "Quality system recommendations", "Documentation process setup", "SOP framework development", "Training direction support", "Compliance-focused infrastructure planning", "Operational readiness consulting"],
    groupTitle: "Suitable For",
    group: ["New laboratory setup", "E&L capability expansion", "CRO operational enhancement", "Internal compliance modernization"],
  },
  {
    title: "Risk Assessment",
    text: "Material, process and toxicological risk framing for better decisions.",
    icon: BarChart3,
    detail: "Scientific and toxicological risk evaluation designed to support safer decisions across materials, manufacturing processes, packaging systems, and product-contact components.",
    capabilities: ["Toxicological risk framing", "Material risk evaluation", "Process impact assessment", "Chemical exposure analysis", "Product-contact risk review", "Safety threshold interpretation", "Extractable profile assessment", "Decision-support reporting"],
    groupTitle: "Outcomes",
    group: ["Better regulatory confidence", "Improved product safety understanding", "Scientifically justified decisions", "Reduced compliance uncertainty"],
  },
  {
    title: "Documentation & Reporting",
    text: "Clear gap assessments, study summaries and submission-ready narratives.",
    icon: BadgeCheck,
    detail: "Preparation and review of high-quality technical documentation designed for regulatory clarity, scientific defensibility, and submission readiness.",
    capabilities: ["Gap assessment reports", "Technical summaries", "Scientific narrative preparation", "Data interpretation reports", "Regulatory response documentation", "Submission-ready study summaries", "Compliance presentation materials", "Executive reporting support"],
    groupTitle: "Deliverables",
    group: ["Clear and structured reporting", "Regulatory-focused documentation", "Scientifically defensible narratives", "Audit-ready technical content"],
  },
];

const aimItems = [
  "Ensure Regulatory Compliance",
  "Deliver Analytical Excellence",
  "Empower Global Pharma",
  "Coordinate End-to-End Testing",
  "Support Product Safety",
];

const stats = [
  [25, "+", "Years of technical leadership"],
  [5, "", "Global compliance frameworks"],
  [360, "", "Degree E&L project handling"],
  [24, "h", "Priority response support"],
];

const standards = ["USP <1663>", "USP <1664>", "ISO 10993", "USFDA", "EMA", "WHO"];
const workflow = ["Consultation", "Assessment", "Protocol Design", "Testing", "Compliance", "Final Reporting"];

const testimonials = [
  ["Regulatory Affairs Lead", "The team translated complex E&L expectations into an actionable program with exceptional clarity."],
  ["Medical Device Manufacturer", "SG Pharma Solutions brought discipline, speed and scientific confidence to our documentation."],
  ["Global Pharma Client", "Their CRO coordination and regulatory insight helped us move from uncertainty to submission readiness."],
];

const testimonialLoop = [...testimonials, ...testimonials];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: "easeOut" },
};

function LogoMark({ compact = false }) {
  return (
    <div className={`logo-lockup ${compact ? "compact" : ""}`} aria-label="SG Pharma Solutions">
      <img className="brand-logo" src="/sg-pharma-logo.jpg" alt="SG Pharma Solutions logo" />
      {!compact && (
        <div>
          <strong>SG Pharma Solutions</strong>
          <small>E&L Regulatory Consulting</small>
        </div>
      )}
    </div>
  );
}

function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => <span key={index} style={{ "--i": index }} />)}
    </div>
  );
}

function HeroVisual() {
  return (
    <motion.div className="hero-visual" initial={{ opacity: 0, x: 38, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
      <div className="mesh-glow" />
      <div className="dna-line" aria-hidden="true">{Array.from({ length: 10 }).map((_, index) => <span key={index} />)}</div>
      <div className="dashboard-card compliance-card">
        <div className="dashboard-top">
          <LogoMark compact />
          <div><strong>E&L Compliance Console</strong><small>Regulatory study control</small></div>
        </div>
        <div className="compliance-score">
          <span>96%</span>
          <div><strong>Submission readiness</strong><small>Protocol, testing, toxicology and report alignment</small></div>
        </div>
        <div className="signal-bars">
          {["68%", "44%", "78%", "56%", "88%"].map((height) => <span key={height} style={{ "--h": height }} />)}
        </div>
      </div>
      <div className="molecule-card">
        <div className="molecule-node n1" /><div className="molecule-node n2" /><div className="molecule-node n3" /><div className="molecule-node n4" />
        <div className="molecule-bond b1" /><div className="molecule-bond b2" /><div className="molecule-bond b3" />
        <Microscope size={52} />
      </div>
      <div className="floating-standard">USP &lt;1664&gt;</div>
      <div className="floating-standard second">ISO 10993</div>
    </motion.div>
  );
}

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const startedAt = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / 1200, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <strong ref={ref}>{count}{suffix}</strong>;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const [activeService, setActiveService] = useState(null);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const company = data.get("company") || "";
    const details = data.get("details") || "";
    const subject = encodeURIComponent(`Consultation request from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nWork email: ${email}\nCompany: ${company}\n\nProject details:\n${details}`,
    );
    window.location.href = `mailto:madhu.sgpharmasolutions@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="loader"><LogoMark compact /><span>SG Pharma Solutions</span></div>
      <nav className="nav">
        <a href="#home" className="nav-brand"><LogoMark /></a>
        <div className="nav-links">{["About", "Aim", "Services", "Why", "Process", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div>
        <a className="nav-cta" href="#contact">Book Consultation</a>
      </nav>

      <main id="home">
        <section className="hero section-dark">
          <Particles />
          <div className="hero-bg" />
          <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-kicker"><Sparkles size={16} /> Global pharmaceutical regulatory consultancy</div>
            <h1><span>Driving E&amp;L Compliance</span><span>With Confidence</span></h1>
            <p className="hero-subtitle">Your Device. Your Drug. Our Expertise.</p>
            <div className="hero-actions">
              <a href="#contact" className="btn primary">Book Consultation <ArrowRight size={18} /></a>
              <a href="#services" className="btn secondary">Explore Services</a>
            </div>
            <div className="standards-strip">{standards.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.div>
          <HeroVisual />
        </section>

        <section id="about" className="section about">
          <motion.div className="science-visual" {...reveal}>
            <div className="molecule-orbit"><Microscope size={70} /></div>
            <div className="visual-card"><strong>Scientific compliance strategy</strong><span>E&L. Toxicology. CRO coordination. Regulatory reporting.</span></div>
          </motion.div>
          <motion.div className="content-card" {...reveal}>
            <p className="eyebrow">Who We Are</p>
            <h2>Specialized regulatory consulting for high-stakes pharma decisions.</h2>
            <p>SG Pharma Solutions is focused on Extractables & Leachables, regulatory compliance, analytical excellence, and end-to-end testing support for global pharma and medical device companies.</p>
            <div className="pill-grid">{["USP <1663> / <1664>", "ISO 10993", "USFDA / EMA / WHO", "CRO collaboration", "Product safety", "Global support"].map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}</div>
          </motion.div>
        </section>

        <section id="aim" className="section section-dark aim">
          <motion.div className="section-heading center" {...reveal}>
            <p className="eyebrow">Our Aim</p>
            <h2>Build reliable compliance pathways from first question to final report.</h2>
          </motion.div>
          <motion.div className="mission-feature" {...reveal}>
            <div className="icon-wrap"><ShieldCheck size={26} /></div>
            <div><h3>Make complex E&amp;L compliance controlled, traceable and submission-ready.</h3><p>We connect regulatory expectations, analytical strategy, CRO execution and technical documentation into one disciplined program.</p></div>
          </motion.div>
          <div className="aim-grid">{aimItems.map((item, index) => <motion.div className="aim-card" key={item} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }}><CheckCircle2 /><span>{item}</span></motion.div>)}</div>
        </section>

        <section id="services" className="section services">
          <motion.div className="section-heading" {...reveal}><p className="eyebrow">Services</p><h2>Enterprise-grade E&amp;L and regulatory support.</h2></motion.div>
          <div className="service-grid">{services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="service-card"
                key={service.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.035 }}
                onClick={() => setActiveService(service)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveService(service);
                  }
                }}
                tabIndex="0"
              >
                <div className="icon-wrap"><Icon size={24} /></div><h3>{service.title}</h3><p>{service.text}</p><ChevronRight className="card-arrow" />
              </motion.article>
            );
          })}</div>
        </section>

        <section id="why" className="section why section-dark">
          <motion.div className="section-heading center" {...reveal}><p className="eyebrow">Why SG Pharma</p><h2>Trusted scientific judgment for regulated products.</h2></motion.div>
          <div className="stats-grid">{stats.map(([value, suffix, label]) => <motion.div className="stat-card" key={label} {...reveal}><CountUp value={value} suffix={suffix} /><span>{label}</span></motion.div>)}</div>
          <div className="trust-grid">{["Expertise across drugs & devices", "Global regulatory understanding", "End-to-end project handling", "Industry-focused consulting", "Scientific excellence", "Fast turnaround support"].map((item) => <div className="trust-item" key={item}><ShieldCheck size={18} />{item}</div>)}</div>
        </section>

        <section id="process" className="section process">
          <motion.div className="section-heading center" {...reveal}><p className="eyebrow">Workflow</p><h2>A precise path from consultation to compliance confidence.</h2></motion.div>
          <div className="timeline">{workflow.map((item, index) => <motion.div className="timeline-step" key={item} {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></motion.div>)}</div>
        </section>

        <section className="section testimonials section-dark">
          <motion.div className="section-heading" {...reveal}><p className="eyebrow">Client Confidence</p><h2>Designed for teams that need clarity, speed and defensible science.</h2></motion.div>
          <div className="testimonial-marquee" aria-label="Client testimonials">
            <div className="testimonial-track">
              {testimonialLoop.map(([name, text], index) => (
                <article className="testimonial" key={`${name}-${index}`} aria-hidden={index >= testimonials.length}>
                  <p>"{text}"</p><strong>{name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact section-dark">
          <motion.div className="contact-card" {...reveal}>
            <p className="eyebrow">Contact</p>
            <h2>Let's Build Regulatory Confidence Together</h2>
            <form onSubmit={handleContactSubmit}><input name="name" aria-label="Name" placeholder="Name" required /><input name="email" type="email" aria-label="Work email" placeholder="Work email" required /><input name="company" aria-label="Company" placeholder="Company" /><textarea name="details" aria-label="Project details" placeholder="Project details" rows="5" required /><button type="submit" className="btn primary">Request Consultation <ArrowRight size={18} /></button></form>
          </motion.div>
          <motion.div className="contact-info" {...reveal}>
            <div className="director-card"><LogoMark compact /><h3>R. Madhusudhan Rao</h3><p>Technical Director</p><a href="mailto:madhu.sgpharmasolutions@gmail.com"><Mail size={18} /> madhu.sgpharmasolutions@gmail.com</a><a href="tel:+919849022383"><Phone size={18} /> +91 9849022383</a><span><MapPin size={18} /> Hyderabad, Telangana - 500049</span></div>
            <div className="map-card"><MapPin size={34} /><strong>Hyderabad, India</strong><span>Global consulting support for pharma and medical device organizations.</span></div>
          </motion.div>
        </section>
      </main>

      {activeService && (
        <motion.div className="service-popup-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveService(null)}>
          <motion.article className="service-popup" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease: "easeOut" }} onClick={(event) => event.stopPropagation()}>
            <button className="popup-close" type="button" onClick={() => setActiveService(null)} aria-label="Close service details">×</button>
            <p className="eyebrow">Service Detail</p>
            <h2>{activeService.title}</h2>
            <p className="popup-intro">{activeService.detail}</p>
            <div className="popup-columns">
              <div>
                <h3>Expanded Capabilities</h3>
                <ul>{activeService.capabilities.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>
              </div>
              <div>
                <h3>{activeService.groupTitle}</h3>
                <ul>{activeService.group.map((item) => <li key={item}><ShieldCheck size={16} />{item}</li>)}</ul>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}

      <footer className="footer">
        <LogoMark />
        <div><strong>Quick Links</strong><a href="#about">About</a><a href="#services">Services</a><a href="#process">Process</a></div>
        <div><strong>Services</strong><a href="#services">E&L Consulting</a><a href="#services">Protocol Design</a><a href="#services">Risk Assessment</a></div>
        <div><strong>Contact</strong><a href="mailto:madhu.sgpharmasolutions@gmail.com">madhu.sgpharmasolutions@gmail.com</a><a href="tel:+919849022383">+91 9849022383</a></div>
        <p>@2026 SG Pharma Solutions. All rights reserved.</p>
      </footer>
    </>
  );
}
