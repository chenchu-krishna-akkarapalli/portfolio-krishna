# UI/UX Strategy and Research Document

## 1. Document Basis

This document is based only on observable project artifacts in this repository as of 2026-05-31. It does not invent user metrics, interview outcomes, or business decisions that are not present in the codebase.

### Confirmed evidence used

- Product brand: `Tarun Marimganti & Associates`
- Product type: multi-page React + Vite website for chartered accountancy, tax, compliance, advisory, and litigation services
- Primary routes present in code:
  - `/`
  - `/about`
  - `/services`
  - `/connect`
  - `/blog`
  - multiple `/services/...` detail pages
- Core conversion surfaces present in code:
  - homepage contact form
  - dedicated contact page form
  - click-to-call
  - email CTA
  - service exploration CTA
  - blog-to-service discovery
- Instrumentation present in code:
  - Google Tag Manager
  - Microsoft Clarity behind consent management
- Performance work present in code:
  - lazy route loading
  - manual chunk splitting
  - image optimization
  - AVIF responsive images
  - service worker registration deferred to idle
  - web vitals deferred to idle
  - font preload strategy
  - preloaded hero image
  - Brotli and gzip compression
  - `content-visibility` for below-fold content

### Evidence gaps

The repository does not include any of the following:

- user interview transcripts
- usability test recordings
- analytics dashboard exports
- conversion funnel reports
- A/B test results
- accessibility audit report
- heatmap analysis output
- business KPI documentation

Where this document includes personas, journey stages, or prioritization logic, those items are explicitly marked as code-based inference or recommended research work.

## 2. Product Overview

### Product name

Tarun Marimganti & Associates

### Product category

Professional services website for accounting, taxation, audit, compliance, business advisory, NRI support, and tax litigation.

### Observable product structure

The site currently functions as a high-information, service-led acquisition platform with the following major areas:

1. Homepage
2. About page
3. Services listing page
4. Contact page
5. Blog index
6. Blog detail pages
7. Large set of service landing pages built from a shared service template

### Observable service clusters

From navigation and route structure, the service taxonomy currently includes:

- Start Business
- Registrations
- NRI Services
- Compliance
- Reports
- Audit and Assurance
- GST
- Income Tax
- FDI
- Company Law
- Funding
- Agreements
- Tax Litigation

This is a broad catalog. The current UX challenge is not lack of content. The challenge is helping users quickly identify the right service path and convert without friction.

## 3. Problem Statement

### Primary UX problem

The product must turn a complex and regulation-heavy service offering into a fast, trustworthy, low-friction experience for users who are often not experts in finance, tax, compliance, or company law.

### Secondary UX problems observed in the current product

- The service catalog is very wide, which increases decision load.
- Navigation is information-rich but can become cognitively heavy, especially on first visit.
- There are multiple conversion points, but there is no visible step-based intent capture or qualification layer.
- Service discovery depends heavily on browsing and menu scanning instead of guided diagnosis.
- Contact forms collect useful information, but the submission flow does not show trust-building signals such as response-time assurance beyond copy.
- Some pages use heavy visual motion and premium transitions, which improve brand feel but can risk interaction cost if not carefully controlled.
- The site supports discovery and trust well, but the path from uncertainty to the correct service is still mostly user-driven.

## 4. Product Goals

## Confirmed product goals inferred from implementation

These goals are strongly supported by current IA, CTAs, and page architecture:

### 4.1 Generate qualified leads

Evidence:

- homepage contact form
- dedicated contact page form
- repeated `Get Quote`, `Call Now`, and `Contact` CTAs
- service-specific inquiry context in forms

### 4.2 Build trust for high-stakes professional services

Evidence:

- trust-first copy in hero areas
- about page and team positioning
- FAQ sections
- contact information repeated across the experience
- organization schema
- blog content aimed at expertise signaling

### 4.3 Help users discover the right service

Evidence:

