# UI/UX Research and Product Design Document

## 1. Evidence Rule

This document is based only on the current repository implementation.

- Reviewed source areas: `src/app`, `src/components`, `src/config`, `src/hooks`, `src/store`, `src/types`, `src/app/api`, `src/middleware.ts`.
- No interview transcripts, analytics dashboards, CRM exports, session recordings, call logs, booking conversion reports, or Lighthouse traces are present in the repository.
- Because of that, all current-state findings below are evidence-backed, while all research recommendations are explicitly marked as work to be completed.

## 2. Current Product Snapshot

SHOW OFF is currently implemented as a premium salon and grooming website with a strong luxury visual identity and a clear commercial intent around consultation and appointment booking.

### Current product surface found in code

- Home page with hero, about, experience, services, portfolio, booking, testimonials, and team sections.
- Dedicated pages for services, service detail, products, product detail, gallery, hair fixing, blog/storytelling, contact, book, and dashboard.
- A booking API route at `src/app/api/booking/route.ts`.
- A Google reviews API route with static fallback and 1-hour revalidation at `src/app/api/google-reviews/route.ts`.
- Middleware protection for `/dashboard`.

### Quantified content inventory from the codebase

- `6` top-level navigation items.
- `38` services across `6` service categories.
- `20` products across `4` product categories.
- `9` gallery entries.
- `23` selectable booking time slots.
- `3` hero banners in the home carousel.
- `2` different booking interfaces.
- `7` below-the-fold home sections lazy-loaded with `next/dynamic`.

## 3. Problem Statement

The core UX problem is not visual quality. The visual direction is already premium. The product problem is that the path from discovery to booking is not yet operationally consistent.

Users currently need to do three things successfully:

1. Understand what service fits their need.
2. Trust the brand enough to commit.
3. Complete a booking with minimal friction and high confidence.

The current implementation supports all three in principle, but the user journey is fragmented by inconsistent booking logic, inconsistent business data, and uneven system reliability.

## 4. Product Goals

These goals are grounded in the current product behavior and page structure.

### Primary goals

- Increase completed consultation or booking submissions.
- Reduce time from landing on the site to selecting a service and submitting intent.
- Improve trust through consistent salon details, proof, and service clarity.
- Make high-value services like hair fixing, bridal styling, and treatments easier to understand and easier to book.
- Preserve the premium brand feel while reducing friction in task-heavy flows.

### Secondary goals

- Improve product and service discovery depth without making browsing feel heavy.
- Support repeat users with a credible dashboard or account area.
- Create a reusable design system so future pages remain consistent.

### Measurement note

No live KPI instrumentation is currently visible in the repository, so these goals cannot yet be measured. Instrumentation must be added before claiming success.

## 5. Product Goals to Measure

The repository does not contain analytics. The following are the minimum metrics required for a real product view:

- Service detail page visit to booking start rate.
- Booking start to booking completion rate.
- Contact page visit to submission rate.
- Drop-off rate by booking step.
- Click-through rate on primary CTAs: navbar, hero, floating actions, service cards.
- Review section engagement and scroll depth.
- Page performance: LCP, INP, CLS, TTFB.
- Conversion by service category.

## 6. Design Strategy

The right design strategy for this product is not a visual overhaul first. It is a trust-and-conversion strategy supported by performance discipline.

### Strategy pillars

- One booking system, not multiple competing versions.
- One source of truth for service, price, duration, hours, contact details, and location.
- Strong service discovery with clear category, duration, pricing, and outcome framing.
- Luxury brand expression without sacrificing speed, readability, or task completion.
- Server-first rendering for content, client interactivity only where it adds real value.
- A measurable funnel from landing to confirmed booking.

## 7. Scope of Work

### In scope

- UX audit of all public conversion journeys.
- Content and IA audit for services, products, booking, contact, and trust sections.
- Booking flow redesign and unification.
- Research plan and measurement plan.
- Design system definition for tokens, components, states, and motion.
- Performance-oriented UI recommendations for image-heavy and motion-heavy screens.

### Out of scope unless business confirms it

- Final business pricing strategy.
- CRM selection.
- Operational staffing logic for real-time slot capacity.
- Back-office workflow design beyond the current dashboard placeholder.
- Brand rewrite beyond UX-critical copy changes.

