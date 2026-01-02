import React from "react";
import Link from "next/link";

const DocsHero = () => {
  return (
    <section className="docs-hero">
      <div className="docs-hero-grid">
        <div className="docs-hero-copy">
          <span className="docs-hero-kicker">Documentation</span>
          <h1 className="docs-hero-title">Build consent-first experiences with Hushh</h1>
          <p className="docs-hero-subtitle">
            Explore agentic APIs, profile enrichment workflows, and privacy-native
            data pipelines. Everything you need to build trusted personalization
            at scale.
          </p>
          <div className="docs-hero-actions">
            <Link href="/developer-Api/on-boarding" className="docs-hero-primary">
              Get started
            </Link>
            <Link href="/developer-Api/rootEndpoints" className="docs-hero-secondary">
              Explore API reference
            </Link>
          </div>
        </div>

        <div className="docs-hero-visual" aria-hidden="true">
          <div className="docs-hero-card card-one">
            <div className="docs-hero-card-title">Profile snapshot</div>
            <div className="docs-hero-card-name">Ava Torres</div>
            <div className="docs-hero-card-meta">San Francisco, CA</div>
            <div className="docs-hero-card-tags">
              <span>Luxury retail</span>
              <span>Travel</span>
              <span>Wellness</span>
            </div>
          </div>

          <div className="docs-hero-card card-two">
            <div className="docs-hero-card-title">Intent signals</div>
            <ul>
              <li>Looking for fall wardrobe refresh</li>
              <li>Prefers eco-friendly materials</li>
              <li>Budget: premium, mid range</li>
            </ul>
          </div>

          <div className="docs-hero-card card-three">
            <div className="docs-hero-card-title">Consent log</div>
            <div className="docs-hero-consent">
              <span className="dot dot-green"></span>
              Shared profile data for 30 days
            </div>
            <div className="docs-hero-consent">
              <span className="dot dot-blue"></span>
              Allowed brand preference sync
            </div>
            <div className="docs-hero-consent">
              <span className="dot dot-amber"></span>
              Revoked location access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocsHero;
