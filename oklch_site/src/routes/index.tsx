import { createSignal, createEffect, Show } from "solid-js";
import { Card } from "../components/Card";
import { Slider } from "../components/Slider";

export default function Home() {
  const [hue, setHue] = createSignal(250);
  const [lightness, setLightness] = createSignal(40);
  const [chroma, setChroma] = createSignal(5);
  const [showCodeModal, setShowCodeModal] = createSignal(false);
  const [showAlertsModal, setShowAlertsModal] = createSignal(false);

  createEffect(() => {
    const l = lightness() / 100;
    const c = chroma() / 100;
    const h = hue();

    const baseColor = `oklch(${l} ${c} ${h})`;
    document.documentElement.style.setProperty("--base-color", baseColor);

    // Set background colors (with color)
    document.documentElement.style.setProperty(
      "--bg-dark",
      `oklch(${Math.max(0, l - 0.05)} ${c} ${h})`,
    );
    document.documentElement.style.setProperty("--bg", `oklch(${l} ${c} ${h})`);
    document.documentElement.style.setProperty(
      "--bg-light",
      `oklch(${Math.min(1, l + 0.05)} ${c} ${h})`,
    );

    // Set text colors (grayscale, inverted for contrast)
    // When lightness > 0.6, text should be darker than text-muted
    const textLightness =
      l > 0.55
        ? Math.max(0, 1 - l - 0.3) // Darker for light backgrounds
        : Math.min(1, 1 - l + 0.3); // Lighter for dark backgrounds
    const textMutedLightness =
      l > 0.55
        ? Math.max(0, 1 - l - 0.05) // Lighter (closer to bg) for light backgrounds
        : Math.min(1, 1 - l + 0.05); // Darker (closer to bg) for dark backgrounds

    document.documentElement.style.setProperty(
      "--text",
      `oklch(${textLightness} 0 ${h})`,
    );
    document.documentElement.style.setProperty(
      "--text-muted",
      `oklch(${textMutedLightness} 0 ${h})`,
    );

    // Set border colors
    const borderChroma = Math.max(0.12, c);
    document.documentElement.style.setProperty(
      "--highlight",
      `oklch(${Math.min(1, l + 0.1)} ${borderChroma} ${h})`,
    );
    document.documentElement.style.setProperty(
      "--border",
      `oklch(${Math.max(0, l - 0.1)} ${borderChroma} ${h})`,
    );
    document.documentElement.style.setProperty(
      "--border-muted",
      `oklch(${Math.max(0, l - 0.2)} ${borderChroma} ${h})`,
    );

    // Set action colors
    document.documentElement.style.setProperty(
      "--primary",
      `oklch(0.7 ${Math.max(0.12, c)} ${h})`,
    );
    document.documentElement.style.setProperty(
      "--secondary",
      `oklch(0.7 ${Math.max(0.12, c)} ${(h + 180) % 360})`,
    );

    // Set alert colors (fixed hues but more vivid than other colors)
    const alertChroma = Math.max(0.18, c * 1.1);
    document.documentElement.style.setProperty(
      "--danger",
      `oklch(0.65 ${alertChroma} 30)`,
    );
    document.documentElement.style.setProperty(
      "--warning",
      `oklch(0.75 ${alertChroma} 90)`,
    );
    document.documentElement.style.setProperty(
      "--success",
      `oklch(0.7 ${alertChroma} 160)`,
    );
    document.documentElement.style.setProperty(
      "--info",
      `oklch(0.7 ${alertChroma} 250)`,
    );
  });

  const generateColorCode = () => {
    const l = lightness() / 100;
    const c = chroma() / 100;
    const h = hue();
    return `--bg-dark: oklch(0.1 0 ${h});
--bg: oklch(0.15 0 ${h});
--bg-light: oklch(0.2 0 ${h});
--text: oklch(0.96 0 ${h});
--text-muted: oklch(0.76 0 ${h});
--highlight: oklch(0.5 ${c.toFixed(2)} ${h});
--border: oklch(0.4 ${c.toFixed(2)} ${h});
--border-muted: oklch(0.3 ${c.toFixed(2)} ${h});
--primary: oklch(0.76 ${c.toFixed(2)} ${h});
--secondary: oklch(0.76 ${c.toFixed(2)} ${(h + 180) % 360});
--danger: oklch(0.7 0.12 30);
--warning: oklch(0.7 0.12 100);
--success: oklch(0.7 0.12 160);
--info: oklch(0.7 0.12 260);`;
  };

  return (
    <main class="app-container">
      <div class="left-panel">
        <div class="controls">
          <Slider
            label="Hue"
            value={hue}
            onChange={setHue}
            min={0}
            max={360}
            unit="°"
            startLabel="0°"
            endLabel="360°"
            sliderClass="hue-slider"
          />
          <Slider
            label="Lightness"
            value={lightness}
            onChange={setLightness}
            min={0}
            max={100}
            unit="%"
            startLabel="Dark"
            endLabel="Light"
            sliderClass="lightness-slider"
          />
          <Slider
            label="Chroma"
            value={chroma}
            onChange={setChroma}
            min={0}
            max={40}
            unit="%"
            startLabel="Gray"
            endLabel="Vivid"
            sliderClass="chroma-slider"
          />
        </div>

        <div class="feature-cards">
          <Card
            title="Contrast"
            content="Mix sharper headings with muted text"
            borderColor="var(--highlight)"
          />
          <Card
            title="Gradients"
            content="Play with gradient background"
            borderColor="var(--border)"
          />
          <Card
            title="Highlight"
            content="Use a lighter border to simulate light"
            borderColor="var(--border-muted)"
          />
        </div>

        <div class="action-buttons">
          <button
            class="btn btn-primary"
            onClick={() => setShowCodeModal(true)}
          >
            Show Code
          </button>
          <button
            class="btn btn-secondary"
            onClick={() => setShowAlertsModal(true)}
          >
            Show Alerts
          </button>
        </div>
      </div>

      <div class="right-panel">
        <div class="color-section">
          <h4 class="section-title">Background</h4>
          <div class="color-grid">
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--bg-dark)" }}
              />
              <span class="swatch-label">bg-dark</span>
            </div>
            <div class="color-swatch">
              <div class="swatch" style={{ "background-color": "var(--bg)" }} />
              <span class="swatch-label">bg</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--bg-light)" }}
              />
              <span class="swatch-label">bg-light</span>
            </div>
          </div>
        </div>

        <div class="color-section">
          <h3 class="section-title">Text</h3>
          <div class="color-grid">
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--text)" }}
              />
              <span class="swatch-label">text</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--text-muted)" }}
              />
              <span class="swatch-label">text-muted</span>
            </div>
          </div>
        </div>

        <div class="color-section">
          <h3 class="section-title">Border</h3>
          <div class="color-grid">
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--highlight)" }}
              />
              <span class="swatch-label">highlight</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--border)" }}
              />
              <span class="swatch-label">border</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--border-muted)" }}
              />
              <span class="swatch-label">border-muted</span>
            </div>
          </div>
        </div>

        <div class="color-section">
          <h3 class="section-title">Action</h3>
          <div class="color-grid">
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--primary)" }}
              />
              <span class="swatch-label">primary</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--secondary)" }}
              />
              <span class="swatch-label">secondary</span>
            </div>
          </div>
        </div>

        <div class="color-section">
          <h3 class="section-title">Alert</h3>
          <div class="color-grid">
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--danger)" }}
              />
              <span class="swatch-label">danger</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--warning)" }}
              />
              <span class="swatch-label">warning</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--success)" }}
              />
              <span class="swatch-label">success</span>
            </div>
            <div class="color-swatch">
              <div
                class="swatch"
                style={{ "background-color": "var(--info)" }}
              />
              <span class="swatch-label">info</span>
            </div>
          </div>
        </div>
      </div>

      <Show when={showCodeModal()}>
        <div class="modal-overlay" onClick={() => setShowCodeModal(false)}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title-section">
                <button class="copy-btn">Copy</button>
              </div>
              <button class="close-btn" onClick={() => setShowCodeModal(false)}>
                ✕
              </button>
            </div>
            <pre class="code-block">{generateColorCode()}</pre>
          </div>
        </div>
      </Show>

      <Show when={showAlertsModal()}>
        <div class="modal-overlay" onClick={() => setShowAlertsModal(false)}>
          <div
            class="alerts-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              class="close-btn-alerts"
              onClick={() => setShowAlertsModal(false)}
            >
              ✕
            </button>
            <div class="alert-stack">
              <div class="alert alert-danger">
                <span class="alert-icon">⚠</span>
                <div class="alert-content">
                  <h4 class="alert-title">Payment failed</h4>
                  <p class="alert-message">
                    Your account will be terminated within 48 hours.
                  </p>
                </div>
              </div>
              <div class="alert alert-warning">
                <span class="alert-icon">⚠</span>
                <div class="alert-content">
                  <h4 class="alert-title">Plan expiring soon</h4>
                  <p class="alert-message">Your plan will expire in 3 days.</p>
                </div>
              </div>
              <div class="alert alert-success">
                <span class="alert-icon">✓</span>
                <div class="alert-content">
                  <h4 class="alert-title">Backup complete</h4>
                  <p class="alert-message">
                    Your photos were saved successfully!
                  </p>
                </div>
              </div>
              <div class="alert alert-info">
                <span class="alert-icon">💎</span>
                <div class="alert-content">
                  <h4 class="alert-title">Upgrade to Pro</h4>
                  <p class="alert-message">
                    Hey Sajid, upgrade now and get 20% off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </main>
  );
}
