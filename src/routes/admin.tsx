import { ErrorBoundary, For, Show } from "solid-js";
import { db } from "../db";
import { bookings } from "../schema";
import { createAsync, query, RouteDefinition, action } from "@solidjs/router";
import { eq } from "drizzle-orm";

const getBookings = query(async () => {
    "use server";
    
    try {
        const result = await db.select().from(bookings);
        return result;
    } catch (error) {
        console.error("Errore durante il recupero delle prenotazioni:", error);
        return [];
    }
    }, "bookings");

const deleteBooking = action(async (formData: FormData) => {
  "use server";
  const id = Number(formData.get("id"));
  try {
    await db.delete(bookings).where(eq(bookings.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error: "Errore durante l'eliminazione." };
  }
});

export const route = {
    preload: () => getBookings(),
} satisfies RouteDefinition;

export default function AdminDashboard() {
  const bookings = createAsync(() => getBookings())

  return (
    <main class="min-h-screen flex flex-col items-center bg-white/80 py-8 px-2">
      <div class="w-full flex flex-col md:flex-row items-start gap-8">
        {/* Event Info Card */}
        {/* Bookings Table Card */}
        <div class="flex-1 flex flex-col items-center w-full">
          <h1 class="text-3xl font-bold text-center mb-8 text-orange-500">Prenotazioni</h1>
          <div class="bg-sky-100/80 rounded-xl p-6 md:p-8 shadow flex flex-col w-min items-center">
            <ErrorBoundary fallback={(error) => (
              <div class="bg-red-100 text-red-800 p-4 rounded">
                <h2 class="font-bold">Errore durante il caricamento delle prenotazioni</h2>
                <p>{error.message}</p>
              </div>
            )}>
                <table class="block w-full min-w-[700px] bg-white border border-gray-200 rounded-2xl shadow-lg text-center p-4" style="border-collapse:separate;border-spacing:0;">
                  <thead>
                    <tr class="bg-orange-100">
                      <th class="px-4 py-3 text-orange-500">Nome</th>
                      <th class="px-4 py-3 text-orange-500">Cognome</th>
                      <th class="px-4 py-3 text-orange-500">Email</th>
                      <th class="px-4 py-3 text-orange-500">Telefono</th>
                      <th class="px-4 py-3 text-orange-500">Adulti</th>
                      <th class="px-4 py-3 text-orange-500">Bambini</th>
                      <th class="px-4 py-3 text-orange-500">Data Prenotazione</th>
                      <th class="px-4 py-3 text-orange-500">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={bookings()}>{(b) => (
                      <tr class="border-t hover:bg-orange-50">
                        <td class="px-4 py-3 text-gray-800">{b.firstName}</td>
                        <td class="px-4 py-3 text-gray-800">{b.lastName}</td>
                        <td class="px-4 py-3 text-gray-800">{b.email}</td>
                        <td class="px-4 py-3 text-gray-800">{b.phone}</td>
                        <td class="px-4 py-3 text-gray-800">{b.adults}</td>
                        <td class="px-4 py-3 text-gray-800">{b.children}</td>
                        <td class="px-4 py-3 text-gray-800">{new Date(b.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</td>
                        <td class="px-4 py-3">
                          <form method="post" action={deleteBooking.url}>
                            <input type="hidden" name="id" value={b.id} />
                            <button type="submit" title="Elimina" class="hover:bg-red-100 rounded p-1">
                              <span class="text-red-500 text-xl font-bold leading-none">×</span>
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}</For>
                  </tbody>
                </table>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </main>
  );
}
