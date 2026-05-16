export const metadata = { title: 'ESG Statement' };

export default function Page() {
  return (
    <>
      <p className="meta">Last updated: 16 May 2026</p>
      <h1>Environmental, Social &amp; Governance (ESG) Statement</h1>
      <p className="lead">
        Save The Polyesters is a parody, but its production should still be honest about its
        footprint and its values. This statement documents how the project is run.
      </p>

      <h2>1. Environmental</h2>
      <ul>
        <li><strong>Hosting:</strong> the Site is a fully static export, hosted by a provider
        that publishes a verifiable renewable-energy or carbon-neutral commitment for its
        edge infrastructure.</li>
        <li><strong>Asset weight:</strong> we aim to keep the median page transfer under
        500&nbsp;KB on first load and under 150&nbsp;KB on warm cache. Images are served as
        WebP and lazy-loaded where appropriate.</li>
        <li><strong>No tracking telemetry by default:</strong> we ship no third-party tags
        unless a visitor opts in via the cookie banner.</li>
        <li><strong>No autoplaying video.</strong></li>
        <li><strong>Anti-greenwashing pledge:</strong> we will not claim &ldquo;carbon-neutral&rdquo;
        or &ldquo;net-zero&rdquo; status without a third-party attestation we can link to.</li>
      </ul>

      <h2>2. Social</h2>
      <ul>
        <li><strong>Inclusive design:</strong> see our <a href="/legal/accessibility/">Accessibility
        Statement</a> for the standards we hold ourselves to.</li>
        <li><strong>No targeting of individuals:</strong> the satire is strictly
        industry-categorical. We do not name, depict, or impersonate real people.</li>
        <li><strong>Honest framing:</strong> a satire notice appears on every page in the
        global footer; legal pages restate it prominently.</li>
        <li><strong>Editorial restraint:</strong> we do not satirize identities, protected
        characteristics, or marginalized communities. The target is industrial behavior, not
        people.</li>
      </ul>

      <h2>3. Governance</h2>
      <ul>
        <li><strong>Structure:</strong> the Site is operated by an individual creator. There
        is no board, no employees, no fiduciary relationships, and no commercial revenue.</li>
        <li><strong>Finances:</strong> we accept no donations, ad revenue, sponsorships, or
        commercial partnerships. The site is privately funded by the Operator.</li>
        <li><strong>Conflicts of interest:</strong> the Operator has no financial stake in any
        of the industries categorically referenced on the Site.</li>
        <li><strong>Provenance:</strong> source code and content live in a versioned Git
        repository. Changes are auditable.</li>
        <li><strong>Reporting:</strong> we are not subject to any ESG reporting regime
        (CSRD, SEC climate rule, ISSB, etc.) because we are a personal project and not a
        commercial entity. This statement is published voluntarily.</li>
      </ul>

      <h2>4. Reach-out</h2>
      <p>If you operate an organization that would like to use this site as a teaching
      example for sustainable static-site practices or for satire-and-ethics curricula,
      please get in touch: <em>esg [at] savethepolyesters [dot] org</em>.</p>
    </>
  );
}
