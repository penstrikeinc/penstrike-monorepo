import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomFileValidator implements PipeTransform {
  private readonly allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
  private readonly maxFileSize = 2 * 1024 * 1024; // 2MB
  private readonly maxFileLength?: number;

  constructor(maxFileLength?: number) {
    this.maxFileLength = maxFileLength || 1;
  }

  private validateSingleFile(file: any): void {
    if (!file || !file.originalname) {
      throw new BadRequestException('Invalid file');
    }

    const fileExtension = this.getFileExtension(file.originalname);

    if (!this.isValidExtension(fileExtension)) {
      throw new BadRequestException('Invalid file extension');
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${this.maxFileSize / (1024 * 1024)}MB`,
      );
    }
  }

  private isValidExtension(extension: string): boolean {
    return this.allowedExtensions.includes(extension.toLowerCase());
  }

  private getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  transform(files: any): any {
    if (!files) {
      throw new BadRequestException('No files provided');
    }

    if (Array.isArray(files)) {
      if (
        this.maxFileLength !== undefined &&
        files.length > this.maxFileLength
      ) {
        throw new BadRequestException(
          `Exceeded the maximum number of files (${this.maxFileLength}) allowed`,
        );
      }

      files.forEach((file) => this.validateSingleFile(file));
    } else {
      this.validateSingleFile(files);
    }

    return files;
  }
}