## 8. Design Process

### Phase 1: Discover

- Audit current pages, components, routes, and APIs.
- Map all booking-related entry points.
- Inventory all trust signals, proof points, and operational data.
- Identify all content inconsistencies and dead-end states.

### Phase 2: Define

- Define primary user tasks.
- Define the target funnel.
- Separate brand storytelling pages from conversion pages.
- Define performance and usability success criteria.

### Phase 3: Research

- Conduct qualitative interviews and usability sessions.
- Collect quantitative event data.
- Compare first-time visitors with repeat clients.
- Validate service-category-specific intent.

### Phase 4: Design

- Redesign service listing, service detail, and booking handoff.
- Simplify form states, feedback, and confirmation patterns.
- Standardize CTA hierarchy, copy, and destinations.
- Create scalable desktop and mobile component rules.

### Phase 5: Validate

- Run moderated task tests.
- Review analytics and booking drop-off.
- Check accessibility, performance, and content clarity.

### Phase 6: Ship and Measure

- Release high-impact flow improvements first.
- Track conversion and performance changes.
- Iterate on real evidence, not preference.

## 9. Qualitative Analysis

This section is a heuristic qualitative review of the product as implemented. It is not a replacement for user interviews.

### Observed strengths

- The visual identity is distinctive and consistent: black, gold, mint, editorial serif typography, and premium imagery.
- The site clearly communicates premium positioning and legacy.
- Service breadth is strong and supports multiple audience types.
- The home page is structured around discovery, proof, and booking.
- Service detail pages provide price and duration context, which is useful for decision-making.

### Observed UX issues

- There are two different booking experiences with different logic and different outcomes.
- The `/book` page uses a four-step flow with API submission, but the reusable booking section on home and contact simulates submission locally and does not persist data.
- Service-detail booking links pass `?service=<slug>`, but the booking systems do not consistently consume that value.
- The booking section only understands six generic service values, while the service catalog uses detailed service slugs.
- CTA destinations are inconsistent. For example, the floating action "Book Now" goes to `/contact`, while other booking CTAs go to `/book`.
- Validation is incomplete. The multi-step booking form advances steps without enforcing current-step validation, even though validation logic exists in `useBooking.ts`.
- Error handling is weak. Booking submission failures are silently swallowed in `BookingForm.tsx`.
- Dashboard trust is weak. Middleware protects `/dashboard`, but the dashboard layout hardcodes `isAuthenticated = true`.
- Multiple text encoding issues are visible in source content, which can degrade polish and trust if rendered.

## 10. Quantitative Analysis From the Current Build

Only code-level quantification is possible right now.

### Quantified operational findings

- `2` booking patterns exist: one API-backed, one simulated.
- `0` visible analytics events or telemetry hooks are present.
- `0` visible real booking persistence integrations beyond a mock API response are present.
- `0` visible auth API routes are present, even though client auth logic references `/api/auth/login`.
- `1` external review data integration exists, with `3600` second revalidation.
- `7` home sections are deferred below the fold with `next/dynamic`.
- `3` hero slides exist, each with desktop and mobile assets.

### Quantified consistency issues

- Hours conflict:
  - booking section shows `09:00 AM - 08:00 PM`
  - footer shows `9:00 AM - 9:00 PM`
  - available slots stop at `08:00 PM`
- Contact details conflict:
  - hero marquee shows `+91 12345 67890` and `123 Main Street, Bangalore`
  - booking section and footer use `+91 98765 43210`
  - booking section uses `123 Salon Street, Mahadevapura, Bangalore`
  - footer uses `Mahadevapura, Pai Layout`

## 11. Gathering Insights

Because research data is not present, insight gathering must start with structured inputs.

### Sources to gather

- Existing customer call logs and WhatsApp inquiry themes.
- Appointment cancellation reasons.
- High-value service enquiry patterns, especially hair fixing and bridal.
- Search intent by landing page and service category.
- Scroll depth and CTA click distribution.
- Booking abandonment by step.
- Review text themes from Google and direct customer feedback.

### Insight method

- Triangulate behavior, language, and conversion.
- Do not rely on stakeholder opinion alone.
- Separate premium-brand expression issues from task-friction issues.

## 12. User Research Plan

