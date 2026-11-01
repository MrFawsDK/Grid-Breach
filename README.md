# Grid Breach

Blokpuslespil i hacker-stil. Træk brikker ind på et 8×8-bræt, ryd rækker og kolonner og byg chains.

Jeg lavede det, fordi jeg var træt af blokspil med reklamer efter hvert andet spil, og hvor nogle telefoner åbenbart får nemmere brikker end andre. Det her er bare spillet. Ikke andet.

## Hvad der er i det

- 8×8-bræt og tre brikker ad gangen
- 3D-klodser, metalramme og en neon-by i baggrunden
- Glidende træk: brikken løftes op over fingeren og snapper på plads
- Chains, når du rydder flere gange i træk
- BREACH, HACKED, ROOT ACCESS og SYSTEM PWNED, når det går godt
- Synth-lyde og vibration (kan slås fra)
- Virker offline
- Ingen reklamer, ingen tracking, ingen login

## Fair brikker

Brikkerne trækkes fra en fast tabel. Den kan du se i menuen inde i spillet. Det er kun seed'et og brættet, der bestemmer, hvad du får. Din score, hvor længe du har spillet og hvilken telefon du bruger, betyder ingenting.

Hvert spil har et seed, f.eks. `K7RM2Q`. Samme seed giver de samme brikker hos alle, så send dit seed til en ven og se, hvem der får flest point.

De tre brikker du får, kan altid lægges på brættet på en eller anden måde. Nogle gange skal du først rydde en linje for at få plads til den sidste. Spillet tjekker det, før du får brikkerne. Du kan stadig tabe, men så er det fordi du lagde dem dumt.

## Point

- 1 point pr. felt du lægger
- Rydder du flere linjer på én gang, giver det mere: 1 linje = 10, 2 = 30, 3 = 60, 4 = 100
- Det hele ganges med din chain
- Chain'en holder, så længe du rydder noget mindst hvert tredje træk
- Helt tomt bræt: +300

## Installér

**Android:** hent `grid-breach.apk` under [Releases](https://github.com/MrFawsDK/Grid-Breach/releases/latest) og åbn den. Første gang skal du give lov til at installere fra din browser. Nye versioner kan installeres oven i den gamle, så du beholder din rekord.

**iPhone eller browser:** gå ind på https://mrfawsdk.github.io/Grid-Breach/ og vælg "Føj til hjemmeskærm".

## Byg det selv

Hele spillet ligger i `game.html`. Ikoner og skrifttyper ligger i `public/`.

Grafikken (klodser, ramme, logo osv.) bliver tegnet af `tools/art.html`. Vil du ændre farver eller former, så ret der og kør `node tools/render-art.mjs`. Så bliver PNG'erne i `public/art/` lavet igen. Det kræver Firefox.

```bash
npm install
npm run build
```

Det laver web-appen i `app/`. Når der bliver pushet til `main`, bygger GitHub selv en ny APK og opdaterer web-versionen.

`signing/debug.keystore` er en almindelig debug-nøgle (koden er `android`), så nye builds kan installeres oven i de gamle. Den er ikke hemmelig.

Skrifttyper: Chakra Petch og JetBrains Mono (SIL Open Font License).

Lavet af [MrFawsDK](https://github.com/MrFawsDK).
