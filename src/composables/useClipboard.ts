export const writeToClipboard = async (content: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (error: unknown) {
    console.error('Content could not be writting into Clipboard', error);
    return false;
  }
}

export const writeToClipboardHtml = async (content: string): Promise<void> => {
  const rtfBlob = new Blob([content], { type: 'text/html' });
  const clipboardItem = new ClipboardItem({
    'text/html': rtfBlob,
  });

  await navigator.clipboard.write([clipboardItem]);
}
