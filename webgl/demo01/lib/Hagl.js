"use strict";
class Hagl {
    constructor(canvas) {
        this.dev = false;
        this.shaderVertek = ``; //TODO
        this.shaderFragment = ``; //TODO:
        this.listObjPos = [];
        this.listUV = [];
        this.ANGLE2RAD = Math.PI / 180.0;
        this.canvas = canvas;
        this.log('ha-gl');
        this.shaderVertek = `
			attribute vec2 a_position;
			attribute vec2 a_texCoord;

			varying vec2 v_texCoord;

			uniform vec2 u_resolution;
			uniform vec2 u_move;
			uniform vec2 u_scale;
			uniform vec2 u_rotation;
			uniform vec2 u_offset;

			void main() {
				//offset
				vec2 position = a_position - u_offset; 

				//scale
				position = position * u_scale; 

				//
				position = vec2(
					position.x * u_rotation.y + position.y * u_rotation.x,
					position.y * u_rotation.y - position.x * u_rotation.x
				);

				//geser
				position = position + u_move;

				// convert the position from pixels to 0.0 to 1.0
				vec2 zeroToOne = position / u_resolution;
				
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
        this.init(canvas);
    }
    checkBoxRepetition(src, u1, v1, u2, v2) {
        if (src.u1 != u1)
            return false;
        if (src.v1 != v1)
            return false;
        if (src.u2 != u2)
            return false;
        if (src.v2 != v2)
            return false;
        return true;
    }
    checkObjPosRepetition(p, l) {
        if (!this.prevObjPos)
            return false;
        if (!this.checkBoxRepetition(this.prevObjPos, 0, 0, p, l))
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
    getObjPosFromPool(p, l) {
        let result;
        this.listObjPos.forEach((item) => {
            if (this.checkBoxRepetition(item, 0, 0, p, l)) {
                result = item;
            }
        });
        if (!result) {
            this.log('buat buffer posisi');
            result = {
                buff: this.createRectBuffer(p, l),
                u1: 0,
                v1: 0,
                u2: p,
                v2: l
            };
            this.listObjPos.push(result);
        }
        this.prevObjPos = result;
        return result;
    }
    checkTexRepetition(img) {
        if (!this.prevUVObj)
            return false;
        if (this.prevUVObj.img != img)
            return false;
        return true;
    }
    getUVObj(img) {
        let result;
        this.listUV.forEach((item) => {
            if (item.img == img) {
                result = item;
            }
        });
        if (!result) {
            this.log('buat tex baru');
            result = {
                img: img,
                tex: this.createTexture(img)
            };
            this.listUV.push(result);
        }
        return result;
    }
    checkUVKoordObjRepetition(u1, v1, u2, v2) {
        if (!this.prevUVCoordObj)
            return false;
        if (!this.checkBoxRepetition(this.prevUVCoordObj, u1, v1, u2, v2))
            return false;
        return true;
    }
    getUVBoxFromPool(u1, v1, u2, v2) {
        let result;
        this.listObjPos.forEach((item) => {
            if (this.checkBoxRepetition(item, u1, v1, u2, v2)) {
                result = item;
            }
        });
        if (!result) {
            this.log('buat uv baru');
            result = {
                buff: this.createUVCoordBuffer(this.createUV(u1, v1, u2, v2)),
                u1: u1,
                v1: v1,
                u2: u2,
                v2: v2
            };
            this.listObjPos.push(result);
        }
        else {
        }
        this.prevUVCoordObj = result;
        return result;
    }
    clear() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    createBox(p, l) {
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
    defaultOpt(img, p) {
        p.alpha = p.alpha || 1;
        p.offsetX = p.offsetX || 0;
        p.offsetY = p.offsetY || 0;
        p.rotation = p.rotation || 0;
        p.scaleX = p.scaleX || 1;
        p.scaleY = p.scaleY || 1;
        p.texU1 = p.texU1 || 0;
        p.texV1 = p.texV1 || 0;
        p.texU2 = p.texU2 || img.width;
        p.texV2 = p.texV2 || img.height;
        p.texU1 /= img.width;
        p.texV1 /= img.height;
        p.texU2 /= img.width;
        p.texV2 /= img.height;
    }
    createRectBuffer(p, l) {
        let buff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
        let box = this.createBox(p, l);
        let positions = [
            box.p1.x, box.p1.y,
            box.p2.x, box.p2.y,
            box.p3.x, box.p3.y,
            box.p3.x, box.p3.y,
            box.p2.x, box.p2.y,
            box.p4.x, box.p4.y //kanan bawah
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        return buff;
    }
    power2(gbr) {
        if (gbr.width != gbr.height)
            return false;
        if ([0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].indexOf(gbr.width) > -1)
            return true;
        return false;
    }
    createTexture(img) {
        let tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        if (!this.power2(img)) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        }
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
        return tex;
    }
    createUV(u1, v1, u2, v2) {
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
    createUVCoordBuffer(data) {
        let buff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        return buff;
    }
    drawImage(image, x, y, opt = {}) {
        this.defaultOpt(image, opt);
        //check posisi berulang
        if (!this.checkObjPosRepetition(image.width, image.height)) {
            this.prevObjPos = this.getObjPosFromPool(image.width, image.height);
            this.bindBuffer(this.locationAttrPosition, this.prevObjPos.buff);
        }
        //check uv koordinat berulang
        if (!this.checkUVKoordObjRepetition(opt.texU1, opt.texV1, opt.texU2, opt.texV2)) {
            this.prevUVCoordObj = this.getUVBoxFromPool(opt.texU1, opt.texV1, opt.texU2, opt.texV2);
            this.bindBuffer(this.locationAttrUV, this.prevUVCoordObj.buff);
        }
        //check texture berulang
        if (!this.checkTexRepetition(image)) {
            this.prevUVObj = this.getUVObj(image);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.prevUVObj.tex);
        }
        this.gl.uniform1f(this.locationUniformAlpha, opt.alpha);
        this.gl.uniform2f(this.locationResolution, this.canvas.width, this.canvas.height);
        this.gl.uniform2f(this.locationMove, x, y);
        this.gl.uniform2f(this.locationScale, opt.scaleX, opt.scaleY);
        this.gl.uniform2f(this.locationRotation, Math.sin(opt.rotation * this.ANGLE2RAD), Math.cos(opt.rotation * this.ANGLE2RAD));
        this.gl.uniform2f(this.locationOffset, opt.offsetX, opt.offsetY);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    init(canvas) {
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
            throw new Error();
        }
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.shader = this.createShader(this.gl, this.gl.VERTEX_SHADER, this.shaderVertek);
        this.fragment = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, this.shaderFragment);
        this.program = this.createProgram(this.gl, this.shader, this.fragment);
        this.locationAttrPosition = this.gl.getAttribLocation(this.program, 'a_position');
        this.locationUniformAlpha = this.gl.getUniformLocation(this.program, 'u_alpha');
        this.locationAttrUV = this.gl.getAttribLocation(this.program, "a_texCoord");
        this.locationResolution = this.gl.getUniformLocation(this.program, "u_resolution");
        this.locationMove = this.gl.getUniformLocation(this.program, "u_move");
        this.locationScale = this.gl.getUniformLocation(this.program, "u_scale");
        this.locationRotation = this.gl.getUniformLocation(this.program, "u_rotation");
        this.locationOffset = this.gl.getUniformLocation(this.program, "u_offset");
        this.gl.useProgram(this.program);
    }
    createProgram(gl, vshader, fshader) {
        let program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            gl.deleteProgram(program);
            throw new Error('');
        }
        return program;
    }
    createShader(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        gl.deleteShader(shader);
        throw new Error('');
    }
}