- mega menu with structured service clusters
- services listing page
- related services section on service templates
- blog and service cross-navigation

### 4.4 Support high-performance discovery

Evidence:

- route-level lazy loading
- deferred non-critical features
- optimized images
- bundle splitting

## Recommended measurable product goals

These are not current measured KPIs. They are the correct next-stage KPIs for this product:

- increase service-page to contact conversion rate
- reduce time-to-first-action on homepage and service pages
- reduce abandonment on contact forms
- increase call and email CTA engagement
- improve service discovery efficiency for first-time visitors
- improve organic discovery through blog and schema-supported content

## 5. Design Strategy

### Core strategy

The product should be designed as a low-friction professional decision support experience, not only as a brochure site.

### Strategic pillars

#### 5.1 Problem-solving first

Users should be helped to answer:

- What problem am I trying to solve?
- Which service fits my business situation?
- Can I trust this firm with a sensitive financial or legal issue?
- How quickly can I start?

#### 5.2 Low-latency experience

Users in professional services contexts are outcome-driven. Delay directly damages trust. The experience should feel immediate in:

- first paint
- navigation response
- content rendering
- CTA clarity
- form submission feedback

#### 5.3 High-performance trust

Performance is part of credibility here. A fast, stable site communicates operational competence.

#### 5.4 Conversion through clarity, not pressure

The product performs best when it removes ambiguity. For this domain, users are more likely to convert when:

- the service is clearly explained
- risk is clearly framed
- process is predictable
- the next step is obvious

#### 5.5 Guided complexity management

The current information architecture is broad. The next design strategy should reduce cognitive load by adding guided paths:

- startup founder path
- NRI path
- compliance path
- litigation path
- business advisory path

## 6. User Research Status

### What is available today

The repository supports product observation but not direct user research evidence.

Available research inputs:

- site architecture
- page hierarchy
- service taxonomy
- CTA locations
- content themes
- form structure
- analytics and session-replay instrumentation setup

### What is not available today

- recorded user needs in their own words
- friction evidence from session analysis output
- service-level conversion rates
- path analysis across navigation clusters
- drop-off data by form field
- user segmentation by business type

### Research implication

This means the current project is ready for research instrumentation but not yet ready for claiming validated behavioral truths.

## 7. Qualitative Analysis

This section uses direct code and content observation, not interview output.

### 7.1 What the experience communicates well

- professional authority
- broad service capability
- premium visual treatment
- local trust through office, phone, and email visibility
- credibility through structured services and blog content

### 7.2 What the experience asks users to do

- understand a large menu quickly
- self-identify the correct service
- trust the firm from visual and content signals
- take contact action through a form, phone, or email

### 7.3 Observed UX strengths

- Clear brand presence across pages
- Strong use of repeated contact access
- Good service clustering in navigation
- Reusable service page template improves consistency
- Related services reduce dead-end browsing
- FAQs support reassurance
- Blog supports expertise and organic acquisition
- Mobile navigation exists and mirrors service structure

### 7.4 Observed UX weaknesses

- The mega menu is dense and may overwhelm new visitors
- The site assumes the user can map their problem to a service category
- There is no visible guided recommender or decision tree
- Some service labels are professional-language-first rather than user-problem-first
- The site uses multiple premium motion patterns that may increase interaction complexity if not controlled per device capability
- There is no visible service comparison layer
- Form success states exist, but pre-submit reassurance could be stronger

## 8. Quantitative Analysis

### Confirmed quantitative infrastructure

The repository confirms the following measurement capacity:

- Google Tag Manager is loaded globally
- Microsoft Clarity is configured through consent management
- web vitals reporting is present

### What can be measured with the current setup

- page views
- session source and traffic channel
- click events if configured in GTM
- form engagement if configured in GTM
- scroll behavior if configured in GTM or Clarity
- rage clicks or dead clicks via Clarity
- session replays after consent
- performance vitals after instrumentation wiring

