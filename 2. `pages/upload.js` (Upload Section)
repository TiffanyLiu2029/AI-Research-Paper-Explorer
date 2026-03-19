import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Upload() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual file processing
    router.push('/summary');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Upload a Research Paper</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Process PDF
        </button>
      </form>
    </div>
  );
}
