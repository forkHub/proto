"use strict";
class Hagl {
	constructor(kanvas) {
		this.dev = false;
		this.shaderVertek = ``; //TODO
		this.shaderFragment = ``; //TODO:
		this.daftarPosObj = [];
		this.daftarTex = [];
		this.SDT2RAD = Math.PI / 180.0;
		this.kanvas = kanvas;
		this.log('ha-gl');
		this.shaderVertek = `
			attribute vec2 a_position;
			attribute vec2 a_texCoord;

			varying vec2 v_texCoord;

			uniform vec2 u_resolusi;
			uniform vec2 u_geser;
			uniform vec2 u_skala;
			uniform vec2 u_putar;
			uniform vec2 u_offset;

			void main() {
				//offset
				vec2 position = a_position - u_offset; 

				//skala
				position = position * u_skala; 

				//putar
				position = vec2(
					position.x * u_putar.y + position.y * u_putar.x,
					position.y * u_putar.y - position.x * u_putar.x
				);

				//geser
				position = position + u_geser;

				// convert the position from pixels to 0.0 to 1.0
				vec2 zeroToOne = position / u_resolusi;
				
				// convert from 0->1 to 0->2
				vec2 zeroToTwo = zeroToOne * 2.0;

				// convert from 0->2 to -1->+1 (clip space)
				vec2 clipSpace = zeroToTwo - 1.0;

				gl_Position = vec4(clipSpace * vec2(1 ,-1),0,1);
				v_texCoord = a_texCoord;
			}
		`;
		this.shaderFragment = `
			precision mediump float;
				
			uniform float u_alpha;
			uniform sampler2D u_image;
			varying vec2 v_texCoord;

			void main() {
				gl_FragColor = texture2D(u_image, v_texCoord);

				if (u_alpha < 1.0) {
					gl_FragColor.a *= u_alpha;
				}
			}		
		`;
		this.init(kanvas);
	}
	checkKotakSama(sumber, u1, v1, u2, v2) {
		if (sumber.u1 != u1)
			return false;
		if (sumber.v1 != v1)
			return false;
		if (sumber.u2 != u2)
			return false;
		if (sumber.v2 != v2)
			return false;
		return true;
	}
	checkPosisiObjBerulang(p, l) {
		if (!this.posObjTerakhir)
			return false;
		if (!this.checkKotakSama(this.posObjTerakhir, 0, 0, p, l))
			return false;
		return true;
	}
	log(msg, mode = 1) {
		if (!this.dev)
			return;
		if (1 == mode) {
			console.log(msg);
		}
		else if (2 == mode) {
			console.group();
		}
		else if (3 == mode) {
			console.groupEnd();
		}
	}
	ambilPosisiObjDariPool(p, l) {
		let hasil;
		this.daftarPosObj.forEach((item) => {
			if (this.checkKotakSama(item, 0, 0, p, l)) {
				hasil = item;
			}
		});
		if (!hasil) {
			this.log('buat buffer posisi');
			hasil = {
				buff: this.buatRectBuffer(p, l),
				u1: 0,
				v1: 0,
				u2: p,
				v2: l
			};
			this.daftarPosObj.push(hasil);
		}
		this.posObjTerakhir = hasil;
		return hasil;
	}
	checkTexBerulang(gbr) {
		if (!this.texObjTerakhir)
			return false;
		if (this.texObjTerakhir.gbr != gbr)
			return false;
		return true;
	}
	ambilTexObj(gbr) {
		let hasil;
		this.daftarTex.forEach((item) => {
			if (item.gbr == gbr) {
				hasil = item;
			}
		});
		if (!hasil) {
			this.log('buat tex baru');
			hasil = {
				gbr: gbr,
				tex: this.buatTexture(gbr)
			};
			this.daftarTex.push(hasil);
		}
		return hasil;
	}
	checkUVKoordObjBerulang(u1, v1, u2, v2) {
		if (!this.uvKoordObjTerakhir)
			return false;
		if (!this.checkKotakSama(this.uvKoordObjTerakhir, u1, v1, u2, v2))
			return false;
		return true;
	}
	ambilUVKoordObjDariPool(u1, v1, u2, v2) {
		let hasil;
		this.daftarPosObj.forEach((item) => {
			if (this.checkKotakSama(item, u1, v1, u2, v2)) {
				hasil = item;
			}
		});
		if (!hasil) {
			this.log('buat uv baru');
			hasil = {
				buff: this.buatUVKoordBuffer2(this.buatUV(u1, v1, u2, v2)),
				u1: u1,
				v1: v1,
				u2: u2,
				v2: v2
			};
			this.daftarPosObj.push(hasil);
		}
		else {
		}
		this.uvKoordObjTerakhir = hasil;
		return hasil;
	}
	clear() {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
	buatKotak(p, l) {
		return {
			p1: {
				x: 0,
				y: 0
			},
			p2: {
				x: p,
				y: 0
			},
			p3: {
				x: 0,
				y: l
			},
			p4: {
				x: p,
				y: l
			}
		};
	}
	pilihanDefault(gbr, p) {
		p.alpha = p.alpha || 1;
		p.offsetX = p.offsetX || 0;
		p.offsetY = p.offsetY || 0;
		p.rotation = p.rotation || 0;
		p.scaleX = p.scaleX || 1;
		p.scaleY = p.scaleY || 1;
		p.texU1 = p.texU1 || 0;
		p.texV1 = p.texV1 || 0;
		p.texU2 = p.texU2 || gbr.width;
		p.texV2 = p.texV2 || gbr.height;
		p.texU1 /= gbr.width;
		p.texV1 /= gbr.height;
		p.texU2 /= gbr.width;
		p.texV2 /= gbr.height;
	}
	buatRectBuffer(p, l) {
		let buff = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
		let kotak = this.buatKotak(p, l);
		let positions = [
			kotak.p1.x, kotak.p1.y,
			kotak.p2.x, kotak.p2.y,
			kotak.p3.x, kotak.p3.y,
			kotak.p3.x, kotak.p3.y,
			kotak.p2.x, kotak.p2.y,
			kotak.p4.x, kotak.p4.y //kanan bawah
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
		return buff;
	}
	pangkat2(gbr) {
		if (gbr.width != gbr.height)
			return false;
		if ([0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].indexOf(gbr.width) > -1)
			return true;
		return false;
	}
	buatTexture(gbr) {
		let tex = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		if (!this.pangkat2(gbr)) {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		}
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, gbr);
		return tex;
	}
	buatUV(u1, v1, u2, v2) {
		return [
			u1, v1,
			u2, v1,
			u1, v2,
			u1, v2,
			u2, v1,
			u2, v2 //kanan bawah /__|
		];
	}
	// private bindUVKoordBuffer(lokasi: number, buff: WebGLBuffer): void {
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
	// 	this.gl.enableVertexAttribArray(this.lokasiAttrUV);
	// 	this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	// }
	// private bindPosisiBuffer(lokasi: number, buff: WebGLBuffer): void {
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
	// 	this.gl.enableVertexAttribArray(this.lokasiAttrPosisi);
	// 	this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	// }
	bindBuffer(lokasi, buff) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
		this.gl.enableVertexAttribArray(lokasi);
		this.gl.vertexAttribPointer(lokasi, 2, this.gl.FLOAT, false, 0, 0);
	}
	buatUVKoordBuffer2(data) {
		let buff = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
		return buff;
	}
	drawImage(image, x, y, opt = {}) {
		this.pilihanDefault(image, opt);
		//check posisi berulang
		if (!this.checkPosisiObjBerulang(image.width, image.height)) {
			this.posObjTerakhir = this.ambilPosisiObjDariPool(image.width, image.height);
			this.bindBuffer(this.lokasiAttrPosisi, this.posObjTerakhir.buff);
		}
		//check uv koordinat berulang
		if (!this.checkUVKoordObjBerulang(opt.texU1, opt.texV1, opt.texU2, opt.texV2)) {
			this.uvKoordObjTerakhir = this.ambilUVKoordObjDariPool(opt.texU1, opt.texV1, opt.texU2, opt.texV2);
			this.bindBuffer(this.lokasiAttrUV, this.uvKoordObjTerakhir.buff);
		}
		//check texture berulang
		if (!this.checkTexBerulang(image)) {
			this.texObjTerakhir = this.ambilTexObj(image);
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.texObjTerakhir.tex);
		}
		this.gl.uniform1f(this.LokasiUniformAlpha, opt.alpha);
		this.gl.uniform2f(this.lokasiResolusi, this.kanvas.width, this.kanvas.height);
		this.gl.uniform2f(this.lokasiGeser, x, y);
		this.gl.uniform2f(this.lokasiSkala, opt.scaleX, opt.scaleY);
		this.gl.uniform2f(this.lokasiPutar, Math.sin(opt.rotation * this.SDT2RAD), Math.cos(opt.rotation * this.SDT2RAD));
		this.gl.uniform2f(this.lokasiOffset, opt.offsetX, opt.offsetY);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
	init(canvas) {
		this.gl = canvas.getContext('webgl');
		if (!this.gl) {
			throw new Error();
		}
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.shader = this.buatShader(this.gl, this.gl.VERTEX_SHADER, this.shaderVertek);
		this.fragment = this.buatShader(this.gl, this.gl.FRAGMENT_SHADER, this.shaderFragment);
		this.program = this.buatProgram(this.gl, this.shader, this.fragment);
		this.lokasiAttrPosisi = this.gl.getAttribLocation(this.program, 'a_position');
		this.LokasiUniformAlpha = this.gl.getUniformLocation(this.program, 'u_alpha');
		this.lokasiAttrUV = this.gl.getAttribLocation(this.program, "a_texCoord");
		this.lokasiResolusi = this.gl.getUniformLocation(this.program, "u_resolusi");
		this.lokasiGeser = this.gl.getUniformLocation(this.program, "u_geser");
		this.lokasiSkala = this.gl.getUniformLocation(this.program, "u_skala");
		this.lokasiPutar = this.gl.getUniformLocation(this.program, "u_putar");
		this.lokasiOffset = this.gl.getUniformLocation(this.program, "u_offset");
		this.gl.useProgram(this.program);
	}
	buatProgram(gl, vshader, fshader) {
		let program = gl.createProgram();
		gl.attachShader(program, vshader);
		gl.attachShader(program, fshader);
		gl.linkProgram(program);
		let sukses = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!sukses) {
			gl.deleteProgram(program);
			throw new Error('');
		}
		return program;
	}
	buatShader(gl, type, source) {
		let shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		let sukses = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (sukses) {
			return shader;
		}
		gl.deleteShader(shader);
		throw new Error('');
	}
}
