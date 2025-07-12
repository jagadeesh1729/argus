import React from 'react';

// PageWrapper component to define a single A4-sized page for PDF export
type PageWrapperProps = {
  children: React.ReactNode;
  className?: string; // Optional className for additional styling
};

const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    // The main container for an A4 page (210mm x 297mm at 96dpi is approx 794px x 1123px)
    // 'break-inside-avoid page-break' are crucial for print and PDF generation.
    // 'overflow-hidden' is REMOVED to allow content to render fully for html2canvas.
    // The 'page-number-placeholder' div is added for Flow to inject the page number.
    <div className={`border-4 border-yellow-500 m-6 p-8 bg-white w-[794px] h-[1123px] mx-auto shadow break-inside-avoid page-break relative flex flex-col justify-between ${className}`}>
      {/* Content of the page */}
      <div>
        {children}
      </div>

      {/* Placeholder for page number, which will be dynamically filled by Flow.tsx */}
      {/* Positioned at the bottom right as per previous request, but can be top right if needed */}
      <div className="absolute bottom-8 right-8 text-sm text-gray-600 page-number-placeholder">
        {/* Page number will be inserted here by Flow's useEffect */}
      </div>
    </div>
  );
};

export default PageWrapper;
