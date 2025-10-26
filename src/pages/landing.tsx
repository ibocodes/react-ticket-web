/* src/pages/Landing.tsx */
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="app-container">
      <section className="hero" aria-label="Landing hero">
        {/* decorative circles */}
        <span className="circle circle--1" aria-hidden="true"></span>
        <span className="circle circle--2" aria-hidden="true"></span>
        <div
          className="decor-circle"
          aria-hidden="true"
          style={{
            right: -40,
            left: "auto",
            top: 20,
            background: "rgba(15,98,255,0.06)",
          }}
        ></div>
        <div className="hero-inner">
          <div className="hero-copy" style={{ zIndex: 1 }}>
            <h1 className="hero-title">TicketApp — fast ticket management</h1>
            <p className="hero-desc">
              Create, track, and resolve customer support tickets — simple,
              fast, and secure. A seamless way to manage customer support —
              efficient, responsive, reliable.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link
                to="/auth/signup"
                className="btn btn-primary"
                aria-label="Get Started"
              >
                Get Started
              </Link>
              <Link
                to="/auth/login"
                className="btn btn-ghost"
                aria-label="Login"
              >
                Login
              </Link>
            </div>
          </div>

          <div style={{ flex: "0 0 320px", zIndex: 1 }}>
            <div className="card" style={{ textAlign: "center" }}>
              <h3 style={{ margin: "0 0 6px" }}>A snapshot</h3>
              <p style={{ margin: 0, color: "#475569" }}>
                A compact ticket manager UI with consistent layout and
                responsive design.
              </p>
            </div>
          </div>
        </div>

        <div className="hero-wave" aria-hidden="true">
          <object
            data="/assets/wave.svg"
            type="image/svg+xml"
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="features" aria-label="Features">
        <div className="grid cols-3">
          <div className="card">Create and manage tickets</div>
          <div className="card">Secure authentication</div>
          <div className="card">Simple dashboard insights</div>
        </div>
      </section>
    </div>
  );
}
