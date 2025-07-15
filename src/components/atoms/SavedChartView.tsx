// src/components/SavedDiagram.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { imageDataUrlState } from './OrganizationalChartFlow';
import {
  INNER_PAGE_CONTENT_CLASSES,
  PAGE_COMMON_CLASSES,
  PAGE_NUMBER_PLACEHOLDER_CLASSES,
} from '../../utils/pageStyles';

const SavedDiagram: React.FC = () => {
  const image = useRecoilValue(imageDataUrlState);
  const orgChartHeading = '3. ARGUS CJW JV LLC – Quality Control';

  return (
    <div className={PAGE_COMMON_CLASSES}>
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div>
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <h1 className="text-amber-800 text-center my-6 font-semibold">{orgChartHeading}</h1>
        {image ? (
          <div className="flex justify-center items-center flex-1">
            <img
              src={image}
              alt="Saved Diagram"
              className="max-h-[90%] max-w-[100%] object-contain"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No saved diagram found</p>
        )}
      </div>
    </div>
  );
};

export default SavedDiagram;
