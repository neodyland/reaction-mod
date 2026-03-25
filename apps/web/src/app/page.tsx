import Logo from "@/assets/logo.png"
import Image from "next/image";

export default function Home() {
  const inviteUrl = `https://discord.com/oauth2/authorize?client_id=1084418353562660865&permissions=1099780082806&integration_type=0&scope=bot+applications.commands`;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <Image src={Logo.src} alt="Reaction Moderator Logo" width={200} height={200} className="mx-auto mt-8 rounded-md size-1/8" />
        <div className="card-body items-center text-center space-y-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Reaction Moderator
          </h1>
          <p className="text-xl text-base-content/80">
            Add the bot and run <code className="badge badge-primary">/settings</code> to get started!
          </p>
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg mt-4"
          >
            Invite Bot to Discord
          </a>
        </div>
      </div>
    </div>
  );
}
