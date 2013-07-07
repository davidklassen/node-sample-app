module.exports = {
  http: {
    port: 8080
  },
  mongo: {
    host: 'localhost',
    name: 'node-tut'
  },
  facebook: {
    clientID: '429307213834930',
    clientSecret: '377b19cb03689a91edb7523fa5af4610',
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  }
}
