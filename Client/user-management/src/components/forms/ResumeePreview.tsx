import React from 'react';

interface ResumeePreviewProps {
  data: Record<string, any>;
}

const ResumeePreview: React.FC<ResumeePreviewProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preview</h2>
      <ul className="bg-gray-100 p-4 rounded">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="mb-2">
            <strong className="capitalize">{key}: </strong>
            <span>{value?.toString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeePreview;
