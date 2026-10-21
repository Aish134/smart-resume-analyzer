import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness,
  Building2, Check, CheckCircle2, ChevronDown, CircleHelp, ClipboardList, CloudUpload,
  FileCheck2, FileText, Filter, Gauge, LayoutDashboard, LogOut, Menu, MessageCircle,
  MessageSquareText, Search, Settings, ShieldCheck, Sparkles, Target, Users, X, Zap,
  Bookmark, CalendarDays, ChartNoAxesCombined, Clock3, Download, Eye, GraduationCap,
  MapPin, MoreHorizontal, Paperclip, Plus, Send, SlidersHorizontal, Star, Upload,
  UserRound, UserRoundCheck, WandSparkles, CircleCheck, CircleAlert, KeyRound
} from "lucide-react";
import "./App.css";

const jobs = [
  { id: 1, title: "Software Engineer", company: "Google", location: "Remote · India", type: "Full time", match: 92, tags: ["React", "Node.js", "JavaScript"], color: "google", logo: "G", posted: "2 days ago", salary: "₹12–18 LPA" },
  { id: 2, title: "Full Stack Developer", company: "Microsoft", location: "Hybrid · Pune", type: "Full time", match: 88, tags: ["React", "Python", "SQL"], color: "microsoft", logo: "▦", posted: "3 days ago", salary: "₹10–16 LPA" },
  { id: 3, title: "Frontend Developer", company: "Amazon", location: "Remote · India", type: "Full time", match: 84, tags: ["React", "TypeScript", "Tailwind"], color: "amazon", logo: "a", posted: "1 week ago", salary: "₹9–14 LPA" },
  { id: 4, title: "AI/ML Engineer", company: "Meta", location: "On-site · Bengaluru", type: "Full time", match: 82, tags: ["Python", "ML", "TensorFlow"], color: "meta", logo: "∞", posted: "5 days ago", salary: "₹14–22 LPA" },
];
const applicationsSeed = [
  { role: "Software Engineer", company: "Google", status: "Interview", date: "Oct 16, 2026", color: "google", logo: "G" },
  { role: "Full Stack Developer", company: "Microsoft", status: "Applied", date: "Oct 14, 2026", color: "microsoft", logo: "▦" },
  { role: "Frontend Developer", company: "Amazon", status: "Offer", date: "Oct 10, 2026", color: "amazon", logo: "a" },
  { role: "AI/ML Engineer", company: "Meta", status: "Applied", date: "Oct 08, 2026", color: "meta", logo: "∞" },
];
const candidates = [
  { name: "Alex Johnson", role: "Software Engineer", score: 92, skills: ["React", "Node.js", "AWS"], status: "Shortlisted", initials: "AJ", tone: "blue" },
  { name: "Priya Sharma", role: "Full Stack Developer", score: 88, skills: ["React", "Python", "SQL"], status: "Applied", initials: "PS", tone: "pink" },
  { name: "Rahul Mehta", role: "Frontend Developer", score: 84, skills: ["React", "TypeScript"], status: "Interview", initials: "RM", tone: "green" },
  { name: "Sneha Patel", role: "AI/ML Engineer", score: 82, skills: ["Python", "ML", "TensorFlow"], status: "Applied", initials: "SP", tone: "orange" },
];

function Logo({ small = false }) {
  return <a className={`logo ${small ? "logo-small" : ""}`} href="#home" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("smarthire-home")); }}>
    <span className="logo-symbol"><ScanIcon /></span><span>SmartHire</span>
  </a>;
}
function ScanIcon() { return <Sparkles size={smallIconSize()} strokeWidth={2.5} />; }
function smallIconSize() { return 17; }

