import { getAccessToken } from './firebaseAuth';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  iconLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  size?: string;
  thumbnailLink?: string;
}

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3';

export const listDriveFiles = async (query = '', folderId?: string): Promise<DriveFile[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive');

  const conditions = ['trashed = false'];
  if (folderId) {
    conditions.push(`'${folderId}' in parents`);
  }
  if (query.trim()) {
    conditions.push(`name contains '${query.replace(/'/g, "\\'")}'`);
  }

  const q = encodeURIComponent(conditions.join(' and '));
  const fields = encodeURIComponent('nextPageToken, files(id, name, mimeType, iconLink, webViewLink, webContentLink, createdTime, modifiedTime, size, thumbnailLink)');
  const url = `${DRIVE_API_URL}/files?q=${q}&fields=${fields}&orderBy=folder,modifiedTime desc&pageSize=50`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to fetch Drive files (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

export const createDriveFolder = async (folderName: string, parentFolderId?: string): Promise<DriveFile> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive');

  const metadata: { name: string; mimeType: string; parents?: string[] } = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };
  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const response = await fetch(`${DRIVE_API_URL}/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Failed to create folder in Google Drive');
  }

  return response.json();
};

export const uploadDriveFile = async (
  file: File,
  parentFolderId?: string,
  onProgress?: (progress: number) => void
): Promise<DriveFile> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive');

  const metadata: { name: string; mimeType: string; parents?: string[] } = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };
  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileArrayBuffer = await file.arrayBuffer();

  const multipartRequestBody = new Blob([
    delimiter,
    'Content-Type: application/json; charset=UTF-8\r\n\r\n',
    JSON.stringify(metadata),
    delimiter,
    `Content-Type: ${metadata.mimeType}\r\n\r\n`,
    fileArrayBuffer,
    closeDelimiter,
  ]);

  if (onProgress) onProgress(30);

  const response = await fetch(`${DRIVE_UPLOAD_URL}/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,webContentLink,size`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (onProgress) onProgress(100);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Failed to upload file to Google Drive');
  }

  return response.json();
};

export const deleteDriveFile = async (fileId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive');

  const response = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Failed to delete file from Google Drive');
  }
};
