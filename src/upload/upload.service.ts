import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
const path = require('path');

@Injectable()
export class UploadService {
  async addFrameToImage(imageBuffer: Buffer): Promise<Buffer> {
    const assetsFolder = path.resolve(__dirname, '../../src/assets');
    const framePath = path.join(assetsFolder, 'frame.png');
    const frame = await sharp(framePath).toBuffer();

    // Get the width of the frame
    const frameInfo = await sharp(frame).metadata();
    const frameWidth = frameInfo.width;
    const frameHeight = frameInfo.height;

    // Resize the uploaded image to match your frame's dimensions if necessary
    const resizedImage = await sharp(imageBuffer)
      .resize({ width: frameWidth, height: frameHeight }) // Example resize, adjust to your frame's dimensions
      .toBuffer();

    // Composite the frame over the resized image
    return sharp(resizedImage)
      .composite([{ input: frame, blend: 'over' }])
      .toBuffer();
  }
}
