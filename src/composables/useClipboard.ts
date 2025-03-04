export const writeToClipboard = async (content: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (error: unknown) {
    console.error('Content could not be writting into Clipboard', error);
    return false;
  }
}

export const writeToClipboardRtf = async (content: string): Promise<void> => {
  try {
    const rtfBlob = new Blob([content], { type: 'text/rtf' });
    const clipboardItem = new ClipboardItem({
      'text/rtf': rtfBlob,
    });

    await navigator.clipboard.write([clipboardItem]);
  } catch (error: unknown) {
    console.error('Content could not be writting into Clipboard', error);
  }
}
