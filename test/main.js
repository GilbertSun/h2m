var h2m = require('../index')
var expect = require('chai').expect
var path = require('path')
var fs = require('fs')
function fixture(file) {
  return fs.readFileSync(path.join(__dirname, `fixtures/${file}`), 'utf8').replace(/\n$/, '')
}

describe('h2m', function () {
  it('should parse <br /> to \\n', function () {
    expect(h2m('z<br/>')).to.equal('z\n')
  })

  it('should parse em tag to *txt*', function () {
    expect(h2m('<em>txt</em>')).to.equal('*txt*')
    expect(h2m('<em></em>')).to.equal('')
  })

  it('should parse strong tag to **txt**', function () {
    expect(h2m('<strong>txt</strong>')).to.equal('**txt**')
    expect(h2m('<strong></strong>')).to.equal('')
  })

  it('should parse code tag to <code>txt</code>', function () {
    expect(h2m('<code>txt</code>')).to.equal('`txt`')
    expect(h2m('<code></code>')).to.equal('')
  })

  it('should parse a tag', function () {
    expect(h2m('<a href="http://island205.github.io/h2m/">h2m</a>')).to.equal('[h2m](http://island205.github.io/h2m/)')
    expect(h2m('<a href="http://island205.github.io/h2m/"></a>')).to.equal('[http://island205.github.io/h2m/](http://island205.github.io/h2m/)')
  })

  it('should parse img tag', function () {
    expect(h2m('<img title="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
    expect(h2m('<img alt="h2m" src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![h2m](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
    expect(h2m('<img src="https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png" />')).to.equal('![https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png](https://raw.githubusercontent.com/island205/h2m/master/images/online-converter.png)')
  })

  it('should parse hr tag', function () {
    expect(h2m('<hr/>')).to.equal('---')
  })

  it('should parse ul tag', function () {
    expect(h2m(fixture('ul.html'))).to.equal(fixture('ul.md'))
  })

  it('should parse ol tag', function () {
    expect(h2m(fixture('ol.html'))).to.equal(fixture('ol.md'))
  })

  it('should parse pre tag', function () {
    expect(h2m('<pre>code</pre>')).to.equal('    code')
    expect(h2m('<pre><code>code</code></pre>')).to.equal('    code')
    expect(h2m(fixture('pre.html'))).to.equal(fixture('pre.md'))
    expect(h2m(fixture('pre2.html'))).to.equal(fixture('pre2.md'))
  })

  it('should parse div tag', function () {
    expect(h2m('<div>code</div>')).to.equal('code')
    expect(h2m('<div>code<div>code</div></div>')).to.equal('code\n\ncode')
    expect(h2m('<div>code<div><div>code</div></div></div>')).to.equal('code\n\ncode')
  })

  it('should parse p tag', function () {
    expect(h2m('<p>code</p>')).to.equal('code')
    expect(h2m('<p>code</p><p>code</p>')).to.equal('code\n\ncode')
  })

  it('should parse blockquote tag', function () {
    expect(h2m('<blockquote>code</blockquote>')).to.equal('> code')
    expect(h2m('<blockquote><blockquote>code</blockquote></blockquote>')).to.equal('> > code')
  })

  it('should parse h* tag', function () {
    expect(h2m('<h1>code</h1>')).to.equal('# code')
    expect(h2m('<h2>code</h2>')).to.equal('## code')
    expect(h2m('<h3>code</h3>')).to.equal('### code')
    expect(h2m('<h4>code</h4>')).to.equal('#### code')
    expect(h2m('<h5>code</h5>')).to.equal('##### code')
    expect(h2m('<h6>code</h6>')).to.equal('###### code')
  })

})
