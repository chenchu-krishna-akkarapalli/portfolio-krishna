# Arknetic UI/UX Strategy

## 1. Document Basis

This document is based on the current repository state, not on external market claims or invented user data.

Reviewed product evidence:

- `client/Arknetic-Home-Page-UI-1/client/src/App.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/pages/HomePageUi.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/pages/CollectionsPageUi.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/pages/ProductDetailsPageUi.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/pages/sections/HeaderSection.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/pages/sections/OfficeWearProductListSection.tsx`
- `client/Arknetic-Home-Page-UI-1/client/src/store/useBrandStore.ts`
- `client/Arknetic-Home-Page-UI-1/client/src/store/useCartStore.ts`
- `client/Arknetic-Home-Page-UI-1/client/src/store/useAuthStore.ts`
- `client/Arknetic-Home-Page-UI-1/client/src/hooks/useProducts.ts`
- `client/Arknetic-Home-Page-UI-1/client/src/lib/medusa-client.ts`
- `client/Arknetic-Home-Page-UI-1/client/src/styles/design-tokens.css`
- `client/implementation_plan.md.resolved`

What is confirmed from the codebase:

- The product is a dual-brand fashion e-commerce experience: `Arknetic Fashion` and `Arknetic Collections`.
- The frontend stack is React, Vite, Zustand, TanStack Query, Tailwind, Radix UI, and Google OAuth.
- There are three main customer-facing surfaces implemented today: home, collections listing, and product detail.
- Brand state is persisted in Zustand and mapped to CSS theming through a `data-brand` attribute.
- Medusa is intended as the commerce backend.
- A design token file exists, but many page implementations still use hardcoded values.

What is not confirmed in the repository:

- No real user interview outputs.
- No analytics implementation or event taxonomy.
- No validated conversion funnel data.
- No real search behavior, filter usage data, or checkout completion data.
- No confirmed brand-specific sales channel separation in production data.

Because of that, this document separates:

- current-state facts
- evidence-based UX issues
- research work required to validate decisions
- implementation recommendations and delivery scope

## 2. Product Context

Arknetic is being shaped as a fashion commerce platform with two distinct brand expressions:

- `Arknetic Fashion`: broader discovery-led browsing with home-page-led storytelling, new arrivals, office wear, party wear, and promotional content.
- `Arknetic Collections`: more curated and intent-driven browsing with category, size, color, price range, and sorting controls.

Current route structure:

- `/` -> home page
- `/collections` -> collection listing page
- `/product/:id` -> product detail page

Current product architecture suggests these core UX jobs:

- help users understand the difference between the two brands fast
- let users discover products without friction
- support confident product evaluation on detail pages
- move users to cart and purchase with low hesitation
- keep the experience responsive even with media-heavy fashion presentation

## 3. Core Problem Statement

The main UI/UX problem is not only visual polish. It is clarity, speed, and trust across a dual-brand commerce journey.

Current product risk areas:

- Brand positioning is visible, but the user benefit of switching brands is not explicit enough.
- The home page mixes editorial presentation and shopping intent, but not every visual element is tied to a clear conversion path.
- The listing page contains filtering and sorting UI, but the current implementation is mostly local state and static content.
- The product detail page shows size selection and care details, but key commerce confidence signals are incomplete or placeholder-driven.
- Performance risk is high because the experience is media-heavy, uses large fixed layouts, and starts with autoplay video.
- Data trust risk exists because both brands currently reference the same sales channel ID placeholder.

## 4. Product Goals

### Business Goals

- Establish Arknetic as a credible premium fashion commerce experience.
- Differentiate `Fashion` and `Collections` clearly enough that users understand when to browse each.
- Increase discovery-to-product-detail progression.
- Increase product-detail-to-cart progression.
- Reduce abandonment caused by unclear product information, weak filtering, or slow interactions.

### User Goals

- Understand the brand and category structure quickly.
- Find relevant products with minimal effort.
- Compare products by style, price, size, and availability.
- Make a purchase decision with enough trust signals.
- Move between browsing and buying without delay.

