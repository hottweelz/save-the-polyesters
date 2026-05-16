export const metadata = { title: 'Cookie Policy' };

export default function Page() {
  return (
    <>
      <p className="meta">Last updated: 16 May 2026</p>
      <h1>Cookie Policy</h1>
      <p className="lead">
        We use a small number of cookies and similar storage technologies to make the Site work and,
        if you choose, to understand traffic patterns. You are always in control.
      </p>

      <h2>1. What is a cookie?</h2>
      <p>A cookie is a small text file a website stores on your device. Similar technologies include
      <em> localStorage</em>, <em>sessionStorage</em>, and <em>IndexedDB</em>. We treat all of these
      the same way.</p>

      <h2>2. Cookies we use</h2>
      <h3>Strictly necessary</h3>
      <ul>
        <li><strong>pcc.cookie-consent.v1</strong> — remembers your cookie banner choice. Stored in
        localStorage. No expiration; you can clear it any time.</li>
      </ul>

      <h3>Analytics (opt-in)</h3>
      <ul>
        <li><strong>_pcc_anon</strong> — if you accept analytics, an anonymous pseudonymous identifier
        is generated to count unique visitors. We do not link this to any other identifier.
        Expires after 14 months.</li>
      </ul>

      <p>We do <strong>not</strong> use cookies for advertising, retargeting, social-media tracking,
      cross-site identity resolution, or behavioral profiling.</p>

      <h2>3. Changing your choice</h2>
      <p>You can change your consent at any time by clearing site data in your browser settings.
      A fresh banner will appear on your next visit. You can also block cookies entirely from your
      browser without breaking the Site.</p>

      <h2>4. Do Not Track</h2>
      <p>We respect the Global Privacy Control (GPC) signal where supported. When GPC is detected,
      we treat your visit as having declined non-essential cookies.</p>

      <h2>5. Questions</h2>
      <p>Email <em>privacy [at] savethepolyesters [dot] org</em>.</p>
    </>
  );
}
