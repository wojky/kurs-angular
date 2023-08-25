# Kurs Angular (v16, 2023)

autor: [Kamil Wojkowski](https://www.linkedin.com/in/kwojkowski/)

Nie chcę Ci się scrollować? [Idź prosto do spisu lekcji](#lista-lekcji)

## Słowo wstępu

Cześć,
oddaję Ci w ręcę całkowicie bezpłatny kurs Angulara. Dostarczy Ci on nie tylko wiedzy jak budować aplikacje SPA w tym frameworku, ale **ma na celu pokazać szerszy kontekst budowanie aplikacji webowych**. Niezależnie, czy Angular jest Twoim pierwszym wyborem, czy piszesz już w React, Vue czy innym Svelte jestem przekonany, że znajdziesz coś dla siebie.

Osobiście, mimo że najwiecej piszę w Angularze, trzymam się z dala od "wojny frameworków" i wcale nie uważam, że Angular to najlepsze dostępne rozwiązanie na rynku. Takie nie jest. **Na pewno jednak jest skuteczne i bardzo dojrzałe, ze świetną społecznością. Zapewnia też dobrze płatną pracę**.

Doświadczanie różnych technologii pozwala nam widzieć dużo szerszy kontekst, dostrzegać zalety i wady danych rozwiązań, a także pchać nas w kierunku wymyślania co raz to skuteczniejszych rozwiązań. **Mam szczerą nadzieję, że doświadczanie Angulara z tym kursem będzie dla Ciebie takim bodźcem**.

## Co musisz wiedzieć na dzień dobry?

**To nie jest kurs programowania od podstaw!** Zdecydowanie musisz znać **JavaScript** - pobierać dane z API, pracować na kolekcjach, manipulować DOM, znać ogólną charakterystykę języka - oraz **czuć się pewnie z CSS i HTML**. Nadal oczywiście posiłkujemy się dokumentacją, chatem GPT, czy po prostu wyszukiwarką. Chodzi o **znajomość pewnych ogólnych zasad wiążących się z technologiami webowymi oraz programowaniem**.

Musisz też **"liznąć" TypeScript**, wystarczy ogólna wiedza czym różni się on, a bardziej - czym wzbogaca naszego JS'a.

## Czego się nauczysz?

Zależy mi by zbudować pełen gębą kompletny kurs. Przejrzałem bardzo dużo tutoriali Angularowych i brakuje czegoś pokazującą prawdziwą moc frameworka. Nie chcę pokazać wam tylko podstaw, choć o tych będę mówił przez cały czas.

Przez ostatnie 1,5 roku (piszę te słowa w sierpniu 2023) przygotowałem do pracy o charakterze komercyjnym ponad 30 osób, ucząć ich Angulara od zupełnych podstaw, a z samym frameworku mam styczność od 2018 roku. Ten kurs to suma wniosków z pracy komercyjnej oraz moich doświadczeń edukacyjnych. Jestem przekonany, że staniesz się lepszym programistą, gdy go ukończysz!

Odpowiadając na pytanie z nagłówka. Realizowany w ramach kursu projekt szkoleniowy nauczy Cię m.in. pracy z komponentami w oparciu o Standalone API, Routingu w Angularze, mechanizmu Dependency Injection, czym jest content projection, zarządzania stanem aplikacji budując własne Stateful serwisy, a także wykorzystując gotowe rozwiązania jak np. NgRx, poznasz RxJS i programowanie reaktywne, nadchodzącą rewolucję w reaktywności z Angular Signals (v17), dowiesz się jak stworzyć skalowalną architekturę aplikacji, będziesz wiedział jak pracować z mechanizmem detekcji zmian, pisać własne dyrektywy, zarządzać formularzami, poznasz podejście container-presentional oraz będziesz pisał testy jednostkowe do swojej aplikacji.

Brzmi obszernie? Na pewno - **bo taki jest Angular, to kobyła, które out-of-the-box daję nam gotowe rozwiązania**. Zauważ, że nie poruszyliśmy jeszcze kwestii zewnętrznych bibliotek oprócz NgRx'a.

Na dzień dobry starczy tych informacji, jak widzisz jest ambitnie, a tymczasem zakasujemy rękawy i zaczynamy!

## Co budujemy?

Aplikacje do zarządzania projektami (to nie jest kolejna todolista). Będą kreatory zadań, zespołów, tablice kanbanowe i wiele więcej funkcjonalności. Większość z nich schowamy dla zautoryzowanych użytkowników, ale kilku damy publiczny dostęp. Naturalnie będziemy pracować na danych pochodzących z serwera. Także pracy jest dużo!

#### Lista technologii oraz narzędzi (_na dzień 25/08/2023_)

Angular, TypeScript, TailwindCSS, Rest Api, Prettier

## Lista lekcji:

Kliknij w nazwę by przejść by zobaczyć zawartość lekcji

| Lp  | Data publikacji | Tytuł                                                                                                                                     | Wersja |
| --- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | 25/08/2023      | [Konfiguracja projektu, komponenty, template syntax, Standalone API ](#1-konfiguracja-projektu-komponenty-template-syntax-standalone-api) | v16.2  |
| 2   | _01/09/2023_    | Praca na danych z serwera, renderowanie warunkowe                                                                                         | v16.2  |

## Zawartość lekcji

### 1. Konfiguracja projektu, komponenty, template syntax, Standalone API

#### [Link do lekcji](https://youtu.be/sNnKGrLinIA)

Opublikowano: ✅

Repozytorium: ✅

#### Czego się nauczysz?

- instalacja niezbędnych rozszerzeń VSC
- konfiguracja Prettier oraz TailwindCSS
- wstęp do Angular CLI
- tworzenie nowego projektu opartego o Standalone API
- budowa aplikacji Angularowej
- czym jest komponent w Angularze?
- wprowadzenie do template syntax (interpolacja, bindowanie właściwosci oraz eventów, zmienne w template, obiekt `$event`)
- bindowanie konkretnej klasy oraz konkretnego eventu w template
- importowanie zależności komponentu z Standalone API
- wykorzystanie dyrektywy NgFor do pracy na kolekcjach danych
- tworzenie komponentów za pomocą CLI oraz ich użycie
- przekazywanie danych do komponentu (relacja rodzic -> dziecko) za pomocą `@Input()`
- przekazywanie danych z komponentu (relacja dziecko -> rodzic) za pomocą `@Output()` czyli tworzenie własnych customowych eventów

### 2. Praca na danych z serwera, renderowanie warunkowe

#### ~~Link do lekcji~~

Opublikowano: ❌

Repozytorium: ❌

#### Czego się nauczysz?

- TBA
