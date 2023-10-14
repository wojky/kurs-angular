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
| 2   | 01/09/2023      | [Praca na danych z serwera, renderowanie warunkowe](#2-praca-na-danych-z-serwera-renderowanie-warunkowe)                                  | v16.2  |
| 3   | 16/09/2023      | [Pełny CRUD, wydzielanie odpowiedzialności, serwisy w Angularze](#3-pełny-crud-wydzielanie-odpowiedzialności-serwisy-w-angularze)         | v16.2  |
| 4   | 30/09/2023      | [Struktura plików w projekcie oraz custom paths w TypeScript](#4-struktura-plików-w-projekcie-oraz-custom-paths-w-typescript)             | v16.2  |
| 5   | 14/10/2023      | [Naprawiamy bugi i wyciąganie komponentu zadania](#5-naprawiamy-bugi-wyciąganie-komponentów-oraz-idea-pipeów)                             | v16.2  |
| 6   | 19/10/2023      | [Angular Pipes](#6-angular-pipes)                                                                                                         | v16.2  |

## Zawartość lekcji

### 1. Konfiguracja projektu, komponenty, template syntax, Standalone API

#### [Link do lekcji](https://youtu.be/sNnKGrLinIA)

Opublikowano: ✅ (01/09/2023)

Repozytorium: ✅

#### Czego się nauczysz?

- zainstalujesz niezbędne rozszerzenia VSC
- konfiguracji Prettier oraz TailwindCSS
- podstawy Angular CLI
- tworzenia nowego projektu opartego o Standalone API
- budowania aplikacji Angularowej
- czym jest komponent w Angularze?
- wprowadzenia do template syntax (interpolacja, bindowanie właściwosci oraz eventów, zmienne w template, obiekt `$event`)
- bindowania konkretnej klasy CSS oraz konkretnego eventu w template
- importowania zależności komponentu z Standalone API
- wykorzystania dyrektywy NgFor do pracy na kolekcjach danych
- tworzenia komponentów za pomocą CLI oraz ich użycia
- przekazywania danych do komponentu (relacja rodzic -> dziecko) za pomocą `@Input()`
- przekazywania danych z komponentu (relacja dziecko -> rodzic) za pomocą `@Output()` czyli tworzenie własnych customowych eventów

### 2. Praca na danych z serwera, renderowanie warunkowe

#### [Link do lekcji](https://www.youtube.com/watch?v=vO5jIhKTaHc)

Opublikowano: ✅ (01/09/2023)

Repozytorium: ✅

#### Czego się nauczysz?

- jak zbudować mockowy serwer lokalny, by móc pracować z API, za pomocą biblioteki [`json-server`](https://github.com/typicode/json-server)
- pracy na danych asynchronicznych z Angularem
- jak obsługiwać różne stany komponentu? (ładowanie danych/błąd/sukces)?
- jakie są ograniczenia w typowaniu danych przychodzących z API
- zawężanie typów w TS
- zawężania typów z `discriminated unions`` pomaga nam uniknąć bugów?
- wyświetlania warunkowego elementów w oparciu o logikę komponentu
- wykorzystania `ng-template` z dyrektywą `NgIf`

### 3. Pełny CRUD, wydzielanie odpowiedzialności, serwisy w Angularze

#### [Link do lekcji](https://youtu.be/BDjDGdghC2I)

Opublikowano: ✅ (16/09/2023)

Repozytorium: ✅

#### Czego się nauczysz?

- "odchudzania" komponentów czyli wydzielaniu odpowiedzialności do dedykowanych funkcji/klas
- dlaczego warto używać metody cyklu zycia `ngOnInit` zamiast konstruktora?
- wykorzystania typów generycznych
- jaka idea stoi za serwisami?
- dekoratora `@Injectable`
- wstrzykiwania zależności Angularowych za pomocą konstruktora oraz metody `inject`

### 4. Struktura plików w projekcie oraz custom paths w TypeScript

#### [Link do lekcji](https://www.youtube.com/watch?v=AyWOMp-xlkk)

Opublikowano: ✅ (30/09/2023)

Repozytorium: ✅

#### Nauczysz się:

- dlaczego warto dbać o strukturę plików i katalogów w projekcie
- jak nazewnictwo plików pomaga nam w nawigacji po projekcie
- w jaki sposób IDE pomaga nam ogarnąć refaktor katalogów
- dostrzegać różnicę między plikami domenowymi, a plikami bezkontekstowymi
- budować własne ścieżki dostępu do plików dzięki `TypeScript paths`

### 5. Naprawiamy bugi oraz wyciągamy komponent elementu listy

#### [Link do lekcji](https://www.youtube.com/watch?v=eLE4Fiylx9M)

Opublikowano: ✅ (14/10/2023)

Repozytorium: ✅

#### Nauczysz się:

- naprawiać bugi w kodzie
- wyciągać komponenty z istniejącego kodu
- myśleć jak programita podczas tworzenia nowych funkcjonalności
- wydzielać odpowiedzialności dla poszczególnych komponentów

### 6. Angular Pipes

#### [Link do lekcji](https://www.youtube.com/watch?v=-PKlnEknyGE)

Opublikowano: ✅ (19/10/2023)

Repozytorium: ✅

#### Nauczysz się:

- jaki jest problem z wywoływaniem metod w templatkach
- czym są Angularowe rury czyli pipe
- jak rozwiązać problem nadrmienych wywołań za pomocą memoizacji w pipe
- przeglądarkowego API `Intl` do zarządzania datami w przyjemniejszy sposób
