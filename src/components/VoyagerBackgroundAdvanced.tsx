import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import {
  getSceneColor,
  getSceneIndex,
  getSceneTransitionProgress,
  rgbToString,
  sceneNames,
  sceneSubtitles,
} from '@/lib/colorInterpolation';

/* ===== Scene Image Paths ===== */
const sceneImages = [
  '/images/scene-dawn.png',
  '/images/scene-exploration.png',
  '/images/scene-creation.png',
  '/images/scene-growth.png',
  '/images/scene-peak.png',
];

/* ===== Layer Config ===== */
interface Layer {
  depth: number;
  opacity: number;
  blendMode: string;
  scale: number;
}

const sceneLayers: Layer[][] = [
  // Dawn
  [
    { depth: 0.05, opacity: 1, blendMode: 'normal', scale: 1.1 },
    { depth: 0.2, opacity: 0.7, blendMode: 'overlay', scale: 1.15 },
    { depth: 0.4, opacity: 0.5, blendMode: 'screen', scale: 1.2 },
    { depth: 0.6, opacity: 0.3, blendMode: 'screen', scale: 1.25 },
  ],
  // Exploration
  [
    { depth: 0.1, opacity: 1, blendMode: 'normal', scale: 1.1 },
    { depth: 0.3, opacity: 0.6, blendMode: 'screen', scale: 1.15 },
    { depth: 0.5, opacity: 0.4, blendMode: 'screen', scale: 1.2 },
    { depth: 0.65, opacity: 0.3, blendMode: 'normal', scale: 1.25 },
  ],
  // Creation
  [
    { depth: 0.08, opacity: 1, blendMode: 'normal', scale: 1.1 },
    { depth: 0.25, opacity: 0.7, blendMode: 'screen', scale: 1.15 },
    { depth: 0.5, opacity: 0.5, blendMode: 'multiply', scale: 1.2 },
    { depth: 0.7, opacity: 0.3, blendMode: 'screen', scale: 1.25 },
  ],
  // Growth
  [
    { depth: 0.1, opacity: 1, blendMode: 'normal', scale: 1.1 },
    { depth: 0.25, opacity: 0.6, blendMode: 'screen', scale: 1.15 },
    { depth: 0.4, opacity: 0.4, blendMode: 'screen', scale: 1.2 },
    { depth: 0.55, opacity: 0.3, blendMode: 'normal', scale: 1.25 },
  ],
  // Peak
  [
    { depth: 0.05, opacity: 1, blendMode: 'normal', scale: 1.1 },
    { depth: 0.15, opacity: 0.7, blendMode: 'screen', scale: 1.12 },
    { depth: 0.3, opacity: 0.5, blendMode: 'screen', scale: 1.18 },
    { depth: 0.4, opacity: 0.3, blendMode: 'normal', scale: 1.22 },
  ],
];

/* ===== Dust Particle ===== */
interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateDustParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));
}

