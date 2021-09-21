module.exports = {
  pwa: {
    name: 'Объявитус',
    short_name: "Объявитус",
    description: "",
    manifestCrossorigin: 'anonymous',
    themeColor: "#00535a",
    manifestOptions: {
      background_color: "#00535a",
      icons: [
        {
          src: "/assets/logo.png",
          type: "image/png",
          sizes: "72x72",
        },
      ],
      start_url: ".",
      display: "standalone",
    },
  }
}