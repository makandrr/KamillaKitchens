const fs = require('fs')
const { minify } = require('html-minifier')
const sass = require('sass')
const { copyFolderRecursiveSync } = require('./utils')

if(fs.existsSync(__dirname + '/build')) {
    fs.rmSync(__dirname + '/build', { recursive: true, force: true })   
}

fs.mkdirSync(__dirname + '/build')
fs.mkdirSync(__dirname + '/build/css')

const indexPageCode = fs.readFileSync('./index.html', { encoding: 'utf-8' })

fs.writeFileSync(__dirname + '/build/index.html', minify(indexPageCode, {
    collapseWhitespace: true,
    removeComments: true,
    removeTagWhitespace: true
}))

fs.copyFileSync(__dirname + '/css/normalize.css', __dirname + '/build/css/normalize.css')
fs.copyFileSync(__dirname + '/css/reset.css', __dirname + '/build/css/reset.css')

const css = sass.compile(__dirname + '/scss/main.scss')
fs.writeFileSync(__dirname + '/build/css/main.css', minify(css.css, {
    collapseWhitespace: true
}))

copyFolderRecursiveSync(__dirname + '/imgs', __dirname + '/build')
