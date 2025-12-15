/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import {
  altQcManagerState,
  projectManagerState,
  qcManagerState,
  shortCompanyNameState,
} from '../recoil/state/formState';

import HeaderPage                    from '../components/pages/HeaderPage';
import QualityControlPlan            from '../components/pages/QualityControlPlan';
import Purpose                       from './pages/Purpose';
import NameQualifications            from './pages/NameQualifications';

import FileSectionRenderer           from './atoms/FileSectionRenderer';
import AppointmentLetterHeading      from './pages/AppointmentLetterHeading';
import OutsideOrganizations          from './pages/OutsideOrganizations';
import QCResponsibilities            from './pages/QCResponsibilities';
import AppointmentQCManagerLetter    from './atoms/appointment/AppointmentQCManagerLetter';
import AppointmentQCManagerResponsibilities from './atoms/appointment/AppointmentQCManagerResponsibilities';
import AppointmentQCAlternateManagerLetter from './atoms/appointment/AppointmentQCAlternateManagerLetter';
import FinalAppointmentLetter         from './atoms/appointment/FinalAppointmentLetter';

import TestingRequirements            from './pages/TestingRequirements';
import TrainingLogPage                from './pages/TrainingLogPage';
import AsBuiltDrawings                from './pages/AsBuiltDrawings';
import FollowUpPhaseChecklist         from './pages/FollowUpPhaseChecklist';
import ThreePhasesControl             from './pages/ThreePhasesControl';
import Dfow                           from './pages/Dfow';
import ReworkProceduresPage           from './pages/ReworkProceduresPage';
import ReworkItemsListPage            from './pages/ReworkItemsListPage';
import DocumentControlProceduresPage  from './pages/DocumentControlProceduresPage;';
import TestingPlanEditor              from './atoms/TestingPlanEditor';
import TableOfContentsPage, { type TocEntry, generateTocId } from './atoms/TableOfContentsPage';
import NoticeOfNoncompliance from './pages/NoticeOfNoncompliance';
import QsrChecklist from './pages/QsrChecklist';
import useNamesFromLink from '../hooks/useNamesFromLink';


