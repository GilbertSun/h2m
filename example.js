var h2m = require('./')
var fs = require('fs')
var path = require('path')

var html = fs.readFileSync(path.join(__dirname, './fixtures/source.html'))

var md = h2m(html)

fs.writeFileSync(path.join(__dirname, './fixtures/result.md'), md, 'utf8')