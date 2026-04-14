export type DcxFileUploadDropzoneSize = 'small' | 'large';

export interface DcxFileUploadItem {
  file: File;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  dropzoneSize?: DcxFileUploadDropzoneSize;
}

export type DcxFileUploadValue = File | File[] | null;