const Flow = () => {
  // Ensure names also load if user lands directly on /flow with a link
  useNamesFromLink();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
    const [pageCount, setPageCount] = useState(0); // State to hold the total number of pages
 const [tocData, setTocData] = useState<TocEntry[]>([]);
  const qc_manager    = useRecoilValue(qcManagerState)||null;
  const alt_qc_manager= useRecoilValue(altQcManagerState)||null;
  const project_mgr   = useRecoilValue(projectManagerState)||null;

  const shortCompanyName  = useRecoilValue(shortCompanyNameState) || '';
  const qcManagerHeading  = `4. Project Quality Control Manager, Superintendent, & Site Safety and Health Officer\nINSERT RESUME & QUALIFICATIONS [${qc_manager}]`;
  const altQcHeading      = `5. Project Alternate Quality Control Manager\nINSERT RESUME & QUALIFICATIONS [${alt_qc_manager}]`;
  const projectMgrHeading = `6. Project Manager\nINSERT RESUME & QUALIFICATIONS [${project_mgr}]`;
  const orgChartHeading   = `3.\t ${shortCompanyName || 'Company'} – Quality Control`;
  const submittalHeading  = '10.Submittal Register & Submittal Procedures';
  const msg="The following checklists (enclosed) are used in conjunction; Preparatory, Initial and Follow-Up Phase reports."
useEffect(() => {
  if (!contentRef.current) return;

  const rebuild = () => {
    const pages = contentRef.current!.querySelectorAll<HTMLElement>('.page-break');
    pages.forEach((p, idx) => {
      const ph = p.querySelector<HTMLElement>('.page-number-placeholder');
      if (ph) ph.textContent = `Page${idx + 1}`;
    });
    type Track = { start: number; end: number; level: number; id: string };
    const map = new Map<string, Track>();   // title → first/last page

    pages.forEach((page, idx) => {
      const pageNum = idx + 1;

      // grab every h1/h2/h3 in *this* page
      page.querySelectorAll<HTMLElement>('h1, h2, h3').forEach(h => {
        const title = h.textContent?.trim() ?? '';
        if (!title || title === 'TABLE OF CONTENTS') return;  

        const level = parseInt(h.tagName[1]); 
        const id = generateTocId(title, level);

        // Add ID to the heading for navigation
        if (!h.id) {
          h.id = id;
        }

        const key = `${level}-${title}`;     
        const tracked = map.get(key);

        if (tracked) {
          tracked.end = pageNum;             
        } else {
          map.set(key, { start: pageNum, end: pageNum, level, id });
        }
      });
    });
    const toc: TocEntry[] = Array.from(map.values()).map(v => ({
      title     : [...map.entries()].find(([, val]) => val === v)![0].split('-').slice(1).join('-'),
      pageStart : v.start,
      pageEnd   : v.end,
      level     : v.level,
      id        : v.id
    }));

    setPageCount(pages.length);
    setTocData(toc);
    setIsReady(true);
  };

  /* first build */
  rebuild();
  const observer = new MutationObserver(() => {
    observer.disconnect();      // prevent self‑trigger loop
    rebuild();                  // rebuild TOC + numbers
    observer.observe(
      contentRef.current!,      // re‑attach
      { childList: true, subtree: true }
    );
  });

  observer.observe(contentRef.current, { childList: true, subtree: true });
  return () => observer.disconnect();
}, [qc_manager, alt_qc_manager, project_mgr]); 


  function cloneWithStyles(node: HTMLElement): HTMLElement {
  const clone = node.cloneNode(true) as HTMLElement;

  const copyStyles = (source: HTMLElement, target: HTMLElement) => {
    const computedStyle = window.getComputedStyle(source);
    for (const key of computedStyle) {
      try {
        target.style.setProperty(
          key,
          computedStyle.getPropertyValue(key),
          computedStyle.getPropertyPriority(key)
        );
      } catch (e) {
        // Some styles (like pseudo-elements) may throw; ignore them
      }
    }

    Array.from(source.children).forEach((srcChild, index) => {
      const tgtChild = target.children[index] as HTMLElement;
      if (srcChild instanceof HTMLElement && tgtChild) {
        copyStyles(srcChild, tgtChild);
      }
    });
  };

  copyStyles(node, clone);
  return clone;
}


  // Helper to convert image to base64
  const imageToBase64 = (img: HTMLImageElement): Promise<string> => {
    return new Promise((resolve) => {
      if (img.src.startsWith('data:')) {
        resolve(img.src);
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          resolve(canvas.toDataURL('image/png'));
        } catch (e) {
          resolve(img.src); // fallback to original if CORS issue
        }
      } else {
        resolve(img.src);
      }
    });
  };

  /* ——— main PDF routine - Native backend generation ——— */
  const handleDownload = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);
    setGeneratingProgress(10);

    try {
      // Get all page elements and update page numbers
      const pageEls = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>('.page-break'),
      );
      
      // Update page numbers before capturing
      pageEls.forEach((p, idx) => {
        const ph = p.querySelector<HTMLElement>('.page-number-placeholder');
        if (ph) ph.textContent = `Page ${idx + 1}`;
      });

      setGeneratingProgress(15);

      // Convert all images to base64
      const images = Array.from(contentRef.current.querySelectorAll<HTMLImageElement>('img'));
      const imagePromises = images.map(async (img) => {
        const base64 = await imageToBase64(img);
        return { img, base64 };
      });
      const imageResults = await Promise.all(imagePromises);
      
      // Store original src and replace with base64
      const originalSrcs = imageResults.map(({ img, base64 }) => {
        const original = img.src;
        img.src = base64;
        return { img, original };
      });

      setGeneratingProgress(25);

      // Get all styles from the document
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            // External stylesheets may throw CORS errors
            return '';
          }
        })
        .join('\n');

      // Build complete HTML with inline styles and explicit border styles
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            ${styles}
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #f3f4f6; }
            * { box-sizing: border-box; }
            .page-break { 
              page-break-after: always; 
              page-break-inside: avoid;
              break-after: page;
              border: 4px solid #eab308 !important;
              background: white !important;
            }
            .page-break:last-child { page-break-after: avoid; }
            /* Ensure borders and lines are visible */
            .border { border-style: solid !important; }
            .border-2 { border-width: 2px !important; }
            .border-4 { border-width: 4px !important; }
            .border-yellow-500 { border-color: #eab308 !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            .border-gray-400 { border-color: #9ca3af !important; }
            .border-black { border-color: #000 !important; }
            .border-b { border-bottom-style: solid !important; }
            .border-t { border-top-style: solid !important; }
            .border-l { border-left-style: solid !important; }
            .border-r { border-right-style: solid !important; }
            .divide-y > * + * { border-top: 1px solid #e5e7eb !important; }
            .divide-x > * + * { border-left: 1px solid #e5e7eb !important; }
            hr { border-top: 1px solid #e5e7eb; }
            table { border-collapse: collapse; }
            th, td { border: 1px solid #d1d5db; }
            .shadow { box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1); }
            /* TOC links styling */
            a[data-toc-link] { text-decoration: none !important; color: inherit !important; }
            a[data-toc-link]:hover { background-color: #fefce8; }
            /* Images */
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          ${contentRef.current.innerHTML}
        </body>
        </html>
      `;

      // Restore original image sources
      originalSrcs.forEach(({ img, original }) => {
        img.src = original;
      });

      setGeneratingProgress(40);

      // Send to backend for native PDF generation
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });

      setGeneratingProgress(80);

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QualityControlForm.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setGeneratingProgress(100);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
      setGeneratingProgress(0);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <button
        onClick={handleDownload}
        disabled={!isReady || isGenerating}
        className={`${
          !isReady || isGenerating
            ? 'bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-4 py-2 rounded shadow mb-4`}
      >
        {isGenerating
          ? `Generating… ${generatingProgress}%`
          : `Download PDF (${pageCount})`}
      </button>

      <div ref={contentRef} className="bg-white p-0">
        <HeaderPage />
        <QualityControlPlan />
        <TableOfContentsPage tocData={tocData} onNavigate={(id) => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}/>
        <Purpose />
        <NameQualifications />

        <FileSectionRenderer
          role="flowchart"
          initialHeading={orgChartHeading}
        />
        <FileSectionRenderer
          role="projectQualityControlManager"
          initialHeading={qcManagerHeading}
        />
        <FileSectionRenderer
          role="alternateProjectManager"
          initialHeading={altQcHeading}
        />
        <FileSectionRenderer
          role="projectManager"
          initialHeading={projectMgrHeading}
        />

        <QCResponsibilities />
        <OutsideOrganizations />
        <AppointmentLetterHeading />
        <AppointmentQCManagerLetter />
        <AppointmentQCManagerResponsibilities />
        <AppointmentQCAlternateManagerLetter />
        <FinalAppointmentLetter />
        <FileSectionRenderer
          role="submittalRegister"
          initialHeading={submittalHeading}
        />

        <TestingRequirements />
        <TestingPlanEditor />
        <ReworkProceduresPage />
        <ReworkItemsListPage />
        <DocumentControlProceduresPage />
        <NoticeOfNoncompliance/>
        <QsrChecklist/>
        <FileSectionRenderer role='qcr'initialHeading=''/>
        <Dfow />
        <ThreePhasesControl />
       <FileSectionRenderer initialHeading={msg} role='threephase' notheading={false}/>

        <FollowUpPhaseChecklist />
        <AsBuiltDrawings />
        <TrainingLogPage />
      </div>
    </div>
  );
};

export default Flow;
