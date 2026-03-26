import { signIn } from "@mikandev/next-discord-auth/server-actions";
import "@/lib/auth";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950">
      <div className="card bg-base-100 shadow-2xl max-w-lg">
        <div className="card-body text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-error/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="card-title text-3xl justify-center">
            Unauthorized Access
          </h1>
          <p className="text-base-content/70">
            You don't have permission to access this resource. Please sign in
            with the Discord account that initiated the settings command.
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
