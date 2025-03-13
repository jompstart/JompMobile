import * as FileSystem from 'expo-file-system';
export const convertImageToBinary = async (uri: string) => {
  const imgBinary = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  });
  return imgBinary;
};

export const base64ToBlob = async (base64: string) => {
  const response = await fetch(base64); // Convert Base64 Data URL to Blob
  const blob = await response.blob();
  return blob;
};
export const base64ToFile = async (base64: string, filename = 'image.jpg') => {
  const fileUri = FileSystem.cacheDirectory + 'image.jpg'; // Store in cache
  await FileSystem.writeAsStringAsync(fileUri, base64.split(',')[1], {
    encoding: FileSystem.EncodingType.Base64,
  });
  return fileUri; // Return the local file URI
};