### UX Performance Goals

- Important navigation feedback should feel immediate.
- Product list updates should feel under the Doherty threshold.
- First product impression on landing pages should not be blocked by heavy media.
- Mobile and desktop should feel intentionally designed, not desktop-first squeezed into smaller screens.

## 5. Current-State UX Audit

### Confirmed Strengths

- A recognizable dual-brand concept is already present in routing, navigation, and token structure.
- Zustand plus TanStack Query is a strong technical base for low-latency catalog experiences.
- The design token file already defines brand, typography, spacing, radius, shadow, motion, and z-index foundations.
- The home page includes a clear visual merchandising approach.
- The listing page includes expected e-commerce controls: filter, sort, grid options, and product count.
- The product detail page includes image gallery, sizing, stock cue, and supporting care information.

### Confirmed UX Gaps

- `HomePageUi.tsx` and `NewArrivalsInfoSection.tsx` route users to a hardcoded `/product/1`, which breaks product relevance and trust.
- `ProductDetailsPageUi.tsx` still contains placeholder copy (`Lorem ipsum`) in a decision-critical area.
- `CollectionsPageUi.tsx` uses static product arrays, static count (`154 Products`), and local-only filter/sort state.
- `useBrandStore.ts` maps both brands to the same sales channel ID placeholder, so brand switching is not meaningfully proven at data level.
- `useProducts.ts` also hardcodes the same collections and fashion channel IDs.
- No analytics or behavioral instrumentation is visible in the frontend code.
- `App.tsx` still has a `YOUR_GOOGLE_CLIENT_ID` fallback, which signals auth is not fully production-ready.
- `HeaderSection.tsx` contains unresolved route-to-brand sync commentary, which indicates logic ambiguity.
- The design token system exists, but page-level code still relies heavily on raw pixel values and raw colors.
- The home page hero uses autoplay video from first paint, which increases bandwidth and render pressure.

### UX Consequence

The current product can demonstrate art direction and front-end intent, but it is not yet a reliable, measurable, high-confidence commerce UX system.

## 6. Product Design Strategy

### Strategy Pillars

#### 1. Brand Clarity Before Brand Beauty

Users must understand:

- what `Arknetic Fashion` is for
- what `Arknetic Collections` is for
- why they should switch brands

The smart switch should not behave like a decorative toggle. It should communicate distinct shopping missions.

#### 2. Recognition Over Recall

Navigation, filtering, and product selection should reduce memory load.

Applied patterns:

- persistent category language
- visible filter summaries
- clear active states
- product cards that expose decision-relevant information without opening the PDP

#### 3. Low-Latency Commerce Interaction

Perceived speed matters as much as raw speed.

Applied patterns:

- optimistic or instant visual feedback on tap and click
- skeletons where real content is loading
- cached product lists by brand and filter
- no blocking transitions before the user can act

#### 4. Progressive Disclosure

Do not overload first view with every choice.

Applied patterns:

- expose the key purchase decision first
- move fabric care, extended details, and supporting info below or beside primary actions
- keep mega-menu content structured, not dense

#### 5. Trust-Centered E-commerce UX

Fashion buying requires confidence.

Trust signals required:

- real stock state
- real sizes and size guidance
- real shipping and return information
- real image-to-product consistency
- real pricing rules

## 7. Problem-Solving Framework

Every UX decision should be evaluated through this sequence:

1. What user task is being completed?
2. What friction currently blocks that task?
3. Is the friction caused by information architecture, content, interaction design, performance, or data quality?
4. What is the smallest design change that removes the friction?
5. How will that change be measured?

Applied to Arknetic:

- If users do not switch brands, the likely problem is not animation. It is unclear brand differentiation.
- If filters are opened but not applied, the likely problem is not only UI styling. It may be weak facet logic, missing counts, or delayed feedback.
- If users reach product detail but do not add to cart, the likely problem is trust, sizing, or decision support.
- If users bounce early, the likely problem may be first-load cost, weak value communication, or navigation ambiguity.

