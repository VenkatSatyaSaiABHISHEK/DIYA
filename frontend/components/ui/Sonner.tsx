'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#18181B] group-[.toaster]:border-[#E4E4E7] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl text-xs font-medium',
          description: 'group-[.toast]:text-[#71717A]',
          actionButton:
            'group-[.toast]:bg-[#7C3AED] group-[.toast]:text-white font-medium',
          cancelButton:
            'group-[.toast]:bg-zinc-100 group-[.toast]:text-[#71717A]',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
