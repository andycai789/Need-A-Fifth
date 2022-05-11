const PROXY_CONFIG = [
  {
      context: [
          "/answers",
          "/test"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;