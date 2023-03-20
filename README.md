# Petriflow documentation

Dokumentácia pre Petriflow low-code language je implementovaná pomocou Markdown súborov a kompilovaná pomocou
frameworku docusaurus.

Dokumentácia je rozdelená do niekoľkých priečinkov podľa sekcii:

| Priečinok  | Sekcia       | Popis                                                                                         |
|------------|--------------|-----------------------------------------------------------------------------------------------|
| docs       | Dokumentácia | Hlavná dokumentácia (technickejšieho charakteru.                                              |
| action-api | Actions API  | Technické zdokumentovanie programového API pre akcie.                                         |
| examples   | Examples     | Súhrn príkladov rôznych use caseov, mali by to byť ucelené príklady.                          |
| guides     | Guidelines   | Coockbook / Petriflow kniha. Slovom vysvetlené rôzne použitia a úryvky ako a čo sa dá použiť. |
| community  | Community    | Inštrukcie pre komunitu. Nahlasovanie rozšírení. Riadenie príspevkov a pod.                   |
| blog       | News         | Novinky o verziách, o návodoch či udalostí v komunite.                                        |

Každá sekcia je vedená ako samostatný dokumentácia v vlastným indexovaným menu (sidebar). Každá sekcia má prelinkovanie
s hornou lištou stránky.

Pre tvorenie obsahu pre danú sekciu stačí vložiť MD súbor do príslušného priečinku sekcie. Podpriečinok v sekcii predstavuje
kategóriu v rámci sekcie, ktorá má byť zobrazená v bočnom menu (sidebar) sekcie. Súbory v kategórii sú automaticky indexované.
Pre definovanie dokumentu pre kategóriu je potrebné MD súbor pomenovať rovnako ako je názov kategórie. Vlastnosti kategórie
je možné upravovať vložením súboru `_category_.json` (tak ako je napríklad v už pripraveným kategóriách).
Sekcie majú predpripravené kategórie pre rozdelenie obsahu. Kategórie však môžu byť ľubolvne menené, čo pridávané.

! Prosím neupravujte nastavenie projektu či konfiguračné súbory mimo sekcií obsahu v tomto projekte. !

## Sekcie

### docs

Hlavná dokumentácia jazyk. Vysvetlenie konceptov a častí jazyka.

Kategórie:

- Introduction (súbor intro.md)
- Core Concepts
    - Process
    - Petri Net
    - Data
    - Role
    - Event & Actions
- Data fields
    - Layouts
- Roles & permissions
- Actions
    - Events
    - Functions
- Filters & Search
- Extensions (možnosti rozširovania jazyka a, ako ich implementovať)

### action-api

Technická špecifikácia API poskytnuté jazykom pre využitie v akciách.
Akcie by mali byť napísané systémom 1 akcia na md súbor.
Z veľkej časti vieme prepoužiť čo už máme.

V budúcnosti by to mohlo byť buildované automatizovane z nejakej xml definície, z ktorej by sa generoval autocomplete
do buildera a action delegate v engine.

### examples

Jednoduché stručné príklady použitia jazyka.
Zahrnúť tie príklad, ktoré už máme.

### guides

Detailne vysvetlené štruktúry, koncepty, kúsky rôznych použití jazyka.
Pôvodne myslené formou akou Gabo chce písať knihu.

### community

- Nahlasovanie chýb a žiadostí o rozšírenie.
- Ako prispieť k rozvoju jazyka.
- Rozvoj komunity

### blog

- novinky o verziách a obsahu stránky
- novinky z komunity

## Spustenie

Pri prvotnom spustení je potrebné nainštalovať všetky dependencies príkazom `npm install`

Následne je možné spustiť aplikáciu pre lokálny development pomocou príkazu `npm run start`,
alebo spustením skriptu _start_ v súbore [package.json](package.json). Následne sa spustí
lokálny webový server obsluhujúci dokumentáciu. Stránka je dostupná na `http://localhost:3000` 
a je refreshovaná automaticky pre zmene obsahu dokumentácie.

