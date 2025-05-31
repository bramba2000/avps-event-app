import { action, useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { model } from "../directives/bind";
import { db } from '../db';
import { bookings } from '../schema';
import { sendEmail } from "@netlify/emails";

const createBooking = action(async (formData: FormData) => {
  "use server";

  // Extract form data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const adults = Number(formData.get("adults"));
  const children = Number(formData.get("children"));

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || adults < 1) {
    return {
      success: false,
      error: "Tutti i campi obbligatori devono essere compilati correttamente.",
    };
  } else if (children > 0 && adults < Math.ceil(children / 2)) {
    return {
      success: false,
      error: "Deve esserci almeno un adulto ogni due bambini",
    };
  }

  let reverteBooking = false;
  // Store booking in DB
  try {
    await db.insert(bookings).values({
      firstName,
      lastName,
      email,
      phone,
      adults,
      children,
    });
    reverteBooking = true;
    await sendEmail({
      from: `${firstName} ${lastName} <${email}>`,
      to: `${process.env.CONTACT_EMAIL}`,
      subject: `Nuova prenotazione da ${firstName} ${lastName}`,
      template: "booking",
      parameters: {
        firstName,
        lastName,
        email,
        phone,
        adults,
        children,
      },
    })
    console.log(`Prenotazione ricevuta per ${firstName} ${lastName}, conferma inviata a ${process.env.CONTACT_EMAIL}.`);
  } catch (e) {
    console.error("Errore durante il salvataggio della prenotazione:", e);
    return {
      success: false,
      error: 'Errore durante il salvataggio della prenotazione.',
    };
  }

  return {
    success: true,
    message: `Prenotazione ricevuta per ${firstName} ${lastName}. Attendi la conferma via email (visto l'elevato numero di prenotazioni, potrebbe richiedere qualche giorno).`,
  };
});

export default function Home() {
  // Form state signals
  const [formStore, setStore] = createStore({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
  });

  const submission = useSubmission(createBooking);

  return (
    <main class="min-h-screen flex flex-col items-center justify-center bg-white/80 py-8 px-2">
      <h1 class="text-3xl font-bold text-center mb-8 text-orange-500">
        Prenota il tuo volo con AVPS
      </h1>
      <div class="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-12 md:p-8">
        {/* Event Info */}
        <section class="flex-1 md:max-w-md bg-sky-100/80 rounded-xl p-6 md:p-8 flex flex-col justify-start mb-4 md:mb-0 md:self-stretch">
          <h2 class="text-2xl font-bold text-orange-500 mb-4">
            Dettagli Evento
          </h2>
          <ul class="space-y-2 text-base text-gray-800">
            <li>
              <span class="font-semibold text-orange-400">Data:</span> Domenica
              8 giugno 2025
            </li>
            <li>
              <span class="font-semibold text-orange-400">
                Orario primo volo:
              </span>{" "}
              19:15{" "}
            </li>
            <li>
              <span class="font-semibold text-orange-400">
                Ultima fascia oraria:
              </span>{" "}
              termina alle 21:15
            </li>
            <li>
              <span class="font-semibold text-orange-400">Luogo:</span> Parco di
              Villa Zoja, Via Libertà 74, 20863 Concorezzo (MB), Italia
            </li>
            <li>
              <span class="font-semibold text-orange-400">Pagamento:</span> €10
              a persona, da versare in loco
            </li>
            <li>
              <span class="font-semibold text-orange-400">Capienza:</span> 80
              posti totali, 5 persone (di cui al massimo un bambino sotto i 14
              anni) per fascia oraria
            </li>
          </ul>
          <p class="mt-4 text-orange-400 bg-amber-100 rounded px-3 py-2 font-medium text-sm">
            <span class="font-bold">Attenzione:</span> il volo{" "}
            <span class="font-bold">NON</span> è permesso a persone con disabilità
            fisiche, protesi o gessi o a persone con ridotta mobilità, a persone
            in stato di gravidanza e ai bambini al di sotto dei 5 anni di età.
          </p>
          <h3 class="text-lg font-semibold text-orange-500 mt-6 mb-2">
            Come arrivare
          </h3>
          <ul class="space-y-1 text-base text-gray-800">
            <li>
              <span class="font-semibold text-orange-400">Indirizzo:</span> Via
              Libertà 74, 20863 Concorezzo (MB), Italia
            </li>
            <li>
              <span class="font-semibold text-orange-400">
                Trasporto pubblico:
              </span>{" "}
              Autobus Z321, Z322, Z323, Z315 (fermata centro Concorezzo)
            </li>
            <li>
              <span class="font-semibold text-orange-400">
                Esempio da Milano Porta Garibaldi:
              </span>{" "}
              Treno S8 per Monza, poi Bus Z322 direzione Concorezzo, fermata Via
              Libertà/Villa Zoja (200m a piedi)
            </li>
          </ul>
          <p class="mt-4 bg-[#FFF3E0] text-orange-700 rounded px-3 py-2 font-medium text-sm">
            <span class="font-bold">Nota</span>: La conferma finale dell'evento
            dipenderà dalle condizioni meteo e sarà inviata il giorno
            precedente.
          </p>
        </section>
        {/* Booking Form */}
        <form
          action={createBooking}
          class="flex-1 bg-white rounded-xl p-6 md:p-8 shadow flex flex-col justify-center"
          method="post"
          encoding="multipart/form-data"
        >
          <h1 class="text-2xl font-bold text-orange-500 mb-6">
            Compila l'iscrizione
          </h1>
          <div class="flex flex-col gap-4">
            <div>
              <label
                for="firstName"
                class="block font-medium text-gray-700 mb-1"
              >
                Nome<span class="text-red-600">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                use:model={[
                  () => formStore.firstName,
                  (v) => setStore("firstName", v),
                ]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block font-medium text-gray-700 mb-1"
              >
                Cognome<span class="text-red-600">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                use:model={[
                  () => formStore.lastName,
                  (v) => setStore("lastName", v),
                ]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label for="email" class="block font-medium text-gray-700 mb-1">
                Email<span class="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                use:model={[() => formStore.email, (v) => setStore("email", v)]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label for="phone" class="block font-medium text-gray-700 mb-1">
                Telefono<span class="text-red-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                use:model={[() => formStore.phone, (v) => setStore("phone", v)]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label for="adults" class="block font-medium text-gray-700 mb-1">
                Numero di adulti (≥14)<span class="text-red-600">*</span>
              </label>
              <input
                id="adults"
                name="adults"
                type="number"
                min="1"
                max="8"
                required
                use:model={[
                  () => formStore.adults,
                  (v) => setStore("adults", v),
                ]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label
                for="children"
                class="block font-medium text-gray-700 mb-1"
              >
                Numero di bambini (&lt;14)
              </label>
              <input
                id="children"
                name="children"
                type="number"
                min="0"
                max="8"
                required
                use:model={[
                  () => formStore.children,
                  (v) => setStore("children", v),
                ]}
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
          <Show when={submission.result && submission.result.error}>
            <p class="mt-4 text-red-600 font-medium">
              {submission.result?.error}
            </p>
          </Show>
          <button
            type="submit"
            class="mt-6 w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded transition-colors"
          >
            <Show when={submission.pending} fallback={<span>Prenota ora</span>}>
              <span>Caricamento...</span>
            </Show>
          </button>
          <Show when={submission.result && submission.result.success}>
            <p class="mt-4 text-green-600 font-medium">
              {submission.result?.message}
            </p>
          </Show>
        </form>
      </div>
    </main>
  );
}
