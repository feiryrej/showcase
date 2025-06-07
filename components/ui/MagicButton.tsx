import React from 'react';

interface MagicButtonProps {
  title: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
  href?: string;
}

const MagicButton: React.FC<MagicButtonProps> = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  href,
}) => {
  const commonClasses =
    `inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-700 ` +
    `bg-[linear-gradient(110deg,#2E073F,45%,#1a334a,55%,#2E073F)] bg-[length:200%_100%] px-6 font-medium ` +
    `text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 ` +
    `focus:ring-offset-2 focus:ring-offset-slate-50 w-full md:w-60 md:mt-10 ${otherClasses || ''}`;

  return href ? (
    <a
      href={href}
      target={href.startsWith('mailto:') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className={commonClasses}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </a>
  ) : (
    <button onClick={handleClick} className={commonClasses}>
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </button>
  );
};

export default MagicButton;