There is no validated research dataset in the repository. The following is the required plan to create one.

### Research objectives

- Understand how users choose among salon, treatment, bridal, grooming, and hair-fixing services.
- Identify what information users need before they trust the salon enough to book.
- Identify where users abandon the flow.
- Understand differences between first-time and repeat visitors.

### Recommended methods

- `6-8` moderated interviews with recent customers.
- `5-7` task-based usability tests on service discovery and booking.
- Short intercept survey on booking hesitation.
- Review mining from Google reviews and WhatsApp/call transcripts.
- Funnel instrumentation across service pages and booking steps.

### Research questions

- What makes a user trust the salon enough to book online?
- What information is missing when comparing services?
- Do users want category-level booking or exact-service booking?
- What makes hair fixing enquiries feel safe and private?
- What proof matters most: founder legacy, reviews, results gallery, pricing clarity, or consultation reassurance?

## 13. Pain Points

These pain points are grounded in the current implementation.

### Conversion pain points

- Booking starts in multiple places but does not behave consistently.
- Service-to-booking handoff is not reliably prefilled.
- Users can reach the confirmation step with incomplete or invalid data.
- Contact-form submission on home/contact does not create a real booking record.

### Trust pain points

- Phone number, address, and hours are inconsistent across the interface.
- Mixed static and live review states are not clearly explained to the user.
- Placeholder dashboard states reduce confidence in the account experience.
- Encoding artifacts weaken premium polish.

### Information pain points

- Service categories are broad, but booking and handoff logic do not consistently map to actual service items.
- Hair fixing is treated as a premium specialty, but confidentiality and consultation reassurance can be made much stronger.
- Products are visually browsable but not yet clearly connected to services or aftercare.

### Performance pain points

- Many pages are client components mainly to support motion, even when most content is static.
- Hero slides render separate desktop and mobile image nodes, which increases image management complexity and payload risk.
- Testimonials are fetched on the client, delaying trust content compared with a server-rendered approach.

## 14. User Persona View

Validated personas do not exist in the repository. The safest evidence-based approach is to define current user segments directly from the implemented service model.

| User segment | Evidence in product | Primary goal | Trust need | Friction risk |
|---|---|---|---|---|
| First-time premium salon visitor | Home, services, testimonials, about, legacy copy | Understand quality and choose a service | Proof of expertise, clear prices, polished booking | Too much storytelling before task clarity |
| Hair transformation customer | Haircuts, coloring, treatments, gallery | Compare outcome-driven services | Before/after proof, duration, price, consultation clarity | Hard to tell which service fits their specific need |
| Hair fixing consultation seeker | Dedicated hair-fixing page, founder authority, grooming catalog | Discreet expert consultation | Privacy, specialization, natural result confidence | Needs stronger confidentiality and consultation reassurance |
| Bridal or event customer | Bridal service category, blog credibility, reviews | High-stakes booking with confidence | Experience proof, planning clarity, premium handling | Needs package structure and event-specific timeline cues |
| Repeat grooming client | Grooming services, dashboard placeholder | Fast rebooking | Speed, consistency, familiar contact details | Current rebooking path is weak and dashboard is not operational |

## 15. Customer Journey Mapping

### Current-state journey

| Stage | User intention | Current touchpoints | UX strength | UX gap |
|---|---|---|---|---|
| Discover | Find a trusted premium salon | Home hero, SEO pages, blog, gallery | Strong visual identity | Operational details are inconsistent |
| Explore | Compare categories and offerings | Services page, service detail pages, products, gallery | Broad catalog and rich imagery | Service selection and booking handoff are not tightly connected |
| Build trust | Verify credibility | Testimonials, founder story, awards, hair-fixing page | Strong premium storytelling | Some proof is static fallback and not clearly framed |
| Decide | Choose exact service or consultation type | Service detail pages, booking CTAs | Price and duration are visible | Query-prefill logic is unreliable |
| Book | Submit date, time, and personal details | `/book`, booking section, contact page | Dedicated booking UI exists | Two different systems create confusion and inconsistent outcomes |
| Confirm | Receive confidence that appointment exists | Success state in forms | Visual success state exists | No visible email/SMS/WhatsApp confirmation workflow |
| Return | Manage or rebook | Dashboard | Intent exists | Current dashboard is placeholder-only |

