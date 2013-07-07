module.exports = {
  http: {
    port: process.env.PORT || 8080
  },
  mongo: {
    host: 'localhost',
    name: 'node-tut'
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID || '529219793793438',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '276c67319f300361a082ffe071d7aa68',
    callbackURL: "/auth/facebook/callback"
  }
}
