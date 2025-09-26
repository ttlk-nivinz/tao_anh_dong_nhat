
import React, { useRef } from 'react';
import type { Character } from '../types';
import { imageStyles } from '../types';
import { EyeIcon, SparklesIcon, Spinner, UploadIcon } from './icons';

interface CharacterInputProps {
  character: Character;
  index: number;
  onUpdate: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
  onGenerateImage: () => void;
  style: string;
  onSetStyle: (style: string) => void;
  isFirst: boolean;
}

export const CharacterInput: React.FC<CharacterInputProps> = ({
  character, index, onUpdate, onImageUpload, onGenerateImage, style, onSetStyle, isFirst
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
        <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Nhân vật {index + 1}</h3>
            {character.imageSrc && (
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={character.isSelected}
                  onChange={(e) => onUpdate({ isSelected: e.target.checked })}
                  className="w-4 h-4 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-500"
                />
                Chọn
              </label>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="relative group aspect-square bg-slate-800 rounded-md flex items-center justify-center border-2 border-dashed border-slate-600">
                {character.imageSrc ? (
                    <img src={character.imageSrc} alt={`Character ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                ) : (
                    <div className="text-center text-slate-400">
                        <UploadIcon className="w-8 h-8 mx-auto mb-2"/>
                        <p className="text-xs">Tải ảnh lên</p>
                    </div>
                )}
                {character.isLoading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-md">
                        <Spinner />
                    </div>
                )}
                 <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-md"
                >
                  <UploadIcon className="w-8 h-8 text-white"/>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
            
            <div className="space-y-2 flex flex-col justify-between">
                <div>
                    <textarea
                        placeholder="Nhập câu lệnh tạo ảnh"
                        value={character.prompt}
                        onChange={(e) => onUpdate({ prompt: e.target.value })}
                        className="w-full h-20 bg-slate-600 border border-slate-500 rounded-md p-2 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                    {character.prompt && (
                        <button
                            onClick={onGenerateImage}
                            disabled={character.isLoading}
                            className="w-full mt-1 text-sm bg-indigo-600 text-white font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-1 hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {character.isLoading ? <Spinner /> : <SparklesIcon className="w-4 h-4" />}
                            Tạo ảnh
                        </button>
                    )}
                </div>
                 {isFirst && (
                  <div>
                    <label className="text-sm text-slate-300 block mb-1">Phong cách:</label>
                    <select
                      value={style}
                      onChange={(e) => onSetStyle(e.target.value)}
                      className="w-full bg-slate-600 border border-slate-500 rounded-md p-2 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
                    >
                      {imageStyles.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
};
