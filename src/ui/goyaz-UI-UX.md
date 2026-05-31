# Goyaz UI/UX Strategy and Research Baseline

Last updated: 2026-05-31

## 1. Purpose

This document defines an evidence-based UI/UX baseline for the current Goyaz product in this repository. It is written without inventing customer data. Where the repository gives direct evidence, this document states it as fact. Where evidence is missing, this document marks the gap and defines the research or measurement needed before making product decisions.

The goal is to align UI, UX, performance, content, and delivery around:

- problem solving
- low latency interactions
- high performance rendering
- premium but usable visual design
- a repeatable design process
- a realistic scope of work and effort timeline

## 2. Evidence Base

This document is based on the current repository, not external assumptions.

### Reviewed sources

- `ClaudeDesign.md`
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/collections/page.tsx`
- `app/collections/[category]/page.tsx`
- `app/collections/[category]/[id]/page.tsx`
- `app/data/masterpieces.ts`
- `app/data/navMenu.ts`
- `app/data/sectionHeadings.ts`
- `app/components/Navbar.tsx`
- `app/components/NavMenu.tsx`
- `app/components/SearchOverlay.tsx`
- `app/components/cart/CartSidebar.tsx`
- `app/components/WishlistOverlay.tsx`
- `app/components/collections/CollectionExplorer.tsx`
- `app/components/collections/FilterDrawer.tsx`
- `app/components/collections/BentoGrid.tsx`
- `app/sections/*`
- `app/utils/animations.tsx`
- `app/utils/cart.tsx`
- `app/utils/auth.tsx`
- `app/utils/wishlist.tsx`

### What is directly known

- The product is a premium silver jewellery experience for Goyaz.
- The site uses Next.js 16 App Router, React 19, TypeScript 5, Tailwind v4.
- The current experience is mostly browse-first and story-led.
- The repository contains no backend commerce, no real authentication, and no analytics instrumentation.
- Cart, wishlist, and auth state are client-side only.
- Search and filters are in-memory over static data.

### What is not currently evidenced in the repo

- real customer interviews
- usability test recordings
- purchase funnel analytics
- search analytics
- customer support reasons
- checkout completion data
- device/browser usage mix
- SEO performance data

Any "persona", "insight", or "priority" in this document is therefore either:

1. directly supported by repository evidence, or
2. explicitly marked as a research item that still needs validation.

## 3. Current Product Snapshot

### Product surface

The current product experience includes:

- 1 homepage with hero + 7 content sections
- 1 collections index page
- 5 routed collection category pages: Nakshi, Polki, Kundan, Temple, Bridal
- 1 dynamic product detail route pattern: `/collections/[category]/[id]`
- 1 global navbar
- 1 multi-panel nav menu
- 1 global search overlay
- 1 wishlist overlay
- 1 cart sidebar
- 1 auth overlay
- 1 global footer

### Current catalogue model

From `app/data/masterpieces.ts`:

- 5 collection categories
- 16 products per category
- 80 total products
- 14 jewelry types in the type system
- 4 price buckets in the collection filter
- 4 sort modes in the collection filter

### Current interaction model

- Homepage is editorial and brand-led before it becomes task-led.
- Collection pages are the strongest shoppable surface today.
- Product detail pages support image switching, add to cart, related items, and accordion content.
- Search matches `title`, `category`, and `jewelryType` only.
- Cart, wishlist, and auth persist to `localStorage`.

### Current technical UX strengths

- AVIF is used for key product and section imagery.
- Global design tokens already exist in `app/globals.css`.
- Motion utilities are centralized in `app/utils/animations.tsx`.
- Dynamic category routes use `generateStaticParams`.
- Search, filters, cart, and wishlist are fast at the current catalogue size because they are client-local.
- `prefers-reduced-motion` support exists in the animation system.

### Current functional limitations

- No real checkout flow exists.
- No real authentication exists.
- No real inventory, pricing, or order data exists.
- Many navigation paths are placeholders or collapse to generic `/collections`.
- Several "Discover More" CTAs do not lead anywhere.
- Product details are mostly brand copy, not decision-grade commerce content.

## 4. Problem Framing

### Core product problem

The current site communicates luxury and craft well, but it does not yet close the gap between brand storytelling and decision-ready commerce.

In practical terms:

- discovery is visually strong but structurally inconsistent
- browse paths exist, but not all of them resolve to meaningful destinations
- product detail pages create mood, but they do not yet provide enough certainty for a high-consideration purchase
- utility interactions are elegant, but some are slower than they should be for repeat use
- the system looks premium, but conversion readiness is not yet matched by the underlying functionality

### UX problem statement

Goyaz needs a UI/UX system that preserves a premium brand feel while reducing friction from first impression to product selection, saved intent, and purchase readiness. The experience must feel luxurious without slowing the user down.

## 5. Product Goals

These are the recommended product goals for the current repository state.

### Primary goals

1. Make collection discovery predictable and fast.
2. Help users reach a relevant product from homepage or search with minimal friction.
3. Increase trust on product detail pages before add-to-cart intent.
4. Reduce dead-end navigation and unclear calls to action.
5. Keep key interactions inside the Doherty Threshold: perceived response under 400ms.
6. Build an evidence loop through research and instrumentation before deeper scaling.

### Secondary goals

1. Preserve brand distinction through craft-led storytelling.
2. Reuse and formalize the existing design token system.
3. Improve accessibility and keyboard usability.
4. Keep animation as enhancement, not as a blocker.

### Non-goals for this phase

These should not be treated as immediate UX deliverables unless product requirements are added:

- payment gateway implementation
- full account system
- order history
- store locator backend
- CRM or loyalty backend
- marketplace-scale search relevance

## 6. Scope of Work

### In scope

1. Information architecture review
2. Homepage-to-collection-to-product journey optimization
3. Navigation and search usability
4. Collection filtering and sorting UX
5. Product detail page structure and trust design
6. Cart and wishlist interaction quality
7. Content hierarchy and CTA clarity
8. Accessibility and semantic interaction review
9. Performance-focused UX standards
10. Design system hardening for reusable components and states
11. Research plan and analytics instrumentation plan

### Out of scope without new requirements

1. checkout backend
2. payment UX tied to live gateways
3. real account recovery and identity flows
4. OMS or ERP-connected product data
5. in-store appointment system

## 7. Design Strategy

### Principle 1: Premium must still be efficient

Luxury does not justify delay. The interface should feel calm, deliberate, and refined, but utility tasks must remain immediate:

- search open
- search results
- filter apply
- add to cart
- wishlist save
- navigation open and close

### Principle 2: Recognition over recall

The site should help users recognize the correct path instead of making them remember brand vocabulary or product structures.

Applied here:

- clear category naming
- fewer generic navigation buckets
- fewer repeated "Discover More" CTAs
- stronger visual and textual differentiation between browse, story, and action

### Principle 3: Reduce false affordances

Buttons, links, and menu items should either work or be removed. Placeholder behavior damages trust faster in premium retail than in low-stakes content sites.

### Principle 4: Story supports commerce, not replaces it

Brand storytelling should frame the product, but once the user enters shopping mode, the experience should prioritize:

- category clarity
- comparable products
- pricing clarity
- specifications
- delivery confidence
- save-and-return behavior

### Principle 5: Performance is part of UX quality

For this product, performance is not separate from design quality. A premium interface that stutters, blocks, or delays utility actions feels less premium.

## 8. User Research

### 8.1 Current evidence available for research framing

The repository already provides these audience and intent signals:

- `ClaudeDesign.md` defines the audience as urban affluent women 25-45, bridal shoppers, and gift buyers.
- `app/data/navMenu.ts` shows merchandising intent around collections, bridal, gifts, trends, and loyalty.
- `app/data/masterpieces.ts` shows a catalogue organized around heritage categories and jewelry type.
- homepage section naming shows the current brand narrative: heritage, exclusivity, current trends, social proof, and craft story.

This is enough to frame research, but not enough to claim user truth.

### 8.2 Research gaps

The following are missing and should be treated as required discovery inputs:

- why users start on homepage versus collection pages
- what buyers need before trusting silver jewellery pricing
- how bridal users compare options and decide
- whether users shop by category, occasion, jewelry type, or price first
- what search terms customers actually use
- whether users understand "Inner Circle" value before login
- where users abandon the journey today

### 8.3 Recommended user research program

### Discovery research

- stakeholder interviews
- content audit
- heuristic review
- competitive benchmarking against premium jewellery and premium fashion commerce

### Qualitative research

- moderated interviews with target segments
- task-based usability tests on navigation, search, filters, PDP, save flow, add-to-cart flow
- session debrief focused on trust, clarity, and emotional response

### Quantitative research

- event instrumentation
- funnel tracking
- search usage tracking
- filter usage tracking
- wishlist and cart initiation tracking
- page performance by device class

## 9. Qualitative Analysis

This section reflects a repository-based heuristic analysis, not customer interview output.

### Strengths observed

1. The brand language is visually coherent.
2. The design token system already gives a usable foundation.
3. Collection pages are structurally stronger than the homepage for shopping tasks.
4. Motion and image loading are treated intentionally, not randomly.
5. The site already contains meaningful browsing primitives: search, filters, wishlist, cart, related items.

### Key UX findings

| Priority | Finding | Evidence in repo | UX impact |
|---|---|---|---|
| High | Navigation breadth exceeds implemented depth | `app/data/navMenu.ts` includes many generic `/collections` or `#` paths | Users can enter branches that do not meaningfully narrow choice or complete a task |
| High | Several CTAs are decorative rather than functional | `BrandStorySection.tsx` and `BentoGrid.tsx` contain "Discover More" buttons without destination logic | Premium trust drops when users click and nothing meaningful happens |
| High | PDP content is beautiful but not decision-grade | `app/collections/[category]/[id]/page.tsx` uses generic descriptive, shipping, and care copy with no dimensions, weight, availability, delivery SLA, or proof points beyond a badge | Users lack confidence for a high-consideration purchase |
| High | Commerce affordances imply a fuller system than actually exists | `cart.tsx`, `auth.tsx`, `wishlist.tsx` are client-only and auth is simulated with delays | Users can form expectations the product cannot yet fulfill |
| Medium | Utility interactions are slower than they should be | overlays use long unmount timing through `useDelayedUnmount(..., 1500)`; hero holds for 5 seconds before rotation | Repeated tasks feel slower than a premium commerce experience should |
| Medium | Some interactive UI is not semantic or keyboard-first | category tabs in `MasterpiecesForEveryOccasionSection.tsx` use clickable `div`; brand CTAs use clickable `div` | Accessibility and discoverability suffer |
| Medium | Search is fast but shallow | `SearchOverlay.tsx` matches only literal string fields in memory | Works for 80 items today, but offers weak relevance and little learning value |
| Medium | Homepage tells a strong story but weakly directs task intent | Hero and story sections are dominant; strongest task transitions happen later | First-time users may admire the brand but delay product exploration |
| Low | Trust and service content is not yet structured | no store, guarantee, delivery estimator, returns policy page, or certification explainer route | Not fatal for exploration, but important for conversion maturity |

## 10. Quantitative Analysis

There is no live analytics in the repo today. This section therefore separates measurable current-state facts from measurement that still needs instrumentation.

### 10.1 Current measurable facts from the codebase

- 80 products total
- 16 products per category
- 5 routed collection categories
- 7 homepage sections after the hero
- 7 top-level nav sections
- 42 nav subcategory links
- 31 of those 42 subcategory links resolve to either generic `/collections` or `#`, not a distinct task-specific destination
- 6 secondary/account links in the nav data are placeholders (`#`)
- 5 visible "Discover More" CTAs currently have no distinct destination logic in the reviewed components
- 4 sort options
- 4 price buckets
- up to 14 jewelry types in the model
- 0 analytics events in the repository

### 10.2 Required instrumentation

Add event tracking before major UX redesign decisions are finalized.

#### Core funnel events

- `home_view`
- `hero_cta_click`
- `nav_open`
- `nav_section_select`
- `search_open`
- `search_query_submit`
- `search_result_click`
- `collection_view`
- `filter_open`
- `filter_apply`
- `filter_clear`
- `sort_change`
- `product_view`
- `wishlist_add`
- `cart_add`
- `cart_open`
- `checkout_start`

#### Performance events

- route transition duration
- search result latency
- filter apply latency
- overlay open latency
- LCP
- CLS
- INP

### 10.3 Recommended UX KPIs

| KPI | Why it matters |
|---|---|
| Search success rate | Measures whether users reach a relevant item from intent |
| Filter usage and zero-result rate | Shows if catalogue structure matches user mental model |
| Product view to cart add rate | Core commerce signal |
| Wishlist add rate | Save-intent signal for high-consideration buying |
| Cart open to checkout start rate | Measures product confidence and flow readiness |
| Collection bounce rate | Detects weak category landing pages |
| Repeat visit engagement | Important for jewellery and bridal decision cycles |

## 11. Gathering Insights

Insights should be gathered through a structured synthesis loop, not by isolated opinion.

### Recommended insight workflow

1. Collect qualitative evidence:
   - interview notes
   - usability findings
   - stakeholder constraints
2. Collect quantitative evidence:
   - event funnels
   - search logs
   - filter use
   - performance traces
3. Tag every issue by:
   - frequency
   - user impact
   - revenue impact
   - implementation cost
4. Convert findings into a ranked backlog:
   - now
   - next
   - later

### Insight rule

Do not treat aesthetic preference as user insight. An insight must explain a behavior, a confusion point, a trust problem, or a measurable performance effect.

## 12. Pain Points

### User-facing pain points visible from the current build

1. Users can open navigation branches that do not lead to a distinct outcome.
2. The homepage creates desire but does not consistently accelerate product finding.
3. Product pages do not yet answer the practical questions that justify premium price.
4. Search supports exact matching better than intent matching.
5. The product appears commerce-ready before commerce readiness actually exists.
6. Utility overlays prioritize cinematic transitions over repeated-use speed.
7. Some clickable elements are not semantically buttons or links.

### Business-facing pain points

1. No analytics means no defensible prioritization.
2. No backend means no real trust loop from browse to order.
3. Placeholder IA makes it harder to evaluate actual category demand.
4. The design system is visually defined but not yet interaction-complete.

## 13. User Persona Baseline

These are evidence-backed audience segments derived from the repository and brand documentation. They are not interview-validated personas yet.

| Segment | Evidence in repo | Current built-for tasks | Validation status |
|---|---|---|---|
| Heritage Collection Explorer | `ClaudeDesign.md` positioning, category-first IA, editorial homepage sections | browse collections, compare visual styles, add to wishlist/cart | not user-validated |
| Bridal Shopper | dedicated Bridal route, bridal nav section, bridal hero copy, Inner Circle bridal offers | browse bridal collection, compare statement pieces, save intent, add to cart | not user-validated |
| Gift Buyer | "Gifts" nav section, occasion-led messaging, boxed-premium cues | discover giftable products, shortlist, save, add to cart | not user-validated |
| Loyalty / Returning Member | Inner Circle section, auth overlay, wishlist, cart persistence | return, resume intent, access member framing, re-engage | not user-validated |

### What must be validated in research

- first-entry intent by segment
- price sensitivity
- trust triggers
- preferred browse path
- preferred comparison pattern
- what "premium silver" must prove before purchase

## 14. Customer Journey Mapping

This map reflects the current product surface as implemented.

| Stage | User goal | Current touchpoints | Current strength | Current gap | UX requirement |
|---|---|---|---|---|---|
| Awareness | Understand what Goyaz is | Hero, brand story, social proof | strong visual identity | task entry is delayed | offer clear early browse pathways |
| Exploration | Find a relevant category | nav menu, homepage category rail, collections index | categories exist and are visually distinct | many nav paths are generic or placeholder | simplify IA and remove dead ends |
| Narrowing | Reduce options | filters, sorting, collection layout | filter drawer is present and fast | relevance is shallow and state explanation is limited | improve filter semantics and result trust |
| Evaluation | Judge a product | PDP gallery, price, description, accordions | premium visual treatment | insufficient specs and proof content | add decision-grade product information |
| Save Intent | Keep options for later | wishlist, local auth, cart | low-friction local persistence | no account-backed continuity | clarify saved state and roadmap for persistence |
| Conversion | Commit to purchase | add to cart, cart sidebar | add-to-cart flow is immediate | no real checkout | do not over-promise before checkout exists |
| Retention | Return and continue | navbar counts, local persistence, Inner Circle framing | visible state memory | no analytics or real member system | instrument return behavior and design actual loyalty flow |

## 15. Design System

### 15.1 Existing design system assets

The repository already contains a usable foundation.

### Tokens already defined

From `app/globals.css`:

- brand color palette
- typography tokens
- spacing scale
- radius tokens
- shadow tokens
- layout tokens
- motion tokens

### Components already established

- navbar
- nav menu
- footer
- hero media carousel
- section heading
- product cards
- collection hero banner
- page header
- collection explorer
- filter drawer
- empty state
- search overlay
- wishlist overlay
- cart sidebar

### Motion system already established

From `app/utils/animations.tsx`:

- reveal wrappers
- staggered reveal
- reduced motion support
- marquee support
- magnetic interactions
- delayed unmount helpers

### 15.2 Design system gaps

The current system is visually defined, but not yet fully standardized for interaction quality.

### Missing or incomplete standards

1. Focus-visible token and consistent focus ring behavior
2. Semantic interaction rules for clickable elements
3. Standardized button hierarchy and loading states
4. Standardized link behavior for editorial CTAs
5. Form field tokens and validation states
6. Empty, loading, and error patterns beyond isolated components
7. Standardized trust modules for PDP
8. Motion duration policy by task type
9. Overlay performance policy
10. Event taxonomy tied to component states

### 15.3 Recommended design system additions

### Component families to formalize next

- buttons: primary, secondary, tertiary, text, icon
- chips: filter chip, active chip, removable chip
- overlays: search, drawer, modal
- commerce modules: product card, PDP info stack, trust panel, service panel
- feedback states: empty, error, loading, success
- navigation modules: category tabs, breadcrumb, section rail

### Rules to formalize

- minimum 44x44 tap target on mobile
- all interactive elements use `button` or `a`
- decorative images use empty alt, product and content images use meaningful alt
- motion for utility surfaces should generally complete within 150-300ms
- long cinematic motion should be limited to non-blocking brand moments

## 16. Performance and Low-Latency UX Requirements

### Current good patterns worth keeping

1. AVIF usage for imagery
2. lazy loading on non-critical images
3. in-memory search and filters at current catalogue size
4. centralized motion logic
5. route pre-generation for category pages

### Current performance risks

1. 1500ms delayed unmount on utility overlays is too long for repeated use
2. heavy reliance on client components for some shopping surfaces
3. plain `img` usage is widespread, with selective use of `next/image`
4. hero video plus long transitions can dominate above-the-fold attention
5. preloading many nav images may scale poorly as content grows

### Required UX performance standards

| Interaction | Target |
|---|---|
| search open | under 150ms perceived |
| search results | under 400ms |
| filter apply | under 400ms |
| add to cart | under 100ms feedback |
| cart open | under 200ms |
| nav open/close | under 250ms |
| route change to category | under 500ms perceived |

### Required technical performance standards

| Metric | Target |
|---|---|
| LCP | under 2.5s |
| CLS | under 0.1 |
| INP | under 200ms |
| JS shipped to first view | minimize; keep client islands narrow |

### Implementation guidance

1. Keep Server Components as default wherever interactivity is not required.
2. Reserve client state for search, filters, drawers, cart, wishlist, and other utility islands.
3. Convert critical commerce imagery to `next/image` when layout and loading priority justify it.
4. Reduce overlay exit timing from cinematic to task-appropriate.
5. Keep search and filter results instant at current scale; if data becomes remote, use optimistic UI and cached responses.

## 17. Problem-Solving Design Process

This is the recommended delivery process for this product.

### Step 1: Diagnose

- audit flows
- map IA
- identify dead ends
- define primary tasks
- define trust gaps

### Step 2: Research

- validate segments
- test current navigation
- test current PDP comprehension
- record search and filter behavior

### Step 3: Define

- prioritize high-impact UX issues
- write flow-level requirements
- define event taxonomy
- define performance targets

### Step 4: Design

- redesign IA and journey
- formalize component states
- prototype critical flows
- review accessibility and motion

### Step 5: Build

- implement in small, verifiable slices
- preserve token consistency
- avoid introducing unmeasured visual complexity

### Step 6: Measure

- launch instrumentation
- compare funnel and latency metrics
- iterate based on real behavior

## 18. Delivery Timeline

This timeline is expressed in effort days for this codebase, not calendar dates. It avoids assumptions about team size.

| Phase | Work | Effort |
|---|---|---|
| Phase 0 | repository audit, IA audit, KPI definition | 2-3 days |
| Phase 1 | research plan, interview guide, analytics event plan | 2 days |
| Phase 2 | qualitative research execution and synthesis | 5-6 days |
| Phase 3 | analytics instrumentation and baseline capture | 3-4 days |
| Phase 4 | IA redesign and journey mapping updates | 3-4 days |
| Phase 5 | wireframes and interaction model refinement | 4-5 days |
| Phase 6 | high-fidelity UI and design system hardening | 4-6 days |
| Phase 7 | frontend implementation and QA | 6-8 days |
| Phase 8 | post-launch readout and iteration backlog | 2 days |

### Total recommended effort

- minimum: 31 effort days
- safer working estimate: 35-40 effort days

## 19. Immediate Priority Backlog

### P0

1. Remove or resolve placeholder navigation paths.
2. Replace non-functional "Discover More" CTAs with real destinations or remove them.
3. Make all clickable UI semantic and keyboard accessible.
4. Redesign PDP information hierarchy for trust and decision support.
5. Add analytics instrumentation for browse, search, filter, PDP, cart.

### P1

1. Tighten overlay motion timings for utility interactions.
2. Improve search relevance and result grouping.
3. Standardize empty, loading, and error states.
4. Clarify loyalty and saved-state messaging.

### P2

1. Expand commerce readiness only after checkout and account requirements are real.
2. Formalize component documentation and interaction contracts.
3. Optimize image strategy further with a critical-path audit.

## 20. Definition of Done for UI/UX

The next major UX revision should not be considered complete until:

- every primary nav path resolves to a meaningful destination
- homepage clearly supports both storytelling and browsing
- search, filters, and cart feel immediate
- PDP includes decision-grade information
- utility surfaces meet accessibility basics
- analytics are in place
- performance budgets are defined and tested
- design system rules cover states, not just visuals

## 21. Final Recommendation

The strongest next move for Goyaz is not a decorative redesign. It is a conversion-ready UX hardening pass:

1. fix the information architecture
2. make all calls to action real
3. strengthen product decision content
4. cut utility latency
5. instrument the product before scaling it

That sequence will improve both user confidence and design integrity without losing the premium brand character already present in the codebase.
