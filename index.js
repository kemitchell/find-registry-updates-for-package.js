var pull = require('pull-stream')
var registry = require('pull-npm-registry-updates')

if (!process.argv[2]) {
  console.error('Usage: <package name> [since update_seq]')
  process.exit(1)
}

var PACKAGE = process.argv[2]

var options = process.argv[3]
  ? {since: parseInt(process.argv[3])}
  : undefined

pull(
  registry(options),
  pull.filter(function (update) {
    return update.id === PACKAGE
  }),
  function (read) {
    read(null, function (end, data) {
      if (end === true) {
        return
      } else if (end) {
        throw end
      } else {
        console.log(JSON.stringify(data))
      }
    })
  }
)
