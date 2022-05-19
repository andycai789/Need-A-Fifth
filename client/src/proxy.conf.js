const PROXY_CONFIG = [
  {
      context: [
          "/answers",
          "/similarUsers"
      ],
      target: "http://localhost:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;