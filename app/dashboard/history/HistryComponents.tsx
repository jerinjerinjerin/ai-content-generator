'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export interface HISTORY {
    id: number;
    formData: string;
    aiResponse: string | null;
    templateSlug: string;
    createdBy: string;
    createdAt: string | null;
}

const HistoryComponent: React.FC<{ history: HISTORY[] }> = ({ history }) => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-5">Your AI Output History</h1>
            {history.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Template</th>
                                <th className="px-4 py-2 border-b">Form Data</th>
                                <th className="px-4 py-2 border-b">AI Response</th>
                                <th className="px-4 py-2 border-b">Created At</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 border-b">{item.templateSlug}</td>
                                    <td className="px-4 py-2 border-b">
                                        <pre className="bg-gray-100 p-2 rounded">{item.formData.slice(0, 50)}...</pre>
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <pre className="bg-gray-100 p-2 rounded">{item.aiResponse ? item.aiResponse.slice(0, 50) : 'No response'}</pre>
                                    </td>
                                    <td className="px-4 py-2 border-b">{item.createdAt || 'Unknown'}</td>
                                    <td className="px-4 py-2 border-b flex space-x-2">
                                        <Button 
                                          variant="ghost" 
                                          className='text-primary'
                                          onClick={() => {
                                            if (item.aiResponse) {
                                                navigator.clipboard.writeText(item.aiResponse).catch(err => console.error('Failed to copy: ', err));
                                            } else {
                                                console.warn('No AI response to copy');
                                            }
                                          }}
                                        >
                                            Copy
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>No history found.</div>
            )}
        </div>
    );
};

export default HistoryComponent;
