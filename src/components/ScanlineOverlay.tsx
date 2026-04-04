export function ScanlineOverlay() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,102,0.012) 2px, rgba(255,0,102,0.012) 4px)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-[59]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <div
        className="fixed left-0 right-0 h-[2px] pointer-events-none z-[58] animate-scandown"
        style={{ background: 'rgba(255,0,102,0.06)' }}
      />
    </>
  );
}
