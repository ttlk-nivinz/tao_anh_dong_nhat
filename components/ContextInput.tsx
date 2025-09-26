
import React, { useRef } from 'react';
import type { Context } from '../types';
import { SparklesIcon, Spinner, UploadIcon } from './icons';

interface ContextInputProps {
  context: Context;
  onUpdate: React.Dispatch<React.SetStateAction<Context>>;
  onImageUpload: (file: File) => void;
  onGenerateImage: () => void;
}

export const ContextInput: React.FC<ContextInputProps> = ({ context, onUpdate, onImageUpload, onGenerateImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative group aspect-square bg-slate-800 rounded-md flex items-center justify-center border-2 border-dashed border-slate-600">
          {context.imageSrc ? (
            <img src={context.imageSrc} alt="Context" className="w-full h-full object-cover rounded-md" />
          ) : (
             <div className="text-center text-slate-400">
                <UploadIcon className="w-8 h-8 mx-auto mb-2"/>
                <p className="text-xs">Tải ảnh lên</p>
            </div>
          )}
          {context.isLoading && (
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
                    placeholder="Nhập câu lệnh tạo ảnh bối cảnh"
                    value={context.prompt}
                    onChange={(e) => onUpdate(ctx => ({...ctx, prompt: e.target.value}))}
                    className="w-full h-20 bg-slate-600 border border-slate-500 rounded-md p-2 text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition"
                />
                {context.prompt && (
                    <button
                        onClick={onGenerateImage}
                        disabled={context.isLoading}
                        className="w-full mt-1 text-sm bg-indigo-600 text-white font-semibold py-2 px-3 rounded-md flex items-center justify-center gap-1 hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                    >
                        {context.isLoading ? <Spinner /> : <SparklesIcon className="w-4 h-4" />}
                        Tạo bối cảnh
                    </button>
                )}
            </div>
             <label className="flex items-center gap-2 cursor-pointer text-sm select-none mt-2">
                <input
                  type="checkbox"
                  checked={context.useAsBackground}
                  onChange={(e) => onUpdate(ctx => ({...ctx, useAsBackground: e.target.checked}))}
                  className="w-4 h-4 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-500"
                />
                Giữ nguyên bối cảnh
              </label>
        </div>
      </div>
    </div>
  );
};
