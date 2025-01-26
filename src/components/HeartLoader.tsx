import gsap from "gsap";
import { useEffect, useRef } from "react";

interface HeartLoaderProps {
  onAnimationComplete: () => void;
}

const HeartLoader = ({ onAnimationComplete }: HeartLoaderProps) => {
  const heartRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          scale: 20,
          duration: 1,
          ease: "power2.inOut",
          onComplete: onAnimationComplete,
        });
      },
    });

    tl.from(heartRef.current, {
      scale: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
      .to(heartRef.current, {
        scale: 1.1,
        duration: 0.5,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut",
      })
      .to(heartRef.current, {
        scale: 0.8,
        duration: 0.3,
        ease: "power1.in",
      });

    return () => {
      tl.kill();
    };
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-50 to-purple-100"
    >
      <svg
        ref={heartRef}
        width="100"
        height="100"
        viewBox="0 0 24 24"
        className="text-pink-500"
      >
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
};

export default HeartLoader;
