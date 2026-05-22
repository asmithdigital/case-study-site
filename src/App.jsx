import { useState } from "react";
import './App.css';

const T = { navy: "#0c1c38", teal: "#0a6b54", bg: "#f8f7f4", white: "#fff", border: "#e2dfd8", text: "#1a1a1a", muted: "#4a4a4a", light: "#6b6b6b", amber: "#92400e", amberBg: "#fef9ec", infoBg: "#eef7f4", navyBg: "#eef0f4", futureBg: "#f5f3ff", futureBc: "#8b5cf6" };
const R = {
  ux: { l: "UX Design", bg: "#ede9fe", c: "#5b21b6" }, content: { l: "Content", bg: "#fce7f3", c: "#be185d" },
  service: { l: "Service Design", bg: "#d1fae5", c: "#065f46" }, ba: { l: "BA", bg: "#fef3c7", c: "#92400e" },
  dev: { l: "Developers", bg: "#dbeafe", c: "#1e40af" }, pm: { l: "Product", bg: "#fee2e2", c: "#991b1b" },
  stake: { l: "Stakeholders", bg: "#f3f4f6", c: "#374151" }, all: { l: "Everyone", bg: "#e0e7ff", c: "#3730a3" },
};
const SS = [
  { id: "intro", l: "Introduction", r: ["all"] },
  { id: "chrome", l: "Chrome Scanning", r: ["ux", "service", "pm"] },
  { id: "figma", l: "Figma Design", r: ["ux", "content"] },
  { id: "figjam", l: "FigJam & Workshops", r: ["service", "ux", "ba"] },
  { id: "proto", l: "Prototyping & Testing", r: ["ux", "service", "pm"] },
  { id: "code", l: "Pushing to Code", r: ["ux", "dev"] },
  { id: "ds", l: "Design System Docs", r: ["dev", "ux", "pm"] },
  { id: "jm", l: "Journey Management", r: ["service", "pm", "ba", "stake"] },
  { id: "slack", l: "Slack Bot", r: ["all"] },
  { id: "bench", l: "Benchmarking", r: ["ux", "service", "pm"] },
  { id: "tools", l: "TheyDo & ZeroHeight", r: ["service", "ux", "pm", "dev"] },
  { id: "next", l: "What's Next", r: ["all"] },
  { id: "admin", l: "Administering the System", r: ["all"] },
];

const ff = "'DM Sans',system-ui,sans-serif";
const Tags = ({ rs }) => <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>{rs.map(r => <span key={r} style={{ fontFamily: ff, fontSize: 11.5, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: R[r]?.bg, color: R[r]?.c }}>{R[r]?.l}</span>)}</div>;
const Ext = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: "underline", textDecorationColor: "rgba(10,107,84,.3)", textUnderlineOffset: 3 }}>{children}</a>;
const H2 = ({ children }) => <h2 style={{ fontFamily: ff, fontSize: 28, fontWeight: 700, color: T.navy, lineHeight: 1.2, marginBottom: 16, marginTop: 0 }}>{children}</h2>;
const H3 = ({ children }) => <h3 style={{ fontFamily: ff, fontSize: 18, fontWeight: 600, color: T.navy, marginTop: 30, marginBottom: 10 }}>{children}</h3>;
const Label = ({ children }) => <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: T.teal, marginTop: 36, marginBottom: 14, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>{children}</div>;
const P = ({ children, s }) => <p style={{ fontFamily: ff, marginBottom: 16, lineHeight: 1.7, fontSize: 16, color: T.text, ...s }}>{children}</p>;
const Bul = ({ items }) => <ul style={{ margin: "12px 0 18px", paddingLeft: 0, listStyle: "none" }}>{items.map((x, i) => <li key={i} style={{ fontFamily: ff, position: "relative", paddingLeft: 18, marginBottom: 10, lineHeight: 1.65, fontSize: 16, color: T.text }}><span style={{ position: "absolute", left: 0, top: 10, width: 6, height: 6, borderRadius: "50%", background: T.teal, opacity: .45 }} />{x}</li>)}</ul>;
const Box = ({ type, label, children }) => { const s = { amber: { bg: T.amberBg, bc: "#e8c547", lc: T.amber }, info: { bg: T.infoBg, bc: T.teal, lc: T.teal }, navy: { bg: T.navyBg, bc: T.navy, lc: T.navy }, future: { bg: T.futureBg, bc: T.futureBc, lc: "#7c3aed" } }[type] || { bg: T.infoBg, bc: T.teal, lc: T.teal }; return <div style={{ background: s.bg, borderLeft: `3px solid ${s.bc}`, borderRadius: "0 8px 8px 0", padding: "16px 20px", margin: "20px 0", fontSize: 15, lineHeight: 1.6, fontFamily: ff }}><div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: s.lc, marginBottom: 5 }}>{label}</div>{children}</div>; };
const Prompt = ({ text }) => <div style={{ background: "#1a1f2e", color: "#e0e4ec", padding: "16px 20px", borderRadius: 8, fontSize: 14, lineHeight: 1.6, fontFamily: "monospace", margin: "16px 0 20px", whiteSpace: "pre-wrap", overflowX: "auto", maxWidth: "100%" }}>{text}</div>;
const Step = ({ n, title, desc }) => <div style={{ display: "flex", gap: 14, marginBottom: 20 }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: T.teal, color: "#fff", fontFamily: ff, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{n}</div><div><div style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, color: T.navy, marginBottom: 3 }}>{title}</div><P s={{ fontSize: 15, color: T.muted, marginBottom: 0 }}>{desc}</P></div></div>;
const Nav = ({ prev, next, go }) => <div className="nav-arrows" style={{ display: "flex", justifyContent: prev && next ? "space-between" : next ? "flex-end" : "flex-start", marginTop: 40, paddingTop: 22, borderTop: `1px solid ${T.border}` }}>{prev && <button onClick={() => go(prev.id)} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, color: T.teal, background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>← {prev.l}</button>}{next && <button onClick={() => go(next.id)} style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, color: T.teal, background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>{next.l} →</button>}</div>;

const CaseLink = ({ title, desc, url }) => <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: T.white, border: `2px solid ${T.teal}22`, borderRadius: 12, padding: "20px 24px", marginBottom: 12, textDecoration: "none", transition: "border-color .15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.teal} onMouseLeave={e => e.currentTarget.style.borderColor = `${T.teal}22`}>
  <div style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, color: T.teal, marginBottom: 4 }}>{title} ↗</div>
  <div style={{ fontFamily: ff, fontSize: 14, color: T.muted, lineHeight: 1.5 }}>{desc}</div>
</a>;

/* ── VIEWS ── */