## 8. Scope of Work

### In Scope

- UX audit of current commerce flows
- brand architecture clarification
- navigation and mega-menu redesign rules
- home page information hierarchy
- collections listing UX
- product detail UX
- mobile and desktop responsive specifications
- low-latency interaction design
- analytics event plan for research and optimization
- design system cleanup and governance
- accessibility rules for core commerce surfaces
- state-aware component specifications for loading, empty, error, and success states

### In Scope for Engineering Collaboration

- product list loading strategy
- caching and prefetch strategy
- media optimization rules
- event instrumentation requirements
- component token adoption
- route-level UX acceptance criteria

### Out of Scope Until Implemented

- checkout flow redesign
- order tracking UX
- account dashboard UX
- admin experience
- post-purchase retention programs

These can be added later, but they are not evidenced as current user-facing flows in the reviewed code.

## 9. UI/UX Design Process

### Phase 1. Discovery and Evidence Audit

- review current product routes and interactions
- map intended brand architecture
- identify data placeholders vs real backend dependencies
- define the UX baseline and design debt list

Output:

- current-state audit
- flow map
- issue backlog
- risk register

### Phase 2. Research Setup

- define research questions
- define event taxonomy
- align success metrics with product and engineering
- identify target participants by shopping intent, not assumed demographics

Output:

- research plan
- screener criteria
- interview guide
- event schema

### Phase 3. Qualitative Research

- moderated interviews
- task-based usability sessions
- first-click and navigation comprehension testing
- brand differentiation validation

Output:

- pain point synthesis
- user mental model map
- terminology recommendations

### Phase 4. Quantitative Analysis

- instrument product events
- measure funnel progression
- identify drop-off points
- compare behavior by brand, device, and acquisition source

Output:

- dashboard definition
- conversion funnel
- event quality review

### Phase 5. Experience Redesign

- navigation and brand switch patterns
- home page hierarchy
- list page behavior
- product page decision support
- mobile optimization

Output:

- wireframes
- high-fidelity flows
- component specs
- interaction rules

### Phase 6. Design System and Handoff

- token normalization
- component state documentation
- accessibility and motion rules
- engineering acceptance criteria

Output:

- design system rules
- implementation checklist
- QA criteria

## 10. Proposed Timeline

This is a delivery estimate, not a claim that research or backend readiness already exists.

| Week | Focus | Key Deliverables |
| --- | --- | --- |
| 1 | Audit and alignment | current-state audit, KPI draft, research questions |
| 2 | Research setup | screener, interview guide, event taxonomy, analytics spec |
| 3 | Qualitative research | interview notes, usability findings, navigation insights |
| 4 | Synthesis and IA | pain point matrix, journey map, content hierarchy, prototype direction |
| 5 | Core flow redesign | home, collections listing, PDP, mobile variants |
| 6 | Design system and QA | component specs, token cleanup, accessibility and performance checklist |

If Medusa data modeling, analytics setup, or content readiness are delayed, add 1 to 2 weeks.

## 11. User Research Plan

### Research Objective

Validate whether the current dual-brand commerce structure matches real user shopping behavior and decision needs.

### Primary Research Questions

- Do users understand the difference between `Fashion` and `Collections` without explanation?
- What is the first thing users try to do on the home page?
- Does the navigation help people browse by intent, category, or occasion?
- Which product attributes matter most before opening product detail?
- Which details are required before users feel comfortable adding to cart?
- How much filtering do users actually need on the collections page?
- What causes hesitation in the current product-detail flow?

### Recommended Research Methods

- stakeholder interviews
- moderated user interviews
- task-based usability tests
- first-click tests on navigation
- preference tests for brand switch labeling
- card sorting if category labeling becomes unstable

### Recruitment Criteria

Recruit by shopping behavior, not made-up demographics:

- users who browse fashion inspiration before buying
- users who shop with a strong category or occasion intent
- users who compare sizes, materials, and price carefully
- returning online fashion shoppers who are comfortable with product listing filters

