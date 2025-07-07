import { useEffect } from 'react';

interface WallpaperProps {
  setWallpaper: React.Dispatch<React.SetStateAction<string>>;
}
export const GenerateWallpaper = ({ setWallpaper }: WallpaperProps) => {
  const generateImage = () => {
    const picsumUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/4096/2160`;
    const img = new window.Image();
    img.src = picsumUrl;
    img.onload = () => setWallpaper(picsumUrl);
  };

  useEffect(() => {
    generateImage();
    const interval = setInterval(generateImage, 12000);
    return () => clearInterval(interval);
  }, []); //eslint-disable-line
};