/* ===== Component ===== */
export function VoyagerBackgroundAdvanced() {
  const reducedMotion = usePrefersReducedMotion();
  const { isMobile } = useBreakpoint();
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dustParticles = useMemo(
    () => (reducedMotion || isMobile ? [] : generateDustParticles(20)),
    [reducedMotion, isMobile]
  );

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const sceneIndex = getSceneIndex(scrollProgress);
  const transitionProgress = getSceneTransitionProgress(scrollProgress);
  const sceneColor = getSceneColor(scrollProgress);
  const colorStr = rgbToString(sceneColor);
  const nextSceneIndex = Math.min(sceneIndex + 1, 4);
  const parallaxScale = isMobile ? 0.4 : 0.8;

  // Camera scale effect
  const cameraScale = isMobile ? 1 : 1 + transitionProgress * 0.05;

  return (
    <div
      ref={containerRef}
      className="voyager-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* ===== Scene Layers ===== */}
      {sceneImages.map((img, sIdx) => {
        const isCurrentScene = sIdx === sceneIndex;
        const isNextScene = sIdx === nextSceneIndex;
        let sceneOpacity = 0;
        if (isCurrentScene) sceneOpacity = 1 - transitionProgress * 0.5;
        else if (isNextScene) sceneOpacity = transitionProgress * 0.5;

        if (sceneOpacity <= 0) return null;

        // On mobile, only render the first layer of each scene to cut paint cost by 75%
        const layers = isMobile ? [sceneLayers[sIdx][0]] : sceneLayers[sIdx];

        return (
          <div
            key={sIdx}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: sceneOpacity,
              transition: (reducedMotion || isMobile) ? 'none' : `opacity ${1500}ms ease-in-out`,
            }}
          >
            {layers.map((layer, lIdx) => {
              const parallaxOffset = (reducedMotion || isMobile)
                ? 0
                : window.scrollY * (1 - layer.depth) * parallaxScale;

              return (
                <div
                  key={lIdx}
                  style={{
                    position: 'absolute',
                    inset: isMobile ? '0' : '-10%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: layer.opacity,
                    mixBlendMode: isMobile ? 'normal' : (layer.blendMode as React.CSSProperties['mixBlendMode']),
                    transform: (reducedMotion || isMobile)
                      ? 'none'
                      : `translate3d(0, ${-parallaxOffset * 0.1}px, 0) scale(${layer.scale * cameraScale})`,
                    willChange: (reducedMotion || isMobile) ? 'auto' : 'transform',
                    filter:
                      (!isMobile && lIdx > 0)
                        ? `blur(${lIdx * 1.5}px) brightness(${1 + lIdx * 0.1})`
                        : 'none',
                  }}
                />
              );
            })}
          </div>
        );
      })}

      {/* ===== Dynamic Gradient Overlay ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 30%, ${colorStr} 0%, transparent 60%),
            linear-gradient(180deg, rgba(30,27,75,0.3) 0%, rgba(30,27,75,0.8) 50%, rgba(30,27,75,0.95) 100%)
          `,
          opacity: 0.7,
          transition: reducedMotion ? 'none' : 'background 1.5s ease-in-out',
        }}
      />

      {/* ===== Atmospheric Fog ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 100%, rgba(30,27,75,0.8) 0%, transparent 70%)`,
          opacity: 0.5 + transitionProgress * 0.2,
        }}
      />

      {/* ===== Light Rays ===== */}
      {!reducedMotion && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                ${135 + scrollProgress * 45}deg,
                transparent 40%,
                rgba(${sceneColor.r},${sceneColor.g},${sceneColor.b},0.08) 50%,
                transparent 60%
              )
            `,
            opacity: 0.6,
          }}
        />
      )}

      {/* ===== Dust Particles ===== */}
      {!reducedMotion &&
        dustParticles.map((p) => (
          <div
            key={p.id}
            className="dust-particle"
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: `rgba(${sceneColor.r},${sceneColor.g},${sceneColor.b},${p.opacity})`,
              animation: `dustDrift ${p.duration}s linear ${p.delay}s infinite`,
              pointerEvents: 'none',
            }}
          />
        ))}

      {/* ===== Dark overlay for text legibility ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(30, 27, 75, 0.45)',
        }}
      />

      {/* ===== Scene Label (bottom-left) ===== */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          left: 'calc(24px + env(safe-area-inset-left, 0px))',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: `rgba(${sceneColor.r},${sceneColor.g},${sceneColor.b},0.7)`,
            transition: 'color 1.5s ease-in-out',
          }}
        >
          Chapter {sceneIndex + 1} / 5
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            opacity: 0.8,
            transition: 'color 1.5s ease-in-out',
          }}
        >
          {sceneNames[sceneIndex]}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}
        >
          {sceneSubtitles[sceneIndex]}
        </span>
      </div>

      {/* ===== Top Progress Bar ===== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 3,
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, var(--color-royal-purple), ${colorStr}, var(--color-gold))`,
            boxShadow: `0 0 10px ${colorStr}, 0 0 20px rgba(${sceneColor.r},${sceneColor.g},${sceneColor.b},0.3)`,
            transition: reducedMotion ? 'none' : 'width 100ms ease-out, background 1.5s ease-in-out',
          }}
        />
      </div>

      {/* ===== Keyframes (injected via style tag) ===== */}
      <style>{`
        @keyframes dustDrift {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(${isMobile ? '30px' : '60px'}, -100px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
