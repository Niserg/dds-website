'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { EditorProps } from '@tinymce/tinymce-react';

// Import TinyMCE editor
const Editor = dynamic<EditorProps>(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
  mediaFile?: File;
}

export default function AdminUpdates() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updates, setUpdates] = useState<Update[]>([
    {
      id: 1,
      date: 'March 15, 2024',
      title: 'Conference Registration Now Open!',
      content: 'We are excited to announce that registration for the Data and Dynamics Summit 2024 is now open. Early bird registration is available until May 31, 2024.',
      type: 'text'
    },
    {
      id: 2,
      date: 'March 10, 2024',
      title: 'Keynote Speaker Announcement',
      content: 'We are thrilled to announce that Dr. Jane Smith will be our keynote speaker for the conference. Dr. Smith is a leading expert in data science and will be presenting on "The Future of Data Analysis".',
      type: 'text'
    }
  ]);

  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [formData, setFormData] = useState<Partial<Update>>({
    title: '',
    content: '',
    type: 'text',
    mediaUrl: ''
  });

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a temporary URL for the file
    const fileUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      mediaFile: file,
      mediaUrl: fileUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically upload the file to your storage service
    // and get back a permanent URL
    let finalMediaUrl = formData.mediaUrl;
    if (formData.mediaFile) {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      finalMediaUrl = `/uploads/${formData.mediaFile.name}`;
    }

    if (editingUpdate) {
      setUpdates(updates.map(update => 
        update.id === editingUpdate.id 
          ? { 
              ...update, 
              ...formData, 
              mediaUrl: finalMediaUrl,
              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
          : update
      ));
    } else {
      const newUpdate: Update = {
        id: updates.length + 1,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        title: formData.title || '',
        content: formData.content || '',
        type: formData.type || 'text',
        mediaUrl: finalMediaUrl
      };
      setUpdates([newUpdate, ...updates]);
    }
    resetForm();
  };

  const handleEdit = (update: Update) => {
    setEditingUpdate(update);
    setFormData({
      title: update.title,
      content: update.content,
      type: update.type,
      mediaUrl: update.mediaUrl
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this update?')) {
      setUpdates(updates.filter(update => update.id !== id));
    }
  };

  const resetForm = () => {
    setEditingUpdate(null);
    setFormData({
      title: '',
      content: '',
      type: 'text',
      mediaUrl: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-main mb-8">Manage Updates</h1>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingUpdate ? 'Edit Update' : 'Add New Update'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.content}
              onEditorChange={(content) => setFormData({ ...formData, content })}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'text' | 'image' | 'video' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {(formData.type === 'image' || formData.type === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload {formData.type === 'image' ? 'Image' : 'Video'}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {formData.mediaUrl && (
                <div className="mt-2">
                  {formData.type === 'image' ? (
                    <div className="relative w-32 h-32">
                      <Image
                        src={formData.mediaUrl}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <video
                      src={formData.mediaUrl}
                      controls
                      className="w-full max-w-md rounded"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-primary-main text-primary-light px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              {editingUpdate ? 'Update' : 'Add'} Update
            </button>
            {editingUpdate && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-primary-light px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Updates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Existing Updates</h2>
        {updates.map((update) => (
          <div key={update.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{update.title}</h3>
                <p className="text-sm text-gray-500">{update.date}</p>
                <div 
                  className="mt-2 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: update.content }}
                />
                {update.type === 'image' && update.mediaUrl && (
                  <div className="relative w-32 h-32 mt-2">
                    <Image
                      src={update.mediaUrl}
                      alt={update.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                {update.type === 'video' && update.mediaUrl && (
                  <video
                    src={update.mediaUrl}
                    controls
                    className="w-full max-w-md mt-2 rounded"
                  />
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(update)}
                  className="text-primary-main hover:text-primary-dark"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(update.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 