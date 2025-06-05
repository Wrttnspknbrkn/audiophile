
import React, { useState } from 'react';
import { useCMS } from './CMSProvider';
import { Edit2, Save, X } from 'lucide-react';

interface CMSEditorProps {
  isVisible: boolean;
  onClose: () => void;
}

const CMSEditor: React.FC<CMSEditorProps> = ({ isVisible, onClose }) => {
  const { content, updateContent } = useCMS();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'categories' | 'featuredProducts'>('hero');
  const [editingContent, setEditingContent] = useState(content);

  const handleSave = () => {
    updateContent(activeTab, editingContent[activeTab]);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Content Management System</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r">
            <nav className="p-4">
              {(['hero', 'about', 'categories', 'featuredProducts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-3 rounded mb-2 capitalize ${
                    activeTab === tab
                      ? 'bg-audiophile-orange text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {tab === 'featuredProducts' ? 'Products' : tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={editingContent.hero.subtitle}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, subtitle: e.target.value }
                    }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingContent.hero.title}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value }
                    }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingContent.hero.description}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, description: e.target.value }
                    }))}
                    className="w-full p-3 border rounded h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={editingContent.hero.buttonText}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, buttonText: e.target.value }
                    }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Section</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingContent.about.title}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      about: { ...prev.about, title: e.target.value }
                    }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingContent.about.description}
                    onChange={(e) => setEditingContent(prev => ({
                      ...prev,
                      about: { ...prev.about, description: e.target.value }
                    }))}
                    className="w-full p-3 border rounded h-32"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-audiophile-orange text-white rounded hover:bg-audiophile-light-orange flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CMSEditor;
