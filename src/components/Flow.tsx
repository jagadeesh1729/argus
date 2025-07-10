/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import HeaderPage from '../components/pages/HeaderPage';
import QualityControlPlan from '../components/pages/QualityControlPlan';
import Purpose from './pages/Purpose';
import NameQualifications from './pages/NameQualifications';
import OrganizationalChart from './pages/OrganaizationalChart';
import ProjectQualityControlManager from './pages/ProjectQualityControlManager';
import AlternateQualityControlManager from './pages/AlternateQualityControlManager';
import ProjectManager from './pages/ProjectManager';
import AppointmentLetterHeading from './pages/AppointmentLetterHeading';
import OutsideOrganizations from './pages/OutsideOrganizations';
import QCResponsibilities from './pages/QCResponsibilities';
import AppointmentQCManagerLetter from './atoms/appointment/AppointmentQCManagerLetter';
import AppointmentQCManagerResponsibilities from './atoms/appointment/AppointmentQCManagerResponsibilities';
import AppointmentQCAlternateManagerLetter from './atoms/appointment/AppointmentQCAlternateManagerLetter';
import FinalAppointmentLetter from './atoms/appointment/FinalAppointmentLetter';
import SubmittalRegister from './pages/SubmittalRegister';
import TestingRequirements from './pages/TestingRequirements';
import TrainingLogPage from './pages/TrainingLogPage';
import AsBuiltDrawings from './pages/AsBuiltDrawings';
import FollowUpPhaseChecklist from './pages/FollowUpPhaseChecklist';
import ThreePhasesControl from './pages/ThreePhasesControl';
import Threephaseupload from './pages/Threephaseupload';
import Dfow from './pages/Dfow';
import ReworkProceduresPage from './pages/ReworkProceduresPage';
import ReworkItemsListPage from './pages/ReworkItemsListPage';
import DocumentControlProceduresPage from './pages/DocumentControlProceduresPage;';
import TestingPlanEditor from './atoms/TestingPlanEditor';

const Flow = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const sanitizeColors = (element: HTMLElement) => {
    const allElements = element.querySelectorAll<HTMLElement>("*");
    allElements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.color.includes('oklch')) {
        el.style.setProperty('color', '#000', 'important');
      }
      if (computedStyle.backgroundColor.includes('oklch')) {
        el.style.setProperty('background-color', '#fff', 'important');
      }
      if (computedStyle.borderColor.includes('oklch')) {
        el.style.setProperty('border-color', '#000', 'important');
      }

      // Remove input borders for printing
      if (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.classList.contains('editable')
      ) {
        el.style.setProperty('border', 'none', 'important');
        el.style.setProperty('box-shadow', 'none', 'important');
      }
    });
  };

  const cloneWithComputedStyles = (source: HTMLElement) => {
    const clone = source.cloneNode(true) as HTMLElement;
    const sourceElements = source.querySelectorAll('*');
    const cloneElements = clone.querySelectorAll('*');

    sourceElements.forEach((sourceEl, index) => {
      const cloneEl = cloneElements[index] as HTMLElement;
      const computedStyle = window.getComputedStyle(sourceEl);
      Array.from(computedStyle).forEach((key) => {
        const value = computedStyle.getPropertyValue(key);
        if (value.includes('oklch')) return;
        cloneEl.style.setProperty(key, value);
      });
    });

    return clone;
  };

  const handleDownload = async () => {
    const input = contentRef.current;
    if (!input) {
      alert("Document not ready yet. Please wait.");
      return;
    }

    try {
      const pages = input.querySelectorAll('.border-yellow-500');
      const pdf = new jsPDF('p', 'pt', 'a4');

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        sanitizeColors(page);
        const cloned = cloneWithComputedStyles(page);
        document.body.appendChild(cloned);
        cloned.style.position = 'absolute';
        cloned.style.left = '-9999px';

        const canvas = await html2canvas(cloned, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        document.body.removeChild(cloned);

        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save('QualityControlForm.pdf');
    } catch (error: any) {
      console.error("Failed to generate PDF:", error);
      alert(`Failed to generate PDF: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow mb-4"
        disabled={!isReady}
      >
        Download PDF
      </button>

      <div ref={contentRef} className="bg-white p-4">
        <HeaderPage />
        <QualityControlPlan />
        <Purpose/>
        <NameQualifications/>
        <OrganizationalChart/>
        <ProjectQualityControlManager/>
        <AlternateQualityControlManager/>
        <ProjectManager/>  
        <QCResponsibilities/>
         <OutsideOrganizations/>
        <AppointmentLetterHeading/>
        <AppointmentQCManagerLetter/>
        <AppointmentQCManagerResponsibilities/>
        <AppointmentQCAlternateManagerLetter/>
        <FinalAppointmentLetter/>
        <SubmittalRegister/>
        <TestingRequirements/>
        <TestingPlanEditor/>
        <ReworkProceduresPage/>
        <ReworkItemsListPage/>
        <DocumentControlProceduresPage/>
        <Dfow/>
        <ThreePhasesControl/>
        <Threephaseupload/>
        <FollowUpPhaseChecklist/>
        <AsBuiltDrawings/>
        <TrainingLogPage/>
     
      </div>
    </div>
  );
};

export default Flow;
