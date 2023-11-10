"use client";
import { PDFViewer } from "@react-pdf/renderer";

export default function PDF_Viewer({
  datasheet,
  className,
}: {
  datasheet: any;
  className?: string;
}) {
  return <PDFViewer className={className}>{datasheet}</PDFViewer>;
}