function Intro({ go }) { return <div><Tags rs={["all"]} /><h1 style={{ fontFamily: ff, fontSize: 34, fontWeight: 700, color: T.navy, lineHeight: 1.15, marginBottom: 14, maxWidth: 700 }}>Testing Claude as an AI orchestration layer for the EXD design workflow</h1><P s={{ fontSize: 18, color: T.muted, maxWidth: 640, marginBottom: 24 }}>Connecting Figma, FigJam, GitHub, Slack, and Chrome into a single AI-assisted process — using free tools and no organisation data.</P><P>I tested whether Claude Pro can act as the central orchestration layer between our design, research, and development tools. The test used free personal accounts to prove the workflow before enterprise evaluation. Claude Pro includes MCP connectors that read and write directly to Figma, FigJam, and Miro. The technology on Enterprise is identical — the governance layer (connector approvals, audit logging, data retention) is what changes.</P><Box type="navy" label="Important — how this was built">Everything in this case study was created by Claude. I did not directly edit anything in Figma, FigJam, GitHub, or any other tool. My only direct actions were setting up the connectors, creating the Slack workspace, and writing prompts. Every design system component, every product screen, every journey map, every prototype, every line of code, and every test plan was generated by Claude from conversation. On the enterprise plan with paid Figma seats, the MCP call limits increase from 6/month to 200/day — meaning everything demonstrated here could be built with far more detail and iteration.</Box><H3>Why Taskly</H3><P>The free version of Figma allows only 6 MCP connector calls per month. I used all 6 in the first session scanning the live RAA site and creating initial outputs. Rather than wait a month for the limit to reset, I created a fresh Figma account and built a deliberately simple case study product — a task manager app called "Taskly" — to demonstrate the full workflow within the free limits. On the enterprise Figma plan, this constraint disappears entirely.</P><P>The setup took a few days of working through limitations and tool connections. But a designer following the guides could set everything up in an afternoon and be working the next day.</P><H3>Who's involved</H3><P>This system connects the work of UX Designers, Content Designers, Service Designers, and BAs within EXD, with Developers, Product Managers, and Stakeholders consuming the outputs through Slack, GitHub, and the published applications.</P><P s={{ fontFamily: ff, fontSize: 13, color: T.light, letterSpacing: ".04em", textTransform: "uppercase", marginTop: 24 }}>EXD · May 2026</P><Nav next={SS[1]} go={go} /></div>; }

function ChromeV({ go }) { return <div><Tags rs={["ux", "service", "pm"]} /><H2>Chrome — scanning live products</H2>
  <P>Claude sees, navigates, and interacts with live websites through Chrome. Available as a Chrome extension (side panel) and through the Chrome connector in the Claude Desktop app. It documents what it finds — screens, form fields, styling, friction points — and that data feeds directly into several other parts of the system.</P>
  <H3>How it fits the workflow</H3>
  <P><strong>Service Designers</strong> and Researchers use Chrome to understand the current live experience end to end, mapping what actually exists in production against the journey maps. They also use it after delivery to verify the product matches what was designed and to catch changes that happened without design involvement. <strong>UX Designers</strong> use it to inform prototypes — scanning the real product so Claude can generate an exact replica with new features. <strong>Product Managers</strong> use it for competitor analysis. <strong>Content Designers</strong> use it to audit live copy against approved content.</P>
  <H3>What Chrome data feeds into</H3>
  <P>Chrome isn't a standalone tool — it's the data-gathering step that powers other outputs across the system:</P>
  <Bul items={[
    "Journey maps in FigJam — Chrome observations ensure maps reflect what's actually in production, not what was designed months ago (see FigJam & Workshops)",
    "Journey management app — Chrome data is processed into structured JSON and pushed to the application, keeping pain points and stages current (see Journey Management)",
    "Prototypes — Chrome scans the existing product so Claude can generate an exact interactive replica with new features added for testing (see Prototyping & Testing)",
    "User test plans — friction points identified through Chrome directly inform test objectives and task scenarios (see Prototyping & Testing)",
    "Design decisions — Chrome observations alongside research data give designers the full picture before starting work in Figma (see Figma Design)",
    "Competitor analysis — scan multiple competitor products to compare flows, patterns, and layouts"
  ]} />

  <Label>Case Study</Label>
  <P>I prompted Claude to scan the live RAA home insurance quote flow. Claude navigated the entire process autonomously — clicking through screens, filling in forms with test data, documenting each step. It found friction points: mismatched address confirmations, a calculator breaking the flow by opening a new tab, no progress indicator, 10+ clicks before seeing a price. I did not interact with the RAA site directly — Claude did all the navigation and documentation.</P>
  <P>From this single Chrome scanning session, the data was used across multiple outputs: Claude generated a journey map in FigJam directly from the observations. Later, the same context informed a 10-screen interactive prototype with a new progress bar feature, plus A/B test variants and a full usability test plan. The journey data was also processed into JSON and pushed to the journey management application. All generated by Claude from prompts.</P>
  <Box type="info" label="Tip">The Chrome and Figma connectors can both be active in the same Desktop app conversation — scan a product, push a journey map to FigJam, and generate a prototype without switching tools or losing context.</Box>

  <Label>How to Use It</Label>
  <P>Open the Claude Desktop app with Chrome connector enabled. Navigate to your product.</P>
  <P>For scanning and documenting a product flow:</P>
  <Prompt text={`Look at the page I have open in Chrome. Walk through the\nentire quote flow from start to finish. At each step,\ndocument: what the user sees, the layout, form fields,\nstyling, and any friction points.`} />
  <P>For keeping journey maps current after a delivery cycle:</P>
  <Prompt text={`Walk through the live [product name] flow in Chrome.\nCompare what you see against this FigJam journey map:\n[FigJam URL]\n\nIdentify any screens or steps that have changed since\nthe journey map was last updated.`} />
  <P>For competitor analysis:</P>
  <Prompt text={`Open these three competitor sites in separate tabs:\n[URL 1], [URL 2], [URL 3]\n\nCompare their pricing pages — layout, plan structure,\nhow they present features. Summarise the differences.`} />

  <Label>Setup</Label>
  <P><strong>Chrome extension:</strong> Go to the Chrome Web Store → search "Claude" by Anthropic → Add to Chrome → pin the extension → sign in with your Anthropic account.</P>
  <P><strong>Desktop app connector:</strong> Open Claude Desktop → click your initials (bottom left) → Settings → Connectors → find "Claude in Chrome" → toggle ON.</P>
  <P>Claude in Chrome is a beta feature available on all paid plans (Pro, Max, Team, Enterprise). It works with Chrome and Edge.</P>
  <Nav prev={SS[0]} next={SS[2]} go={go} /></div>; }

function FigmaV({ go }) { return <div><Tags rs={["ux", "content"]} /><H2>Figma — design system and product screens</H2>
  <P>Claude Pro connects to Figma through an MCP connector. It reads existing files (components, tokens, layers, properties) and creates new content directly as editable Figma layers. This is a two-way connection — Claude reads from and writes to your actual Figma files.</P>
  <H3>How it fits the workflow</H3>
  <P><strong>UX Designers</strong> create and iterate on components and product screens through conversation — "make the button wider," "add a disabled state." <strong>Content Designers</strong> review copy directly in the Figma file and can ask Claude to generate content variants. In the real world, the design system file is the equivalent of RAADS. The product file is the equivalent of a delivery file like Quote to Buy or My Account — separate files with screens and specs ready for development.</P>
  <P>Approved designs are pushed to code via Claude Code (see Pushing to Code). The design system data is published to a browsable documentation site (see Design System Docs). Chrome scanning (see Chrome Scanning) can inform design decisions by showing the current state of the live product before work begins.</P>

  <Label>Case Study</Label>
  <P>I prompted Claude to create a design system for a task manager app called Taskly — 9 colour tokens, Inter typography, 4 components (Button, Text Input, Card, Bottom Nav Bar). Claude created every component directly in Figma as editable layers. I then prompted it to create a Create Account screen — 375×812 mobile layout using the design system tokens. I did not open Figma to edit anything manually — every layer, every colour value, every spacing decision was made by Claude.</P>
  <Box type="amber" label="Constraint">Figma's free plan allows 6 MCP connector calls per month. I used all 6 in the first session scanning the RAA site. I created a fresh account for Taskly. On the enterprise Figma plan, the limit is 200 calls per day.</Box>
  <CaseLink title="Figma — Design System" desc="9 colour tokens, Inter typography scale, 4 core components (Button, Text Input, Card, Bottom Nav Bar) created directly by Claude." url="https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/Demo-Design-System?t=9u0hIbSzOFWKALuM-1" />
  <CaseLink title="Figma — Product Screen" desc="Taskly Create Account screen. 375×812 mobile layout built using design system tokens." url="https://www.figma.com/design/cXocOMh9TE9ILgfaayfihI/Demo-Product?node-id=0-1&t=JwmdjHwdUW8nL0Ge-1" />

  <Label>How to Use It</Label>
  <P>Open claude.ai or the Desktop app. Make sure the Figma connector is enabled for the conversation. Example prompts:</P>
  <Prompt text={`Look at our design system in this Figma file: [URL]\nCreate a new Card component with a title, description,\nand action button. Use our existing colour tokens.`} />
  <Prompt text={`Look at the product screen in this Figma file: [URL]\nAdd a progress indicator to the top of the form.\nUse our existing design system spacing and colours.`} />
  <Box type="future" label="Jira integration (enterprise)">With the Jira MCP connector, user stories and acceptance criteria could feed directly into the design brief. Claude could read the sprint backlog and surface requirements before the designer starts work.</Box>

  <Label>Setup</Label>
  <P>Go to claude.ai → click the <strong>+</strong> icon in the chat input → select <strong>Add connectors</strong> → find <strong>Figma</strong> → click <strong>Connect</strong>. A Figma login window opens — sign in and click Allow. A free Figma account works. You need to enable the connector for each new conversation.</P>
  <Nav prev={SS[1]} next={SS[3]} go={go} /></div>; }

function FigJamV({ go }) { return <div><Tags rs={["service", "ux", "ba"]} /><H2>FigJam — journey mapping and workshops</H2>
  <P>Claude creates journey maps, flow diagrams, and workshop content directly in FigJam boards. It uses the same Figma connector — no separate setup. One connector, two capabilities (Figma Design files and FigJam boards).</P>
  <H3>How it fits the workflow</H3>
  <P><strong>Service Designers</strong> and Researchers own the journey mapping process, working with UX Designers and BAs. They create and maintain journey maps from research data — paste interview transcripts, survey results, or analytics and Claude structures them into a visual map with stages, emotions, pain points, and opportunities. They also use FigJam to prepare workshops — pre-populating boards with findings as a starting point for team ideation. <strong>BAs</strong> review the journey maps to compare pain points against the Jira backlog and identify gaps. <strong>UX Designers</strong> use the journey data to inform design decisions and prototype features that address the highest-severity issues.</P>
  <P>FigJam is the working surface — where the team ideates and collaborates. Once journey data is finalised, it's published to the journey management application (see Journey Management) as the structured, searchable record. Chrome scanning data (see Chrome Scanning) feeds in to keep maps aligned with what's actually live in production. The pain points and opportunities documented here directly inform what gets prototyped and tested (see Prototyping & Testing).</P>

  <Label>Case Study</Label>
  <P>I prompted Claude to generate a three-phase journey map for Taskly (Sign Up → First Task → Daily Use) with colour-coded stickies for actions, thoughts, emotions, pain points, and opportunities. Claude created everything directly on the FigJam board — I did not place or edit any stickies manually. The journey data was also used to populate the journey management application — the same pain points and opportunities appear in both the FigJam workshop board and the structured application, all generated by Claude.</P>
  <CaseLink title="FigJam — Journey Map" desc="Three-phase Taskly journey map with colour-coded stickies for actions, thoughts, emotions, pain points, and opportunities." url="https://www.figma.com/board/rXUgEP8wuPEumdSNWEZKI5/Demo-Journey-Maps?node-id=0-1&t=Ap4RlMCoiBpf2UuL-1" />
  <Box type="info" label="About Miro">Enterprise has a paid Miro account. Claude's Miro connector works the same way — read and write to boards. Miro adds richer workshop features (voting, timers, templates). Miro's API requires a paid plan, so FigJam handles this in the demo. Same job, same connector.</Box>

  <Label>How to Use It</Label>
  <P>FigJam works through the Figma connector — no extra setup. Example prompts:</P>
  <Prompt text={`Here are notes from 6 user interviews about the\nsign-up flow: [paste notes]\n\nTurn this into a journey map on this FigJam board:\n[paste FigJam URL]`} />
  <Prompt text={`Create a user flow diagram in FigJam showing:\nlanding page → product selection → cart → payment\n→ confirmation. Include decision points where\nusers might drop off.`} />
  <Box type="future" label="Jira integration (enterprise)">Jira ticket data (what's been built, what's in the backlog) could feed into journey maps to show which pain points have been addressed and which are outstanding. BAs could identify gaps — research says X is a problem but there's no ticket for it.</Box>

  <Label>Setup</Label>
  <P>No separate setup needed. FigJam uses the same Figma connector. Once Figma is connected (see the Figma section), FigJam boards are accessible automatically.</P>
  <Nav prev={SS[2]} next={SS[4]} go={go} /></div>; }

function ProtoV({ go }) { return <div><Tags rs={["ux", "service", "pm"]} /><H2>Prototyping & user testing</H2>
  <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #14325e 100%)`, borderRadius: 14, padding: "36px 32px", margin: "4px 0 26px", color: "#fff" }}><div style={{ display: "inline-block", fontFamily: ff, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#5ce0b8", background: "rgba(92,224,184,.12)", border: "1px solid rgba(92,224,184,.25)", padding: "3px 12px", borderRadius: 100, marginBottom: 14 }}>Key capability</div><h3 style={{ color: "#fff", fontFamily: ff, fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 0 }}>Scan → prototype → add features → A/B test → publish for user testing</h3><p style={{ color: "rgba(255,255,255,.88)", fontFamily: ff, fontSize: 16, lineHeight: 1.6, marginBottom: 0 }}>Claude scans a product through Chrome and generates an exact interactive replica. Add a new feature. Generate a control variant. Publish both as shareable links.</p></div>
  <H3>How it fits the workflow</H3>
  <P><strong>UX Designers</strong> generate prototypes after scanning the live product through Chrome (see Chrome Scanning) and designing new features in Figma (see Figma Design). The prototype shows the full existing product with the new feature integrated — so testers experience it in context. <strong>Service Designers</strong> and Researchers define what needs to be prototyped based on journey research, collaborate with UX on test plan design, participate in user testing alongside UX Designers, and lead the analysis of results to feed back into journey maps. <strong>Product Managers</strong> review prototypes and approve for testing. Researchers run the tests in Askable or UserTesting.com. Results feed back through Claude into updated journey data in both FigJam (see FigJam & Workshops) and the journey management application (see Journey Management). Everything the Slack bot knows about (see Slack Bot) is also updated.</P>
  <P s={{ fontSize: 15, color: T.muted }}>For <strong>delivery</strong> (quick validation): generate an unmoderated test plan with self-guided tasks — suitable for UserTesting.com quick tests. For <strong>discovery</strong> (deeper research): generate a moderated plan with think-aloud protocol and moderator scripts — suitable for Askable or moderated sessions.</P>

  <Label>Case Study</Label>
  <P>Claude scanned the live RAA quote flow and generated a 10-screen interactive prototype — all form fields working (checkboxes, radio cards, dropdowns, text inputs, accordions). I prompted it to add a new feature: a progress bar showing "Step X of 5" and estimated time remaining. Claude built the entire prototype, the new feature, the control variant (without the progress bar), and the full A/B test plan — all from prompts. I did not write any code or manually design any screen.</P>
  <CaseLink title="Prototype A — with progress bar" desc="10-screen interactive RAA quote flow. All form fields working. New progress bar feature showing step count and estimated time remaining." url="https://claude.ai/public/artifacts/73271cac-fcb6-4712-a4fa-428d3a9d4cf6" />
  <CaseLink title="Prototype B — control (no progress bar)" desc="Identical to Variant A but with the progress bar removed. Clean isolation of a single variable for A/B comparison." url="https://claude.ai/public/artifacts/397bccba-adb2-44fe-beb6-6c2789cb1429" />
  <CaseLink title="A/B Test Plan" desc="Full between-subjects test plan: objective, variants, assignment rules, 6 task scenarios, screening, post-test questionnaire, success metrics, and Ship/Iterate/Kill framework." url="https://claude.ai/public/artifacts/a1455420-e9b1-4a2a-b00c-6580ec87c99a" />

  <Label>How to Use It</Label>
  <Step n={1} title="Scan the product" desc="Open Claude Desktop with Chrome connector. Navigate to your product. Ask Claude to walk through and document the flow." />
  <Step n={2} title="Generate the prototype" desc='Ask: "Generate a fully interactive prototype matching the styling exactly. Make every field interactive. Pre-fill with dummy data."' />
  <Step n={3} title="Add the new feature" desc="Describe the feature in detail — where it appears, what it shows, how it behaves, how it fits the existing styling." />
  <Step n={4} title="Generate a control variant" desc='"Save a second version with the new feature removed. Keep everything else identical." This gives you clean A/B test variants.' />
  <Step n={5} title="Generate a test plan" desc='"Generate an A/B test plan for these two variants. Include tasks, screening questions, success metrics, and a decision framework."' />
  <Step n={6} title="Publish for user testing" desc="Upload the HTML files to claude.ai in the browser. Ask it to generate each as an artifact. Click Publish → public URL anyone can access without a Claude account." />
  <Box type="info" label="Current testing workflow">Test plans are generated by Claude and manually set up in Askable or UserTesting.com. After testing, export the results (transcripts, clips, metrics), paste them back into Claude for analysis, and Claude processes the findings into updated journey data.</Box>
  <Box type="future" label="Future — automated testing loop">If Askable or UserTesting.com build MCP connectors, Claude could push test plans directly to the platform and pull results back automatically. The entire prototype → test → analyse → update loop would be connected end to end. Neither platform has an MCP connector yet, but both have APIs.</Box>

  <Label>Setup</Label>
  <P>Prototyping needs both the <strong>Chrome connector</strong> and the <strong>Figma connector</strong> enabled in the Desktop app. For publishing, you also need access to <strong>claude.ai</strong> in the browser (Pro, Max, or Enterprise) to generate and publish artifacts as shareable links.</P>
  <Nav prev={SS[3]} next={SS[5]} go={go} /></div>; }

function CodeV({ go }) { return <div><Tags rs={["ux", "dev"]} /><H2>Pushing to code</H2>
  <P>Claude Code runs in the terminal. It reads Figma files via the REST API (separate from the MCP connector — no monthly call limits), generates production React code, and pushes to GitHub as a pull request.</P>
  <H3>How it fits the workflow</H3>
  <P><strong>UX Designers</strong> or <strong>Developers</strong> run Claude Code after a design is approved in Figma (see Figma Design). Claude reads the actual layers, colours, and spacing values, generates matching code, and creates a PR on GitHub. A Developer reviews the code and merges it. Nothing reaches the main codebase without human approval. Claude Code is also used to publish design system data (see Design System Docs) and journey data (see Journey Management) to their respective applications.</P>

  <Label>Case Study</Label>
  <P>I prompted Claude Code to read the Figma product screen. Claude read the file, generated a complete React application, and deployed it to GitHub Pages — matching the Figma design exactly. I did not write any React code or configure the deployment — Claude handled the code generation, the Git commands, and the GitHub Pages setup from prompts.</P>
  <CaseLink title="Live — Taskly Product Demo" desc="React application generated from the Figma product screen by Claude Code. Deployed to GitHub Pages." url="https://asmithdigital.github.io/ux-workflow-outputs/" />
  <CaseLink title="GitHub Repo — Product Code" desc="View the actual code Claude generated. React components, styling, and GitHub Actions deployment workflow." url="https://github.com/asmithdigital/ux-workflow-outputs" />
  <Box type="future" label="Jira integration (enterprise)">PRs created by Claude Code could automatically reference the Jira ticket. Claude could update ticket status when code is pushed or merged.</Box>

  <Label>How to Use It</Label>
  <Prompt text={`cd ~/Documents/Code/ux-workflow-outputs\nclaude\n\nRead the product screen in this Figma file: [URL]\nUse the FIGMA_TOKEN from .env. Generate a React\ncomponent matching the design. Create a branch,\ncommit, push, and open a pull request.`} />
  <Box type="navy" label="Who runs this">This is the only part of the system requiring the terminal. A UX Designer or Developer runs Claude Code. Everyone else uses Claude Chat, Chrome, or Slack.</Box>

  <Label>Setup</Label>
  <P><strong>Install Claude Code:</strong> Open Terminal → run <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>npm install -g @anthropic-ai/claude-code</code> → verify with <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>claude --version</code></P>
  <P><strong>Install GitHub CLI:</strong> Mac: <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>brew install gh</code> → authenticate: <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>gh auth login</code> → select GitHub.com → HTTPS → browser.</P>
  <P><strong>Clone repos locally:</strong> Clone each GitHub repo to your machine. Add a <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>.env</code> file with your <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>FIGMA_TOKEN</code> in each repo folder. The .env is protected by .gitignore and never uploaded to GitHub.</P>
  <Nav prev={SS[4]} next={SS[6]} go={go} /></div>; }

function DSV({ go }) { return <div><Tags rs={["dev", "ux", "pm"]} /><H2>Design system documentation</H2>
  <P>A browsable website generated from the Figma design system file. Component pages with visual previews, variants, properties, usage guidelines, and code snippets. Token reference for colours, typography, and spacing. Search.</P>
  <H3>How it fits the workflow</H3>
  <P><strong>Developers</strong> reference the site for component specs, token values, and code snippets — without opening Figma. <strong>UX Designers</strong> publish updates whenever the design system changes. <strong>Product Managers</strong> check what components exist before requesting new features. In the real world, this is the RAADS documentation.</P>

  <Label>Case Study</Label>
  <P>Claude Code read the Figma design system, extracted all components and tokens into structured JSON, and built the entire documentation site — component pages, visual previews pulled from Figma, token reference, search. I prompted it with the Figma URL and it generated everything, including the site structure, the JSON data files, and the GitHub Pages deployment.</P>
  <CaseLink title="Live — Design System Documentation" desc="Browsable site with component pages, visual previews from Figma, token reference, and search." url="https://asmithdigital.github.io/design-system-site/" />
  <CaseLink title="GitHub Repo — Design System" desc="View the JSON data files, component images, and site code generated by Claude Code." url="https://github.com/asmithdigital/design-system-site" />

  <Label>How to Use It</Label>
  <P>When the design system is updated in Figma, re-read the file and regenerate the JSON:</P>
  <Prompt text={`cd ~/Documents/Code/design-system-site\nclaude\n\nRead the Figma design system file: [URL]\nUse the FIGMA_TOKEN from .env. Regenerate\ndata/components.json, data/tokens.json, and\ndata/foundations.json. Commit and push to main.`} />
  <P style={{ fontSize: 14, color: T.muted }}>Or, if the auto-sync is enabled, designers just publish in Figma and the system picks up changes overnight. No prompt needed.</P>
  <P>The site rebuilds automatically after the push. The designer decides when to publish updates.</P>

  <Label>Automated sync from Figma</Label>
  <P>A GitHub Action is ready to run that automatically checks the Figma design system file for changes once a day. When a designer publishes component updates in Figma, the system detects new or changed components, updates the JSON data with changelog entries, commits, and rebuilds the site. No manual step needed from the designer or the developer.</P>
  <P>The script uses the Figma REST API (not the MCP connector), so there are no monthly call limits. It makes one API call per day and runs entirely on GitHub's servers.</P>
  <Box type="amber" label="Demo status">The auto-sync script is committed to the repo but the daily schedule is disabled. The demo design system has sample data that doesn't match the Figma file. When the real design system is in place with all components published in Figma, enable the schedule in the GitHub Action and add the Figma token as a repo secret. See <code style={{ fontFamily: 'monospace', fontSize: 13, background: '#f0ede6', padding: '2px 6px', borderRadius: 4 }}>scripts/FIGMA-SYNC-README.md</code> in the repo for full setup instructions.</Box>
  <Box type="future" label="ZeroHeight">When ZeroHeight is approved, it handles Figma sync natively with its built-in integration. The auto-sync script would be replaced by ZeroHeight's own sync pipeline. The JSON data files could still be generated by Claude Code and pushed to ZeroHeight's connected GitHub repo for markdown content.</Box>

  <Label>Setup</Label>
  <P>The repo needs to exist on GitHub with a GitHub Actions workflow for Pages deployment. Claude Code sets this up on the first push. The data folder contains JSON files that power the site — Claude Code generates them from Figma.</P>
  <Box type="future" label="ZeroHeight">ZeroHeight is a dedicated design system documentation platform being considered for the next financial year. It offers live Figma sync, Storybook integration, and automated token pipelines. Importantly, ZeroHeight connects to a GitHub repo for markdown content — meaning Claude Code could push generated documentation directly and ZeroHeight would publish it automatically. See <button onClick={() => go("tools")} style={{ background: "none", border: "none", color: "#7c3aed", fontFamily: ff, fontSize: 15, fontWeight: 500, cursor: "pointer", padding: 0, textDecoration: "underline" }}>TheyDo & ZeroHeight</button> for more detail.</Box>
  <Nav prev={SS[5]} next={SS[7]} go={go} /></div>; }

function JMV({ go }) { return <div><Tags rs={["service", "pm", "ba", "stake"]} /><H2>Journey management application</H2>
  <P>A structured application for journey data — modelled on TheyDo's interface. Horizontal phase columns, swim lanes for opportunities and insights, an emotion curve, and a scatter-plot opportunity matrix. All powered by JSON data files.</P>
  <H3>How it fits the workflow</H3>
  <P><strong>Service Designers</strong> publish research findings here after each research cycle — the FigJam board is the workshop whiteboard, this is the published library. <strong>BAs</strong> cross-reference journey pain points against the Jira backlog to identify gaps. <strong>Product Managers</strong> use the application to prioritise opportunities by severity and impact. <strong>Stakeholders</strong> browse journeys and insights without needing Figma access or design knowledge.</P>

  <Label>Case Study</Label>
  <P>I prompted Claude Pro to study TheyDo's live interface through Chrome, then write a detailed specification. Claude Code built the entire application from that specification — the sidebar, the phase columns, the swim lanes, the scatter-plot matrix, and the data structure. I also prompted Claude to generate all the Taskly journey data. I did not write any code or manually create any data files.</P>
  <CaseLink title="Live — Journey Management App" desc="TheyDo-style interface with horizontal phases, swim lanes, emotion curve, and opportunity matrix. Powered by JSON." url="https://asmithdigital.github.io/journey-management-site/" />
  <CaseLink title="GitHub Repo — Journey Management" desc="View the journey JSON data, application code, and deployment workflow generated by Claude Code." url="https://github.com/asmithdigital/journey-management-site" />

  <Label>How to Use It</Label>
  <P>After each research cycle, process findings into journey JSON from multiple sources — Chrome observations, interview transcripts, FigJam ideation outputs, analytics:</P>
  <Prompt text={`cd ~/Documents/Code/journey-management-site\nclaude\n\nHere are findings from 8 user interviews about\nthe claims process: [paste research]\n\nProcess into journey JSON — stages, pain points,\nopportunities, scored insights. Push to main.`} />
  <Label>Preparing research for the platform</Label>
  <P>During the design process, designers and researchers work in Claude Pro — uploading research, doing ideation, iterating on designs, pasting insights from user testing. All of that work generates valuable data for the journey management platform, but it sits in the Claude Pro conversation unless someone explicitly packages it.</P>
  <P>At the end of any session where research insights, test findings, or design decisions were discussed, run this prompt in Claude Pro:</P>
  <Prompt text={`Review this entire conversation. Identify every insight,\npain point, opportunity, user quote, severity assessment,\nand design decision we discussed.\n\nFor each one, note which journey it relates to and which\nstage. Format the output as a structured update package\nthat a developer can paste into Claude Code to update the\njourney management platform.\n\nInclude:\n- Journey name and stage\n- Whether each item is new or an update to existing data\n- Severity and evidence count where applicable\n- Any quotes with participant IDs\n\nAt the top: one-line summary of what this update contains.\nAt the bottom: the exact Claude Code prompt to use,\nincluding the repo path and commit message.`} />
  <P>The designer copies the output and hands it to whoever manages the repos. That person pastes it into Claude Code, which updates the correct journey JSON files, appends changelog entries, commits, and pushes. The site rebuilds automatically.</P>
  <Box type="info" label="Why a manual step?">The design system can sync automatically because Figma has a structured API — components are well-defined objects with names and properties. Research data is unstructured — transcripts, notes, Miro boards, observations. Someone needs to decide what's relevant before it enters the platform. This prompt minimises that step to a single copy-paste, but the human checkpoint stays.</Box>
  <Box type="future" label="UserTesting MCP">UserTesting is running a beta on an MCP connector that could push structured test results (insights, severity scores, quotes) directly into the workflow. If the MCP delivers structured data, it would replace the manual paste step for usability testing results. We're evaluating this with the UserTesting team. See the Slack bot section for how test data flows through the system once it's in the platform.</Box>
  <Box type="future" label="TheyDo">When TheyDo is approved, researchers would log insights directly into the platform through its native interface. The end-of-session prompt would be replaced by TheyDo's own data entry. Claude could still help process raw research into structured insights, but the output would go into TheyDo rather than JSON files.</Box>
  <Box type="future" label="Jira integration (enterprise)">Journey pain points could be cross-referenced against Jira tickets automatically. BAs could see which problems have been addressed and which need new tickets.</Box>

  <Label>Setup</Label>
  <P>Same as the design system — a GitHub repo with Actions workflow for Pages, and a data folder with JSON files. Claude Code generates the journey JSON from research data and pushes it. The site rebuilds automatically.</P>
  <Box type="future" label="TheyDo">TheyDo is a dedicated journey management platform being considered for the next financial year. It offers enterprise-grade journey mapping, opportunity prioritisation, and stakeholder reporting. TheyDo supports CSV and daily S3 data exports, which Claude could process and feed back into the workflow. See <button onClick={() => go("tools")} style={{ background: "none", border: "none", color: "#7c3aed", fontFamily: ff, fontSize: 15, fontWeight: 500, cursor: "pointer", padding: 0, textDecoration: "underline" }}>TheyDo & ZeroHeight</button> for more detail.</Box>
  <Nav prev={SS[6]} next={SS[8]} go={go} /></div>; }

function SlackV({ go }) {
  const QCard = ({ role, roleBg, roleColor, queries }) => <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "22px 24px", marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><span style={{ fontFamily: ff, fontSize: 11.5, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: roleBg, color: roleColor }}>{role}</span></div>
    {queries.map((q, i) => <div key={i} style={{ marginBottom: 14 }}>
      <div style={{ background: T.navy, borderRadius: 8, padding: "10px 14px", marginBottom: 6 }}><span style={{ fontFamily: ff, fontSize: 13.5, color: "#5ce0b8", fontWeight: 500 }}>@UX Assistant</span><span style={{ fontFamily: ff, fontSize: 13.5, color: "rgba(255,255,255,.85)", marginLeft: 8 }}>{q.ask}</span></div>
      <div style={{ fontFamily: ff, fontSize: 13.5, color: T.muted, paddingLeft: 14, borderLeft: `2px solid ${T.border}` }}>{q.returns}</div>
    </div>)}
  </div>;

  return <div><Tags rs={["all"]} /><H2>Slack bot — making it all queryable</H2>
  <P>The Slack bot is the most widely useful part of this system. While the design and research tools are used by EXD, the bot is for everyone — Product Managers, Engineers, Stakeholders, and anyone else who needs answers from design and research data without opening Figma, navigating a repo, or waiting for a designer. It runs 24/7 whether or not anyone in EXD is online.</P>

  <H3>How it works</H3>
  <P>Tag <strong>@UX Assistant</strong> in <strong>#ux-requests</strong>. Within 2 seconds: acknowledgement. Within 30 seconds: a synthesised answer in the thread, pulled from Figma, FigJam, the design system JSON, and the journey management data.</P>

  <H3>Text queries — by role</H3>
  <QCard role="Product Managers" roleBg="#fee2e2" roleColor="#991b1b" queries={[
    { ask: "What pain points have we documented in the sign-up journey?", returns: "Returns pain points from journey JSON with severity scores, sources, and related stages" },
    { ask: "Do we have a component for a progress stepper?", returns: "Searches design system JSON and Figma, returns matching components with variants and usage guidelines" },
    { ask: "What opportunities have been prioritised for the next sprint?", returns: "Returns opportunities scored by impact and effort from journey data" },
  ]} />
  <QCard role="Engineers" roleBg="#dbeafe" roleColor="#1e40af" queries={[
    { ask: "What are the colour tokens for form inputs?", returns: "Returns exact hex values, token names, and usage context from design system JSON" },
    { ask: "What props does the Button component have?", returns: "Returns component spec — variants, props, sizing, and spacing values" },
    { ask: "What font stack are we using for headings?", returns: "Returns typography tokens with sizes, weights, and line heights" },
  ]} />
  <QCard role="Stakeholders" roleBg="#f3f4f6" roleColor="#374151" queries={[
    { ask: "What do we know about why users drop off before seeing a price?", returns: "Aggregates insights from journey data, Chrome findings, and research notes into a summary" },
    { ask: "How many pain points have been identified across all journeys?", returns: "Returns a count with breakdown by journey and severity" },
  ]} />
  <QCard role="EXD Designers" roleBg="#ede9fe" roleColor="#5b21b6" queries={[
    { ask: "Has anyone already mapped the claims journey?", returns: "Searches FigJam boards and journey JSON, returns what exists and where to find it" },
    { ask: "What components exist for a comparison view?", returns: "Searches design system for relevant components with names, descriptions, and variants" },
  ]} />

  <H3>Visual queries</H3>
  <P>The bot returns images alongside text answers. When you ask about a component or screen, it calls the Figma REST API to generate a PNG of the actual design and posts it in the Slack thread.</P>
  <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0 24px" }}>
    {[
      { ask: "Show me the Button component", returns: "PNG from Figma + variant list + usage guidelines" },
      { ask: "What does the Create Account screen look like?", returns: "PNG of the product screen from Figma" },
      { ask: "Show me the sign-up journey map", returns: "PNG of the FigJam board section" },
      { ask: "What does the emotion curve look like?", returns: "Chart generated from journey JSON" },
    ].map((q, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
      <div style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 6 }}>"{q.ask}"</div>
      <div style={{ fontFamily: ff, fontSize: 13, color: T.muted }}>→ {q.returns}</div>
    </div>)}
  </div>

  <H3>Prompt generator</H3>
  <P>When someone asks a question that requires creative work, the bot assembles all relevant context and packages it as a ready-to-paste prompt for the Claude Desktop app.</P>
  <div style={{ background: T.white, border: `2px solid ${T.teal}22`, borderRadius: 14, padding: "28px", margin: "20px 0 24px" }}>
    <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.teal, marginBottom: 12 }}>Example</div>
    <div style={{ background: T.navy, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}><span style={{ fontFamily: ff, fontSize: 14, color: "#5ce0b8", fontWeight: 500 }}>@UX Assistant</span><span style={{ fontFamily: ff, fontSize: 14, color: "rgba(255,255,255,.85)", marginLeft: 8 }}>I need to improve the sign-up form — what do we know and what should I do?</span></div>
    <div style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: T.navy, marginBottom: 10 }}>The bot returns:</div>
    <div style={{ display: "grid", gap: 8 }}>
      {["Summary of sign-up pain points with severity scores", "PNG of the current sign-up screen from Figma", "List of relevant design system components", "A ready-to-paste prompt for Claude Desktop with pain points, Figma URL, and design system constraints pre-loaded"].map((item, i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.infoBg, color: T.teal, fontFamily: ff, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
        <div style={{ fontFamily: ff, fontSize: 14, color: T.text, lineHeight: 1.5 }}>{item}</div>
      </div>)}
    </div>
    <P s={{ fontSize: 14, color: T.muted, marginTop: 14, marginBottom: 0 }}>The designer copies the prompt, opens the Desktop app, pastes it, and Claude builds the solution — already loaded with the right context.</P>
  </div>
  <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "0 0 24px" }}>
    {[
      { ask: "I need a prototype for the improved checkout", returns: "Returns Chrome findings, pain points, components, and a Desktop app prompt" },
      { ask: "Draft acceptance criteria for the progress bar", returns: "Generates Jira-ready criteria from journey data with testable metrics" },
      { ask: "Prepare a brief for the claims redesign", returns: "Aggregates research, Chrome observations, journey data into a structured brief" },
    ].map((q, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px" }}>
      <div style={{ fontFamily: ff, fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 6 }}>"{q.ask}"</div>
      <div style={{ fontFamily: ff, fontSize: 13, color: T.muted }}>→ {q.returns}</div>
    </div>)}
  </div>

  <H3>Change detection</H3>
  <P>The bot compares the current Figma design system against the last published JSON to detect changes — new components, updated tokens, removed variants.</P>
  <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "16px 0 24px" }}>
    {[
      { ask: "What changed this week?", returns: "Diff of additions, removals, modifications" },
      { ask: "Any new components?", returns: "Components in Figma not yet in docs" },
      { ask: "Anything removed?", returns: "Components in docs but missing from Figma" },
    ].map((q, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontFamily: ff, fontSize: 12.5, fontWeight: 600, color: T.navy, marginBottom: 4 }}>"{q.ask}"</div>
      <div style={{ fontFamily: ff, fontSize: 12.5, color: T.muted }}>→ {q.returns}</div>
    </div>)}
  </div>

  <div style={{ background: T.navyBg, border: `1px solid ${T.navy}20`, borderRadius: 12, padding: "20px 24px", margin: "24px 0" }}>
    <div style={{ fontFamily: ff, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.navy, marginBottom: 10 }}>What requires Claude Pro / Desktop</div>
    <P s={{ fontSize: 14, marginBottom: 8 }}>The bot is the <strong>query and context layer</strong>. These require the <strong>creation layer</strong> (Claude Pro or Desktop with MCP connectors):</P>
    <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {["Scan websites (Chrome connector)", "Create Figma components (Figma MCP)", "Generate prototypes (Chrome + Figma)", "Push code to GitHub (Claude Code)"].map((item, i) => <div key={i} style={{ fontFamily: ff, fontSize: 13, color: T.muted, background: T.white, borderRadius: 6, padding: "8px 12px" }}>{item}</div>)}
    </div>
  </div>

  <Label>Case Study</Label>
  <P>I prompted Claude to write the entire Slack bot — the Node.js script, the search functions for each data source, the Claude API integration for answer synthesis. Claude generated all the code. I tested it locally first (which only worked while my laptop was open), then deployed it to Render.com (free tier) with UptimeRobot keeping it alive 24/7. My only direct actions were creating the Slack workspace, creating the app at api.slack.com, and pasting environment variables into Render.com.</P>
  <Box type="amber" label="One remaining step">The bot uses the Anthropic API to synthesise answers — separate from the Claude Pro subscription. Credits are loaded at console.anthropic.com. Estimated cost: $5–10 to get started, then roughly $1–2 per month in ongoing usage (approximately 20–50 queries per day at ~$0.01–0.03 per query). Once credits are loaded, the Slack channel will be shared for everyone to try.</Box>
  <CaseLink title="Slack Workspace" desc="The demo workspace with @UX Assistant bot connected and ready." url="https://uxaiexperiment.slack.com/" />

  <Label>How to Use It</Label>
  <P>Go to <strong>#ux-requests</strong> in Slack. Tag <strong>@UX Assistant</strong> followed by your question. The more specific, the better the answer.</P>

  <Label>Setup</Label>
  <P><strong>Create the Slack app:</strong> Go to api.slack.com/apps → Create New App → From Scratch → name it "UX Assistant" → select your workspace. Add bot token scopes (app_mentions:read, chat:write, channels:history). Enable Socket Mode. Subscribe to the app_mention event.</P>
  <P><strong>Configure the bot:</strong> Create a .env file with your Slack tokens, Anthropic API key, Figma token, and GitHub details. The bot script searches four data sources in parallel.</P>
  <P><strong>Deploy:</strong> Push to GitHub → deploy on Render.com (free tier) → add environment variables → set up UptimeRobot at /health endpoint.</P>
  <P s={{ fontSize: 14, color: T.light }}>This setup requires a developer or someone comfortable with Terminal, GitHub, and environment variables.</P>
  <Nav prev={SS[7]} next={SS[9]} go={go} /></div>; }


