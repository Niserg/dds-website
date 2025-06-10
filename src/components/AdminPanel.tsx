'use client';

import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';

interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function AdminPanel() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
  });

  const handleEditorChange = (content: string, editor: TinyMCEEditor) => {
    setNewUpdate(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submission logic here
    console.log('Submitting:', newUpdate);
  };

  return (
    <div className="min-h-screen bg-lilac/10 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-dark mb-8">Admin Panel</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newUpdate.title}
              onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <Editor
              apiKey="your-tinymce-api-key"
              value={newUpdate.content}
              onEditorChange={handleEditorChange}
              init={{
                height: 500,
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-main hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main"
          >
            Publish Update
          </button>
        </form>
      </div>
    </div>
  );
} 