## 12. Qualitative Analysis

### What To Study

- brand understanding
- menu comprehension
- product discovery behavior
- filter confidence
- product evaluation decision flow
- trust signal sufficiency
- mobile shopping comfort

### Session Tasks

- find the difference between the two Arknetic brands
- use the home page to find a product category
- use collections filters to narrow products
- select a product and decide if you would buy it
- interpret size options and fabric details
- attempt add-to-cart or buy-now action

### Qualitative Output Format

- verbatim insight summary
- confusion points by flow step
- severity level
- recommended design response

### Analysis Lens

- clarity
- navigation comprehension
- decision support
- trust
- responsiveness
- accessibility barriers

## 13. Quantitative Analysis

### Current Reality

No analytics implementation is visible in the reviewed frontend. Quantitative analysis therefore requires instrumentation work before conclusions can be treated as fact.

### Core Metrics

- home-to-list click-through rate
- brand switch usage rate
- mega-menu open-to-click rate
- product-card click-through rate
- filter open rate
- filter apply rate
- zero-results rate
- PDP add-to-cart rate
- PDP buy-now rate
- auth start and auth completion rate
- cart abandonment rate

### Recommended Event Taxonomy

- `brand_switch_clicked`
- `brand_switch_completed`
- `nav_item_opened`
- `nav_category_clicked`
- `product_card_impression`
- `product_card_clicked`
- `collection_filter_opened`
- `collection_filter_changed`
- `collection_filter_applied`
- `collection_sort_changed`
- `product_detail_viewed`
- `size_selected`
- `fabric_details_opened`
- `add_to_cart_clicked`
- `buy_now_clicked`
- `login_started`
- `login_succeeded`
- `login_failed`

### Segmentation Rules

- by active brand
- by route
- by device class
- by new vs returning visitor
- by traffic source when available

### Quantitative Questions To Answer

- Is the brand switch a real discovery mechanism or a novelty interaction?
- Which navigation labels generate the highest downstream product engagement?
- Which filters help conversion and which filters create friction?
- Does the product detail page answer the main decision questions before users leave?
- Which device sizes suffer the worst drop-off?

## 14. Insight Gathering Framework

Use a single synthesis model across research and analytics:

| Signal Type | What It Means | Required Action |
| --- | --- | --- |
| repeated confusion in interviews | information architecture or copy issue | rewrite labels or restructure flow |
| low click-through from hero or editorial blocks | weak hierarchy or weak CTA | revise content order and CTA framing |
| high filter open, low apply | filter design or facet logic is not helping | simplify filter model and show outcome feedback |
| high PDP views, low add-to-cart | trust or decision-support gap | improve sizes, stock, shipping, materials, media |
| high bounce on media-heavy pages | speed or message mismatch | reduce payload and simplify above-the-fold |

Insight prioritization rule:

- critical = blocks task completion or trust
- major = slows task completion or reduces confidence
- moderate = creates avoidable friction
- minor = polish, consistency, or aesthetics only

## 15. Pain Points

These pain points are evidence-based from the current implementation.

### Brand and Navigation

- Brand switching exists visually, but the value of switching is not clearly explained in words.
- Navigation labels are broad, but the relationship between the two brands and the category model is still fuzzy.
- The header has unresolved route/brand sync logic comments, which is a product and engineering clarity risk.

### Home Page

- The autoplay hero video can delay meaningful engagement on constrained devices.
- Category cards route to a single hardcoded product path instead of the user-selected context.
- Some homepage merchandising is visually strong but not always tied to explicit intent-based CTA structure.

### Collections Listing

- Product data is static, so listing interactions are not yet trustworthy as a shopping system.
- Product count is hardcoded.
- Filters and sorting appear functional visually, but are not connected to real query behavior.
- Grid layout is highly fixed-width, which is risky for responsive quality and content scaling.

### Product Detail

