import { UploadService } from './upload.service';
import { Response } from 'express';
import { Multer } from 'multer';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    addFrameToImage(file: Multer.File, res: Response): Promise<void>;
}
