# World Clock
## Project beskrivning
projektet är en världsklocka byggd med React och TypeScript. Applikationen låter användaren hålla reda på lokal tid i olika städer runt om i världen. Man kan välja städer från en färdig lista eller lägga till egna städer med tidszoner. Varje stad kan visas digitalt och sparas i localStorage så att de kommer tillbaka när sidan laddas igen. Webbplatsen är responsiv och fungerar på olika skärmstorlekar.

## Funktioner
* Lägg till en stad från en lista med vanliga städer eller ange en egen stad och tidszon.
* Visa tiden digitalt (HH:MM:SS)
* Valda städer sparas i webbläsarens localStorage, vilket behåller data även när man laddar om webbläsaren.
* Responsiv design som fungerar på mobil, surfplatta och desktop.

## Installation
* Clone repository and install dependencies

``` Bash
git clone
cd
npm install
```
* Start server
``` Bash
npm start
```
## Kodstruktur
* App tsx: Huvudkomponenten laddar in sparade städer från localStorage vid start och uppdaterar lagringen när användarlistan ändras.
* HomePage.tsx: Startsidan där användaren lägger till eller tar bort städer. Den använder selectedCities och availableCities samt visar digitala tider med toLocaleTimeString.
* types.ts: Definierar City-interface och ClockSettings med sträng-literaltyper för tidszoner.
* cityTimezones.json: JSON-fil med fördefinierade städer, tidszoner och länder.

## User stories
* Som användare vill jag kunna lägga till en stad från en lista för att snabbt se tiden i en vanlig storstad.
* Som användare vill jag att mina valda städer sparas mellan besök så att jag slipper välja dem varje gång.
* Som användare vill jag kunna ange min egen stad och tidszon för att kunna följa tiden i mindre orter.
