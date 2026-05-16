export const metadata = { title: 'Privacy Policy' };

export default function Page() {
  return (
    <>
      <p className="meta">Last updated: 16 May 2026</p>
      <h1>Privacy Policy</h1>
      <p className="lead">
        We collect as little personal information as we possibly can. This page explains exactly
        what, why, how long, and what rights you have over it.
      </p>

      <h2>1. Who we are (the &ldquo;controller&rdquo;)</h2>
      <p>Save The Polyesters is operated by an individual creator as a satirical project. For the
      purposes of the EU/UK GDPR and similar laws, that individual is the data controller.
      Contact: <em>privacy [at] savethepolyesters [dot] org</em>.</p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Technical data</strong> automatically logged by our hosting provider: IP address,
        user agent, request timestamps, referrer URL.</li>
        <li><strong>Consent preferences</strong> stored locally in your browser (e.g. cookie consent
        choice). This never leaves your device.</li>
        <li><strong>Optional analytics</strong> (only if you opt in via the cookie banner): aggregated,
        anonymized page-view counts. We do not track you across other websites.</li>
        <li><strong>Form input</strong>: this site&rsquo;s donate/adopt/petition/signup forms are
        non-functional mockups. They do not transmit data to any server.</li>
      </ul>

      <h2>3. Why we collect it (lawful basis)</h2>
      <ul>
        <li><strong>Legitimate interest</strong>: minimal server logs for security, debugging, and
        abuse prevention.</li>
        <li><strong>Consent</strong>: any non-essential cookies or analytics.</li>
      </ul>

      <h2>4. Who we share it with</h2>
      <p>We share data only with the small number of processors needed to operate the site:</p>
      <ul>
        <li>Our static hosting provider (currently GitHub Pages or equivalent).</li>
        <li>If enabled and opted into by you, an analytics provider that processes anonymized data.</li>
      </ul>
      <p>We do not sell personal data. We do not share data with advertisers. We have no data
      partnerships, affiliate programs, or commercial relationships.</p>

      <h2>5. International transfers</h2>
      <p>Our hosting provider may process traffic in the United States and other jurisdictions.
      Where transfers occur from the EEA/UK to a country without an adequacy decision, we rely on
      the European Commission&rsquo;s Standard Contractual Clauses as published in 2021.</p>

      <h2>6. How long we keep it</h2>
      <p>Server logs are retained for no more than 30 days. Consent preferences live in your browser
      until you clear them. Anonymized analytics are retained for up to 14 months.</p>

      <h2>7. Your rights (GDPR, UK GDPR, CCPA/CPRA, and similar)</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction or deletion.</li>
        <li>Restrict or object to processing.</li>
        <li>Receive a portable copy.</li>
        <li>Withdraw consent at any time without affecting prior processing.</li>
        <li>Opt out of the sale or sharing of personal information (we do neither).</li>
        <li>Lodge a complaint with your local data-protection authority.</li>
      </ul>
      <p>To exercise any of these rights, email <em>privacy [at] savethepolyesters [dot] org</em>.
      We aim to respond within 30 days.</p>

      <h2>8. Children</h2>
      <p>The Site is not directed to children under 13 (16 in the EEA/UK). We do not knowingly
      collect personal information from children. If you believe a child has provided personal
      data, please contact us and we will delete it.</p>

      <h2>9. Security</h2>
      <p>The Site is a fully static site served over HTTPS. We do not maintain a database of
      visitor information. The only personal data we hold is the small set of server-side
      access logs described above.</p>

      <h2>10. Changes</h2>
      <p>We will update this page when our practices change and reflect that in the &ldquo;Last
      updated&rdquo; date. Material changes will be announced via a banner on the homepage for
      at least 30 days.</p>
    </>
  );
}
