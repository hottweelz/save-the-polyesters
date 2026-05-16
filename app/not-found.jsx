import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="container-prose py-32 text-center">
      <p className="eyebrow">Lost in the underbrush</p>
      <h1 className="h-display text-5xl md:text-7xl mt-4 text-moss-900">404</h1>
      <p className="mt-4 text-lg text-moss-700/90">
        This page, like so many burrows, is no longer where it used to be.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-flex">Return to safety</Link>
    </section>
  );
}
