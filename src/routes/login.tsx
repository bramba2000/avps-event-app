import { action, redirect, useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { model } from "../directives/bind"; // Assuming you have a similar model directive
import { useSession } from "vinxi/http";

type SessionData = {
    username: string;
}

// Placeholder for login action
const loginUser = action(async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: Implement actual authentication logic here
  console.log("Login attempt:", email, password);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Placeholder response
  if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PSWD) {
    const session = await useSession<SessionData>({
        password: process.env.SESSION_SECRET!,
        name: "AVPS",
    });

    if (!session.data.username) {
      await session.update({
        username: email,
      });
    }

    return redirect("/admin");
  } else {
    return { success: false, error: "Invalid email or password." };
  }
});

export default function LoginPage() {
  const [formStore, setStore] = createStore({
    email: "",
    password: "",
  });

  const submission = useSubmission(loginUser);

  return (
    <main class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
      <div class="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
        <h1 class="text-2xl font-bold text-center text-orange-500 mb-6">
          Accedi
        </h1>
        <form
          action={loginUser}
          method="post"
          class="space-y-6"
        >
          <div>
            <label for="email" class="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              use:model={[() => formStore.email, (v) => setStore("email", v)]}
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              placeholder="iltuo@esempio.com"
            />
          </div>
          <div>
            <label for="password" class="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              use:model={[
                () => formStore.password,
                (v) => setStore("password", v),
              ]}
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              placeholder="********"
            />
          </div>
          <Show when={submission.result && submission.result.error}>
            <p class="text-red-600 font-medium">
              {submission.result?.error}
            </p>
          </Show>
          <button
            type="submit"
            class="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded transition-colors"
            disabled={submission.pending}
          >
            <Show when={submission.pending} fallback={<span>Accedi</span>}>
              <span>Caricamento...</span>
            </Show>
          </button>
        </form>
      </div>
    </main>
  );
}
