"use strict";
let jln = {};
let myCodeMirror;
let fileAktif;
let projek;
let template = `
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
		{{css}}
	</head>
	<body onload="console.log('test');">
		{{body}}
		{{js}}
	</body>
</html>
`;
let dataTest = [
    {
        nama: "test",
        file: {
            baseUrl: './data/jrk/',
            css: [
                {
                    nama: 'css.css',
                    url: 'css/css.css'
                }
            ],
            gbr: [
                {
                    nama: 'bola',
                    url: 'imgs/bola.png'
                },
                {
                    nama: 'kotak',
                    url: 'imgs/box.png'
                },
                {
                    nama: 'kotak',
                    url: 'imgs/tigan.png'
                }
            ],
            js: [
                {
                    nama: 'karakter.js',
                    url: 'js/karakter.js'
                },
                {
                    nama: 'PathFinder.js',
                    url: 'js/PathFinder.js'
                },
                {
                    nama: 'Peta.js',
                    url: 'js/Peta.js'
                },
                {
                    nama: 'Window.js',
                    url: 'js/Window.js'
                },
                {
                    nama: 'Data.js',
                    url: 'js/Data.js'
                },
                {
                    nama: 'Game.js',
                    url: 'js/Game.js'
                }
            ],
            html: [
                {
                    nama: 'index.html',
                    url: 'index.html'
                }
            ]
        }
    }
];
