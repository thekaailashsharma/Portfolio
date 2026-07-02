COMPREHENSIVE PORTFOLIO CODEBASE FEATURE CATALOGUE
Based on an exhaustive code review, here's every feature, interaction, easter egg, and hidden behavior in this React portfolio:

GLOBAL FEATURES & INFRASTRUCTURE
1. Splash Screen System (index.html)
Display: Fixed fullscreen overlay with "KS" monogram, random fact, and animated progress bar
Dynamic Facts (13 total): Cycles through portfolio highlights (hackathon wins, promotions, conference speaking, etc.)
Auto-fade: Fades out after ~1.5s (splashProgress animation)
Stored in: Pure HTML/CSS (zero React dependency for performance)
Theme-aware: Matches light/dark mode via CSS custom properties
2. Theme System (useTheme.jsx)
Storage: localStorage key 'ks-theme' (persists across sessions)
Default: Light mode, unless system prefers dark
Auto-sync: Listens to prefers-color-scheme media query (system-level dark mode)
Transition: 0.4s ease on all theme-aware elements
Colors: Dual palette (light beige/warm vs. dark charcoal/warm)
Toggle Location: Top-right nav, mobile bottom sheet
3. Cursor System (Cursor.jsx)
Type: Custom cursor with kinetic follow (no native cursor shown)
Rings:
Core dot (tight follow, 6px → 4px on click, white, z-index 9999)
Lagging ring (looser spring physics, changes size/color based on hover state)
State-aware:
Default: Transparent
Over interactive elements (<a>, <button>, [role="button"], [data-magnetic], inputs): Ring grows to 46×46px, accent color, 0.9 opacity
Over AI buttons ([data-ai]): Teal accent (#0E7C7B) instead of terracotta (#C8502A)
On click: Core dot shrinks to 4px
On page leave: Hides completely
Tech: Spring physics (damping: 28/18, stiffness: 400/120)
Mobile: Disabled on touch devices
4. Sound System (SoundManager.jsx)
Default: Disabled (opt-in toggle in nav)
Web Audio API: Oscillator-based synthesis (no audio files)
Sound Effects:
click: 800Hz sine, 0.08s duration
hover: 600Hz sine, 0.05s duration
open: 440Hz + 660Hz (ascending two-tone)
close: 660Hz + 440Hz (descending two-tone)
section: 520Hz, 0.15s
pageTurn: Procedural white noise + bandpass filter (for BookView page flips)
Toggle: Available in desktop nav and mobile sheet
State: localStorage not explicitly persisted in code (resets on reload)
5. Liquid Glass Effect (App.jsx)
SVG Displacement Map: Red/green channel gradients create inward refraction at edges
Applied via: feDisplacementMap with scale="16" (global) and scale="10" (panels)
Gaussian blur: stdDeviation 0.6–0.8 for smooth distortion
Fallback: CSS backdrop-filter blur for browsers without SVG support
Visual: Entire page has subtle lens-like warp
6. Color Gradients & Backgrounds (index.html CSS)
Light mode: Beige (#f5f1e6) with radial warm washes (terracotta, teal, purple, orange)
Dark mode: Charcoal (#1A1510 → #09090b) with muted warm accents
Fixed attachment: Gradients don't scroll, stay locked to viewport
Grain overlay: Procedural fractal noise animated infinitely, opacity ~0.02–0.04
KEYBOARD SHORTCUTS & INTERACTIONS
Command Palette (CommandPalette.jsx)
Trigger: Cmd+K (Ctrl+K on Windows) or click search icon in nav
Keyboard Navigation:
↑↓: Move selection (wraps at bounds)
Enter: Execute selected action
Escape: Close palette
Filter: Real-time search across labels + keyword sets
Actions (19 total):
Navigate: About, Work, Timeline, Speaking, Writing, Contact
Resume Links (3): PM, Full, Speaker (Google Drive PDFs)
External Links: GitHub, LinkedIn, Substack, Email, Twitter/X
Grouping: Results grouped by category (Navigate, Proof of Work, Links)
3D Entry: spring(stiffness: 300, damping: 24), rotateX perspective
Konami Code (EasterEggs.jsx)
Sequence: ↑ ↑ ↓ ↓ ← → ← → B A (exactly 10 keys)
Trigger: Overlay appears with 🎮 emoji + inspirational message
Message: "You found the Konami Code! ... Sometimes the best code is the code that makes someone smile."
Exit: Click anywhere to fade out (0.3s opacity)
Easter Egg Note: Hidden hint in index.html comment: "Try pressing ⌘K or the Konami Code"
Console Messages (EasterEggs.jsx)
On Page Load: ASCII art box with contact info (styled gold #c8a87c monospace)
On Scroll (4 progressive messages):
10% progress: "👋 Still scrolling? The good stuff is coming."
40%: "⚡ You're halfway through. Most people bounce by now. Not you."
70%: "🔥 You've read more than most recruiters. Respect."
95%: "✨ You made it to the end. kailashps.1011@gmail.com"
Styling: Gold color, 12px font, logged once per threshold
PERSONA SYSTEM (PersonaContext.jsx)
Pre-built Personas (6 options):
product-managers: "I think in systems, not features"
engineers: "I ship production systems, not side projects"
event-organizers: "10+ conferences. Builder-first talks"
startups: "4 products at Global Top 100. Zero-to-one is my default mode"
investors: "Building at the intersection of product, AI, and scale"
collaborators: "370+ contributors. Open-source, community-first"
Each persona has:

Unique hero subtitle (section 1)
Custom section order (reorders about/timeline/systems/speaking/writing)
Persona-specific resume link
Meta tags (og:title, og:description)
Dynamic Company Personas:
URL pattern: /?/:slug (e.g., /?/google, /?/meta)
Trigger: Detects company slug in route
AI-Powered: Uses Gemini 2.5 Flash to generate:
2-sentence pitch (why Kailash fits this company)
Ranked section order (most → least relevant)
Caching: localStorage key persona-{slug}, regenerates on cache miss
Fallback: Generic persona if API fails
Banner: Displays at top (sticky) showing "Built for [Company]" with "AI-personalized" label
Reset: "See default" link navigates back to base URL
PersonaBanner Display:
Yellow/accent gradient background
Animated height (0 → auto)
Dismiss button (×) hides banner
Loading state: "Personalizing for..." pulse
NAVIGATION & LAYOUT
Desktop Nav (Nav.jsx)
Scroll-triggered Glass: Becomes glass-panel at 80px scroll
Elements:
Logo "KS" (top-left) + animated "Kailash Sharma" fade-in (only on desktop)
Nav links: Work, Timeline, Writing, Connect (underline on hover, 0.3s transition)
AI button: Accent color, ✦ symbol
Command button: ⌘K badge
Resume button: Terracotta background (#C8502A)
Sound toggle: ♪ with opacity change
Theme toggle: Sun/Moon with rotation animation
Mobile Nav (MobileNav.jsx)
Bottom FAB: Floating action button ("+") at bottom-right (z-index 60)
Active Label: Shows current section name (updates on scroll)
Progress Bar: Bottom of FAB shows scroll progress (0–100%)
Expanded Menu: Bottom sheet (z-index 58) with:
Drag handle (white bar)
Search button (opens command palette)
6 section icons (○◇□△◎◈) with active highlighting
3 resume buttons (grid layout)
Theme toggle button (☀/☽)
Intersection Observer: Tracks visible section (40% margin top/bottom)
Overflow Prevention: Sets body.overflow: hidden when expanded
PATH CHOOSER & HERO FLOW (PathChooser.jsx, Hero.jsx)
Path Chooser (displayed post-splash):
Delay: Appears at 2.2s (after hero name animations complete)
3 Paths:
◆ A problem worth solving: Systems, timeline, about, speaking, writing order
◇ An idea worth building: Writing, speaking, timeline, systems, about order
○ Pure curiosity: Default full order (no reordering)
Interaction: Click path → reorders sections, no navigation
Styling: Bordered cards, hover state lifts border color to accent
Hero Section Kinetics:
Kinetic Name: Character-by-character slide-up reveal (staggered 0.045s intervals)
"Kailash": Regular serif
"Sharma": Italic serif, terracotta color
Count-up Numbers: From 0 → final value (easing, timed delays):
200K+ DAU: Delay 800ms
370+ contributors: Delay 1500ms
4× Google Top 100: Delay 1500ms
Floating Glass Cards (desktop):
Status pill (top-right): "Currently shipping / SDE @ Shaadi · AI @ Open Paws"
DAU KPI (left): 200K+ with sparkline graph
Dashboard strip (bottom): KAILASH v4.0 with 3 stat columns
Mobile: Cards repositioned below photo (top → bottom)
Scroll Cue: Bottom → shows "The journey" text + animated gradient bar
SECTION SYSTEM
Dynamic Section Reordering:
Default: About → Timeline → Systems → Speaking → Writing
"Solve" Path: Systems → Timeline → About → Speaking → Writing
"Build" Path: Writing → Speaking → Systems → Timeline → About
Persona Override: Each persona has custom order (takes precedence)
Dividers: Gray line between each section
Scroll Reveal Hooks:
useScrollReveal(): Single element reveal (threshold: 0.15, margin-bottom: -60px)
useStaggerReveal(): Multiple items with cascading reveal (120ms stagger)
SYSTEMS (WORK) SECTION (Systems.jsx)
10 Featured Projects:
AI Adoption at Shaadi (Org-wide)

Tagline: "Made a 200K-DAU org AI-native"
Impact: Velocity +15%, A/B cleanup −80%, crash rate −20%
Stack: AI Strategy, Cursor, Claude, Change Mgmt
Links: YouTube demo, talk
Nuvi (0→1 · building now)

AI knowledge brain with role-based permissions
Links: meetnuvi.com
Autonomous AI Pipelines (In production)

Multi-agent n8n workflows
Stack: n8n, OpenRouter, Claude, Gemini, Serper, Jina
Links: 3 n8n workflow links
Dark Pattern Detection (Top 5)

AI tool for auditing dark UX patterns
Links: YouTube
Tripify (600+ users · acquired)

AI travel manager
Stack: Kotlin, Swift, AI, Maps
Evidence drawer link
Evolve with AI (Hackathon winner)

On-device AI keyboard
Impact: #AndroidSpotlight
Footnote [3]: Google Play Academy feature story
TwinMind (Take-home)

Real-time transcription with Gemini 2.5 Flash
Stack: Android, Gemini, Firebase
YouTube Shorts Clone (Google-featured)

Engagement loop study
Stack: Android, Jetpack Compose
Waste2Wealth (Global Top 100)

Gamified waste management
Impact: 1st at Mumbai Hacks (500+ participants)
Footnote [2]: Story behind build
Wowdrobe (Global Top 100)

Fashion search + thrift marketplace
Impact: Titan Design Impact finalist
Interaction Mechanics:
Click to Expand: Card expands to show solution, impact, learning, stack, links
Parallax Cards: Slight 3D perspective (9px depth when inactive)
Image Handling:
YouTube thumbnails: Auto-detect + play icon overlay
Local images: Loading="lazy", error handling dims to 0.2 opacity
Fit modes: "cover" (default) or "contain" (Nuvi)
Evidence Tags: Click icon badge → opens EvidenceDrawer with proof
Margin Notes (desktop only): Sidebar philosophical notes on right (xl: screens)
Gradient Backgrounds (per system):
Amber/Orange, Violet/Blue, Emerald/Cyan, Rose/Amber color combinations
Very subtle (5–8% opacity)
ABOUT SECTION (About.jsx)
Bento Grid Layout (2 cols → 4 cols responsive):
Large Bio Card (2×2): Shaadi work + Open Paws + philosophy paragraph
200K+ DAU Stat: Animated number + label
<12mo Promotion: Text stat
Headshot Photo: /evidence/devfest-bhopal.png
Philosophy Quote: "I want to know the why before the how"
Product Impact: 370+ contributors, 200+ B2B users, 2024 App of the Year
Surface Areas: Skill tags (Product, AI, Consumer, etc.)
Background: Education (8.85 GPA), GitHub stats (live from API), Hackathons, Recognition
Illustrations:
OperatingProfile: Custom SVG radar chart (traits: builder mindset, comfort with ambiguity, product thinking, engineering depth)
NorthStarTree: SVG tree visualization
SkillSurface: Heatmap-like skill visualization
ProgressRing (3x): Circular progress indicators (88%, 92%, 80%)
GitHub Live Stats (useGitHubStats.js):
Fetches real-time repo count + star count from GitHub API
Animated number reveal (1200ms duration on scroll into view)
Footnotes:
[1] Shaadi-weight: "Real-time comms where 10K DAU depends on reliability"
[3] Compose-early: "Top 3% early adopter of Jetpack Compose"
TIMELINE SECTION (Timeline.jsx)
Branch-based Career Tree:
4 Career Paths: Engineering (blue), Product (teal), AI (purple), Community (cyan)
7 Nodes (chronological):
Shaadi.com SDE (Current, Jul 2025–) — Engineering
Open Paws AI Architect (Current, Aug 2025–) — AI, merges from Community
Shaadi.com Intern (Dec 2024–Jul 2025) — Engineering
Leadbeam.ai PM + Dev (Jun 2024–Feb 2025) — Product
My Irish Cousin PM (Jun–Nov 2024) — Product
Fold Money Android Dev (Jul–Nov 2023) — Engineering
Easocare Android Dev (Feb–May 2023) — Engineering
Node Data:
Each node has: Role, period, branch, 3-line details, system note, learning statement
System Notes: Reveal on click (expanded card)
Footnote Links: Some nodes reference footnotes
Visual:
Nodes positioned at x=40/80/120/160 (branch colors)
Connecting lines show career progression
Currently active roles highlighted
SPEAKING & WRITING SECTIONS (Speaking.jsx, Thinking.jsx)
Speaking (10+ Conferences):
Card grid with image thumbnails + event name + type
Evidence drawer links for each event
Event types: Conference, Meetup, Community, Internal
Events: DevFest Mumbai/Bhopal, Swift Mumbai/Bengaluru, GDG MAD, Droid Tribe, Huddle @ Shaadi
Writing (Substack):
3 Featured articles with title, preview, link
Link to full Substack profile
Articles:
"Taste as a Service" → product taste as pattern recognition
"The AI Constitution Era Has Started" → AI governance
"Why Companies Are Still Hiring Humans" → human judgment in AI era
AI CHATBOT (AIChatbot.jsx)
Trigger:
Click ✦ "AI" button in nav (desktop) or mobile menu
Opens modal with spring animation (3D perspective)
Features:
Suggested Questions (4 initial): Predefined prompts users can click
Chat History: Displays user/assistant messages in alternating alignments
Input Field: "Ask anything about Kailash..."
Send Button: ✦ symbol, disabled when empty/loading
Loading State: 3-dot animated pulse
Keyboard: Enter to send, Escape to close
System Prompt: Custom Gemini instructions with Kailash's bio + achievements
AI Integration:
Model: Gemini 2.5 Flash
Uses conversation history for context
Converts chat to API format (role/parts)
Error fallback: "Something went wrong. Try again in a moment."
Styling: Glass-panel, 500px width (responsive mobile), max-height 80vh
EVIDENCE DRAWER (EvidenceDrawer.jsx)
Trigger: Click evidence tag on project cards or footnotes
Evidence Types:
Branded Cards: Company logo + gradient background + icon + tagline

Examples: Open Paws, Fold Money, Leadbeam, My Irish Cousin, etc.
Gradient gradients per company (purple/violet, teal, blue, green, etc.)
GitHub Cards: Repo link with GitHub icon + star count

Examples: Tripify, Waste2Wealth, Wowdrobe, Evolve with AI
Auto-links to github.com/{repo}
Photo Cards: Image + caption

Examples: Mumbai Hacks, G20 Hackathon, DevFest events, etc.
Drawer UX:
Slides in from right (100% → 0 x-transform, 30ms damping spring)
Semi-transparent overlay behind
Close button (×) top-right
Shows: Image card + caption + details (if present) + GitHub link
Responsive: Full width on mobile, 420px on desktop
Evidence Database (evidence.js):
30+ entries (companies, achievements, speaking events)
Each has: type, caption, placeholder/gradient, details, icon, tagline
BOOK VIEW / FLIPBOOK (BookView.jsx)
Trigger:
Mobile only: 📖 button in mobile nav
Accessible via optional route or special UI
Page Structure (44 pages total):
Cover: Photo circle, "Kailash Sharma" title, quote, ask AI button
Why Me: 3-point pitch for reading the book
Table of Contents: 4 chapters with page numbers 4-7. Chapter I: The Builder (4 pages)
Chapter opener page
About page (photo + roles + traits grid)
Stats page (200K+ DAU, <12mo, 370+ contributors, 15+ flows, Top 100, 2024 App)
Case Study: Real-Time Communication (problem/approach/outcome/learning)
8-15. Chapter II: The Work (8 pages)

Photo pages (candid work photos, Mumbai Hacks, G20, Shaadi desk)
Project pages (Tripify, Waste2Wealth, Wowdrobe, Evolve with AI)
16-19. Chapter III: The Journey (4 pages)

Chapter opener
Timeline recent (5 entries: 2025, 2024 roles)
Timeline foundations (2023-2024 early roles)
Photo: Shaadi desk
20-22. Chapter IV: The Voice (3 pages)

Chapter opener
Speaking page (10 events with images)
Writing page (3 Substack articles)
23-25. Philosophy Pages:

"How I Think" (3-step framework)
"Currently Exploring" (links + resume options + WhatsApp CTA)
"Thank You" (closing message with animated dots)
Interaction:
Touch: Swipe left/right to turn pages
Mouse: Click left/right arrows (show after 2s)
Keyboard: Arrow keys (implied, via HTMLFlipBook)
Page Indicator: Bottom center (dots), top-right (N / total)
Navigation: Fade in after 2s idle
Peek Animation: Bottom-right corner fold + "Swipe to turn pages →" hint
Styling:
Paper background (paper-like repeating gradient)
Vignette shadow (V component)
Page numbers (bottom-right, monospace, muted)
Signature image (filtered based on theme)
Page Flip Sound: Custom procedural noise (see SoundManager.jsx)
CONTACT SECTION (Contact.jsx)
Likely Features (inferred from nav, CTA, book):
Section ID: contact
Call-to-action links (email, LinkedIn, GitHub, Substack, WhatsApp)
Resume download options (PM, Eng, Speaker)
Footer-like layout
FOOTNOTES & MARGIN NOTES
Footnotes (13 total):
Solution Challenge: "2,000+ teams globally, made Top 100 twice"
Mumbai Hacks: "500 participants, 24 hours, built Waste2Wealth"
Google Feature: "Learned at 2am via notification"
(More in marginNotes.js, partially readable)
Margin Notes (appear right column on xl+ screens):
Hero: Pigeon Post, 2021, first Python email client magic
About: Poetry/code compression, 62 repos, GPA 8.85
Timeline: Weight of owning 10K user conversations, Bengaluru growth, Huddle presentation
Systems: ShortsClone 51 stars, Tripify shipped in <1 month
Speaking: Mentoring breakthroughs, teaching clarity
Thinking: "A human who loves nature and poetry"
Interaction:
Footnote: Click numbered superscript → expands inline note (animated height)
Margin Note: Hover → border opacity increases
SPECIAL COMPONENTS
Annotation.jsx:
Text with hover tooltip (appears on hover)
Used for context-rich highlights
Divider.jsx:
Subtle visual separator between sections
SectionLabel.jsx:
Monospace label above section heading (e.g., "SYSTEMS I BUILT")
FadeIn.jsx:
Staggered opacity + y-translate animation on scroll-into-view
Configurable delay, duration, threshold
ParallaxCard.jsx:
3D perspective cards with tilt on mouse move
"Glare" effect (optional shine)
Depth parameter (0–9px)
Illustrations.jsx:
Custom SVG components: Sparkline, NorthStarTree, SkillSurface, OperatingProfile, ProgressRing
Animated on scroll reveal
PresentationViewer.jsx:
Likely embeds slides or videos (component exists, not fully explored)
NowDashboard.jsx (exists but not fully explored):
Possibly real-time status display
Signature.jsx:
Image filter applied based on theme (invert + brightness for dark)
LOCALSTORAGE & PERSISTENCE
Theme: 'ks-theme' → 'light' | 'dark'
Persona: 'persona-{slug}' → JSON cached company persona (TTL: indefinite)
Sound: Not explicitly persisted (resets per session)
Chat History: Not persisted (resets on close)
SEO & META
Dynamic Meta Tags:
Helmet updates og:title, og:description, twitter:title, twitter:description based on persona
Default: "Kailash Sharma — Product Builder, AI Systems, Zero-to-One"
Persona Override: Customized for each persona/company
JSON-LD Structured Data:
Person type (schema.org)
WebSite type
Includes: name, URL, jobTitle, worksFor, alumniOf, knowsAbout, sameAs links
Social Links (rel="me"):
LinkedIn, GitHub, Twitter/X, Substack
ACCESSIBILITY & RESPONSIVE
Mobile Detection: window.innerWidth < 768
Touch Cursor Disabled: Cursor component hidden on touch devices
Responsive Layouts:
Mobile: Single column, bottom FAB nav
Tablet (768px): Two-column layouts start
Desktop (xl): Full multi-column, sidebar margin notes
Keyboard Navigation: Full command palette support, Escape handling
PERFORMANCE OPTIMIZATIONS
Image Lazy Loading: loading="lazy" on all scrolled images
RequestAnimationFrame: Sound, cursor, number animations use RAF for 60fps
Intersection Observer: Section reveal, GitHub stats fetch, mobile nav section tracking
Spring Physics: Framer Motion springs for 60fps animation
Passive Event Listeners: Scroll events marked passive: true
Code Splitting: Sections lazy-loadable (implicit in dynamic imports)
EASTER EGGS & HIDDEN DETAILS
Konami Code (↑↑↓↓←→←→BA) → 🎮 overlay
Console ASCII Art on load
4 Scroll Progress Messages (logged to console)
"Hey, you're viewing the source. Respect." comment in index.html
Count-up Animations with staggered easing on numbers
Page Flip Sound: Procedural noise (not a file)
Floating Glass Cards: Liquid displacement + custom sheen animation
Book View Peek Animation: Corner fold + hint text fades in
Persona AI Generation: Silent in background, caches result
Margin Notes: Only visible xl+ (hidden mobile/tablet)
DATA FILES STRUCTURE
knowledge.js: SYSTEM_PROMPT (for AI) + 6 SUGGESTED_QUESTIONS
evidence.js: 30+ evidence objects (type, caption, gradient, icon, repo links, etc.)
marginNotes.js: Organized by section (hero, about, timeline, systems, speaking, thinking)
This portfolio is a masterfully engineered system with:

Semantic persona personalization (AI-driven company customization)
Kinetic animations throughout (character reveals, count-ups, spring physics)
Multi-sensory engagement (sound, theme, cursor feedback)
Progressive disclosure (expand cards, modals, drawers)
Accessibility-first (keyboard nav, touch fallbacks)
Rich metadata (SEO, JSON-LD, dynamic OG tags)
Hidden delight (Konami code, console messages, easter eggs)
Every interaction feels intentional and polished—from the liquid glass refraction to the procedural page-turn sounds to the AI-personalized hero subtitles.

That agent went deep — and it surfaced a ton of hidden stuff. Here's the full map, with two corrections (it read some stale code — the cursor and path-chooser were removed on your request):

🥚 Hidden gems & easter eggs (the stuff nobody notices)
Konami code → type ↑ ↑ ↓ ↓ ← → ← → B A anywhere → a 🎮 overlay appears with a message. (There's a hint for it in the page source.)
Console messages — open DevTools and you get ASCII-art contact info on load, then 4 progressive messages as you scroll: 10% "Still scrolling? The good stuff is coming." → 40% "Most people bounce by now. Not you." → 70% "You've read more than most recruiters. Respect." → 95% "You made it to the end. kailashps.1011@gmail.com"
"Hey, you're viewing the source. Respect." — a hidden note in index.html for anyone who inspects.
Splash screen rotates through 13 different builder facts at random on each load.
Procedural sound design — no audio files; every sound is synthesized (Web Audio oscillators): click 800Hz, hover 600Hz, open = ascending two-tone, close = descending, and the book page-turn is procedural white-noise through a bandpass filter.
🧠 AI & personalization (the clever layer)
Company personalization — visit yoursite.com/for/<company> (e.g. /for/stripe) → Gemini generates a custom 2-sentence pitch for that company + reorders your sections by relevance, shows a "Built for [Company]" banner, and caches it in localStorage so it's instant next time. Falls back gracefully if the API's down.
6 preset personas (PMs, engineers, startups, investors, event-organizers, collaborators) — each with its own hero line, section order, résumé, and SEO tags.
AI chatbot — Gemini with a full bio system-prompt, 4 suggested questions, conversation memory, Enter-to-send / Esc-to-close.
📖 Book View (way richer than I said — it's a full 25-page flipbook)
A page-flip book (mobile) with 4 chapters: The Builder · The Work · The Journey · The Voice — cover, "why me," table of contents, a real-time-comms case study (problem/approach/outcome), project pages, timeline pages, speaking + writing pages, a "How I Think" framework, and a "Thank You" close. Swipe/arrow/keyboard nav, page-fold "peek" hint, vignette, page numbers, procedural page-turn sound.

🎛️ Interaction depth
⌘K palette — 19 actions (6 sections + 3 résumés + 5 external links), grouped, fuzzy search, ↑↓ wrap, Enter, Esc, 3D spring entry.
Evidence drawer — click any "evidence" tag → slide-in drawer with 30+ proof entries (branded company cards, GitHub repos with star counts, event photos).
Footnotes (13) — click a superscript → inline expandable note. Margin notes (per section, xl-screens only) — e.g. Hero: "Pigeon Post, 2021 — my first Python email client, when code felt like magic."
Annotations — hover key phrases for side notes.
Live GitHub stats — About pulls your real repo + star counts from the GitHub API and counts them up.
🎨 Design & motion
Liquid glass (Aave lens on hero cards, frosted panels), 60·30·10 color, warm dark mode (localStorage-persisted, syncs with system preference, 0.4s transitions), grain + aurora + blueprint grid, kinetic name reveal, count-ups with staggered delays, 3D tilt cards with glare, magnetic buttons, spring physics, prefers-reduced-motion support.

⚙️ Under the hood
Dynamic SEO (Helmet updates OG/Twitter per persona), JSON-LD (Person + WebSite schema), rel="me" social verification, sitemap + robots, lazy images, IntersectionObserver reveals, noscript fallback.

✋ Two things that are NOT there anymore (you had me remove them)
The custom ring cursor — removed.
The "◆ problem worth solving / ◇ idea worth building / ○ curiosity" path chooser — removed from the hero. (Section-reorder logic still exists in code, but its only trigger now is the /for/<company> persona URLs.)