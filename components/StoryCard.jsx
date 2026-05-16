import Image from 'next/image';
import Reveal from '@/components/Reveal';

export default function StoryCard({ title, location, summary, image, tag = 'Rescue Story', alt }) {
  return (
    <Reveal>
      <article className="card overflow-hidden">
        {image && (
          <div className="relative aspect-[4/3] -m-6 md:-m-8 mb-6 md:mb-8 bg-cream-100 overflow-hidden">
            <Image src={image} alt={alt || title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        )}
        <p className="tag">{tag}</p>
        <h3 className="font-display text-2xl mt-3 text-moss-900 leading-snug">{title}</h3>
        <p className="text-xs uppercase tracking-widest text-moss-700/70 mt-1">{location}</p>
        <p className="text-moss-700/90 mt-4 leading-relaxed">{summary}</p>
      </article>
    </Reveal>
  );
}
