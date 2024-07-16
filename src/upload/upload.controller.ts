import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addFrameToImage(
    @UploadedFile() file: Multer.File,
    @Res() res: Response,
  ) {
    const processedImage = await this.uploadService.addFrameToImage(
      file.buffer,
    );
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="framed-image.png"',
    });
    res.send(processedImage);
  }
}
