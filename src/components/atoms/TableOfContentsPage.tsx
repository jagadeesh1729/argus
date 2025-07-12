import React from 'react';

// Import the common page classes for consistent styling
// Ensure you have this utility file (e.g., src/utils/pageStyles.ts)
const PAGE_COMMON_CLASSES = "border-4 border-yellow-500 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow break-inside-avoid page-break relative";
const PAGE_NUMBER_PLACEHOLDER_CLASSES = "absolute bottom-8 right-8 text-sm text-gray-600 page-number-placeholder";
const INNER_PAGE_CONTENT_CLASSES = "flex flex-col h-full"; // For content padding and flex layout within the page

// Define the type for a single TOC entry
export type TocEntry = {
  title: string;
  pageStart: number;
  pageEnd: number;
  level?: number; // 1 for h1, 2 for h2, etc.
};

interface TableOfContentsPageProps {
  tocData: TocEntry[]; // Array of titles and page numbers
}

const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({ tocData }) => {
  const pageTitle = "TABLE OF CONTENTS";

const renderTocEntry = (entry: TocEntry, index: number) => {
  const level = entry.level ?? 1;
  const indentPx = (level - 1) * 20;

  // Page range string
  const pageStr =
    entry.pageStart !== undefined && entry.pageEnd !== undefined
      ? entry.pageStart === entry.pageEnd
        ? `${entry.pageStart}`
        : `${entry.pageStart}–${entry.pageEnd}`
      : '';

  return (
    <div
      key={index}
      className="flex items-baseline text-sm mb-1"
      style={{ paddingLeft: `${indentPx}px` }}
    >
      <div className="flex-grow flex overflow-hidden whitespace-nowrap">
        <span className="truncate">{entry.title}</span>
        <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
      </div>
      <span className="font-semibold text-right">{pageStr}</span>
    </div>
  );
};



  return (
    <div className={PAGE_COMMON_CLASSES}>
      <div className={PAGE_NUMBER_PLACEHOLDER_CLASSES}></div> {/* Page number will be inserted by Flow */}
      <div className={INNER_PAGE_CONTENT_CLASSES}>
        <h1 className="text-center text-2xl font-bold text-amber-800 underline mb-10 mt-10">
          {pageTitle}
        </h1>

        <div className="flex-grow overflow-y-auto"> {/* Allow scrolling if TOC is very long */}
          {tocData.map((entry, index) => renderTocEntry(entry, index))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContentsPage;
