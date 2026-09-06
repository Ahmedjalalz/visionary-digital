# EFL Light-Theme Professional Redesign

## Goal
Refine the existing EFL website into a polished, light-only nonprofit experience using the foundation’s official logo, authentic first-party photography, and the selected Foundation Blue palette—without changing the approved fonts or overall editorial structure.

## What will change

### Official identity and imagery
- Replace the text-only EFL mark with the official Education and Life Foundation logo from the current public website.
- Download and serve the logo and selected organization-owned photographs through the project’s asset system rather than hotlinking them.
- Replace placeholder imagery with authentic EFL photographs across the home, projects, about, news, and supporting pages where relevant.
- Add a curated multi-image story/gallery treatment to project detail pages, using project-specific images where the source site provides them and suitable EFL field imagery elsewhere.

### Light-only visual system
- Apply the approved palette throughout: white, pale blue `#F3F7FC`, logo blue `#0C3987`, supporting blue `#2E67B1`, and navy `#16325C`.
- Keep Bricolage Grotesque, Instrument Sans, and Instrument Serif.
- Remove dark-mode styling and replace dark backgrounds, white text, dark borders, and heavy dark overlays across all public pages.
- Preserve readable image contrast with restrained blue-toned scrims only where text sits directly on photography.

### Professional refinement
- Retain the existing editorial composition and interactions while making spacing, controls, forms, typography hierarchy, and image presentation more consistent and formal.
- Keep selective glass styling only for the bag-tracking overlay, adapted to the light palette.
- Restyle navigation, project lists, forms, maps, timeline, booking, donation, news, school map, and bag details as one coherent light experience.
- Remove the oversized “UPLIFTING LIVES” footer decoration while keeping useful navigation, project links, branches, contact details, and social links.

### Flexible project language
- Remove the remaining numeric “11 Active programmes” statistic.
- Avoid all wording that promises a fixed number of projects or programmes so the portfolio can change freely.

## Technical details
- Extend the project data model with optional gallery images and render them responsively on detail pages.
- Preserve current routes, database-backed forms, booking flow, bag lookup, maps, accessibility, reduced-motion behavior, and mobile layouts.
- Keep page metadata intact and verify every public page after the visual conversion.

## Verification
- Confirm there are no fixed project-count references or unintended dark-theme classes remaining.
- Check the full site for build/runtime errors.
- Review the homepage, project listing, a project detail page, forms, and footer at desktop and mobile widths.
