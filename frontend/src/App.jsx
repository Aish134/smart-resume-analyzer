
import {
  ScanSearch,
  ArrowRight,
  FileText,
  Target,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <ScanSearch size={23} />
          </span>
          SmartHire<span className="brand-dot">.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
        </nav>

        <button
          className="primary-button"
          onClick={() =>
            document.getElementById("get-started")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Get started <ArrowRight size={16} />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={15} /> Your AI-powered career companion
            </span>

            <h1>
              Your next opportunity starts with a{" "}
              <span>better resume.</span>
            </h1>

            <p>
              Analyze your resume, discover relevant jobs, and uncover the
              skills you need to take your career forward.
            </p>

            <button
              className="primary-button hero-button"
              onClick={() =>
                document.getElementById("get-started")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Analyze my resume <ArrowRight size={17} />
            </button>

            <div className="privacy-note">
              <ShieldCheck size={18} />
              Your career data deserves privacy and care.
            </div>
          </div>

          <div className="preview">
            <div className="preview-heading">
              <FileText size={22} />
              <div>
                <strong>Resume insights</strong>
                <small>Example dashboard preview</small>
              </div>
            </div>

            <div className="score">
              <div className="score-circle">85%</div>
              <div>
                <h3>Resume overview</h3>
                <p>Example score, not a real analysis</p>
                <span className="success">✓ Skills identified</span>
                <span className="success">✓ Keywords reviewed</span>
              </div>
            </div>

            <h4>Skills overview</h4>

            {[
              ["Python", "88%"],
              ["SQL", "76%"],
              ["Machine Learning", "68%"],
            ].map(([skill, value]) => (
              <div className="skill" key={skill}>
                <div className="skill-label">
                  <span>{skill}</span>
                  <span>{value}</span>
                </div>
                <div className="track">
                  <div style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <span className="section-label">BUILT FOR YOUR NEXT STEP</span>
            <h2>Everything you need to move forward.</h2>
            <p>Practical insights for job seekers and hiring teams.</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <FileText />
              <h3>Smart Resume Analysis</h3>
              <p>
                Review resume content, skills, keywords, and areas for
                improvement.
              </p>
            </article>

            <article className="feature-card">
              <Target />
              <h3>Intelligent Job Matching</h3>
              <p>
                Discover jobs that align with your skills and experience.
              </p>
            </article>

            <article className="feature-card">
              <Sparkles />
              <h3>AI Career Insights</h3>
              <p>
                Understand skill gaps and find practical ways to improve.
              </p>
            </article>
          </div>
        </section>

        <section className="how" id="how">
          <div className="section-heading">
            <span className="section-label">HOW IT WORKS</span>
            <h2>Three steps to get started.</h2>
          </div>

          <div className="steps">
            <div><strong>01</strong><h3>Upload your resume</h3></div>
            <div><strong>02</strong><h3>Review your insights</h3></div>
            <div><strong>03</strong><h3>Explore relevant jobs</h3></div>
          </div>
        </section>

        <section className="get-started" id="get-started">
          <h2>Ready to take your next career step?</h2>
          <p>Smart resume insights and job discovery in one place.</p>
          <button
            className="primary-button"
            onClick={() =>
              alert("Next, we'll build the registration and login pages.")
            }
          >
            Start your journey <ArrowRight size={16} />
          </button>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">
          SmartHire<span className="brand-dot">.</span>
        </a>
        <span>Smarter insights. Better career decisions.</span>
      </footer>
    </div>
  );
}

export default App;