function Btn({ children, variant = "primary", ...props }) {
  return <button className={`btn btn-${variant}`} {...props}>{children}</button>;
}
function BrandMark({ item }) {
  return <span className={`company-mark ${item.color}`}>{item.logo}</span>;
}
function ScoreRing({ score = 85, small = false }) {
  return <div className={`score-ring ${small ? "score-ring-small" : ""}`} style={{ "--score": `${score}%` }}><div><strong>{score}%</strong>{!small && <span>Overall fit</span>}</div></div>;
}
function Topbar({ title, onMenu, search, setSearch, role = "Candidate", onRole }) {
  return <header className="topbar">
    <button className="mobile-nav-toggle" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
    <div className="topbar-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs, skills, companies..." aria-label="Search" /><kbd>⌘ K</kbd></div>
    <div className="topbar-right">
      <button className="topbar-icon" aria-label="Notifications"><Bell size={18} /><i /></button>
      <button className="profile-chip" onClick={onRole}><span className="profile-avatar">{role === "Recruiter" ? "ER" : "JD"}</span><span className="profile-meta"><strong>{role === "Recruiter" ? "Emily Reed" : "John Doe"}</strong><small>{role}</small></span><ChevronDown size={14} /></button>
    </div>
  </header>;
}
function Sidebar({ active, setActive, role, setRole, open, setOpen }) {
  const candidateLinks = [
    ["Overview", LayoutDashboard], ["My Resume", FileText], ["Job Matches", BriefcaseBusiness],
    ["Applications", ClipboardList], ["Skill Analysis", ChartNoAxesCombined], ["AI Assistant", MessageSquareText],
  ];
  const recruiterLinks = [
    ["Overview", LayoutDashboard], ["Jobs", BriefcaseBusiness], ["Candidates", Users],
    ["Analytics", ChartNoAxesCombined], ["Messages", MessageSquareText],
  ];
  const links = role === "Recruiter" ? recruiterLinks : candidateLinks;
  return <>{open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand"><Logo /></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="sidebar-nav">
        {links.map(([label, Icon]) => <button key={label} className={`sidebar-link ${active === label ? "active" : ""}`} onClick={() => { setActive(label); setOpen(false); }}>
          <Icon size={17} /><span>{label}</span>{label === "Applications" && role === "Candidate" && <span className="nav-count">4</span>}
        </button>)}
      </nav>
      <div className="sidebar-divider" />
      <div className="workspace-label">PREFERENCES</div>
      <nav className="sidebar-nav">
        <button className={`sidebar-link ${active === "Profile" ? "active" : ""}`} onClick={() => { setActive("Profile"); setOpen(false); }}><UserRound size={17} /><span>Profile</span></button>
        <button className={`sidebar-link ${active === "Settings" ? "active" : ""}`} onClick={() => { setActive("Settings"); setOpen(false); }}><Settings size={17} /><span>Settings</span></button>
        <button className={`sidebar-link ${active === "Help & Support" ? "active" : ""}`} onClick={() => { setActive("Help & Support"); setOpen(false); }}><CircleHelp size={17} /><span>Help & Support</span></button>
      </nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card"><span className="upgrade-icon"><Zap size={16} /></span><strong>Career boost</strong><p>Get tailored insights to stand out.</p><button onClick={() => setActive("Skill Analysis")}>Explore insights <ArrowRight size={13} /></button></div>
        <button className="sidebar-link logout-link" onClick={() => { setRole("Candidate"); setActive("Overview"); }}><LogOut size={17} /><span>Switch workspace</span></button>
        <div className="sidebar-foot"><span className="status-dot" /> All systems operational</div>
      </div>
    </aside>
  </>;
}

function StatCard({ label, value, note, icon: Icon, tone = "purple", trend }) {
  return <article className="stat-card"><div className="stat-card-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18} /></span></div><div className="stat-value">{value}</div><div className="stat-note">{trend && <span className="trend"><ArrowUpRight size={13} />{trend}</span>}<span>{note}</span></div></article>;
}
function SectionTitle({ title, subtitle, action, onAction }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="inline-action" onClick={onAction}>{action}<ArrowRight size={14} /></button>}</div>;
}
function JobRow({ job, onView, saved, onSave }) {
  return <article className="job-row"><BrandMark item={job} /><div className="job-main"><button className="job-title" onClick={() => onView(job)}>{job.title}</button><p>{job.company} <span>·</span> {job.location}</p><div className="tag-row">{job.tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}</div></div><div className="job-match"><strong>{job.match}%</strong><span>match</span><div className="mini-track"><i style={{ width: `${job.match}%` }} /></div></div><div className="job-row-actions"><button className={`icon-action ${saved ? "saved" : ""}`} onClick={() => onSave(job.id)} aria-label={saved ? "Unsave job" : "Save job"}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /></button><button className="small-outline" onClick={() => onView(job)}>View</button></div></article>;
}
function CandidateOverview({ setActive, onViewJob, saved, onSave, applications }) {
  return <div className="page-content">
    <div className="welcome-row"><div><div className="greeting-label">MONDAY, OCTOBER 22, 2026</div><h1>Welcome back, John! <span className="wave">✦</span></h1><p>Here’s your career overview. Keep up the great momentum.</p></div><Btn onClick={() => setActive("My Resume")}><Upload size={16} /> Update resume</Btn></div>
    <div className="stats-grid">
      <StatCard label="Resume score" value="85%" note="Good foundation" icon={Gauge} tone="purple" trend="+8%" />
      <StatCard label="Matched jobs" value="24" note="Relevant opportunities" icon={Target} tone="blue" trend="+12%" />
      <StatCard label="Applications" value={applications.length} note="Across 4 companies" icon={ClipboardList} tone="green" />
      <StatCard label="Profile views" value="42" note="In the last 30 days" icon={Eye} tone="orange" trend="+18%" />
    </div>
    <div className="dashboard-grid">
      <section className="panel jobs-panel"><SectionTitle title="Top job matches" subtitle="Roles that align with your profile" action="View all" onAction={() => setActive("Job Matches")} />
        <div className="job-list">{jobs.slice(0, 3).map((job) => <JobRow key={job.id} job={job} onView={onViewJob} saved={saved.includes(job.id)} onSave={onSave} />)}</div>
      </section>
      <section className="panel analysis-panel"><SectionTitle title="Resume analysis" subtitle="Your latest resume snapshot" action="Details" onAction={() => setActive("Skill Analysis")} />
        <div className="analysis-center"><ScoreRing score={85} /><div className="analysis-summary"><strong>Strong foundation</strong><span>Your resume has a solid start.</span></div></div>
        <div className="analysis-legend"><span><i className="legend-green" /> Skills matched <strong>18</strong></span><span><i className="legend-blue" /> Missing skills <strong>4</strong></span><span><i className="legend-orange" /> Suggestions <strong>6</strong></span></div>
        <Btn className="full-width" onClick={() => setActive("Skill Analysis")}>Improve resume <Sparkles size={15} /></Btn>
      </section>
    </div>
    <section className="panel applications-panel"><SectionTitle title="Recent applications" subtitle="Keep track of your next steps" action="All applications" onAction={() => setActive("Applications")} /><ApplicationsTable applications={applications.slice(0, 3)} /></section>
  </div>;
}
function ApplicationsTable({ applications }) {
  return <div className="table-scroll"><table className="data-table"><thead><tr><th>ROLE</th><th>STATUS</th><th>APPLIED ON</th><th /></tr></thead><tbody>{applications.map((app, i) => <tr key={`${app.role}-${i}`}><td><div className="table-company"><BrandMark item={app} /><div><strong>{app.role}</strong><span>{app.company}</span></div></div></td><td><StatusBadge status={app.status} /></td><td>{app.date}</td><td><button className="small-outline">Details</button></td></tr>)}</tbody></table></div>;
}
function StatusBadge({ status }) { const key = status.toLowerCase().replace(/\s+/g, "-"); return <span className={`status-badge status-${key}`}>{status}</span>; }

