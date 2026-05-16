export const metadata = { title: 'Accessibility Statement' };

export default function Page() {
  return (
    <>
      <p className="meta">Last updated: 16 May 2026</p>
      <h1>Accessibility Statement</h1>
      <p className="lead">
        We want Save The Polyesters to be usable by everyone, including people who rely on
        assistive technologies. Accessibility work is never finished — we treat it as a
        continuous practice, not a milestone.
      </p>

      <h2>1. Conformance target</h2>
      <p>We aim to meet the
      <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer"> Web Content
      Accessibility Guidelines (WCAG) 2.2, Level AA</a>. Where applicable, we also align with
      the relevant provisions of:</p>
      <ul>
        <li>U.S. Americans with Disabilities Act (ADA), Title III digital-accommodation guidance.</li>
        <li>Section 508 of the U.S. Rehabilitation Act.</li>
        <li>European Accessibility Act (EAA), Directive (EU) 2019/882.</li>
        <li>UK Public Sector Bodies Accessibility Regulations (alignment, not formal compliance).</li>
      </ul>

      <h2>2. Measures we take</h2>
      <ul>
        <li>Semantic landmarks (<code>header</code>, <code>main</code>, <code>nav</code>,
        <code>footer</code>) on every page.</li>
        <li>Visible &ldquo;skip to content&rdquo; link as the first focusable element.</li>
        <li>Contrast ratios reviewed against WCAG AA on the production palette.</li>
        <li>Visible focus indicators on every interactive element; keyboard navigation tested
        through every primary task.</li>
        <li>Alt text on all imagery; decorative images marked <code>aria-hidden</code> or with empty alt.</li>
        <li>Animation respects <code>prefers-reduced-motion</code> where feasible; no auto-playing audio.</li>
        <li>Forms use labeled inputs and announce errors programmatically.</li>
        <li>Color is never the sole carrier of meaning.</li>
      </ul>

      <h2>3. Known limitations</h2>
      <ul>
        <li>Our interactive habitat map uses hover-and-focus disclosure. A simpler list view is
        planned for visitors using screen readers or touch-only devices.</li>
        <li>Some illustrative SVGs are decorative; their meaning is duplicated in surrounding text.</li>
        <li>Live displacement counter updates continuously; a static fallback is in development.</li>
      </ul>

      <h2>4. Feedback</h2>
      <p>If you encounter an accessibility barrier, please tell us. We aim to acknowledge reports
      within 2 business days and to fix critical barriers within 30 days.</p>
      <p>Email: <em>accessibility [at] savethepolyesters [dot] org</em>.</p>

      <h2>5. Formal complaints</h2>
      <p>If you live in the United States and believe a barrier was not adequately addressed, you
      may file a complaint with the U.S. Department of Justice under Title III of the ADA.
      EEA/UK visitors may contact their national accessibility-enforcement body.</p>
    </>
  );
}
