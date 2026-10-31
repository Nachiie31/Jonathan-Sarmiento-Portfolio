import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} | ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated social preview (1200x630) so shared links look polished.
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
          padding: 72,
          background: "radial-gradient(circle at 80% 10%, #26262a 0%, #050505 55%)",
          color: "#f4f4f5",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#a1a1aa", textTransform: "uppercase" }}>
          {siteConfig.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 40, color: "#a1a1aa", marginTop: 28 }}>
            Building digital experiences that work.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
