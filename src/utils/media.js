export const getYouTubeEmbedMeta = (url) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');
    let videoId = '';

    if (hostname === 'youtu.be') {
      videoId = parsed.pathname.replace('/', '');
    } else if (hostname.endsWith('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1];
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1];
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
    }

    if (!videoId) return null;

    return {
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  } catch {
    return null;
  }
};