function BenchV({ go }) { return <div><Tags rs={["ux", "service", "pm"]} /><H2>Benchmarking — measuring whether changes work</H2>
  <P>Benchmarking is about capturing the state of a product before and after a change, and measuring the difference. This section explains what Claude can automate today, what requires manual steps, and what could be automated with further development.</P>
  <H3>What Claude can do now</H3>
  <P>Claude's Chrome scanning captures a detailed product state — every screen, form field, friction point, and step count. This works as a baseline before a change and a comparison after. The diff between them shows what changed at the product level.</P>
  <Bul items={[
    "Baseline capture — Claude scans the live product through Chrome and documents the full flow. This becomes the \"before\" snapshot, pushed to the journey management app as structured JSON",
    "Post-change capture — after deployment, the same Chrome scan documents the new flow. Claude can compare the two and generate a diff: what was added, removed, or changed",
    "Journey map comparison — both snapshots feed into the journey management app, so you can see before/after side by side with scored pain points",
    "Competitor tracking — the same crawl approach works for monitoring competitor products over time, detecting when they add features or change flows",
    "Automated reporting — Claude generates a structured comparison showing step reduction, friction points resolved, and new issues introduced"
  ]} />
  <H3>What requires manual steps today</H3>
  <P>Claude captures the product state, but UX benchmarking also requires two other data sources: analytics data (page views, completion rates, drop-offs, time on task) and user testing data (task completion, satisfaction scores, error rates). Neither of these is connected to Claude automatically.</P>
  <P>The current manual workflow:</P>
  <Step n={1} title="Export analytics data" desc="Export a CSV or report from Google Analytics, Amplitude, Hotjar, or whatever analytics platform you use. This gives you the quantitative behaviour data — completion rates, drop-offs, session duration." />
  <Step n={2} title="Run user testing" desc="Use the A/B test plans generated in the Prototyping section to run moderated or unmoderated tests in Askable or UserTesting.com. This gives you the qualitative human response data — task completion, satisfaction, perceived effort." />
  <Step n={3} title="Feed everything into Claude" desc="Paste the analytics export and the user testing results into Claude alongside the Chrome crawl data. Claude processes all three sources together and generates updated journey JSON with revised pain points, new severity scores, and evidence tags." />
  <Step n={4} title="Push to the journey management app" desc="Claude Code pushes the updated JSON. The app rebuilds with the new data. Pain points resolved get marked. New issues get documented. The journey map evolves." />
  <Step n={5} title="Report the results" desc="Claude generates a comparison summary: before vs after metrics, what improved, what didn't, and recommended next steps. This can be shared directly or fed into TheyDo for formal reporting." />
  <H3>What could be automated with development work</H3>
  <P>The manual steps above could be reduced with API integrations. This would require working with a developer to set up:</P>
  <Bul items={[
    "Analytics API connection — Claude Code could read directly from Google Analytics or Amplitude APIs on a scheduled basis, pulling completion rates and drop-off data without manual exports. A developer would need to set up the API authentication and a scheduled script.",
    "Scheduled Chrome crawls — instead of manually triggering crawls, a scheduled job could run Claude through the same product flow weekly or after each deployment, automatically capturing the new state and flagging changes. This would require a server-side script using Claude Code.",
    "Automated diff and alerting — when a scheduled crawl detects a change (a new screen, a removed field, a different flow), it could automatically push a notification to Slack via the bot, alerting the team without anyone having to ask.",
    "User testing platform integration — if Askable or UserTesting.com build MCP connectors or open their APIs, test results could flow back into Claude automatically. Neither has this today."
  ]} />
  <P>All of these are technically possible but none are built. They would require development time to set up the API connections, authentication, and scheduling. The manual workflow works today and is how most teams operate — the automation is an optimisation for later.</P>
  <H3>How TheyDo fits into benchmarking</H3>
  <P>If TheyDo is approved, it becomes the enterprise layer for benchmarking data:</P>
  <Bul items={[
    "TheyDo's daily S3 export (enterprise feature) gives Claude Code access to all journey data in a structured Parquet format. Claude could read the S3 bucket, compare against the latest Chrome crawl, and identify discrepancies between what TheyDo says the journey looks like and what the live product actually does.",
    "TheyDo's Qualtrics integration means survey data from benchmarking studies flows into TheyDo automatically, where it's scored and tagged against journeys. Claude can then read that data via the S3 export to include it in the analysis.",
    "TheyDo's executive dashboards provide the reporting layer — once benchmarking data is in TheyDo, stakeholders see it in their existing dashboards without needing the custom journey management app.",
    "The custom journey management app from this case study remains useful as the fast-publish layer — Chrome crawl data and quick research updates go there immediately, while the validated, scored data gets formally published to TheyDo."
  ]} />
  <P>The limitation is the same as elsewhere: data can come out of TheyDo but can't be pushed in programmatically. The custom app and TheyDo coexist — one is fast and Claude-integrated, the other is governed and enterprise-grade.</P>
  <H3>Who's involved</H3>
  <P>Benchmarking touches multiple roles:</P>
  <Bul items={[
    "Service Designers and Researchers — own the benchmarking process alongside UX, run Chrome crawls, define success criteria from journey research, process all data sources through Claude, and update journey maps with results",
    "UX Designers — design the changes being measured, run or review the user testing",
    "BAs — compare benchmarking results against Jira backlog, identify what to prioritise next",
    "Product Managers — review the before/after comparison, decide whether to ship, iterate, or kill",
    "Developers — needed if setting up analytics API connections or scheduled crawl automation",
    "Stakeholders — consume the comparison reports through the journey management app, TheyDo dashboards, or Slack bot queries"
  ]} />
  <Box type="info" label="Connecting to analytics">The Chrome crawl captures the product state. Analytics platforms capture user behaviour. User testing captures human responses. Today these are combined manually by pasting exports into Claude. With API development, the analytics and crawl steps could be automated — but the user testing step will always require real participants.</Box>
  <Box type="future" label="Automated benchmarking pipeline">With development investment, scheduled Chrome crawls and analytics API connections could create an always-on benchmarking system. Changes in production — even unplanned ones — would be detected automatically, compared against the last known state, and flagged in Slack. This requires a developer to build the scheduling and API layer.</Box>
  <Nav prev={SS[8]} next={SS[10]} go={go} /></div>; }

