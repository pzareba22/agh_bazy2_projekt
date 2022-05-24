# Aplikacja dla wolontariuszy - AidMate

Projekt jest aplikacją ułatwiającą proces łączenia wolontariuszy z akcjami charytatywnymi organizowanymi przez innych.
Umożliwia ona między innymi:
- Rejestrację użytkownika
- Logowanie użytkownika
- Zapisanie się na daną akcję
- Wypisanie się z danej akcji
- Utworzenie nowej akcji
- Wgląd w innych uczetników danej akcji

## Technologie

-   MongoDB
-   Node JS
-   React Native

### Jak uruchomić projekt?
Potrzebne będą 2 lub 3 instancje terminala. W pierwszej uruchamiamy program `ngrok`, który zwraca nam statyczny adres IP naszego serwera (można użyć jakiejś jego alternatywy). Następnie w pliku `frontend/axiosconfig.js` ustawiamy zmienną `ngrokAddress` na adres IP naszego komputera (w przypadku używania emulatora na tym samym urządzeniu, możemy zamiast tego ustawić zmienną `useNgrokAddress` na false). W drugiej instancji terminala przechodzimy do katalogu `frontend` i wykonujemy polecenie `expo start`. W trzeciej instancji przechodzimy do katalogu `backend` i wykonujemy polecenie `npm start`. Nasza aplikacja powinna w tym momencie działać poprawnie

## Autorzy

Paweł Zaręba


Kamil Bizoń


Bogumiła Papiernik

