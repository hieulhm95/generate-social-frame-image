"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const sharp = require('sharp');
const path = require('path');
let UploadService = class UploadService {
    async addFrameToImage(imageBuffer) {
        const assetsFolder = path.resolve(__dirname, '../../src/assets');
        const framePath = path.join(assetsFolder, 'frame.png');
        const frame = await sharp(framePath).toBuffer();
        const frameInfo = await sharp(frame).metadata();
        const frameWidth = frameInfo.width;
        const frameHeight = frameInfo.height;
        const resizedImage = await sharp(imageBuffer)
            .resize({ width: frameWidth, height: frameHeight })
            .toBuffer();
        return sharp(resizedImage)
            .composite([{ input: frame, blend: 'over' }])
            .toBuffer();
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map