### What cannot be claimed from the repository alone

- current conversion rate
- bounce rate
- average session duration
- most-exited service pages
- most-used service categories
- device-based abandonment rate
- form completion rate

### Required quantitative event model

To make this product genuinely research-driven, the next analytics implementation should capture:

- `nav_service_cluster_opened`
- `service_card_clicked`
- `related_service_clicked`
- `contact_form_started`
- `contact_form_submitted`
- `contact_form_failed`
- `click_to_call`
- `click_to_email`
- `faq_opened`
- `blog_to_service_click`
- `service_page_cta_click`
- `scroll_depth_25_50_75_100`
- `page_load_vitals`

## 9. Insights Gathered

### Confirmed insights from the product itself

#### 9.1 Trust is the core conversion currency

The site repeatedly emphasizes authority, expertise, professional support, and direct contact. This indicates trust is the primary lever, not entertainment or exploration.

#### 9.2 The product is built for multiple distinct user intents

The service architecture covers founders, SMEs, corporates, NRIs, compliance-heavy businesses, and litigation-related needs. This is a strong breadth advantage, but it creates wayfinding complexity.

#### 9.3 The current UX is content-rich but diagnosis-light

Users can browse services, but the product does not yet visibly help them diagnose which service they need.

#### 9.4 Performance is already treated as a product concern

The codebase includes several strong optimization patterns. This is a meaningful product asset and should remain a design requirement, not only an engineering preference.

#### 9.5 The contact experience is important enough to be duplicated

There is lead capture on both the homepage and contact page. That means contact initiation is a primary success event.

## 10. Pain Points

### Pain points observed or strongly implied by the current structure

#### 10.1 Decision overload

The user must choose among many categories and service pages, often before understanding the difference between them.

#### 10.2 Service-language mismatch

Professional terminology may be accurate, but some users likely think in problem language such as:

- I need to register my company
- I got a tax notice
- I need GST help
- I want to raise funding
- I need compliance for my existing business

#### 10.3 Friction before confidence

Users can reach a form quickly, but some may still lack confidence about:

- whether the service fits their need
- how fast the firm will respond
- what documents are needed
- what happens after submission

#### 10.4 Navigation complexity on mobile

The mobile menu is comprehensive, but long menus on small screens still increase recall burden and scanning time.

#### 10.5 Heavy premium motion risk

The product uses `framer-motion`, hover transitions, reveal patterns, and animated hero behavior. These can help brand quality, but they must not reduce responsiveness on lower-end devices.

## 11. User Personas

These are working personas inferred from the service taxonomy, contact flows, blog topics, and page copy. They are not interview-validated personas yet.

### 11.1 Startup Founder

#### Evidence

- company registration services
- business plan
- project reports
- payroll
- GST
- startup-oriented blog content

#### Needs

- simple setup path
- regulatory clarity
- affordability
- quick answers
- confidence in first-time compliance

#### Risks

- gets lost in legal and tax terminology
- delays action due to uncertainty

### 11.2 SME Owner or Operator

#### Evidence

- tax returns
- GST returns
- audits
- payroll
- Virtual CFO
- Analytics and BI

#### Needs

- recurring compliance help
- operational clarity
- reduced business risk
- responsive support

#### Risks

- service overlap confusion
- unclear difference between advisory and compliance offerings

### 11.3 NRI Client

#### Evidence

- NRI PAN
- NRI company incorporation
- FEMA compliance
- property management

#### Needs

- remote trust
- simplified India-side process
- documentation clarity
- strong response assurance

#### Risks

- cannot visit office easily
- needs stronger digital reassurance and remote handoff clarity

### 11.4 Litigation or Notice-Driven Client

#### Evidence

- tax litigation
- appeals
- scrutiny assessments
- GST audits

#### Needs

- urgency
- expertise proof
- quick first response
- process clarity

#### Risks

- high stress
- low patience
- likely to convert faster if trust is established quickly

