import "../who-made-this.css"

export function WhoMadeThis() {
  const trackClickSdsBadge = function () {
    fetch("https://www.samedayskunkworks.com/api/analytics/addEvent", {
      method: "post",
      body: JSON.stringify({
        origin: window.location.href,
        destination: "https://ae.studio/same-day-skunkworks",
        event: "SDS Utils Click - Who made this section",
      }),
    })
  }

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
      <main className="whomadethis-container">
        <div className="flex-1">
          <div className="whomadethis-article">
            <a onClick={trackClickSdsBadge} className="cursor-pointer">
              <img
                alt="AE Logo"
                width={320}
                height={80}
                src="https://ae.studio/img/aestudio-logo-dark.svg"
              />
            </a>

            <p className="text">
              Through our{" "}
              <span className="text-orange">Skunkworks Division</span>, we build
              pretty cool products, like the one you just checked out.
            </p>

            <p className="text">
              We also build cutting-edge software and AI to{" "}
              <span className="text-gradient">
                solve the most challenging problems
              </span>{" "}
              facing our clients through our product studio.
            </p>

            <a
              href="https://form.typeform.com/to/PJAvghq3"
              target="_black"
              rel="noreferrer"
              className="pay-us-btn"
            >
              Pay us to build things
            </a>
          </div>
        </div>
        <div className="ae-power">
          <img
            alt="AE Power"
            width={500}
            height={500}
            src="https://www.samedayskunkworks.com/ae-power.svg"
          />
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
