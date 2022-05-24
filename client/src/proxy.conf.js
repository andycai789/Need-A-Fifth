const PROXY_CONFIG = [
  {
      context: [
          "/answers",
          "/similarUsers",
          "/settings",
          "/images"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;