## 12. Customer Journey Mapping

This is a working journey based on the current site structure.

| Stage | User goal | Current touchpoints | Friction | UX opportunity |
|---|---|---|---|---|
| Awareness | Understand whether the firm can help | homepage hero, SEO, blog, service categories | broad service set can feel abstract | lead with problem-based entry paths |
| Consideration | Find the right service | mega menu, services page, service cards, related services | too much scanning, too much terminology | add guided intake, problem-to-service mapping |
| Trust building | Validate expertise | about page, FAQs, contact details, blog, schema | proof exists but is distributed | centralize trust signals near CTAs |
| Intent | Decide to make contact | `Get Quote`, `Call`, email, contact page | user may still not know what happens next | add response-time, process, and document expectations |
| Conversion | Submit inquiry or call | homepage form, contact form, phone CTA | no progressive qualification, no step summary | add lightweight stepper and outcome preview |
| Post-conversion | Wait for response | form success state only | no visible next-step system | define follow-up promise and expected timeline |

## 13. UI/UX Design Process

### Recommended process for this product

#### Phase 1. Discovery

- audit current IA
- map all service entry points
- review Clarity and GTM setup
- define conversion events
- identify top 10 service pages by business priority

#### Phase 2. Research

- run 8 to 12 moderated interviews across founder, SME, NRI, and litigation segments
- run 5 first-click tests on service discovery tasks
- run 5 mobile usability sessions on the navigation and contact flow
- review Clarity recordings after consent-enabled traffic accumulates

#### Phase 3. Synthesis

- cluster top confusion patterns
- identify top terms users actually use
- rewrite service discovery using user-language-first labels
- define guided journey architecture

#### Phase 4. Design

- redesign homepage entry paths
- simplify service taxonomy exposure
- create guided “Find the right service” layer
- redesign contact flow for confidence and qualification
- standardize trust blocks

#### Phase 5. Validation

- usability test revised flows
- compare navigation task completion
- compare form-start and form-submit completion
- review mobile performance and accessibility

#### Phase 6. Implementation and optimization

- ship incrementally
- monitor analytics and Clarity
- iterate on top-exit pages

## 14. Scope of Work

### In-scope UI/UX work

- information architecture refinement
- homepage UX strategy
- service discovery redesign
- mobile navigation simplification
- contact and conversion flow redesign
- trust and credibility pattern library
- content hierarchy system for service pages
- performance-aware motion and interaction rules
- design system consolidation
- analytics event plan

### Out-of-scope unless separately approved

- business pricing strategy
- CRM workflow definition
- legal content authorship
- back-office operations design
- final analytics dashboard build

## 15. Timeline

This is a recommended project timeline based on the current product scope. It is not an existing approved schedule.

| Week | Focus | Output |
|---|---|---|
| Week 1 | Product audit and instrumentation review | IA audit, UX issues list, event tracking plan |
| Week 2 | User research preparation and baseline analytics setup | interview screener, task list, measurement model |
| Week 3 | Qualitative research | interview notes, usability findings |
| Week 4 | Quantitative review and synthesis | friction map, insight clusters, priority matrix |
| Week 5 | UX architecture redesign | revised navigation, guided discovery concept, user flows |
| Week 6 | UI system and key page redesign | homepage, services, service detail, contact page designs |
| Week 7 | Prototype validation | usability findings, iteration set |
| Week 8 | Implementation-ready handoff | component specs, design rules, QA checklist |

## 16. Low-Latency and High-Performance UX Requirements

### Confirmed current performance strengths

- LCP image preload exists
- Google Fonts are async-loaded
- route-level lazy loading is implemented
- toaster is lazy-loaded
- Lenis is dynamically imported after first paint
- service worker registration is deferred to idle
- web vitals import is deferred to idle
- images use explicit width and height
- responsive AVIF image strategy is implemented
- build compression uses Brotli and gzip
- workbox caching is configured
- manual chunking exists for large libraries

