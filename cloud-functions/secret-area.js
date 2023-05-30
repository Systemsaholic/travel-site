exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: "Welcome to the Secret Area"
  })
}
