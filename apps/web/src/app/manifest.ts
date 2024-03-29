import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Acme",
    short_name: "Acme",
    description: "Acme",
    lang: "en",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      // {
      //   src: "icon.png",
      //   sizes: "1024x1024",
      //   type: "image/png",
      // },
    ],
    // related_applications: [
    //   {
    //     platform: "web"
    //   }
    // ]
  };
}
