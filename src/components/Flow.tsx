/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';     
import jsPDF from 'jspdf';

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
import TableOfContentsPage, { type TocEntry } from './atoms/TableOfContentsPage';
import NoticeOfNoncompliance from './pages/NoticeOfNoncompliance';
import QsrChecklist from './pages/QsrChecklist';
import useNamesFromLink from '../hooks/useNamesFromLink';


const Flow = () => {
  // Ensure names also load if user lands directly on /flow with a link
  useNamesFromLink();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
    type Track = { start: number; end: number; level: number };
    const map = new Map<string, Track>();   // title → first/last page

    pages.forEach((page, idx) => {
      const pageNum = idx + 1;

      // grab every h1/h2/h3 in *this* page
      page.querySelectorAll<HTMLElement>('h1, h2, h3').forEach(h => {
        const title = h.textContent?.trim() ?? '';
        if (!title || title === 'TABLE OF CONTENTS') return;  

        const level = parseInt(h.tagName[1]); 

        const key = `${level}-${title}`;     
        const tracked = map.get(key);

        if (tracked) {
          tracked.end = pageNum;             
        } else {
          map.set(key, { start: pageNum, end: pageNum, level });
        }
      });
    });
    const toc: TocEntry[] = Array.from(map.values()).map(v => ({
      title     : [...map.entries()].find(([, val]) => val === v)![0].split('-').slice(1).join('-'),
      pageStart : v.start,
      pageEnd   : v.end,
      level     : v.level
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


  /* ——— main PDF routine ——— */  const handleDownload = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);

    const doc = new jsPDF({ unit: 'pt', format: 'a4'//, compress: true 

    });
    const pdfW = doc.internal.pageSize.getWidth();
    const pdfH = doc.internal.pageSize.getHeight();

    let pageEls = Array.from(
      contentRef.current!.querySelectorAll<HTMLElement>('.page-break'),
    );

    // Fallback: if no explicit page containers found, snapshot the whole content
    if (pageEls.length === 0) {
      pageEls = [contentRef.current!];
    }
    

    for (let i = 0; i < pageEls.length; i++) {
      const page = cloneWithStyles(pageEls[i]);

      
      page.style.position = 'absolute';
      page.style.left = '-9999px';
        let pageNumberEl = page.querySelector('.page-number-placeholder');
    if (!pageNumberEl) {
      pageNumberEl = document.createElement('div');
      pageNumberEl.className = 'page-number-placeholder absolute bottom-8 right-8 text-sm text-gray-600';
      page.appendChild(pageNumberEl);
    }
    pageNumberEl.textContent = `Page ${i + 1}`;
      document.body.appendChild(page);

      /* render to canvas */
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
          removeContainer: true,
      });
      document.body.removeChild(page);

      /* fit image */
      const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height);
      const imgW  = canvas.width * ratio;
      const imgH  = canvas.height * ratio;
      const x = (pdfW - imgW) / 2;
      const y = (pdfH - imgH) / 2;

      if (i > 0) doc.addPage();
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgW, imgH);

      doc.setFontSize(9);
      // doc.text(
      //   `Page ${i + 1} / ${pageEls.length}`,
      //   pdfW - 60,
      //   24,
      // );
    }

    doc.save('QualityControlForm.pdf');
    setIsGenerating(false);
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
          ? 'Generating…'
          : `Download PDF (${pageCount})`}
      </button>

      <div ref={contentRef} className="bg-white p-0">
        <HeaderPage />
        <QualityControlPlan />
        <TableOfContentsPage tocData={tocData}/>
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
