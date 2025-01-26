import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Music,
  Music as MusicOff,
  Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import backgroundMusic from "../assets/sounds/romantic-piano.wav";
import { cardStyles, colorThemes } from "../types/card";
import Rose from "./Rose";
import { useAudioAutoplay } from "../hooks/useAudioAutoplay";

interface ValentineCardProps {
  sender: string;
  recipient: string;
  message: string;
  image?: string;
  style?: string;
  theme?: string;
}

const ValentineCard: React.FC<ValentineCardProps> = ({
  sender,
  recipient,
  message,
  image,
  style = "classic",
  theme = "romance",
}) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const { isPlaying, toggleMusic } = useAudioAutoplay("background-music");

  const cardStyle = cardStyles.find((s) => s.id === style) || cardStyles[0];
  const colorTheme = colorThemes.find((t) => t.id === theme) || colorThemes[0];

  useEffect(() => {
    if (message) {
      try {
        setDecryptedMessage(decodeURIComponent(atob(message)));
      } catch {
        setDecryptedMessage(message);
      }
    }

    console.log(decryptedMessage);

    const flowers = document.querySelector(".falling-flowers");
    if (flowers) {
      for (let i = 0; i < 10; i++) {
        const flower = document.createElement("div");
        flower.style.setProperty("--x", `${Math.random() * 100}vw`);
        flower.style.animation = `falling ${
          Math.random() * 5 + 5
        }s linear infinite`;
        flower.style.animationDelay = `${Math.random() * 5}s`;
        flowers.appendChild(flower);
      }
    }
  }, [message]);

  const handleResponse = (response: "yes" | "no") => {
    setAnswer(response);
    setShowMessage(true);

    if (response === "yes") {
      createLoveExplosion();
    }
  };

  const createLoveExplosion = () => {
    const container = document.createElement("div");
    container.className = "love-explosion";
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤️";
      heart.style.left = `${50 + (Math.random() - 0.5) * 50}%`;
      heart.style.top = `${50 + (Math.random() - 0.5) * 50}%`;
      heart.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(heart);
    }

    setTimeout(() => {
      container.remove();
    }, 2000);
  };

  const shareOnWhatsApp = () => {
    const text =
      answer === "yes"
        ? `💝 I said YES to being ${sender}'s Valentine! 💝`
        : `Maybe next time, ${sender}... 💝`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const goBack = () => {
    window.location.href = window.location.origin;
  };

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-y-auto ${
        cardStyle.id === "modern"
          ? `bg-gradient-to-br ${cardStyle.bgColor}`
          : `bg-gradient-to-br ${colorTheme.background}`
      }`}
    >
      <div className="rain"></div>
      <div className="falling-flowers"></div>

      <audio id="background-music" autoPlay loop src={backgroundMusic} />

      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={goBack}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          <ArrowLeft size={24} className="text-pink-600" />
        </button>
        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          {isPlaying ? (
            <Music size={24} className="text-pink-600" />
          ) : (
            <MusicOff size={24} className="text-pink-600" />
          )}
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4 pb-16">
        <AnimatePresence>
          {!isEnvelopeOpen ? (
            // Envelope
            <motion.div
              className="relative cursor-pointer"
              onClick={handleEnvelopeClick}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              exit={{ scale: 0, rotate: -10 }}
            >
              {/* Envelope Body */}
              <div
                className={`w-[300px] h-[200px] rounded-lg shadow-xl relative overflow-hidden ${
                  cardStyle.id === "modern"
                    ? cardStyle.envelopeColor
                    : colorTheme.accent
                }`}
              >
                <motion.div
                  className={`absolute top-0 left-0 w-full h-0 border-l-[150px] border-r-[150px] border-t-[100px] border-l-transparent border-r-transparent ${
                    cardStyle.id === "modern"
                      ? "border-t-fuchsia-300"
                      : "border-t-pink-300"
                  }`}
                  style={{ transformOrigin: "top" }}
                  animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
                />

                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-12 h-12 text-red-500 fill-current" />
                  </motion.div>
                </div>

                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-pink-700 text-sm font-medium">
                    Click to open your Valentine's card
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="max-w-md w-full"
            >
              <div
                className={`rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${
                  cardStyle.id === "modern"
                    ? `${cardStyle.cardBg} backdrop-blur-sm`
                    : cardStyle.id === "vintage"
                    ? cardStyle.cardBg
                    : "bg-white/95 backdrop-blur-xl"
                }`}
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="mb-8"
                  >
                    <Rose />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4"
                  >
                    <p
                      className={`text-lg font-medium ${
                        cardStyle.id === "modern"
                          ? cardStyle.textColor
                          : colorTheme.secondary
                      }`}
                    >
                      From:{" "}
                      <span className="dancing-script text-xl">{sender}</span>
                    </p>
                  </motion.div>
                  {image && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-6"
                    >
                      <img
                        src={image}
                        alt="Valentine's"
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <h1
                      className={`text-4xl font-bold dancing-script ${
                        cardStyle.id === "modern"
                          ? cardStyle.textColor
                          : colorTheme.secondary
                      }`}
                    >
                      Dear {recipient},
                    </h1>

                    <div className="relative">
                      <h2
                        className={`text-3xl font-bold dancing-script mb-6 ${
                          cardStyle.id === "modern"
                            ? cardStyle.textColor
                            : `bg-gradient-to-r ${colorTheme.primary} bg-clip-text text-transparent`
                        }`}
                      >
                        Will You Be My Valentine?
                      </h2>

                      {message && (
                        <p
                          className={`text-lg italic mb-6 ${
                            cardStyle.id === "modern"
                              ? "text-white/90"
                              : "text-gray-700"
                          }`}
                        >
                          "{message}"
                        </p>
                      )}

                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 -right-4"
                      >
                        <Heart className="w-8 h-8 text-pink-300 fill-current" />
                      </motion.div>
                    </div>

                    <p
                      className={`font-medium ${
                        cardStyle.id === "modern"
                          ? cardStyle.textColor
                          : colorTheme.secondary
                      }`}
                    >
                      With love, {sender}
                    </p>
                    <div className="mt-8 space-y-4">
                      {!showMessage ? (
                        <div className="space-y-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleResponse("yes")}
                            className={`w-full py-4 px-6 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                              cardStyle.id === "modern"
                                ? "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                                : `bg-gradient-to-r ${colorTheme.primary} hover:shadow-pink-200/50`
                            }`}
                          >
                            <Heart
                              className="animate-pulse"
                              size={24}
                              fill="currentColor"
                            />
                            <span>Yes, I'd love to!</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleResponse("no")}
                            className={`w-full py-4 px-6 text-lg font-medium rounded-xl transition-all duration-300 border ${
                              cardStyle.id === "modern"
                                ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                            }`}
                          >
                            Maybe next time...
                          </motion.button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-6"
                        >
                          <div className="p-6 bg-pink-50 rounded-xl">
                            <p className="text-xl font-medium text-pink-600 flex items-center justify-center gap-3">
                              {answer === "yes" ? (
                                <>
                                  <Heart
                                    className="text-pink-500 animate-bounce"
                                    fill="currentColor"
                                  />
                                  <span>
                                    You've made {sender} the happiest person!
                                  </span>
                                  <Heart
                                    className="text-pink-500 animate-bounce"
                                    fill="currentColor"
                                  />
                                </>
                              ) : (
                                <span>
                                  I understand... Maybe another time! 💝
                                </span>
                              )}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareOnWhatsApp}
                            className="w-full py-4 px-6 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-green-200/50 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <Share2 size={24} />
                            <span>Share Response on WhatsApp</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm z-50 ${
          cardStyle.id === "modern" ? "text-white/80" : "text-pink-600/80"
        }`}
      >
        Created with ❤️ by Onario
      </p>
    </div>
  );
};

export default ValentineCard;
