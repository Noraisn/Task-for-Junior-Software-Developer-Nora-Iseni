import Image from 'next/image';

export const AnchorzUpIcon = () => {
  return (
    <div className="mb-6 flex justify-center">
      <Image
        src="/AnchorzUpLogo_with tagline.png"
        alt="AnchorZup Logo"
        width={200} 
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default AnchorzUpIcon;