function ToolsV({ go }) { return <div><Tags rs={["service", "ux", "pm", "dev"]} /><H2>TheyDo & ZeroHeight</H2>
  <P>Two enterprise platforms are being considered for the next financial year: TheyDo for journey management and ZeroHeight for design system documentation. Both are purpose-built for the problems the custom applications in this case study were designed to solve — but at an organisation-wide scale with governance, collaboration, and integrations that custom-built tools can't match.</P>

  <H3>Why enterprise tools over custom builds</H3>
  <P>The journey management app and design system docs site built in this case study demonstrate what's possible with Claude and free tools. They work well for a team of one or a small group testing a workflow. But at the organisation level, they lack access control (anyone with the URL can see everything), versioning and audit trails, multi-team collaboration features, executive reporting, and integration with enterprise systems like Jira and Qualtrics. TheyDo and ZeroHeight are built specifically for these needs.</P>
  <P>Importantly, both tools can coexist with the Claude workflow. Claude becomes the engine that generates and processes data, while TheyDo and ZeroHeight become the governed, enterprise-grade surfaces where that data is published and consumed across the organisation.</P>

  <H3>TheyDo — journey management</H3>
  <P>TheyDo is a journey management platform used by enterprise CX, UX, and product teams. It provides journey mapping, opportunity prioritisation, insight scoring, and executive dashboards — similar to what the custom journey management app demonstrates, but with multi-team collaboration, governance, and reporting built in.</P>
  <H3>How TheyDo would work with Claude</H3>
  <P><strong>No MCP connector exists</strong> — TheyDo has no public REST API and no MCP integration. However, there are data pathways:</P>
  <Bul items={[
    "CSV export — TheyDo exports structured data from any library (journeys, opportunities, insights, solutions). Claude can process these exports to generate updated FigJam journey maps, inform design decisions, or cross-reference against other data sources",
    "Daily S3 export (enterprise) — TheyDo offers automated daily snapshots in Parquet format to an S3 bucket, covering all journey data. Claude Code could read from this bucket to keep the workflow informed with the latest TheyDo data automatically",
    "Qualtrics integration — TheyDo imports survey data from Qualtrics for AI-powered insight mining. Research data that feeds into Qualtrics would flow through to TheyDo",
    "Manual input — for now, journey data generated by Claude would need to be manually entered into TheyDo through its UI, since there's no write API"
  ]} />
  <P><strong>The limitation:</strong> Data can come out of TheyDo (CSV, S3) but can't be pushed in programmatically. Claude can read TheyDo data to inform the workflow, but can't write directly to TheyDo. If TheyDo builds an API or MCP connector in the future, Claude could push journey data directly — closing the loop entirely.</P>
  <P><strong>Why use TheyDo anyway:</strong> TheyDo provides organisation-wide journey governance — multiple teams working on related journeys, executive dashboards showing CX health, opportunity prioritisation across products, and formal insight management. The custom app is a publishing tool for one team. TheyDo is a management platform for the organisation.</P>

  <H3>ZeroHeight — design system documentation</H3>
  <P>ZeroHeight is the leading design system documentation platform. It provides live Figma sync, Storybook integration, token management, versioning, analytics, and a content API — similar to the custom design system docs site, but with enterprise features and automated pipelines.</P>
  <H3>How ZeroHeight would work with Claude</H3>
  <P><strong>No MCP connector exists</strong> — but ZeroHeight has strong API and integration capabilities that create a natural pipeline with Claude:</P>
  <Bul items={[
    "GitHub/GitLab markdown sync — ZeroHeight connects to a repo and pulls markdown content automatically. Claude Code pushes generated documentation (component descriptions, usage guidelines, accessibility notes) to the repo, and ZeroHeight publishes it without manual intervention",
    "Token export API — ZeroHeight exports design tokens via API in multiple formats (JSON, CSS, SCSS). Claude Code can read these tokens to inform code generation, ensuring generated components use the exact production token values",
    "Token Manager with automated PRs — when Figma tokens change, ZeroHeight's Token Manager creates pull requests in your repo automatically. Claude Code could review these PRs or use the updated tokens in subsequent code generation",
    "Storybook integration — ZeroHeight pulls live rendered components from Storybook, displaying them alongside Claude-generated markdown docs and Figma-synced tokens. Three sources feeding one published page",
    "Content API — ZeroHeight's API lets Claude read existing documentation to understand what's already published before generating updates"
  ]} />
  <P><strong>The automated pipeline:</strong> Designer updates a component in Figma → ZeroHeight auto-syncs the visual tokens → Claude generates updated markdown documentation → Claude Code pushes it to the connected repo → ZeroHeight detects the change and publishes. The designer never opens ZeroHeight directly. Figma handles the visual truth, Claude handles the written documentation, and ZeroHeight handles the publishing and governance.</P>
  <P><strong>Why use ZeroHeight anyway:</strong> ZeroHeight provides version history, analytics (which docs are most viewed, where people search and fail), multi-brand token management, access controls, and a polished consumer-facing experience. The custom site is a functional reference. ZeroHeight is the governed, analytics-informed platform that scales across multiple design systems and teams.</P>

  <H3>The combined picture</H3>
  <P>If both tools are approved, the Claude workflow doesn't change — it gets more powerful:</P>
  <Bul items={[
    "Chrome scans the product → Claude generates journey data → published to TheyDo (manually for now, automated if they build an API) and to FigJam for workshops",
    "Designer updates Figma → ZeroHeight auto-syncs tokens → Claude generates docs → pushed to ZeroHeight via GitHub → published automatically",
    "Research data feeds through Claude → structured into journey JSON → published to TheyDo for governance AND to the custom app for rapid reference",
    "The Slack bot could search both the custom JSON data AND the TheyDo/ZeroHeight exports, giving everyone access to the full picture"
  ]} />
  <P>The custom-built applications from this case study would still serve a purpose — as the fast-publish, Claude-integrated layer for rapid iteration. TheyDo and ZeroHeight become the enterprise-grade layer for governance, collaboration, and organisation-wide visibility.</P>

  <Nav prev={SS[9]} next={SS[11]} go={go} /></div>; }

