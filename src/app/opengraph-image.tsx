import { ImageResponse } from "next/og";

export const alt = "N8Forge — Custom Websites for East Texas Service Businesses";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #2F6FB5 0%, #123E74 45%, #1E2228 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          N8Forge
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Custom Websites for East Texas Service Businesses
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Straightforward pricing from $400 · Personal local support
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: "#F47B20",
            fontWeight: 700,
          }}
        >
          n8-forge.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
