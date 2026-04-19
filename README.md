# Billettlyst

En moderne nettapplikasjon for å oppdage og utforske konserter, festivaler og arrangementer drevet av Ticketmaster API og Sanity CMS.

---

## Om prosjektet

Billettlyst lar brukere søke etter arrangementer etter by og kategori, den den lagrer favoritter i en ønskeliste og holde oversikt over kjøpte billetter Applikasjonen henter sanntidsdata fra Ticketmaster og kombinerer det med innhold og brukerhåndtering via Sanity.

---

## Teknologistack

| Teknologi                  | Formål                            |
| -------------------------- | --------------------------------- |
| React 19                   | Frontend-rammeverk                |
| Vite 7                     | Byggverktøy og dev-server         |
| React Router v7            | Klient-side routing               |
| Sanity                     | Headless CMS og brukerdatalagring |
| Ticketmaster Discovery API | Arrangementsdata i sanntid        |
| SCSS                       | Styling                           |
| Lucide React               | Ikonbibliotek                     |

---

## Kom i gang

### Krav

- Node.js 18+
- npm
- Ticketmaster API-nøkkel ([developer.ticketmaster.com](https://developer.ticketmaster.com))
- Sanity-prosjekt med tilhørende `projectId` og `dataset`

### Installasjon

1. Klon repoet:

```bash
git clone https://github.com/<ditt-brukernavn>/Ticketmaster-billettlyst.git
cd Ticketmaster-billettlyst
```

2. Installer avhengigheter:

```bash
npm install
```

3. Opprett en `.env`-fil basert på malen:

```bash
cp .env.example .env
```

4. Fyll inn miljøvariabler i `.env`:

```env
VITE_TICKETMASTER_API_KEY=din_api_nokkel_her
```

5. Start utviklingsserveren:

```bash
npm run dev
```

Applikasjonen er nå tilgjengelig på `http://localhost:5173`.

---

### Sanity Studio (valgfritt)

For å kjøre Sanity Studio lokalt:

```bash
cd billettlyst-sanity
npm install
npm run dev
```

---

## Tilgjengelige skript

| Kommando          | Beskrivelse                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start lokal utviklingsserver med HMR |
| `npm run build`   | Bygg applikasjonen for produksjon    |
| `npm run preview` | Forhåndsvis produksjonsbygget        |
| `npm run lint`    | Kjør ESLint                          |

---

## Prosjektstruktur

```
Ticketmaster-billettlyst/
├── billettlyst-sanity/      # Sanity Studio og skjemadefinisjoner
│   └── schemaTypes/         # Event- og brukerskjemaer
├── src/
│   ├── components/          # React-komponenter
│   ├── services/            # API-integrasjoner (Ticketmaster + Sanity)
│   ├── constants/           # Kategorier, byer, land osv.
│   ├── styles/              # SCSS-stilark
│   └── main.jsx             # Applikasjonens inngang
├── public/                  # Statiske filer
├── .env.example             # Mal for miljøvariabler
└── vite.config.js           # Vite-konfigurasjon med API-proxy
```

---

## Funksjonalitet

- Bla gjennom arrangementer etter by (Oslo, Stockholm m.fl.)
- Filtrer etter kategori (musikk, sport, teater osv.)
- Se detaljert arrangementsinformasjon
- Legg arrangementer til ønskeliste
- Se kjøpshistorikk via brukerdashboard
- Festivalanbefalinger på forsiden

---

## Miljøvariabler

| Variabel                    | Beskrivelse                                  |
| --------------------------- | -------------------------------------------- |
| `VITE_TICKETMASTER_API_KEY` | API-nøkkel fra Ticketmaster Developer Portal |

Sanity-konfigurasjon (`projectId` og `dataset`) er satt direkte i `src/services/client.js`.

---

## Lisens

Dette prosjektet er utviklet som en del av et universitetskurs ved UIN.
