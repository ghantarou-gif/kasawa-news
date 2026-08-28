export function TravelPhoto({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className="mt-6">
      <div className={`story-image mt-0 ${wide ? "" : "story-image-photo"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      {caption ? <figcaption className="travel-caption">{caption}</figcaption> : null}
    </figure>
  );
}
