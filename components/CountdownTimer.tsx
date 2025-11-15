'use client';

import React from 'react';

function diffParts(target: Date) {
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function CountdownTimer({ targetDate, className, style }: { targetDate?: string | Date; className?: string; style?: React.CSSProperties }) {
  const initial = React.useMemo(() => {
    const d = typeof targetDate === 'string' ? new Date(targetDate) : targetDate instanceof Date ? targetDate : new Date();
    return diffParts(d);
  }, [targetDate]);

  const [parts, setParts] = React.useState(initial);

  React.useEffect(() => {
    const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate instanceof Date ? targetDate : new Date();
    const id = setInterval(() => {
      setParts(diffParts(target));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const itemCls = 'flex flex-col items-center justify-center px-3 py-2 rounded-lg bg-white/70 backdrop-blur text-celebrity-gray-900';
  const numCls = 'text-2xl font-bold';
  const labelCls = 'text-xs opacity-70';

  return (
    <div className={['flex items-center gap-2', className].filter(Boolean).join(' ')} style={style}>
      <div className={itemCls}><div className={numCls}>{String(parts.days).padStart(2, '0')}</div><div className={labelCls}>D</div></div>
      <div className={itemCls}><div className={numCls}>{String(parts.hours).padStart(2, '0')}</div><div className={labelCls}>H</div></div>
      <div className={itemCls}><div className={numCls}>{String(parts.minutes).padStart(2, '0')}</div><div className={labelCls}>M</div></div>
      <div className={itemCls}><div className={numCls}>{String(parts.seconds).padStart(2, '0')}</div><div className={labelCls}>S</div></div>
    </div>
  );
}

export default CountdownTimer;