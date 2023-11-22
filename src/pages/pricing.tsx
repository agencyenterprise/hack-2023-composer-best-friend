import "../pricing.css"

const CheckIcon = () => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

const formLink = "https://form.typeform.com/to/PJAvghq3"

const freeTierFeatures = [
  "Unleash your creativivity",
  "Unlock your musical potential with genre-specific inspiration",
  "Compose music with AI",
  "Free forever",
]

const FreeTier = () => {
  return (
    <div className="tier free-tier">
      <div>
        <div className="header">
          <h3 className="title free-tier-title">Free</h3>
        </div>
        <p className="subtitle">Completely free, forever.</p>
        <p className="price">
          <span className="price-value">$0</span>
          <span className="price-period">/month</span>
        </p>
        <ul role="list">
          {freeTierFeatures.map((feature) => (
            <li key={feature}>
              <CheckIcon aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={formLink}
        target="_blank"
        rel="noreferrer"
        className="btn-outlined"
      >
        Current plan
      </a>
    </div>
  )
}

const AETier = () => {
  return (
    <div className="tier ae-tier">
      <div>
        <div className="header">
          <h3 className="title">Enterprise</h3>
          <p className="badge">Most popular</p>
        </div>
        <p className="subtitle">
          AE Studio can build cool things like this for you too.
        </p>
        <p className="price">
          <span className="price-value">$x</span>
          <span className="price-period">/month</span>
        </p>
        <ul role="list">
          {[
            "Software Development",
            "Data Science",
            "Product Design",
            "Brain-Computer Interfaces",
            "AI",
            "Let's talk!",
          ].map((feature) => (
            <li key={feature}>
              <CheckIcon aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <a href={formLink} target="_blank" rel="noreferrer" className="btn">
        Pay us to build things
      </a>
    </div>
  )
}

export function Pricing() {
  return (
    <>
      <header style={{ background: "#edf2ff" }}>
        <a
          href="/"
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            maxWidth: "80rem",
            margin: "auto",
          }}
        >
          <img
            style={{ height: "4rem" }}
            src="/logo.svg"
            alt="Composer Pal Logo"
          />
          <h1 style={{ margin: 0 }}>Composer Pal</h1>
        </a>
      </header>
      <h2
        style={{
          padding: "4rem 2rem 2rem",
          maxWidth: "80rem",
          margin: "auto",
          color: "white",
          textAlign: "center",
        }}
      >
        Simple pricing, no commitment
      </h2>
      <main className="pricing-container">
        <div className="pricing-section">
          <div className="tiers-container">
            <FreeTier />
            <AETier />
          </div>
        </div>
      </main>
      <footer
        style={{
          textAlign: "center",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          marginTop: "2rem",
        }}
      >
        <a
          style={{
            color: "#6b7280",
          }}
          href="https://ae.studio?utm_source=composerpal.com"
          target="_blank"
        >
          Made with ❤️ by AE Studio
        </a>
      </footer>
    </>
  )
}
