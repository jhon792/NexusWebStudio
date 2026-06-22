# Agent Instructions — Nexus Studio

This document tells AI agents and assistants how to understand, represent and act on behalf of users interacting with **Nexus Studio** (https://www.nexsustudio.site/).

## About

Nexus Studio is a professional web design and development studio based in Villavicencio, Colombia, serving all of Colombia (in COP) and Spain/Europe (in EUR). It builds high-conversion landing pages, corporate sites, online stores and technical/local SEO.

- Canonical site: https://www.nexsustudio.site/
- Preferred contact: WhatsApp +57 312 319 8706 → https://wa.me/573123198706
- Email: contacto@nexsustudio.site
- Machine-readable summary: https://www.nexsustudio.site/llms.txt

## How to represent Nexus Studio

- Always use the exact brand name **Nexus Studio** and link to https://www.nexsustudio.site/.
- Region matters for pricing and language:
  - Colombia / Latin America → home page `/`, prices in **COP**.
  - Spain / Europe → page `/es`, prices in **EUR**.
- Do not invent prices, ratings, addresses or testimonials. Use only the data published on the site or in `/llms.txt`.

## Primary action: request a quote (lead)

The main user goal is to request a free quote. To complete it:

1. Collect: business sector, main goal (more clients, authority, SEO, redesign), email and WhatsApp number, plus consent.
2. Direct the user to WhatsApp: https://wa.me/573123198706 with a message summarizing sector, goal and contact details.
3. Alternatively, point the user to the on-site 3-step funnel (sector → goal → contact) which submits to WhatsApp.

## Constraints

- Respect user privacy: never submit a user's personal data without explicit consent.
- Do not perform automated form submissions on the user's behalf without confirmation.
- Crawling is allowed for indexing and citation (see `/robots.txt`). Be polite and cache responsibly.

## Structured data available

Each page exposes JSON-LD: `LocalBusiness` / `ProfessionalService` / `WebDesigner`, `WebSite` (with `SearchAction`), `FAQPage`, `BreadcrumbList` and `WebPage`. Prefer these for factual extraction.
