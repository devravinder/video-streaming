import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import tw from 'tailwind-styled-components'
interface TagChipProps {
  tag: string;
  onClick?: () => void;
  active?: boolean;
}

const Base = tw.span<{$active?: boolean, $clickable?: boolean}>`
inline-flex items-center text-xs px-2 py-1 rounded-full transition-colors
${p=>p.$active ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}
${p=>p.$clickable ? 'cursor-pointer' : ''}
`

export const TagChip: React.FC<TagChipProps> = ({ tag, onClick, active }) => {

  
  return (
    <Base
      $active={active}
      $clickable={!!onClick}
      onClick={onClick}
    >
      <TagIcon className="w-3 h-3 mr-1" />
      {tag}
    </Base>
  );
};