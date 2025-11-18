'use client';

import React from 'react';

function parseYouTubeId(u?: string) {
  if (!u) return '';
  try {
    const url = new URL(u);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1);
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') || '';
  } catch {}
  const m = u.match(/(?:v=|be\/)([\w-]{6,})/);
  return m?.[1] || '';
}

export function AudioPlayer({ source, url }: { source: 'file' | 'youtube'; url?: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const ytRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (source === 'file') {
      const a = audioRef.current;
      if (!a) return;
      const onInteract = () => {
        a.muted = false;
        a.play().catch(() => {});
        document.removeEventListener('pointerdown', onInteract);
      };
      a.autoplay = true;
      a.loop = true;
      a.playsInline = true as any;
      a.muted = true;
      a.play().catch(() => {});
      document.addEventListener('pointerdown', onInteract);
      return () => document.removeEventListener('pointerdown', onInteract);
    }
    const id = parseYouTubeId(url);
    if (!id) return;
    const onYouTubeIframeAPIReady = () => {
      const YT = (window as any).YT;
      if (!YT || !ytRef.current) return;
      const player = new YT.Player(ytRef.current, {
        width: '0',
        height: '0',
        videoId: id,
        playerVars: { autoplay: 1, controls: 0, modestbranding: 1, loop: 1, playlist: id },
        events: {
          onReady: (e: any) => {
            setReady(true);
            try { e.target.mute(); e.target.playVideo(); } catch {}
          },
        },
      });
      const onInteract = () => {
        try { player.unMute(); player.playVideo(); } catch {}
        document.removeEventListener('pointerdown', onInteract);
      };
      document.addEventListener('pointerdown', onInteract);
    };
    const scriptId = 'yt-iframe-api';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(s);
    }
    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    return () => {
    };
  }, [source, url]);

  if (source === 'file') {
    return <audio ref={audioRef} src={url} style={{ display: 'none' }} />;
  }
  return <div ref={ytRef} style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute', left: -9999 }} />;
}

export default AudioPlayer;