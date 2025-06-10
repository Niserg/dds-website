'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import config from '@/config';

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

  useEffect(() => {
    // Debug: Check if TinyMCE API key is loaded
    console.log('TinyMCE API Key:', process.env.NEXT_PUBLIC_TINYMCE_API_KEY || config.tinymce.apiKey);
    
    // Check if user is authenticated
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, [router]);

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

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
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

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-main">Manage Updates</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

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
            {(process.env.NEXT_PUBLIC_TINYMCE_API_KEY || config.tinymce.apiKey) ? (
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || config.tinymce.apiKey}
                value={formData.content}
                onEditorChange={handleEditorChange}
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
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-700">
                  TinyMCE API key is not configured. Please add NEXT_PUBLIC_TINYMCE_API_KEY to your .env.local file or update the config.ts file.
                </p>
              </div>
            )}
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
                {formData.type === 'image' ? 'Image' : 'Video'} File
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
                className="w-full"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            {editingUpdate && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-main rounded-md hover:bg-primary-dark"
            >
              {editingUpdate ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{update.title}</h3>
                <p className="text-sm text-gray-500">{update.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(update)}
                  className="px-3 py-1 text-sm text-primary-main hover:text-primary-dark"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(update.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: update.content }} />
            {update.mediaUrl && (
              <div className="mt-4">
                {update.type === 'image' ? (
                  <Image
                    src={update.mediaUrl}
                    alt={update.title}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                ) : update.type === 'video' && (
                  <video
                    src={update.mediaUrl}
                    controls
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 