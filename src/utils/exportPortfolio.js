import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture an element and save as PNG
 * @param {HTMLElement} element 
 * @param {string} filename 
 */
export const saveAsImage = async (element, filename = 'portfolio.png') => {
  const canvas = await html2canvas(element, { scale: 2 });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

export const saveAsPDF = async (containerElement, filename = 'portfolio.pdf') => {
  const pages = containerElement.querySelectorAll('.export-page');
  
  if (!pages || pages.length === 0) {
    // Fallback to old behavior if no exact pages are found
    const canvas = await html2canvas(containerElement, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(filename);
    return;
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  for (let i = 0; i < pages.length; i++) {
    const pageEl = pages[i];
    // useCORS is critical to allow local image rendering in the canvas
    const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    const imgWidth = 210; // A4 width
    const imgHeight = (canvas.height * 210) / canvas.width; // Mapped height
    
    let heightLeft = imgHeight;
    let position = 0;
    
    if (i > 0) pdf.addPage();
    
    // Prevent white gaps by pre-painting the PDF background natively
    if (i === 0) {
      pdf.setFillColor(245, 240, 232); // Cream for Cover
    } else if (i === 1) {
      pdf.setFillColor(26, 58, 42); // Green-Dark for Metrics Page
    } else {
      pdf.setFillColor(28, 28, 28); // Charcoal for Chapters
    }
    pdf.rect(0, 0, 210, 297, "F");
    
    // First slice
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // 297 is A4 height in mm
    
    // Add additional pages if the chapter was taller than one A4
    while (heightLeft > 0) {
      pdf.addPage();
      
      // Paint background of extra overflow pages too
      if (i === 0) {
        pdf.setFillColor(245, 240, 232);
      } else if (i === 1) {
        pdf.setFillColor(26, 58, 42);
      } else {
        pdf.setFillColor(28, 28, 28);
      }
      pdf.rect(0, 0, 210, 297, "F");

      position -= 297; // Shift the image UP by one A4 page dimension
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }
  }
  
  pdf.save(filename);
};
