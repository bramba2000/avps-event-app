import { createSignal } from "solid-js";

export default function Home() {
  // Form state signals
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [adults, setAdults] = createSignal(1);
  const [children, setChildren] = createSignal(0);

  // Placeholder for form submission handler
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // TODO: Implement booking logic
  };

  return (
    <main class="min-h-screen flex flex-col items-center justify-center bg-white/80 py-8 px-2">
      <h1 class="text-3xl font-bold text-center mb-8 text-orange-500">Prenota il tuo volo con AVPS</h1>
      <div class="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-12 md:p-8">
        {/* Event Info */}
        <section class="flex-1 md:max-w-md bg-sky-100/80 rounded-xl p-6 md:p-8 flex flex-col justify-center mb-4 md:mb-0">
          <h2 class="text-2xl font-bold text-orange-500 mb-4">Dettagli Evento</h2>
          <ul class="space-y-2 text-base text-gray-800">
            <li><span class="font-semibold text-orange-400">Data:</span> Domenica 8 giugno 2025</li>
            <li><span class="font-semibold text-orange-400">Orario primo volo:</span> 18:30 </li>
            <li><span class="font-semibold text-orange-400">Ultima fascia oraria:</span> termina alle 19:33</li>
            <li><span class="font-semibold text-orange-400">Luogo:</span> Parco di Villa Zoja, Via Libertà 74, 20863 Concorezzo (MB), Italia</li>
            <li><span class="font-semibold text-orange-400">Pagamento:</span> €10 a persona, da versare in loco</li>
            <li><span class="font-semibold text-orange-400">Capienza:</span> 80 posti totali, 8 persone per fascia oraria (10 fasce da 7 minuti ciascuna)</li>
          </ul>
          <h3 class="text-lg font-semibold text-orange-400 mt-6 mb-2">Come arrivare</h3>
          <ul class="space-y-1 text-base text-gray-800">
            <li><span class="font-semibold text-orange-400">Indirizzo:</span> Via Libertà 74, 20863 Concorezzo (MB), Italia</li>
            <li><span class="font-semibold text-orange-400">Trasporto pubblico:</span> Autobus Z321, Z322, Z323, Z315 (fermata centro Concorezzo)</li>
            <li><span class="font-semibold text-orange-400">Esempio da Milano Porta Garibaldi:</span> Treno S8 per Monza, poi Bus Z322 direzione Concorezzo, fermata Via Libertà/Villa Zoja (200m a piedi)</li>
          </ul>
          <p class="mt-4 bg-[#FFF3E0] text-orange-700 rounded px-3 py-2 font-medium text-sm"><span class="font-bold">Nota</span>: La conferma finale dell'evento dipenderà dalle condizioni meteo e sarà inviata il giorno precedente.</p>
        </section>
        {/* Booking Form */}
        <form onSubmit={handleSubmit} class="flex-1 bg-white rounded-xl p-6 md:p-8 shadow flex flex-col justify-center">
          <h1 class="text-2xl font-bold text-orange-500 mb-6">Compila l'iscrizione</h1>
          <div class="flex flex-col gap-4">
            <div>
              <label for="firstName" class="block font-medium text-gray-700 mb-1">Nome<span class="text-red-600">*</span></label>
              <input id="firstName" type="text" required value={firstName()} onInput={e => setFirstName(e.currentTarget.value)} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
            <div>
              <label for="lastName" class="block font-medium text-gray-700 mb-1">Cognome<span class="text-red-600">*</span></label>
              <input id="lastName" type="text" required value={lastName()} onInput={e => setLastName(e.currentTarget.value)} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
            <div>
              <label for="email" class="block font-medium text-gray-700 mb-1">Email<span class="text-red-600">*</span></label>
              <input id="email" type="email" required value={email()} onInput={e => setEmail(e.currentTarget.value)} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
            <div>
              <label for="phone" class="block font-medium text-gray-700 mb-1">Telefono<span class="text-red-600">*</span></label>
              <input id="phone" type="tel" required value={phone()} onInput={e => setPhone(e.currentTarget.value)} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
            <div>
              <label for="adults" class="block font-medium text-gray-700 mb-1">Numero di adulti (≥14)<span class="text-red-600">*</span></label>
              <input id="adults" type="number" min="1" max="8" required value={adults()} onInput={e => setAdults(Number(e.currentTarget.value))} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
            <div>
              <label for="children" class="block font-medium text-gray-700 mb-1">Numero di bambini (&lt;14)</label>
              <input id="children" type="number" min="0" max="8" value={children()} onInput={e => setChildren(Number(e.currentTarget.value))} class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-400" />
            </div>
          </div>
          <button type="submit" class="mt-6 w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded transition-colors">Prenota ora</button>
        </form>
      </div>
    </main>
  );
}
