import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Heart,
  Loader2,
  Music,
  Sparkles,
  Upload,
  VolumeX,
  X,
} from "lucide-react";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import backgroundMusic from "../assets/sounds/romantic-piano.wav";
import { useAudioAutoplay } from "../hooks/useAudioAutoplay";
import { CardStyle, cardStyles, ColorTheme, colorThemes } from "../types/card";
import HeartLoader from "./HeartLoader";
import Rose from "./Rose";

const CreateCard = () => {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying, toggleMusic } = useAudioAutoplay("background-music");
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>(cardStyles[0]);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(
    colorThemes[0]
  );

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", IMGBB_API_KEY);

      const response = await fetch(`https://api.imgbb.com/1/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImage(data.data.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: {
      opacity: isLoading ? 0 : 1,
      transform: isLoading ? "translateY(30px)" : "translateY(0px)",
    },
    config: { tension: 280, friction: 20 },
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.append("sender", sender);
    params.append("recipient", recipient);
    params.append("message", message);
    params.append("style", selectedStyle.id);
    params.append("theme", selectedTheme.id);
    if (image) params.append("image", image);

    const shareUrl = `${baseUrl}/view?${params.toString()}`;
    setShareLink(shareUrl);
  };

  const handleOpenShareModal = () => {
    generateShareLink();
    setShowModal(true);
  };

  const renderStyleSelector = () => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Choose a Card Style
      </label>
      <div className="grid grid-cols-3 gap-4">
        {cardStyles.map((style) => (
          <motion.div
            key={style.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStyle(style)}
            className={`relative rounded-xl overflow-hidden cursor-pointer ${
              selectedStyle.id === style.id
                ? "ring-2 ring-pink-500 ring-offset-2"
                : "hover:ring-1 hover:ring-pink-300"
            }`}
          >
            <div
              className={`aspect-w-4 aspect-h-3 bg-gradient-to-br ${style.bgColor}`}
            >
              <div className="p-4 flex flex-col items-center justify-center">
                <Heart
                  className={`w-8 h-8 ${style.textColor}`}
                  fill="currentColor"
                />
                <p className={`text-xs font-medium mt-2 ${style.textColor}`}>
                  {style.name}
                </p>
              </div>
            </div>
            {selectedStyle.id === style.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-pink-500/10 flex items-center justify-center"
              >
                <div className="bg-white rounded-full p-1">
                  <Check className="w-4 h-4 text-pink-500" />
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-gray-500 italic">
        {selectedStyle.description}
      </p>
    </div>
  );

  const renderColorSelector = () => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Choose Your Colors
      </label>
      <div className="grid grid-cols-5 gap-3">
        {colorThemes.map((theme) => (
          <motion.button
            key={theme.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTheme(theme)}
            className={`relative rounded-xl overflow-hidden h-20 ${
              selectedTheme.id === theme.id
                ? "ring-2 ring-pink-500 ring-offset-2"
                : "hover:ring-1 hover:ring-pink-300"
            }`}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${theme.background}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.primary} opacity-20`}
              />
            </div>
            {selectedTheme.id === theme.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <Check className="w-6 h-6 text-white drop-shadow" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
      <p className="text-sm text-gray-500 italic">
        {selectedTheme.name} - Perfect for expressing your feelings
      </p>
    </div>
  );

  return (
    <>
      {isLoading && <HeartLoader onAnimationComplete={handleLoadingComplete} />}
      <div
        className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 ${
          isLoading ? "hidden" : ""
        }`}
      >
        <div className="rain"></div>
        <div className="falling-flowers"></div>

        <audio
          id="background-music"
          loop
          src={backgroundMusic}
          autoPlay
          muted={false}
          playsInline
        />

        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={toggleMusic}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            {isPlaying ? (
              <Music size={24} className="text-pink-600" />
            ) : (
              <VolumeX size={24} className="text-pink-600" />
            )}
          </button>
        </div>

        <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
          <animated.div style={formAnimation} className="max-w-md w-full">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-pink-200/50 transition-shadow duration-300">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Rose />
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-pink-400" />
                  </motion.div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent dancing-script">
                  Create Your Valentine Card
                </h1>
              </motion.div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-pink-100 placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 outline-none"
                        placeholder="Your Name"
                      />
                    </motion.div>
                  </div>
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-pink-100 placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 outline-none"
                        placeholder="Their Name"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full"
                  >
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-pink-100 placeholder-gray-400 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 h-32 resize-none outline-none"
                      placeholder="Write your heartfelt message..."
                    />
                  </motion.div>
                </div>

                <div className="relative">
                  {image ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative rounded-xl overflow-hidden h-40 group"
                    >
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        initial={{ backgroundColor: "rgba(239, 68, 68, 0.9)" }}
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2 p-2 rounded-full text-white backdrop-blur-sm opacity-100 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.label
                      whileHover={{ scale: 1.02, borderColor: "#ec4899" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center h-24 border-2 border-dashed border-pink-200 rounded-xl cursor-pointer bg-pink-50/30 transition-colors duration-300 hover:bg-pink-50/50"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      {uploading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Loader2 className="text-pink-500" />
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <Upload size={24} className="text-pink-400" />
                          <span className="text-sm font-medium">
                            Add a Special Photo
                          </span>
                        </div>
                      )}
                    </motion.label>
                  )}
                </div>

                {renderStyleSelector()}
                {renderColorSelector()}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ boxShadow: "0 2px 10px rgba(236, 72, 153, 0)" }}
                  onClick={handleOpenShareModal}
                  disabled={!sender || !recipient}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    !sender || !recipient
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95"
                  }`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="text-white" />
                  </motion.div>
                  <span className="text-white font-medium">
                    Create Your Valentine's Card
                  </span>
                </motion.button>
              </form>
            </div>
          </animated.div>

          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 20, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
                >
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                        Share Your Valentine's Card ✨
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Send this link to {recipient} to view your special
                        message
                      </p>
                    </div>

                    <div className="bg-pink-50/50 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-pink-600">
                        <Heart size={16} className="fill-current" />
                        <p className="text-sm font-medium">Card Preview</p>
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>
                          From: <span className="font-medium">{sender}</span>
                        </p>
                        <p>
                          To: <span className="font-medium">{recipient}</span>
                        </p>
                        <p className="line-clamp-2 italic">"{message}"</p>
                        {image && (
                          <p className="text-pink-500 text-xs">
                            ✓ Includes a special photo
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm text-gray-600 font-medium">
                        Share Link
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={shareLink}
                          readOnly
                          className="flex-1 p-3 rounded-xl bg-gray-50 text-sm border border-gray-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        />
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#db2777",
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            await navigator.clipboard.writeText(shareLink);
                            alert("Link copied to clipboard!");
                          }}
                          className="p-3 bg-pink-500 text-white rounded-xl shadow-lg hover:shadow-pink-200 flex items-center gap-2"
                        >
                          <Copy size={20} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-700">
                        What happens next?
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-pink-100 rounded-full p-1">
                            <Heart size={12} className="text-pink-500" />
                          </div>
                          <span>Share this link with {recipient}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-pink-100 rounded-full p-1">
                            <Heart size={12} className="text-pink-500" />
                          </div>
                          <span>
                            They'll see your message and can choose to accept or
                            decline
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 bg-pink-100 rounded-full p-1">
                            <Heart size={12} className="text-pink-500" />
                          </div>
                          <span>You'll be notified of their response</span>
                        </li>
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default CreateCard;