- Placeholder body copy weakens purchase confidence immediately.
- The page exposes size selection, but broader decision support is incomplete.
- No explicit shipping, return, delivery, or fit reassurance is visible in the reviewed implementation.
- `ADD TO CART` and `BUY NOW` exist, but the surrounding trust system is thin.

### Data and System Quality

- Brand-specific sales channel separation is not yet reliable because both brands currently point to the same placeholder ID.
- Analytics absence means no validated product decisions can be made from behavior data yet.
- Token adoption is partial; design consistency depends too much on local styling choices.

## 16. User Persona Framework

No validated personas exist in the repository. The only honest way to document personas now is to separate confirmed product segments from research validation.

### Confirmed Product Segments From Current IA

#### Persona Segment A: Fashion Discovery Shopper

Confirmed basis in product:

- home page is editorial and discovery-led
- navigation includes `New In`, `Formal Wear`, `Party Wear`, `Women`, `Men`
- promotional visuals and gallery sections support browsing-first behavior

Likely tasks to validate in research:

- browse newness
- discover by occasion
- compare visually before narrowing choices

Likely decision needs to validate:

- trend relevance
- styling confidence
- quick category access
- strong visual merchandising

#### Persona Segment B: Collections Intent Shopper

Confirmed basis in product:

- dedicated `/collections` route
- category, size, color, price range, and sort controls
- product grid structure implies narrower, more deliberate browsing

Likely tasks to validate in research:

- filter down quickly
- compare options by fit, price, and category
- use listing page as a decision surface, not only a browsing surface

Likely decision needs to validate:

- fast filtering
- clear stock and size availability
- stronger product attribute previews on cards

#### Persona Segment C: Returning Buyer / Account-Aware Shopper

Confirmed basis in product:

- Google login component exists
- auth store exists
- cart store exists
- add-to-cart and buy-now flows are present in UI

Likely tasks to validate in research:

- return and continue shopping faster
- trust account-linked actions
- manage repeat purchase decisions with less effort

Likely decision needs to validate:

- account convenience
- saved preferences
- cart continuity

### Persona Deliverable Required After Research

Each validated persona should include:

- shopping mission
- top tasks
- decision criteria
- trust triggers
- frustration triggers
- preferred device context
- language and terminology preferences

## 17. Customer Journey Mapping

### Current-State Journey Based on Implemented Routes

| Stage | User Goal | Current Touchpoint | Current Risk | UX Requirement |
| --- | --- | --- | --- | --- |
| Entry | understand what Arknetic offers | home page hero, navigation, brand switch | brand meaning may not be explicit fast enough | clarify brand proposition above the fold |
| Discovery | browse categories or campaigns | mega-menu, category cards, product sections | navigation is broad; some CTAs are not context-aware | align categories, routes, and product destinations |
| Narrowing | find relevant products | collections page filters and sort | filters are not yet tied to real catalog logic | connect UI state to real product data and counts |
| Evaluation | assess a product | product detail page | placeholder text and limited trust content weaken confidence | improve materials, fit, delivery, returns, and stock clarity |
| Decision | commit to buy | add to cart, buy now, login | actions exist but reassurance is thin | strengthen pre-purchase trust layer |
| Return | come back efficiently | auth and persisted state | value of signed-in state is not yet visible in UX | define repeat-buyer conveniences |

### Target Journey Principles

- entry should explain brand difference in under 5 seconds
- discovery should let users move from inspiration to category fast
- narrowing should provide immediate, visible feedback
- evaluation should answer fit, fabric, price, and stock questions before hesitation grows
- decision should feel safe, fast, and reversible when needed

## 18. Design System Strategy

### Current-State Design System Facts

The project already contains a token layer in `design-tokens.css` with:

- fashion and collections brand colors
- neutral palette
- semantic text and surface colors
- typography tokens
- spacing tokens
- layout tokens
- radius, shadows, transitions, and z-index

### Current Design System Gaps

- pages still use many hardcoded colors and raw pixel values
- component behavior is not documented by state
- accessibility rules are not expressed as component contracts
- responsive rules are page-local instead of systemic
- motion exists visually but is not governed by a shared interaction standard

