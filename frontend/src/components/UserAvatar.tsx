import React from "react";

const getAvatarGradient = (seed: string) => {
  const gradients = [
    'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
    'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

export const UserAvatar = ({ user, className = "w-9 h-9", textClass = "text-sm" }: { user: any, className?: string, textClass?: string }) => {
  const seedString = user?.email || `${user?.first_name}${user?.last_name}` || 'default';
  const initials = (user?.first_name?.[0] || user?.email?.[0] || 'U').toUpperCase();
  
  return (
    <div 
      className={`rounded-full flex items-center justify-center text-gray-900 font-bold shadow-sm border border-white/40 shrink-0 ${className}`}
      style={{ background: getAvatarGradient(seedString) }}
    >
      <span className={textClass}>{initials}</span>
    </div>
  );
};