function NextV({ go }) { return <div><Tags rs={["all"]} /><H2>What's next — enterprise evaluation</H2><P>The system works end to end. Next steps:</P><Bul items={["Load API credits for the Slack bot", "Demo the workflow to the team", "Iterate on interfaces based on feedback"]} /><H3>Enterprise additions</H3><Bul items={["Miro alongside FigJam — richer workshop facilitation", "Jira connectivity — pull user stories, create tickets from specs, cross-reference pain points against backlog", "TheyDo for organisation-wide journey management (see TheyDo & ZeroHeight)", "ZeroHeight for governed design system documentation (see TheyDo & ZeroHeight)", "Connector approvals managed by IT", "Audit logging — full trail of what Claude accessed", "Data governance and retention policies"]} /><P>The underlying technology is identical to what was tested. The governance layer is what changes.</P><Box type="future" label="User testing integration">If Askable or UserTesting.com build MCP connectors, the prototype → test → analyse → update loop becomes fully automated. Claude pushes test plans to the platform and pulls results back into the journey management system.</Box><Nav prev={SS[10]} next={SS[12]} go={go} /></div>; }

function AdminV({ go }) {
  const costItems = [{ l: "Claude Pro", v: "$20/mo", c: T.navy }, { l: "Figma", v: "Free", c: T.teal }, { l: "GitHub Pages", v: "Free", c: T.teal }, { l: "Render / Hosting", v: "Free", c: T.teal }, { l: "Slack", v: "Free", c: T.teal }];
  return <div>
    <Tags rs={["all"]} />
    <H2>Administering the System</H2>
    <P>The system is administered through Claude Pro and Claude Code. Each section of this case study includes detailed instructions for how to use each specific tool — Chrome scanning, Figma design, prototyping, Slack bot queries, and more. This section covers the ongoing admin tasks: sending team updates, managing costs, and maintaining the system.</P>

    <H3>Sending Design & Research Updates</H3>
    <P>Use Claude Pro to send updates directly to the <strong>#exd-design-research-updates</strong> Slack channel. Claude reads the changelogs from both the design system and journey management GitHub repos, summarises what's changed, and posts directly — no copying required. You'll need the Slack connector enabled in Claude Pro (Settings → Connected Apps → Slack) for direct posting. Copy this prompt into Claude Pro:</P>
    <Prompt text={`Read the design system data at https://raw.githubusercontent.com/asmithdigital/design-system-site/main/data/components.json, https://raw.githubusercontent.com/asmithdigital/design-system-site/main/data/patterns.json, and https://raw.githubusercontent.com/asmithdigital/design-system-site/main/data/templates.json. For each file, count the actual array length to get exact totals (e.g. components.components.length). Then check the changelog array inside each item for changes since [DATE]. Also read the journey management data at https://raw.githubusercontent.com/asmithdigital/journey-management-site/main/public/data/index.json (check the top-level changelog array and count the hierarchy), plus each journey file's changelog. When stating any numbers in the update (component count, pattern count, journey count), use the actual array lengths from the JSON — do not estimate, round, or infer from changelog entries alone. Summarise all changes since [DATE]. Group by Design System and Research. Format using Slack mrkdwn — use *bold* for emphasis, <url|text> for links (not markdown [text](url)), and emoji markers. Include links to the design system at https://asmithdigital.github.io/design-system-site/ and journey maps at https://asmithdigital.github.io/journey-management-site/. Post the result directly to the #exd-design-research-updates channel. Show me the draft first and wait for my approval before posting.`} />
    <P s={{ fontSize: 14, color: T.muted }}>Requires: Slack connector enabled in Claude Pro (Settings → Connected Apps → Slack). Claude will show the draft and wait for your approval before posting.</P>
    <P>Replace <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 14 }}>[DATE]</code> with the date of your last update. Claude will fetch the latest data and draft the message.</P>

    <H3>Sending System Changelog Updates</H3>
    <P>For the <strong>#ux-ai-system-changelog</strong> channel, describe what you've changed in the system itself and ask Claude to format and post it:</P>
    <Prompt text={`Here's what changed in the UX AI system this week:\n- [describe change 1]\n- [describe change 2]\n- [describe change 3]\nFormat using Slack mrkdwn — use *bold* for emphasis, <url|text> for links, and emoji markers. Post the result directly to the #ux-ai-system-changelog channel. Show me the draft first and wait for my approval before posting.`} />
    <P s={{ fontSize: 14, color: T.muted }}>Requires: Slack connector enabled in Claude Pro (Settings → Connected Apps → Slack). Claude will show the draft and wait for your approval before posting.</P>

    <H3>Cost & Credits</H3>
    <P>The system runs on free tiers and a single $20/month Claude Pro subscription. The only additional spend is Anthropic API credits for the Slack bot's answer synthesis — loaded separately at console.anthropic.com.</P>
    <div className="cost-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, margin: "18px 0 10px" }}>{costItems.map((x, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px 14px", textAlign: "center" }}><div style={{ fontFamily: ff, fontSize: 11.5, color: T.muted, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 5 }}>{x.l}</div><div style={{ fontFamily: ff, fontSize: 22, fontWeight: 700, color: x.c }}>{x.v}</div></div>)}</div>
    <P s={{ color: T.muted, fontSize: 15 }}>Plus ~$5–10 in Anthropic API credits to get the Slack bot started, then roughly $1–2/month at 20–50 queries per day.</P>

    <Nav prev={SS[11]} go={go} />
  </div>;
}

