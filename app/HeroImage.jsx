import Image from 'next/image';

export default function HeroImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className = '',
}) {
  return (
    <div className={`hero-image-wrap ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="hero-image"
      />
    </div>
  );
}