### UX performance requirements going forward

#### Interaction requirements

- navigation open and close should feel immediate on mobile
- CTA taps should show feedback instantly
- form submission should always show active state and result state
- animations should never block input

#### Rendering requirements

- above-the-fold content must remain the highest priority
- below-the-fold sections should continue using deferred rendering strategies
- motion-heavy sections should degrade gracefully on low-end devices

#### Design requirements

- no animation should exist only for decoration if it delays comprehension
- motion must reinforce hierarchy or feedback
- reveal animations must not hide essential content for too long

### Immediate performance UX risks to watch

- hero complexity across multiple animated layers
- image-heavy service content
- combined motion usage with scroll effects
- dense mobile navigation rendering

## 17. Design System Audit

### 17.1 Visual language

The current UI uses a premium light-theme visual system with:

- soft gradients
- pastel accent cards
- glassmorphism
- shadow-based depth
- rounded geometry
- strong editorial headings

### 17.2 Color system observed

Primary and recurring colors in code:

- `#493569` deep brand purple
- `#8163b2` accent purple
- `#6340a6` rich purple CTA tone
- `#9de4a1` mint
- `#fee0ee` soft pink
- `#ffc085` warm orange
- `#f9fdd0` pale yellow
- `#a6e4e4` soft cyan
- `#ffffda` soft cream highlight

### 17.3 Typography observed

- Primary heading type: `Space Grotesk`
- Primary body type: `Plus Jakarta Sans`

### 17.4 Layout behavior observed

- wide max containers
- generous spacing
- staggered section composition
- strong card-based service presentation
- reusable hero section pattern
- reusable service page pattern

### 17.5 Component patterns observed

- mega navigation menu
- mobile slide-in menu
- hero carousel
- service cards
- highlight cards
- process steps
- FAQ accordion
- contact forms
- related services cards
- trust/info cards

### 17.6 Design system issues

- Many visual values are hard-coded directly in components instead of centralized tokens
- Motion rules are repeated across sections
- Brand colors are consistent, but not tokenized in a formal semantic system
- Component behavior exists, but component documentation does not exist in the repo
- There is no explicit accessibility token set for contrast, focus, spacing, or motion

### 17.7 Recommended design system structure

- Foundations
  - color tokens
  - typography scale
  - spacing scale
  - radius scale
  - elevation scale
  - motion duration and easing tokens
- Components
  - buttons
  - CTAs
  - form fields
  - cards
  - accordions
  - section headers
  - trust blocks
  - navigation menus
- Page patterns
  - homepage section pattern
  - service page pattern
  - contact page pattern
  - blog page pattern

## 18. Recommended Priorities

### Priority 1

- simplify service discovery
- add problem-based entry paths
- improve contact flow clarity
- formalize analytics events

### Priority 2

- create centralized design tokens
- unify CTA logic across pages
- standardize trust and proof modules
- reduce visual-motion overhead where not needed

### Priority 3

- introduce guided service recommender
- create role-based landing pages
- expand content hierarchy for top service pages

## 19. Final UI/UX Direction

The product already has three strong assets:

- trust-oriented brand presentation
- broad service coverage
- real engineering attention to performance

The next stage should not be “more pages” or “more motion.” It should be sharper user guidance.

The best direction for this product is:

- keep the premium visual identity
- keep the fast-loading architecture
- reduce cognitive load
- move from service-listing UX to problem-solving UX
- make the contact path more confident, guided, and measurable

## 20. Summary

This repository shows a solid, performance-aware professional services website with strong trust signals, broad service coverage, and repeatable page architecture. The main UX opportunity is not visual polish. It is decision support.

The product should evolve from:

- “browse our many services”

to:

- “tell us your business problem and we will guide you to the right solution quickly.”

That shift will improve usability, conversion quality, and brand confidence without sacrificing the low-latency and high-performance standards already visible in the codebase.
