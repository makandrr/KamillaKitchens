let fs = require('fs');
let path = require('path');

module.exports.copyFileSync = function ( source, target ) {
    let targetFile = target;
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

module.exports.copyFolderRecursiveSync = function ( source, target ) {
    let files = [];
    let targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            let curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                module.exports.copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                module.exports.copyFileSync( curSource, targetFolder );
            }
        } )
    }
}