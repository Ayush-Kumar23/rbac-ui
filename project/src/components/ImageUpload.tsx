import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export default function ImageUpload({ currentImage, onImageChange }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageChange(result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <div className="relative h-20 w-20">
          <img
            src={previewUrl}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <label
            htmlFor="profile-image"
            className="absolute -right-2 -bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Upload className="h-4 w-4" />
            <input
              type="file"
              id="profile-image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">
            Click the upload button to change profile picture
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: JPG, PNG, GIF
          </p>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}