const VM = { intro: Intro, chrome: ChromeV, figma: FigmaV, figjam: FigJamV, proto: ProtoV, code: CodeV, ds: DSV, jm: JMV, slack: SlackV, bench: BenchV, tools: ToolsV, next: NextV, admin: AdminV };

export default function App() {
  const [av, setAv] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const V = VM[av];
  const go = (id) => { setAv(id); setSidebarOpen(false); document.querySelector('main')?.scrollTo(0, 0); };
  return <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: ff, background: T.bg, color: T.text, fontSize: 16, lineHeight: 1.72 }}>
    <div className={`sidebar-overlay${sidebarOpen ? " sidebar-open" : ""}`} onClick={() => setSidebarOpen(false)} />
    <div className="mobile-topbar">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(s => !s)} aria-label="Open navigation menu">
        <span /><span /><span />
      </button>
      <div className="mobile-topbar-title">EXD · Workflow Test</div>
    </div>
    <aside className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`} style={{ width: 260, minWidth: 260, height: "100vh", background: T.navy, overflowY: "auto", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "26px 22px 18px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".07em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 3 }}>EXD · Workflow Test</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Claude AI System</div>
      </div>
      <nav style={{ padding: "14px 0", flex: 1 }}>
        {SS.map((v, i) => <button key={v.id} onClick={() => go(v.id)} style={{ display: "flex", alignItems: "baseline", gap: 9, width: "100%", padding: "9px 22px", border: "none", cursor: "pointer", textAlign: "left", fontSize: 14.5, fontWeight: av === v.id ? 600 : 400, color: av === v.id ? "#fff" : "rgba(255,255,255,.78)", background: av === v.id ? "rgba(255,255,255,.1)" : "transparent", borderLeft: av === v.id ? `3px solid ${T.teal}` : "3px solid transparent", transition: "all .12s", fontFamily: ff }}><span style={{ fontSize: 11.5, fontWeight: 700, color: av === v.id ? "#5ce0b8" : "#5ce0b880", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>{v.l}</button>)}
      </nav>
      <div style={{ padding: "14px 22px", borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginBottom: 2 }}>Created by</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,.75)" }}>Andrew Smith</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Manager, Digital UX</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 6 }}>May 2026</div>
      </div>
    </aside>
    <main className="main-content" style={{ flex: 1, overflowY: "auto", background: T.bg }}><div className="content-inner" style={{ maxWidth: 880, margin: "0 auto", padding: "44px 44px 100px" }}><V go={go} /></div></main>
  </div>;
}
