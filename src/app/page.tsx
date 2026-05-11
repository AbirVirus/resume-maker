import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Layout, Download, GripVertical, Eye } from "lucide-react";

const templates = [
  { name: "Classic", description: "Traditional serif, single-column layout", color: "bg-blue-100 text-blue-700" },
  { name: "Modern", description: "Clean sans-serif with sidebar", color: "bg-purple-100 text-purple-700" },
  { name: "Minimal", description: "Crisp typography, lots of whitespace", color: "bg-gray-100 text-gray-700" },
  { name: "Creative", description: "Accent colors with two-column design", color: "bg-pink-100 text-pink-700" },
  { name: "Executive", description: "Centered, boardroom-ready styling", color: "bg-amber-100 text-amber-700" },
];

const features = [
  { icon: Layout, title: "5 Professional Templates", description: "From classic to creative — switch templates anytime without losing your content." },
  { icon: GripVertical, title: "Drag & Drop Sections", description: "Reorder resume sections exactly how you want them. Full control over layout." },
  { icon: Eye, title: "Real-Time Preview", description: "See every change instantly in a live A4 preview panel as you edit." },
  { icon: Sparkles, title: "AI-Powered Suggestions", description: "Get smart skill recommendations, bullet improvements, and professional summaries." },
  { icon: FileText, title: "Cover Letter Generator", description: "AI drafts tailored cover letters matching your resume and target job." },
  { icon: Download, title: "Multi-Format Export", description: "Download as PDF, ATS-friendly text, or JSON. Import from JSON too." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-zinc-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-zinc-900">ResumeForge</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Sign In</Link>
            <Link href="/register" className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          AI-powered resume builder
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 leading-tight mb-6">
          Build a resume that<br />gets you hired
        </h1>
        <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Create polished, ATS-friendly resumes in minutes. Choose from professional templates,
          get AI suggestions, and export to PDF — all in your browser.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors">
            Start Building Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/templates" className="inline-flex items-center gap-2 font-medium text-zinc-600 px-6 py-3 rounded-lg hover:text-zinc-900 transition-colors border border-zinc-200 hover:border-zinc-300">
            Browse Templates
          </Link>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-zinc-900 mb-2">Choose Your Template</h2>
        <p className="text-zinc-500 text-center mb-10">Switch between templates anytime — your content stays intact.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {templates.map((t) => (
            <div key={t.name} className="rounded-xl border border-zinc-200 p-5 hover:border-zinc-400 transition-colors">
              <div className={`w-full h-32 rounded-lg ${t.color} mb-3 flex items-center justify-center`}>
                <Layout className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="font-semibold text-zinc-900">{t.name}</h3>
              <p className="text-sm text-zinc-500 mt-1">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-zinc-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-zinc-900 mb-2">Everything You Need</h2>
          <p className="text-zinc-500 text-center mb-12">All the tools to create a standout resume in one place.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-zinc-700" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Ready to land your next role?</h2>
        <p className="text-zinc-500 mb-8">Join thousands of professionals who built their resumes with ResumeForge.</p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium px-8 py-3.5 rounded-lg hover:bg-zinc-800 transition-colors text-lg">
          Create Your Resume Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-zinc-400">ResumeForge — Build Professional Resumes</span>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">Sign In</Link>
            <Link href="/register" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
