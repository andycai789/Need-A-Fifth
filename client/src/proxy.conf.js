const PROXY_CONFIG = [
  {
      context: [
          "/answers",
          "/similarUsers",
          "/settings",
          "/userData"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;