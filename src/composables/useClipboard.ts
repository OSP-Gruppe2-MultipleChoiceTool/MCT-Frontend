export const writeToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error: unknown) {
    console.error('Content could not be writting into Clipboard');
  }
}
