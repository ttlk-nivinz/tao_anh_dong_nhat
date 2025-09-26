
import React from 'react';
import type { Character, Context } from '../types';
import { imageStyles } from '../types';
import { CharacterInput } from './CharacterInput';
import { ContextInput } from './ContextInput';
import { PlusIcon, SparklesIcon, Spinner } from './icons';

interface ControlPanelProps {
  characters: Character[];
  onAddCharacter: () => void;
  onUpdateCharacter: (id: string, updates: Partial<Character>) => void;
  onCharacterImageUpload: (id: string, file: File) => void;
  onGenerateCharacterImage: (id: string, prompt: string) => void;
  context: Context;
  onUpdateContext: React.Dispatch<React.SetStateAction<Context>>;
  onContextImageUpload: (file: File) => void;
  onGenerateContextImage: (prompt: string) => void;
  style: string;
  onSetStyle: (style: string) => void;
  finalPrompt: string;
  onSetFinalPrompt: (prompt: string) => void;
  numImages: number;
  onSetNumImages: (num: number) => void;
  onGenerateFinal: () => void;
  isGenerating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  characters, onAddCharacter, onUpdateCharacter, onCharacterImageUpload, onGenerateCharacterImage,
  context, onUpdateContext, onContextImageUpload, onGenerateContextImage,
  style, onSetStyle,
  finalPrompt, onSetFinalPrompt,
  numImages, onSetNumImages,
  onGenerateFinal, isGenerating
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-5 space-y-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div>
        <h2 className="text-lg font-semibold mb-3 text-sky-300">Ảnh nhân vật tham chiếu</h2>
        <div className="space-y-4">
          {characters.map((char, index) => (
            <CharacterInput 
              key={char.id}
              character={char}
              index={index}
              onUpdate={(updates) => onUpdateCharacter(char.id, updates)}
              onImageUpload={(file) => onCharacterImageUpload(char.id, file)}
              onGenerateImage={() => onGenerateCharacterImage(char.id, char.prompt)}
              style={style}
              onSetStyle={onSetStyle}
              isFirst={index === 0}
            />
          ))}
          {characters.length < 5 && (
            <button
              onClick={onAddCharacter}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-500 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Thêm nhân vật
            </button>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3 text-sky-300">Bối cảnh tham chiếu</h2>
        <ContextInput 
          context={context}
          onUpdate={onUpdateContext}
          onImageUpload={onContextImageUpload}
          onGenerateImage={() => onGenerateContextImage(context.prompt)}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-sky-300">Câu lệnh tạo ảnh</h2>
        <textarea
          value={finalPrompt}
          onChange={(e) => onSetFinalPrompt(e.target.value)}
          placeholder="Mô tả hành động, bố cục cho ảnh cuối cùng..."
          className="w-full h-24 bg-slate-700 border border-slate-600 rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-sky-300">Tùy chọn</h2>
        <div className="flex items-center gap-4">
          <label htmlFor="numImages" className="text-slate-300">Số lượng ảnh:</label>
          <select 
            id="numImages" 
            value={numImages} 
            onChange={(e) => onSetNumImages(parseInt(e.target.value, 10))}
            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <button
        onClick={onGenerateFinal}
        disabled={isGenerating}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? <Spinner /> : <SparklesIcon className="w-6 h-6" />}
        {isGenerating ? 'Đang tạo...' : 'Tạo ảnh cuối cùng'}
      </button>
    </div>
  );
};
