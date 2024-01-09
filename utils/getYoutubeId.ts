function getVideoIdFromUrl(url: string): string | null {
  const urlObject = new URL(url);
  const videoId = urlObject.searchParams.get("v");

  return videoId || null;
}

export default getVideoIdFromUrl;
