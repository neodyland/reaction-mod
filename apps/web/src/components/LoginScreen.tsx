import { signIn } from "@mikandev/next-discord-auth/server-actions";
import { FaDiscord } from "react-icons/fa";
import "@/lib/auth";

export function LoginScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
      <div className="card bg-base-100 shadow-2xl max-w-lg">
        <div className="card-body text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <FaDiscord className="h-12 w-12 text-primary" />
          </div>
          <h1 className="card-title text-3xl justify-center">
            Sign In Required
          </h1>
          <p className="text-base-content/70">
            Please sign in with Discord to access your server settings.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit" className="btn btn-primary btn-wide">
              Sign in with Discord
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
