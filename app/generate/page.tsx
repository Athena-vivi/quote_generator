import { ImageGenerator } from '@/components/image-generator';

export default function GenerateImagePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Generate Your Own Bible Quote Image</h1>
      <ImageGenerator quote={{ reference: '', content: '' }} />
    </div>
  );
} 