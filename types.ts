
export interface Character {
  id: string;
  imageSrc: string | null;
  prompt: string;
  isSelected: boolean;
  isLoading: boolean;
}

export interface Context {
  imageSrc: string | null;
  prompt: string;
  useAsBackground: boolean;
  isLoading: boolean;
}

export interface GeneratedImage {
  id: string;
  src: string;
}

export const imageStyles: string[] = [
  '3D Pixar',
  'Anime',
  'Hoạt hình',
  'Ảnh thực',
  'Cyberpunk',
  'Steampunk',
  'Fantasy Art',
  'Màu nước',
  'Low Poly'
];
