export function convertGoogleDriveLink(input: string): string {
  if (!input) return input;
  const match = input.match(/(?:\/d\/|id=)([\w-]+)/);
  const fileId = match ? match[1] : null;
  if (!fileId) return input;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
