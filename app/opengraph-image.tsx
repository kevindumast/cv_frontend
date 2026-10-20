import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Aperçu affiché quand le lien est partagé (LinkedIn, Slack…)
export const alt = "Kévin DUMAST · Le pont entre la tech et le business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "kevin.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;
  const logo = await readFile(join(process.cwd(), "app", "icon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  // Carlito, équivalent libre de Calibri (la police du CV)
  const fontDir = join(process.cwd(), "node_modules", "@fontsource", "carlito", "files");
  const [regular, bold] = await Promise.all([
    readFile(join(fontDir, "carlito-latin-400-normal.woff")),
    readFile(join(fontDir, "carlito-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", padding: 72, alignItems: "center", fontFamily: "Carlito" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 5, color: "#6a4fc2", textTransform: "uppercase" }}>
            Performance commerciale IARD
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 84, fontWeight: 700, color: "#151b23", lineHeight: 1.02, marginTop: 24, letterSpacing: -2 }}>
            <span>Le pont entre la&nbsp;</span>
            <span style={{ color: "#1e8c6e" }}>tech</span>
            <span>&nbsp;et le&nbsp;</span>
            <span style={{ color: "#6a4fc2" }}>business.</span>
          </div>
          <div style={{ fontSize: 34, color: "#3a4350", marginTop: 32 }}>Kévin DUMAST · Data, BI & IA · Full Stack</div>
          <div style={{ display: "flex", marginTop: 40, height: 8, width: 360, borderRadius: 8, background: "linear-gradient(90deg, #6a4fc2, #1e8c6e)" }} />
          <div style={{ display: "flex", alignItems: "center", marginTop: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={48} height={48} alt="" />
            <span style={{ marginLeft: 16, fontSize: 28, fontWeight: 700, color: "#151b23" }}>kevindumast.vercel.app</span>
          </div>
        </div>
        <div style={{ display: "flex", padding: 10, borderRadius: 40, background: "linear-gradient(135deg, #6a4fc2, #1e8c6e)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={340} height={340} style={{ borderRadius: 32, objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Carlito", data: regular, weight: 400, style: "normal" },
        { name: "Carlito", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
