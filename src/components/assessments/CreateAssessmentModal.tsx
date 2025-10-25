import React, { useState, useEffect } from 'react';
import { Assessment, Question } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface CreateAssessmentModalProps {
  onSubmit: (assessmentData: {
    title: string;
    description: string;
    questions: any[];
    client_id: string;
  }) => void;
  onClose: () => void;
}

export const CreateAssessmentModal: React.FC<CreateAssessmentModalProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', question: '', type: 'text', options: [] }
  ]);
  const [clients, setClients] = useState<any[]>([]);

  // Mock clients - replace with actual API call
  useEffect(() => {
    // TODO: Fetch actual clients from your database
    const mockClients = [
      { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      { id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
    ];
    setClients(mockClients);
  }, []);

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      id: Date.now().toString(),
      question: '',
      type: 'text',
      options: []
    }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }

    // Transform questions to match what the service expects
    const transformedQuestions = questions.map(q => ({
      question: q.question,
      type: q.type,
      options: q.options || []
    }));

    onSubmit({
      title,
      description: description || 'No description provided',
      questions: transformedQuestions,
      client_id: selectedClient
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create Assessment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Client *
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="">Choose a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name} ({client.email})
                </option>
              ))}
            </select>
          </div>

          {/* Assessment Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assessment Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g., Depression Screening, Anxiety Assessment"
              required
            />
          </div>

          {/* Assessment Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Describe the purpose and focus of this assessment..."
              rows={3}
            />
          </div>

          {/* Questions Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">Questions *</label>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center text-teal-600 hover:text-teal-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter your question"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      required
                    />

                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(question.id, { 
                        type: e.target.value as Question['type'],
                        options: e.target.value === 'multiple_choice' ? [''] : []
                      })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="text">Text Answer</option>
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="scale">Scale (1-10)</option>
                    </select>

                    {question.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Options</label>
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex space-x-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options!];
                                newOptions[optionIndex] = e.target.value;
                                updateQuestion(question.id, { options: newOptions });
                              }}
                              className="block flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newOptions = question.options!.filter((_, i) => i !== optionIndex);
                                updateQuestion(question.id, { options: newOptions });
                              }}
                              className="text-red-600 hover:text-red-700 px-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newOptions = [...question.options!, ''];
                            updateQuestion(question.id, { options: newOptions });
                          }}
                          className="text-teal-600 hover:text-teal-700 text-sm"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              disabled={!title || !selectedClient || questions.some(q => !q.question.trim())}
            >
              Create Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};