function ResumePage({ setActive }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/\.(pdf|doc|docx)$/i.test(f.name)) { setMessage("Choose a PDF, DOC, or DOCX file."); return; }
    if (f.size > 5 * 1024 * 1024) { setMessage("File must be 5 MB or smaller."); return; }
    setFile(f); setMessage("File selected. Connect the backend to analyze it.");
  }
  return <div className="page-content"><PageHeader eyebrow="YOUR DOCUMENTS" title="My resume" subtitle="Keep your resume ready and get useful feedback before applying." />
    <div className="resume-workspace">
      <section className="panel upload-panel"><div className="upload-stepper"><span className="step-active"><i>1</i> Upload</span><span /><span><i>2</i> Analyze</span><span /><span><i>3</i> Results</span></div>
        <label className="upload-drop"><input type="file" accept=".pdf,.doc,.docx" onChange={onFile} /><span className="upload-cloud"><CloudUpload size={28} /></span><strong>{file ? file.name : "Upload your resume"}</strong><span>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Drag and drop your file here, or click to browse"}</span><small>Supports PDF, DOCX (max 5 MB)</small><span className="upload-browse">Choose file</span></label>
        {message && <p className={file ? "inline-success" : "inline-error"}>{message}</p>}
        <div className="upload-tips"><strong><Sparkles size={16} /> Tips for better results</strong><p><Check size={15} /> Use a clear, well-formatted resume</p><p><Check size={15} /> Include relevant work experience</p><p><Check size={15} /> Add measurable achievements and projects</p></div>
        {file && <Btn onClick={() => setMessage("Upload UI is ready; server-side resume parsing has not been connected yet.")}>Analyze resume <ArrowRight size={15} /></Btn>}
      </section>
      <aside className="panel current-resume"><div className="panel-heading"><h2>Latest analysis</h2><span className="status-badge status-applied">Demo</span></div><div className="resume-score-preview"><ScoreRing score={85} /><div><strong>Resume overview</strong><p>Example score only</p><span className="text-green"><CheckCircle2 size={14} /> Skills detected</span></div></div><div className="divider" /><h3>Detected skills</h3><div className="tag-row skill-cloud">{["Python", "SQL", "React", "Node.js", "Machine Learning", "Git"].map(s => <span className="skill-tag" key={s}>{s}</span>)}</div><Btn variant="secondary" className="full-width" onClick={() => setActive("Skill Analysis")}>View analysis <ArrowRight size={15} /></Btn></aside>
    </div>
  </div>;
}
function PageHeader({ eyebrow, title, subtitle, action, onAction }) {
  return <div className="page-heading"><div>{eyebrow && <span className="page-eyebrow">{eyebrow}</span>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action && <Btn onClick={onAction}>{action}</Btn>}</div>;
}
function AnalysisPage({ setActive }) {
  const skills = [["JavaScript",94],["React",90],["Python",82],["SQL",76],["Node.js",73]];
  return <div className="page-content"><PageHeader eyebrow="RESUME INTELLIGENCE" title="Resume analysis" subtitle="Understand your strengths and find practical areas to improve." action="Upload new resume" onAction={() => setActive("My Resume")} />
    <div className="analysis-hero panel"><div><span className="status-badge status-interview">Latest demo report</span><h2>Your resume has a strong foundation.</h2><p>These example insights demonstrate how your resume report will be organized. Connect the analysis service for real results.</p><div className="analysis-pills"><span><CheckCircle2 size={15} /> Skills extracted</span><span><CheckCircle2 size={15} /> Keywords reviewed</span></div></div><ScoreRing score={85} /></div>
    <div className="analysis-detail-grid"><section className="panel"><SectionTitle title="Detected skills" subtitle="Example skill proficiency coverage" />{skills.map(([name, score]) => <div className="detail-skill" key={name}><div><span>{name}</span><strong>{score}%</strong></div><div className="progress-track"><i style={{width:`${score}%`}} /></div></div>)}</section><section className="panel"><SectionTitle title="Recommended improvements" subtitle="Suggested areas to review" /><div className="recommendation"><span className="recommendation-icon red"><CircleAlert size={17}/></span><div><strong>Add measurable impact</strong><p>Include numbers or outcomes in project and experience descriptions.</p></div></div><div className="recommendation"><span className="recommendation-icon blue"><Target size={17}/></span><div><strong>Tailor role keywords</strong><p>Match relevant skills to each job description before applying.</p></div></div><div className="recommendation"><span className="recommendation-icon green"><CheckCircle2 size={17}/></span><div><strong>Highlight key projects</strong><p>Place the most relevant projects and technologies near the top.</p></div></div><Btn className="full-width" onClick={() => setActive("AI Assistant")}>Get AI suggestions <Sparkles size={15}/></Btn></section></div>
  </div>;
}
function JobsPage({ onViewJob, saved, onSave }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = jobs.filter(j => (filter === "All" || (filter === "Remote" ? j.location.includes("Remote") : filter === "High match" ? j.match >= 88 : true)) && `${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-content"><PageHeader eyebrow="OPPORTUNITIES FOR YOU" title="Job matches" subtitle="Discover roles selected to align with your skills and interests." />
    <div className="jobs-toolbar panel"><div className="jobs-search"><Search size={17}/><input placeholder="Search job title, company or skill" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="filter-pills">{["All","High match","Remote"].map(f => <button key={f} className={filter === f ? "filter-active" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div><button className="filter-button"><SlidersHorizontal size={15}/> Filters</button></div>
    <div className="jobs-results-heading"><span><strong>{filtered.length} opportunities</strong> matched to your profile</span><button>Best match <ChevronDown size={14}/></button></div>
    <div className="jobs-page-list">{filtered.map(job => <article className="panel job-card-large" key={job.id}><div className="job-large-head"><BrandMark item={job}/><div><h3>{job.title}</h3><p>{job.company} <span>·</span> {job.location}</p></div><button className={`icon-action ${saved.includes(job.id) ? "saved" : ""}`} onClick={() => onSave(job.id)} aria-label="Save job"><Bookmark size={17} fill={saved.includes(job.id) ? "currentColor" : "none"}/></button></div><div className="job-metadata"><span><BriefcaseBusiness size={14}/>{job.type}</span><span><MapPin size={14}/>{job.location}</span><span><Clock3 size={14}/>{job.posted}</span><span><Building2 size={14}/>{job.salary}</span></div><p className="job-description">Work with a collaborative team to build useful products, improve user experiences, and deliver reliable software. Bring your strengths and grow through meaningful projects.</p><div className="job-card-bottom"><div className="tag-row">{job.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}</div><div className="job-card-end"><span className="match-pill">{job.match}% match</span><Btn variant="secondary" onClick={() => onViewJob(job)}>View details <ArrowRight size={14}/></Btn></div></div></article>)}</div>
  </div>;
}
function JobDetails({ job, setActive, onApply, saved, onSave }) {
  const [applied, setApplied] = useState(false);
  if (!job) return <JobsPage onViewJob={() => {}} saved={saved} onSave={onSave}/>;
  return <div className="page-content"><button className="back-link" onClick={() => setActive("Job Matches")}><ArrowLeft size={15}/> Back to jobs</button><div className="job-detail-layout"><div className="job-detail-main panel"><div className="job-detail-head"><BrandMark item={job}/><div><h1>{job.title}</h1><p>{job.company} · {job.location}</p><div className="job-metadata"><span><BriefcaseBusiness size={14}/>{job.type}</span><span><Clock3 size={14}/>{job.posted}</span></div></div></div><div className="divider"/><div className="detail-tabs"><span className="tab-current">Overview</span><span>Requirements</span><span>Your match</span><span>Company</span></div><h2>Job description</h2><p className="body-copy">As a {job.title}, you will help build scalable products, collaborate with cross-functional teams, and turn complex problems into clear, reliable solutions. This example job listing is included to demonstrate the interface.</p><h2>Key requirements</h2><ul className="requirements-list"><li><CheckCircle2 size={17}/> Strong foundation in {job.tags[0]} and modern development practices.</li><li><CheckCircle2 size={17}/> Experience building maintainable, user-focused applications.</li><li><CheckCircle2 size={17}/> Familiarity with version control, testing, and collaboration.</li><li><CheckCircle2 size={17}/> Clear communication and a willingness to learn.</li></ul><h2>Skills for this role</h2><div className="tag-row">{job.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}</div></div><aside className="job-detail-side"><section className="panel apply-panel"><ScoreRing score={job.match}/><p className="match-explainer">Your example match score</p><div className="divider"/><div className="match-breakdown"><span>Skills match <strong>95%</strong></span><span>Experience match <strong>90%</strong></span><span>Education match <strong>85%</strong></span></div><Btn className="full-width" onClick={() => { setApplied(true); onApply(job); }}>{applied ? "Application added" : "Apply now"} <ArrowRight size={15}/></Btn><Btn variant="secondary" className="full-width" onClick={() => onSave(job.id)}><Bookmark size={15} fill={saved.includes(job.id) ? "currentColor" : "none"}/>{saved.includes(job.id) ? "Saved" : "Save job"}</Btn>{applied && <p className="inline-success">Added to your demo applications list.</p>}</section><section className="panel job-facts"><h3>Job overview</h3><p><Building2 size={15}/> Company <strong>{job.company}</strong></p><p><MapPin size={15}/> Location <strong>{job.location}</strong></p><p><BriefcaseBusiness size={15}/> Employment <strong>{job.type}</strong></p><p><Activity size={15}/> Salary <strong>{job.salary}</strong></p></section></aside></div></div>;
}
function ApplicationsPage({ applications }) {
  const [filter, setFilter] = useState("All");
  const filtered = applications.filter(a => filter === "All" || a.status === filter);
  return <div className="page-content"><PageHeader eyebrow="YOUR JOB SEARCH" title="Applications" subtitle="Stay organized and keep your application journey moving." />
    <div className="stats-grid compact-stats"><StatCard label="Total applications" value={applications.length} note="Across all roles" icon={ClipboardList}/><StatCard label="In progress" value={applications.filter(a=>["Applied","Interview"].includes(a.status)).length} note="Waiting for updates" icon={Clock3} tone="blue"/><StatCard label="Offers" value={applications.filter(a=>a.status==="Offer").length} note="Great progress" icon={CheckCircle2} tone="green"/></div>
    <section className="panel applications-page-panel"><div className="table-toolbar"><div className="filter-pills">{["All","Applied","Interview","Offer","Rejected"].map(f=><button key={f} className={filter===f?"filter-active":""} onClick={()=>setFilter(f)}>{f}</button>)}</div><button className="filter-button"><Download size={15}/> Export</button></div><ApplicationsTable applications={filtered}/></section>
  </div>;
}
function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from:"assistant", text:"Hi John! I can help you think through resume improvements, job matching, and career planning. What would you like to work on?" }]);
  function send(text = input) { if (!text.trim()) return; setMessages(m => [...m, {from:"user",text:text.trim()}, {from:"assistant",text:"That’s a useful question. Once the SmartHire AI service is connected, I’ll answer using your resume and relevant job descriptions. For now, try reviewing your most relevant projects and tailoring your skills to each role."}]); setInput(""); }
  return <div className="page-content assistant-page"><PageHeader eyebrow="CAREER COPILOT" title="AI assistant" subtitle="A workspace for resume questions, skill gaps, and career planning."/><section className="panel chat-panel"><div className="chat-header"><div className="chat-avatar"><Sparkles size={20}/></div><div><strong>SmartHire career assistant</strong><span><i className="status-dot"/> Demo mode · AI API not connected</span></div><button className="icon-action"><MoreHorizontal size={19}/></button></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={`chat-message ${m.from==="user"?"message-user":""}`}><span className="message-avatar">{m.from==="assistant"?<Sparkles size={15}/>:<UserRound size={15}/>}</span><div><small>{m.from==="assistant"?"SmartHire AI":"You"}</small><p>{m.text}</p></div></div>)}<div className="suggested-prompts"><span>Try asking</span>{["What skills should I improve?","How can I tailor my resume?","Suggest projects for this role"].map(p=><button key={p} onClick={()=>send(p)}>{p}<ArrowUpRight size={13}/></button>)}</div></div><form className="chat-input" onSubmit={e=>{e.preventDefault();send();}}><Paperclip size={18}/><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question about your career..." aria-label="Ask the AI assistant"/><button type="submit" aria-label="Send message" disabled={!input.trim()}><Send size={17}/></button></form><p className="chat-disclaimer">AI responses are illustrative in this frontend demo and may not reflect your personal resume.</p></section></div>;
}
function RecruiterOverview({ setActive }) {
  return <div className="page-content"><div className="welcome-row"><div><div className="greeting-label">RECRUITER WORKSPACE</div><h1>Welcome back, Emily! <span className="wave">✦</span></h1><p>Here’s what’s happening across your hiring pipeline.</p></div><Btn onClick={() => setActive("Jobs")}><Plus size={16}/> Post a job</Btn></div><div className="stats-grid"><StatCard label="Open jobs" value="12" note="Currently active" icon={BriefcaseBusiness} trend="+2 this month"/><StatCard label="Total applicants" value="248" note="Across all open roles" icon={Users} tone="blue" trend="+16%"/><StatCard label="Shortlisted" value="36" note="Ready for review" icon={UserRoundCheck} tone="green"/><StatCard label="Interviews" value="8" note="Scheduled this week" icon={CalendarDays} tone="orange"/></div><div className="dashboard-grid"><section className="panel"><SectionTitle title="Recent applicants" subtitle="Candidates with strong profile matches" action="View candidates" onAction={()=>setActive("Candidates")}/><div className="applicant-list">{candidates.slice(0,4).map(c=><div className="applicant-row" key={c.name}><span className={`candidate-avatar ${c.tone}`}>{c.initials}</span><div className="applicant-main"><strong>{c.name}</strong><span>{c.role}</span></div><span className="match-pill">{c.score}%</span><button className="small-outline" onClick={()=>setActive("Candidates")}>View</button></div>)}</div></section><section className="panel pipeline-panel"><SectionTitle title="Hiring pipeline" subtitle="Applicant status overview"/>{[["Applied",84,"#6477f2"],["Shortlisted",36,"#20a57b"],["Interview",18,"#f59e0b"],["Offer",8,"#8b5cf6"]].map(([label,n,color])=><div className="pipeline-row" key={label}><div><span>{label}</span><strong>{n}</strong></div><div className="pipeline-track"><i style={{width:`${n/84*100}%`,background:color}}/></div></div>)}</section></div><section className="panel"><SectionTitle title="Active job postings" subtitle="Monitor your open roles" action="Manage jobs" onAction={()=>setActive("Jobs")}/><div className="table-scroll"><table className="data-table"><thead><tr><th>JOB TITLE</th><th>APPLICANTS</th><th>STATUS</th><th>UPDATED</th></tr></thead><tbody>{jobs.slice(0,3).map((j,i)=><tr key={j.id}><td><div className="table-company"><span className="table-job-icon"><BriefcaseBusiness size={16}/></span><div><strong>{j.title}</strong><span>{j.location}</span></div></div></td><td>{[42,31,26][i]}</td><td><StatusBadge status="Active"/></td><td>{["Today","Yesterday","Oct 18, 2026"][i]}</td></tr>)}</tbody></table></div></section></div>;
}
function CandidatesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const list = candidates.filter(c => `${c.name} ${c.role} ${c.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (status==="All"||c.status===status));
  return <div className="page-content"><PageHeader eyebrow="TALENT PIPELINE" title="Candidate management" subtitle="Review profiles, compare skills, and move promising candidates forward." action="Export list" onAction={()=>{}}/><section className="panel candidate-panel"><div className="candidate-toolbar"><div className="jobs-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search candidates or skills"/></div><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter candidate status"><option>All</option><option>Applied</option><option>Shortlisted</option><option>Interview</option></select><button className="filter-button"><Filter size={15}/> Filters</button></div><div className="table-scroll"><table className="data-table"><thead><tr><th>CANDIDATE</th><th>MATCH SCORE</th><th>KEY SKILLS</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{list.map(c=><tr key={c.name}><td><div className="candidate-cell"><span className={`candidate-avatar ${c.tone}`}>{c.initials}</span><div><strong>{c.name}</strong><span>{c.role}</span></div></div></td><td><span className="match-pill">{c.score}% match</span></td><td><div className="tag-row compact-tags">{c.skills.map(s=><span className="skill-tag" key={s}>{s}</span>)}</div></td><td><StatusBadge status={c.status}/></td><td><button className="small-outline">View profile</button></td></tr>)}</tbody></table></div></section></div>;
}
function SimplePage({ active, setActive }) {
  const config = {
    Analytics: { icon: ChartNoAxesCombined, title: "Hiring analytics", text: "Understand hiring activity, candidate sources, and pipeline conversion in one place." },
    Messages: { icon: MessageCircle, title: "Messages", text: "Your recruiter conversations and candidate updates will appear here." },
    Profile: { icon: UserRound, title: "Your profile", text: "Manage your professional profile and account details." },
    Settings: { icon: Settings, title: "Settings", text: "Manage preferences, privacy, and account settings." },
    "Help & Support": { icon: CircleHelp, title: "Help & support", text: "Find answers and guidance for using SmartHire." },
    Jobs: { icon: BriefcaseBusiness, title: "Job postings", text: "Manage job listings and review applicants for your open roles." },
  };
  const item = config[active] || config.Profile;
  const Icon = item.icon;
  return <div className="page-content"><PageHeader eyebrow="WORKSPACE" title={item.title} subtitle={item.text}/><section className="panel empty-state"><span className="empty-icon"><Icon size={28}/></span><h2>{active === "Jobs" ? "Manage your job postings" : "Your workspace is ready"}</h2><p>This section is scaffolded in the frontend. Its data and actions will be connected to the backend in a later step.</p><Btn onClick={() => setActive("Overview")}>Back to overview <ArrowRight size={15}/></Btn></section></div>;
}

function LandingPage({ onGetStarted, onLogin, onDemo }) {
  return <div className="landing-page" id="home"><header className="landing-nav"><Logo/><nav><a href="#home">Home</a><a href="#landing-features">Features</a><a href="#landing-how">How it works</a></nav><div><button className="text-button" onClick={onLogin}>Login</button><Btn onClick={onGetStarted}>Sign up <ArrowRight size={14}/></Btn></div></header>
    <main><section className="landing-hero"><div className="landing-hero-copy"><span className="eyebrow"><Sparkles size={14}/> AI-powered career platform</span><h1>Smart Resume Analyzer <span>&amp; Job Matcher</span></h1><p>Get AI-powered insights, match with relevant jobs, and accelerate your career journey.</p><div className="landing-buttons"><Btn onClick={onGetStarted}>Get started <ArrowRight size={15}/></Btn><Btn variant="secondary" onClick={onDemo}><span className="play-dot">▶</span> Explore dashboard</Btn></div><div className="landing-trust"><ShieldCheck size={15}/> Your data stays under your control.</div></div><div className="landing-illustration"><div className="illustration-spark spark-a">✦</div><div className="mock-resume"><div className="mock-resume-head"><span className="mock-avatar"><UserRound size={20}/></span><div><i/><i/><i/></div></div><strong>Your resume</strong>{[80,62,90,52,75].map((w,i)=><div className="mock-line" key={i} style={{width:`${w}%`}}/>)}<div className="mock-skills"><span>Python</span><span>SQL</span><span>React</span></div></div><div className="mock-match"><ScoreRing score={85} small/><strong>Match score</strong><span>Example preview</span></div><div className="mock-float"><CheckCircle2 size={15}/> Skills matched</div><div className="illustration-orb"/></div></section><section className="landing-stats"><div><strong>AI-powered</strong><span>resume insights</span></div><div><strong>Role-aware</strong><span>job discovery</span></div><div><strong>Actionable</strong><span>career guidance</span></div><div><strong>Candidate-first</strong><span>privacy design</span></div></section><section className="landing-features" id="landing-features"><div className="section-heading"><span className="section-kicker">BUILT FOR YOUR NEXT STEP</span><h2>Everything you need to move forward.</h2><p>Practical insights for job seekers and hiring teams.</p></div><div className="feature-grid">{[{icon:FileText,title:"Smart Resume Analysis",text:"Review your resume, skills, keywords, and areas for improvement."},{icon:Target,title:"Intelligent Job Matching",text:"Discover roles aligned with your skills and experience."},{icon:Sparkles,title:"AI Career Insights",text:"Understand skill gaps and find practical ways to improve."}].map(({icon:Icon,title,text})=><article className="feature-card" key={title}><span className="feature-icon"><Icon size={22}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="landing-how" id="landing-how"><div className="section-heading"><span className="section-kicker">HOW IT WORKS</span><h2>Three steps to get started.</h2></div><div className="steps-grid">{["Upload your resume","Review your insights","Explore relevant jobs"].map((s,i)=><article className="step-card" key={s}><span className="step-number">0{i+1}</span><h3>{s}</h3></article>)}</div></section><section className="landing-cta"><h2>Ready to take your next career step?</h2><p>Smart resume insights and job discovery in one place.</p><Btn onClick={onGetStarted}>Start your journey <ArrowRight size={15}/></Btn></section></main><footer className="landing-footer"><Logo/><span>Smarter insights. Better career decisions.</span><span>© {new Date().getFullYear()} SmartHire</span></footer>
  </div>;
}

function AuthPage({ mode, setMode, onSuccess, onBack }) {
  const [role, setRole] = useState("Candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(e) { e.preventDefault(); if (!email.includes("@") || password.length < 6) { setError("Enter a valid email and a password with at least 6 characters."); return; } onSuccess(role); }
  return <div className="auth-page"><button className="auth-back" onClick={onBack}><ArrowLeft size={15}/> Back to home</button><div className="auth-card"><div className="auth-form-side"><Logo/><div className="auth-title"><span className="section-kicker">{mode === "signup" ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</span><h1>{mode === "signup" ? "Start your next chapter." : "Welcome back."}</h1><p>{mode === "signup" ? "Join SmartHire and make your next career move with confidence." : "Log in to continue your career journey."}</p></div><form onSubmit={submit}>{mode === "signup" && <><div className="role-select"><button type="button" className={role==="Candidate"?"role-choice selected": "role-choice"} onClick={()=>setRole("Candidate")}><UserRound size={19}/><strong>Candidate</strong><span>Find better-fit jobs</span></button><button type="button" className={role==="Recruiter"?"role-choice selected":"role-choice"} onClick={()=>setRole("Recruiter")}><Users size={19}/><strong>Recruiter</strong><span>Find great talent</span></button></div><label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" required/></label></>}<label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required/></label>{error && <p className="form-error">{error}</p>}<Btn className="full-width" type="submit">{mode==="signup"?"Create account":"Log in"} <ArrowRight size={15}/></Btn></form><div className="auth-divider"><span/>or continue with<span/></div><div className="social-buttons"><button type="button" onClick={()=>setError("Social sign-in will be connected with authentication setup.")}><b className="google-g">G</b> Google</button><button type="button" onClick={()=>setError("LinkedIn sign-in will be connected with authentication setup.")}><b className="linkedin-in">in</b> LinkedIn</button></div><p className="auth-switch">{mode==="signup"?"Already have an account?":"Don't have an account?"} <button onClick={()=>{setMode(mode==="signup"?"login":"signup");setError("");}}>{mode==="signup"?"Log in":"Sign up"}</button></p><p className="auth-legal"><ShieldCheck size={14}/> Your information stays private in this demo.</p></div><div className="auth-art"><div className="art-glow"/><div className="art-logo"><Logo/></div><div className="art-document"><FileText size={48}/><span/><span/><span/></div><Sparkles className="art-spark" size={24}/><h2>Analyze. Match. Grow.</h2><p>AI-powered career insights<br/>for a brighter future.</p><div className="art-dots"><i/><i/><i/></div></div></div></div>;
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [role, setRole] = useState("Candidate");
  const [active, setActive] = useState("Overview");
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [saved, setSaved] = useState([]);
  const [applications, setApplications] = useState(applicationsSeed);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  function navigate(page) { setActive(page); setScreen("app"); setSidebarOpen(false); }
  function viewJob(job) { setSelectedJob(job); setActive("Job Details"); setScreen("app"); }
  function toggleSave(id) { setSaved(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]); }
  function applyToJob(job) { setApplications(prev => prev.some(a=>a.role===job.title&&a.company===job.company) ? prev : [{role:job.title,company:job.company,status:"Applied",date:"Oct 22, 2026",color:job.color,logo:job.logo},...prev]); }
  function enterApp(nextRole = "Candidate") { setRole(nextRole); setActive("Overview"); setScreen("app"); }
  if (screen === "landing") return <LandingPage onGetStarted={()=>{setAuthMode("signup");setScreen("auth");}} onLogin={()=>{setAuthMode("login");setScreen("auth");}} onDemo={()=>enterApp("Candidate")}/>;
  if (screen === "auth") return <AuthPage mode={authMode} setMode={setAuthMode} onBack={()=>setScreen("landing")} onSuccess={enterApp}/>;
  const content = role === "Recruiter"
    ? active === "Overview" ? <RecruiterOverview setActive={navigate}/> : active === "Candidates" ? <CandidatesPage/> : active === "Analytics" || active === "Messages" || active === "Jobs" || active === "Profile" || active === "Settings" || active === "Help & Support" ? <SimplePage active={active} setActive={navigate}/> : <RecruiterOverview setActive={navigate}/>
    : active === "Overview" ? <CandidateOverview setActive={navigate} onViewJob={viewJob} saved={saved} onSave={toggleSave} applications={applications}/>
    : active === "My Resume" ? <ResumePage setActive={navigate}/>
    : active === "Skill Analysis" ? <AnalysisPage setActive={navigate}/>
    : active === "Job Matches" ? <JobsPage onViewJob={viewJob} saved={saved} onSave={toggleSave}/>
    : active === "Job Details" ? <JobDetails job={selectedJob} setActive={navigate} onApply={applyToJob} saved={saved} onSave={toggleSave}/>
    : active === "Applications" ? <ApplicationsPage applications={applications}/>
    : active === "AI Assistant" ? <AssistantPage/>
    : active === "Candidates" ? <CandidatesPage/>
    : <SimplePage active={active} setActive={navigate}/>;
  return <div className="dashboard-shell"><Sidebar active={active==="Job Details"?"Job Matches":active} setActive={navigate} role={role} setRole={enterApp} open={sidebarOpen} setOpen={setSidebarOpen}/><div className="main-area"><Topbar onMenu={()=>setSidebarOpen(true)} search={search} setSearch={setSearch} role={role} onRole={()=>enterApp(role==="Candidate"?"Recruiter":"Candidate")}/>{search.trim() && <div className="search-hint"><Search size={15}/> Search term: <strong>{search}</strong><button onClick={()=>setSearch("")}><X size={14}/></button></div>}<div className="page-wrap">{content}</div></div></div>;
}