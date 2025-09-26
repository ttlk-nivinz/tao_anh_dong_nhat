
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ResultGallery } from './components/ResultGallery';
import { Modal } from './components/Modal';
import type { Character, GeneratedImage, Context } from './types';
import { generateConsistentImage, generateImageFromPrompt } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [characters, setCharacters] = useState<Character[]>([{ id: uuidv4(), imageSrc: null, prompt: '', isSelected: true, isLoading: false }]);
  const [context, setContext] = useState<Context>({ imageSrc: null, prompt: '', useAsBackground: false, isLoading: false });
  const [style, setStyle] = useState<string>('3D Pixar');
  const [finalPrompt, setFinalPrompt] = useState<string>('');
  const [numImages, setNumImages] = useState<number>(1);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddCharacter = () => {
    if (characters.length < 5) {
      setCharacters([...characters, { id: uuidv4(), imageSrc: null, prompt: '', isSelected: false, isLoading: false }]);
    }
  };

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters(chars => chars.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  
  const handleCharacterImageUpload = async (id: string, file: File) => {
      const dataUrl = await fileToDataUrl(file);
      updateCharacter(id, { imageSrc: dataUrl });
  };

  const handleGenerateCharacterImage = useCallback(async (id: string, prompt: string) => {
    if (!prompt) return;
    updateCharacter(id, { isLoading: true });
    try {
        const fullPrompt = `${prompt}, in a ${style} style, character only, full body, plain white background`;
        const imageData = await generateImageFromPrompt(fullPrompt);
        updateCharacter(id, { imageSrc: imageData });
    } catch (error) {
        console.error("Failed to generate character image:", error);
        alert("Không thể tạo ảnh nhân vật. Vui lòng thử lại.");
    } finally {
        updateCharacter(id, { isLoading: false });
    }
  }, [style]);

  const handleContextImageUpload = async (file: File) => {
      const dataUrl = await fileToDataUrl(file);
      setContext(ctx => ({...ctx, imageSrc: dataUrl}));
  };
  
  const handleGenerateContextImage = async (prompt: string) => {
      if (!prompt) return;
      setContext(ctx => ({...ctx, isLoading: true}));
      try {
          const fullPrompt = `${prompt}, in a ${style} style, scenery only, no people, no animals, empty background`;
          const imageData = await generateImageFromPrompt(fullPrompt);
          setContext(ctx => ({...ctx, imageSrc: imageData}));
      } catch (error) {
          console.error("Failed to generate context image:", error);
          alert("Không thể tạo ảnh bối cảnh. Vui lòng thử lại.");
      } finally {
          setContext(ctx => ({...ctx, isLoading: false}));
      }
  };

  const handleGenerateFinalImage = async () => {
    const selectedCharacters = characters.filter(c => c.isSelected && c.imageSrc);
    if (selectedCharacters.length === 0) {
      alert("Vui lòng chọn ít nhất một nhân vật tham chiếu có ảnh.");
      return;
    }
    if (!context.imageSrc) {
      alert("Vui lòng cung cấp ảnh bối cảnh tham chiếu.");
      return;
    }
    if (!finalPrompt.trim()) {
      alert("Vui lòng nhập câu lệnh tạo ảnh cuối cùng.");
      return;
    }

    setIsGenerating(true);
    try {
      const newImages: GeneratedImage[] = [];
      for (let i = 0; i < numImages; i++) {
        const imageData = await generateConsistentImage(selectedCharacters, context, finalPrompt, style);
        if(imageData) {
          newImages.push({ id: uuidv4(), src: imageData });
        }
      }
      setGeneratedImages(prev => [...newImages, ...prev]);
    } catch (error) {
      console.error("Failed to generate final image:", error);
      alert("Đã xảy ra lỗi khi tạo ảnh cuối cùng. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDeleteResult = (id: string) => {
    setGeneratedImages(imgs => imgs.filter(img => img.id !== id));
  };


  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Tạo ảnh đồng nhất
          </h1>
          <p className="text-sm text-slate-400">Tạo ra hình ảnh nhân vật đồng nhất với AI Gemini</p>
        </div>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <ControlPanel
            characters={characters}
            onAddCharacter={handleAddCharacter}
            onUpdateCharacter={updateCharacter}
            onCharacterImageUpload={handleCharacterImageUpload}
            onGenerateCharacterImage={handleGenerateCharacterImage}
            context={context}
            onUpdateContext={setContext}
            onContextImageUpload={handleContextImageUpload}
            onGenerateContextImage={handleGenerateContextImage}
            style={style}
            onSetStyle={setStyle}
            finalPrompt={finalPrompt}
            onSetFinalPrompt={setFinalPrompt}
            numImages={numImages}
            onSetNumImages={setNumImages}
            onGenerateFinal={handleGenerateFinalImage}
            isGenerating={isGenerating}
          />
        </div>
        <div className="lg:col-span-2 h-full">
          <ResultGallery 
            images={generatedImages}
            onPreview={setPreviewImage}
            onDelete={handleDeleteResult}
          />
        </div>
      </main>

      {previewImage && (
        <Modal onClose={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" />
        </Modal>
      )}
    </div>
  );
}

export default App;
