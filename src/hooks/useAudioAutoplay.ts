import { useEffect, useState } from "react";

export const useAudioAutoplay = (audioId: string) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById(audioId) as HTMLAudioElement;

    const initializeAudio = async () => {
      if (audio) {
        try {
          audio.volume = 0.5;

          // Add event listeners to handle user interaction
          const startAudio = async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              // Remove the event listeners once audio starts
              document.removeEventListener("click", startAudio);
              document.removeEventListener("touchstart", startAudio);
            } catch (error) {
              console.error("Failed to play audio:", error);
              setIsPlaying(false);
            }
          };

          // Try to play immediately
          await audio.play();

          // If immediate play fails, wait for user interaction
          document.addEventListener("click", startAudio);
          document.addEventListener("touchstart", startAudio);
        } catch (error) {
          console.error("Initial autoplay failed:", error);
          setIsPlaying(false);
        }
      }
    };

    initializeAudio();

    return () => {
      if (audio) {
        audio.pause();
        document.removeEventListener("click", () => {});
        document.removeEventListener("touchstart", () => {});
      }
    };
  }, [audioId]);

  const toggleMusic = () => {
    const audio = document.getElementById(audioId) as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return { isPlaying, toggleMusic };
};
