import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getProject } from "@/lib/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
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
          {project?.category ?? "Case study"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {project?.title ?? "Project"}
          </div>
          <div style={{ fontSize: 34, color: "#a1a1aa", marginTop: 28 }}>
            {`${siteConfig.name} · ${siteConfig.title}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
