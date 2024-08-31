# opis aplikacije

 Ova aplikacija   predstavlja sveobuhvatno rešenje za upravljanje i interakciju sa sadržajem na forumu, sa posebnim naglaskom na različite uloge korisnika, kao što su obični korisnici, moderatori i administratori. Glavne funkcionalnosti ove aplikacije uključuju registraciju novih korisnika, prijavu na sistem, pregled, kreiranje, uređivanje i brisanje objava, kao i interakciju sa objavama putem komentara i lajkovanja. Pored osnovnih funkcija za korisnike, aplikacija omogućava moderatorima i administratorima da upravljaju sadržajem i korisnicima na forumu, pružajući im alate za održavanje reda i pregled ključnih statistika koje se odnose na aktivnost korisnika.
Registracija i prijava predstavljaju osnovne funkcionalnosti aplikacije, omogućavajući korisnicima da se prijave na forum i koriste sve dostupne opcije. Korisnici mogu da kreiraju nove naloge putem forme za registraciju, gde unose osnovne podatke kao što su ime, email adresa i lozinka. Nakon uspešne registracije, korisnik može da se prijavi na sistem. Proces prijave uključuje unos email adrese i lozinke, koje se zatim šalju serveru radi autentifikacije. Ako su uneseni podaci tačni, korisnik dobija autentifikacioni token koji se čuva u sessionStorage, čime se omogućava korišćenje zaštićenih funkcionalnosti aplikacije.
Jedna od ključnih funkcionalnosti aplikacije je rad sa objavama. Korisnici mogu da pregledaju objave, filtriraju ih prema različitim kriterijumima kao što su tema, datum objave i tekstualni sadržaj, kao i da sortiraju objave po vremenu kreiranja. Za svaku objavu je dostupan prikaz osnovnih informacija kao što su autor objave, tema, sadržaj, kao i priložene slike. Korisnici mogu dodavati nove objave, uz mogućnost priloženja slika i dodatnih informacija. Prilikom kreiranja novih objava, koriste se formulari koji omogućavaju unos podataka i njihovo slanje serveru putem HTTP POST zahteva. Nakon uspešnog kreiranja, nova objava se automatski dodaje na vrh liste, omogućavajući trenutni pregled bez potrebe za osvežavanjem stranice.
Pored pregleda liste objava, korisnici mogu pristupiti detaljima pojedinačne objave. Ova funkcionalnost omogućava korisnicima da vide sve relevantne informacije o odabranoj objavi, uključujući sadržaj, slike, komentare, kao i broj lajkova. Korisnici mogu dodavati nove komentare na objave, uređivati i brisati postojeće komentare, ako su ih sami postavili. Takođe, aplikacija omogućava korisnicima da lajkuju ili uklone lajk sa objave. Sistem prati da li je korisnik već lajkovao objavu, i u zavisnosti od toga, menja se prikaz dugmeta za lajkovanje. Na ovaj način, korisnicima se pruža bogato interaktivno iskustvo koje podstiče angažman i diskusiju unutar zajednice.
Za korisnike sa ulogom moderatora, aplikacija nudi poseban panel koji omogućava upravljanje objavama i temama na forumu. Moderatori mogu da pregledaju sve objave i teme, kao i da ih brišu ili dodaju nove. Funkcionalnost brisanja objava i tema omogućava moderatorima da održavaju red na forumu, uklanjajući neprimerene ili zastarele sadržaje. Pored toga, moderatori mogu da kreiraju nove teme, unoseći naslove i opise, čime proširuju ili organizuju diskusije na forumu. Ova funkcionalnost je posebno korisna za velike forume gde je potrebno stalno prilagođavanje tema diskusije u skladu sa interesovanjima i potrebama zajednice.
Administratori imaju pristup naprednom administrativnom panelu koji omogućava upravljanje korisnicima na platformi, sa posebnim naglaskom na promenu uloga korisnika. Administrator može pregledati sve korisnike, njihove uloge, i po potrebi promeniti ulogu svakog korisnika. Uloge mogu uključivati obične korisnike, moderatore i administratore, a promena uloga se vrši jednostavnim izborom željene uloge iz dropdown menija. Ova funkcionalnost omogućava administratorima da brzo i efikasno prilagode pristup korisnika različitim delovima sistema, čime se obezbeđuje sigurnost i red na platformi.
Za potrebe praćenja aktivnosti i angažmana korisnika, aplikacija pruža administratorski pregled ključnih statistika. Statistike uključuju ukupni broj korisnika, objava, komentara i lajkova, kao i informacije o najaktivnijim korisnicima prema broju objava. Ove statistike su prikazane putem grafikona, koji administratorima omogućavaju lak uvid u stanje na platformi i pomažu u donošenju odluka koje mogu unaprediti korisničko iskustvo. Podaci se vizualizuju putem bar i pie grafikona, što omogućava jasan i pregledan prikaz ključnih metrika. Pored toga, aplikacija koristi ikone za prikaz osnovnih statistika poput broja novih korisnika, objava, komentara i lajkova u poslednjih 30 dana, čime se administratorima pruža sveobuhvatan uvid u trenutno stanje aktivnosti na platformi.
## Slucajevi koriscenja 
Aplikacija pruža različite funkcionalnosti namenjene korisnicima, moderatorima i administratorima, omogućavajući im da koriste sistem na više načina. U nastavku su navedeni svi slučajevi korišćenja, nakon čega su detaljno opisani neki karakteristični slučajevi sa koracima.
Slučajevi korišćenja:
1.	Registracija korisnika
2.	Prijava korisnika na sistem
3.	Generisanje slučajnih korisničkih podataka
4.	Pregled liste objava
5.	Filtriranje objava prema temi, datumu i sadržaju
6.	Sortiranje objava
7.	Pretraga objava po ključnim rečima
8.	Kreiranje nove objave sa priloženim slikama
9.	Pregled detalja pojedinačne objave
10.	Dodavanje komentara na objavu
11.	Uređivanje i brisanje sopstvenih komentara
12.	Lajkovanje i uklanjanje lajka sa objave
13.	Prikaz i upravljanje objavama za moderatore
14.	Prikaz i upravljanje temama za moderatore
15.	Brisanje objava i tema od strane moderatora
16.	Kreiranje novih tema od strane moderatora
17.	Pregled liste korisnika za administratore
18.	Promena uloga korisnika od strane administratora
19.	Prikaz statistika za administratore
