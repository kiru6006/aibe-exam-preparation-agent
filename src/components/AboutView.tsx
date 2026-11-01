import React from 'react';
import { 
  Scale, 
  BookOpen, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 font-sans">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A365D]/5 text-[#1A365D] text-xs font-mono font-medium border border-[#1A365D]/10">
          <Scale className="w-3.5 h-3.5 text-[#C05621]" />
          <span>Statutory Professional Examination</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A365D]">
          About All India Bar Examination (AIBE)
        </h1>

        <p className="text-base text-[#4A5568] font-serif leading-relaxed max-w-3xl">
          The All India Bar Examination is conducted by the <strong>Bar Council of India (BCI)</strong> to assess an advocate’s capability to practice the profession of law in India. Passing the AIBE awards the advocate a <strong>Certificate of Practice (COP)</strong>, mandatory to practice in Indian Courts of Law.
        </p>
      </div>

      {/* Grid of Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purpose & Legal Mandate */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#C05621]" />
            <h2 className="text-lg font-serif font-bold text-[#1A365D]">Mandate & COP</h2>
          </div>
          <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
            Under the Advocates Act, 1961 and Bar Council Rules, law graduates enrolled provisionally with State Bar Councils must qualify the AIBE within 2 years of provisional enrollment to continue practicing in any court in India.
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-[#2B6CB0]" />
            <h2 className="text-lg font-serif font-bold text-[#1A365D]">Eligibility Criteria</h2>
          </div>
          <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
            Candidates must hold an LL.B. degree (3-year or 5-year integrated law) from a university recognized by the Bar Council of India and must be enrolled provisionally with their respective State Bar Council.
          </p>
        </div>

        {/* Qualifying Marks */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#22543D]" />
            <h2 className="text-lg font-serif font-bold text-[#1A365D]">Pass / Qualifying Criteria</h2>
          </div>
          <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
            AIBE is strictly a qualifying test with no competitive ranking or merit list:
          </p>
          <ul className="text-xs text-[#2D3748] space-y-1 font-serif">
            <li>• <strong>General & OBC Candidates:</strong> Minimum 45% (calculated on scorable questions).</li>
            <li>• <strong>SC, ST & PwD Candidates:</strong> Minimum 40% (calculated on scorable questions).</li>
          </ul>
        </div>

        {/* Bare Acts Permitted */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#D69E2E]" />
            <h2 className="text-lg font-serif font-bold text-[#1A365D]">Bare Acts Policy</h2>
          </div>
          <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
            Candidates are allowed to carry <strong>Bare Acts without notes or comments</strong> into the examination hall. Bare Acts with brief footnotes or amendment history are generally accepted, while guidebooks, treatises, and electronic devices are strictly prohibited.
          </p>
        </div>
      </div>

      {/* Official Disclaimers */}
      <div className="bg-[#FAF8F5] border border-[#E8E2DA] rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#718096] uppercase font-bold">
          <Info className="w-4 h-4 text-[#1A365D]" />
          <span>Independent Educational Platform Notice</span>
        </div>
        <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
          This web application is an open-source educational study tool created exclusively for law students and advocates preparing for the All India Bar Examination. It is not affiliated with, endorsed by, or operated by the Bar Council of India (BCI). Official schedules, guidelines, and results should always be verified on the official BCI website: <a href="https://allindiabarexamination.com" target="_blank" rel="noopener noreferrer" className="text-[#2B6CB0] underline hover:text-[#1A365D]">allindiabarexamination.com</a>.
        </p>
      </div>
    </div>
  );
};
