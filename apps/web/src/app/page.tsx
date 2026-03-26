import { FloatingEmoji } from "@/components/FloatingEmoji";
import { HeroCard } from "@/components/HeroCard";

export default function Home() {
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=1084418353562660865&permissions=1099780082806&integration_type=0&scope=bot+applications.commands`;

  const floatingEmojis = [
    "😀",
    "🎉",
    "❤️",
    "👍",
    "🔥",
    "✨",
    "🚀",
    "⭐",
    "💯",
    "⚡",
    "💜",
    "🌟",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent animate-pulse" />

      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingEmojis.map((emoji, index) => (
          <FloatingEmoji key={index} emoji={emoji} index={index} />
        ))}
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl w-full">
          <HeroCard inviteUrl={inviteUrl} />
        </div>
      </div>
    </div>
  );
}