### Target-state journey

- One consistent booking entry system.
- Service-detail page passes exact service context into booking.
- Real availability and confirmation behavior.
- Strong reassurance around privacy, expertise, and expected next step.
- Repeat customers can rebook in fewer steps.

## 16. Low-Latency and High-Performance UX Requirements

Performance is part of UX for this product because it is image-heavy, animation-heavy, and conversion-focused.

### Current positive implementation choices

- Home below-the-fold sections are lazy-loaded.
- `next/image` is used broadly with `sizes`.
- Service detail pages use static params.
- Google review data is cached.
- Fonts use `display: swap`.

### Required performance targets

- LCP under `2.5s`.
- INP under `200ms`.
- CLS under `0.1`.
- Booking step transition under `150ms` perceived response time.
- Form submission feedback visible immediately.

### Performance design actions

- Prefer server components for content-led pages and sections.
- Keep Framer Motion only where it supports meaning, not everywhere by default.
- Consolidate hero image strategy to reduce duplicate asset cost.
- Server-render reviews where possible.
- Optimize image dimensions and avoid oversized artwork for grids.
- Use skeletons only where wait time is real and meaningful.
- Keep booking APIs fast and explicit about failure states.

## 17. Design System

The project already contains the beginnings of a design system in `src/app/globals.css` and `src/components/ui`, but it is not yet governed as a product system.

### Existing foundations found in code

- Colors:
  - gold `#c9a84c`
  - gold light `#d4b96a`
  - mint `#9bffa3`
  - black and dark neutral base
  - muted gray palette
- Typography:
  - Playfair Display
  - Poppins
  - IM Fell English
  - Wittgenstein
  - Futura PT
- Motion tokens:
  - fade-in
  - slide-up
  - slide-down
  - scale-in
  - marquee
- Spacing token:
  - section spacing token at `100px`

### Current design-system issues

- Business data is not tokenized or centralized.
- Component behavior is inconsistent across booking forms.
- Status, validation, and error states are not systemized.
- CTA hierarchy is not enforced consistently.
- Motion usage is aesthetic but not governed by performance budgets.

### Recommended design-system structure

- Foundations:
  - semantic color tokens
  - typography scale
  - spacing scale
  - radius scale
  - elevation and border rules
- Components:
  - buttons
  - links
  - inputs
  - selects
  - textareas
  - cards
  - steppers
  - service tiles
  - testimonial cards
  - form feedback states
- Patterns:
  - service discovery grid
  - service detail layout
  - booking funnel
  - trust section
  - location/contact block
  - sticky action cluster
- Rules:
  - single source of truth for operational content
  - accessible focus states
  - responsive image behavior
  - motion reduction support
  - performance budget per page type

## 18. Scope and Timeline

This is a practical delivery plan for a UX-research-plus-design-system engagement on the current product.

| Week | Focus | Deliverables |
|---|---|---|
| Week 1 | Audit and discovery | UX audit, content audit, flow map, inconsistency log |
| Week 2 | Research setup | interview guide, survey plan, event taxonomy, KPI definition |
| Week 3 | Research execution | interview notes, usability findings, review-theme analysis |
| Week 4 | Flow redesign | booking funnel redesign, service-to-booking handoff, CTA hierarchy |
| Week 5 | Design system | token model, component specs, responsive behavior, interaction states |
| Week 6 | Validation and handoff | prioritized roadmap, performance checklist, implementation guidance |

## 19. Priority Roadmap

### P0

- Unify booking flows into one real system.
- Fix service prefill logic end to end.
- Centralize phone, address, hours, and email.
- Add validation and error handling to all booking states.

### P1

- Add analytics and funnel instrumentation.
- Improve trust sections with clearer review sourcing and stronger consultation reassurance.
- Redesign repeat-booking and dashboard strategy.

### P2

- Tighten motion usage and optimize heavy visual sections.
- Connect products with services and aftercare.
- Expand design-system governance and documentation.

## 20. Final Recommendation

The current product does not need a brand reinvention. It needs UX consolidation.

The highest-value move is to turn the current premium presentation into a reliable premium booking experience by fixing journey consistency, data consistency, and measurable conversion behavior. Once that is stable, the design system and performance work will compound value instead of covering operational gaps with visuals.
