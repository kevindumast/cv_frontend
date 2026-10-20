import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kévin DUMAST",
    short_name: "K.DUMAST",
    description: "Le pont entre la tech et le business.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#151b23",
    icons: [
      { src: "/logo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
