import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function ErrorMessage({ error }) {
  return (
    <div>
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              There was an error submitting your order
            </h3>
            <div className="text-sm text-red-700">
              {typeof error === 'object' && error !== null ? (
                <ul className="space-y-1">
                  {Object.entries(error).map(([field, message]) => (
                    <li key={field}>
                      <strong>
                        {field === 'general' ? '' : `${field}: `}
                      </strong>
                      {Array.isArray(message) ? message.join(', ') : message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
