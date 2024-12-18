import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import React, { useCallback, useMemo, useState } from 'react';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material';
import '@uppy/dashboard/dist/style.min.css';
import { PiUpload } from 'react-icons/pi';
import { IGenerateAwsS3URL } from 'src/types';
import XHRUpload from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor';
import { findSessionToken } from 'src/utils';
import { useGetDevice } from '../hooks';

type TReportDest = {
  destination: 'report';
};

type TUserDest = {
  destination: 'users';
};

type TDestination = TReportDest | TUserDest;

export type TImagePosition = 'flex-start' | 'center' | 'flex-end';
type TButtonSize = 'large' | 'medium' | 'small';

interface IProps {
  sx?: SxProps;
  maxNumberOfFiles: number;
  disabled?: boolean;
  onUploadComplete?: (src: IGenerateAwsS3URL[]) => void;
  asset: TDestination;
  buttonSize?: TButtonSize;
  buttonLabel?: string;
  showPreview?: boolean;
  imageSrc?: string;
}

export const FileUpload: React.FC<IProps> = (props) => {
  const {
    maxNumberOfFiles = 1,
    disabled = false,
    asset,
    sx,
    onUploadComplete,
    buttonSize,
    buttonLabel = 'Upload image',
    showPreview,
    imageSrc,
  } = props;
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const session = findSessionToken();
  const { isMobile } = useGetDevice();

  const endpoint = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    return `${baseUrl}/${asset.destination}/upload`;
  }, [asset]);

  const handleUploadModalClose = useCallback(() => {
    setOpenUploadModal(false);
  }, []);

  const handleUploadModalOpen = useCallback(() => {
    setOpenUploadModal(true);
  }, []);

  const uppy = new Uppy({
    meta: { type: 'image' },
    restrictions: {
      maxNumberOfFiles,
      maxFileSize: 2 * 1024 * 1024,
      allowedFileTypes: ['.jpg', '.jpeg', '.png'],
    },
    autoProceed: false,
  });

  uppy.use(XHRUpload, {
    headers: {
      authorization: `Bearer ${session}`,
    },
    fieldName: 'attachments',
    endpoint,
  });

  uppy.use(ImageEditor, {
    quality: 0.8,
    cropperOptions: {
      viewMode: 1,
      background: true,
      autoCropArea: 1,
      responsive: true,
      center: true,
      dragMode: 'move',
      guides: true,
      highlight: true,
      aspectRatio: 1,
      croppedCanvasOptions: {},
    },
    actions: {
      revert: true,
      rotate: true,
      granularRotate: true,
      flip: true,
      zoomIn: true,
      zoomOut: true,
      cropSquare: true,
      cropWidescreen: false,
      cropWidescreenVertical: false,
    },
  });

  uppy.on('complete', (result) => {
    if (onUploadComplete) {
      const awsImages = result?.successful?.map((item) => {
        const body = item.response?.body;
        if (maxNumberOfFiles === 1) {
          return body?.data as IGenerateAwsS3URL | undefined;
        }
        const data = body?.data as any;
        return data[0]?.value;
      });
      onUploadComplete(awsImages ?? []);
    }
    setOpenUploadModal(false);
  });

  return (
    <Box sx={sx}>
      {showPreview ? (
        <>
          <Avatar
            src={imageSrc}
            variant="rounded"
            sx={{
              width: '160px',
              height: '160px',
            }}
          />
          <Button
            fullWidth
            size="large"
            variant="outlined"
            sx={{ pl: 2, mt: 2, pr: 1 }}
            onClick={handleUploadModalOpen}
            startIcon={<PiUpload />}
          >
            {buttonLabel || 'Upload file'}
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          size={buttonSize}
          disabled={disabled}
          color="primary"
          onClick={handleUploadModalOpen}
          startIcon={<PiUpload />}
          fullWidth={isMobile}
        >
          {buttonLabel || 'Upload file'}
        </Button>
      )}

      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={openUploadModal}
        onRequestClose={handleUploadModalClose}
        plugins={['DragDrop', 'ImageEditor']}
      />
    </Box>
  );
};
