import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09090b",
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff14 1px, transparent 0)",
          backgroundSize: "28px 28px",
          color: "#ededeb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#8b8b93" }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #2c2c34",
              borderRadius: 10,
              color: "#ededeb",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            bn
          </div>
          bhashyam.naidu
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#5b8cff" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#b4b4bb" }}>
            {site.title} · {site.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#8b8b93" }}>
          {["FastAPI", "PostgreSQL", "AWS", "RAG", "Docker"].map((t) => (
            <div
              key={t}
              style={{ display: "flex", padding: "8px 16px", border: "1px solid #2c2c34", borderRadius: 8 }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
