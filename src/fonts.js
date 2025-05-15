import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter_18pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/inter/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-inter',
}); 