### Design System Scope

#### Foundations

- brand tokens
- semantic color tokens
- typography scale
- spacing and layout scale
- motion tokens
- elevation and overlay rules

#### Core Commerce Components

- header
- brand switch
- mega-menu
- product card
- category card
- collection toolbar
- filter drawer
- sort dropdown
- product image gallery
- size selector
- primary CTA
- badge and stock indicator
- informational sidebar
- footer subscription form

#### Required States For Every Core Component

- default
- hover
- focus-visible
- active
- selected
- loading
- disabled
- empty
- error

### Design System Governance Rules

- no raw hex values in feature code when semantic or brand tokens exist
- no new spacing values without token review
- no component should ship without keyboard and focus behavior defined
- no commerce component should ship without loading and empty states
- route-level UI should reuse tokens before creating one-off styles

## 19. Low-Latency and High-Performance UX Requirements

### UX Latency Targets

- interaction acknowledgment: immediate visual response on tap/click
- list filtering or sorting feedback: under 300 ms perceived response when cached, otherwise skeleton plus progress affordance
- navigation transitions: under 200 ms perceived delay before user sees a result or loading state
- product image reveal: first useful image prioritized above decorative media

### Web Performance Targets

- LCP under 2.5 s on mobile on production-grade networks
- INP under 200 ms
- CLS under 0.1
- image payload and autoplay media controlled aggressively on landing surfaces

### Implementation Priorities

- replace blocking hero-video dependence with poster-first strategy
- use responsive image sizing and lazy loading for all below-the-fold media
- prefetch likely next-step product detail data from listing interactions
- keep TanStack Query cache keys aligned to brand and filter state
- avoid large fixed-height sections that delay layout stabilization
- instrument slow states before optimizing them blindly

### Perceived-Performance Patterns

- skeletons instead of blank regions
- optimistic pressed and selected states
- sticky filter summaries on mobile
- visible loading when a query changes
- preserve context during updates instead of flashing full re-renders

## 20. Accessibility Requirements

### Baseline

- WCAG 2.1 AA minimum

### Commerce-Critical Accessibility Rules

- all interactive controls must be keyboard reachable
- all custom toggles must expose programmatic state
- focus-visible styling must be strong and consistent
- text contrast must meet WCAG minimums across both brands
- color must never be the only selected-state indicator
- filter and size selections must expose selected state to assistive tech
- images must have meaningful alt text when they carry product information
- autoplay media must not block control, reading, or orientation

### Current Accessibility Risks

- heavily visual areas may rely too much on image-only interpretation
- some custom interactive structures need stricter state semantics
- fixed-width layouts will create scaling pressure for zoom and smaller screens

## 21. Deliverables

Required UI/UX deliverables for this product phase:

- current-state UX audit
- prioritized pain point register
- validated research plan
- event taxonomy and KPI model
- navigation and IA recommendations
- home, collections, and PDP redesign flows
- mobile and desktop wireframes
- high-fidelity UI aligned to token system
- design system usage guide
- accessibility checklist
- performance checklist
- engineering handoff notes

## 22. Acceptance Criteria

This work is successful when:

- users understand the two-brand structure without extra explanation
- product discovery routes are context-aware and data-backed
- collection filters and sort drive real query results
- PDP copy and trust content are no longer placeholder-driven
- performance and perceived speed improve together
- component styling is token-led rather than page-led
- research and analytics can validate future UX changes with evidence

## 23. Immediate Next Actions

1. Replace placeholder and hardcoded commerce paths with real product-driven routing.
2. Separate real Medusa sales channels for `Fashion` and `Collections`.
3. Instrument the event taxonomy before major redesign decisions.
4. Redesign the brand switch value proposition and supporting copy.
5. Connect collections filtering, sorting, and count to live catalog queries.
6. Rewrite PDP trust content: materials, fit, delivery, returns, and care.
7. Normalize page code to use design tokens instead of one-off values.
8. Audit mobile layouts and media loading before adding more visual weight.
