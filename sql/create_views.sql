CREATE VIEW Teatr.Lista_technikow AS
SELECT t.technik_id, t.imie, t.nazwisko, p.nazwa AS Profesja 
FROM Teatr.Technik_teatralny t JOIN Teatr.Profesja p ON t.profesja_id = p.profesja_id
ORDER BY nazwisko, imie;



CREATE VIEW Teatr.Lista_sal AS
SELECT s.sala_id, s.nazwa, MAX(m.rzad) AS ilosc_rzedow, COUNT(m.numer_siedzenia) AS ilosc_siedzen 
FROM Teatr.Sala s JOIN Teatr.Miejsce m ON s.sala_id = m.sala_id 
GROUP BY s.sala_id, s.nazwa
ORDER BY s.sala_id; 



CREATE VIEW Teatr.Lista_spektakli AS
SELECT s.spektakl_id, s.tytul, g.nazwa AS gatunek, 
    r.imie AS imie_rezysera, r.nazwisko AS nazwisko_rezysera,  
    sc.imie AS imie_scenarzysty, sc.nazwisko AS nazwisko_scenarzysty, s.opis
FROM Teatr.Spektakl s 
    JOIN Teatr.Gatunek g ON s.gatunek_id = g.gatunek_id 
    JOIN Teatr.Scenarzysta sc ON s.scenarzysta_id = sc.scenarzysta_id
    JOIN Teatr.Rezyser r ON s.rezyser_id = r.rezyser_id; 



CREATE VIEW Teatr.Rozszerzona_lista_spektakli AS
SELECT s.spektakl_id, s.tytul, g.nazwa AS gatunek, 
    r.rezyser_id, r.imie AS imie_rezysera, r.nazwisko AS nazwisko_rezysera,  
    sc.scenarzysta_id, sc.imie AS imie_scenarzysty, sc.nazwisko AS nazwisko_scenarzysty, s.opis
FROM Teatr.Spektakl s 
    JOIN Teatr.Gatunek g ON s.gatunek_id = g.gatunek_id 
    JOIN Teatr.Scenarzysta sc ON s.scenarzysta_id = sc.scenarzysta_id
    JOIN Teatr.Rezyser r ON s.rezyser_id = r.rezyser_id; 



CREATE VIEW Teatr.Technicy_w_spektaklach AS
SELECT t.technik_id, t.imie, t.nazwisko, p.nazwa AS Profesja, s.spektakl_id 
FROM Teatr.Spektakl_technik s 
    JOIN Teatr.Technik_teatralny t ON s.technik_id = t.technik_id 
    JOIN Teatr.Profesja p ON t.profesja_id = p.profesja_id;



CREATE VIEW Teatr.Lista_rol AS
SELECT r.rola_id, r.nazwa, a.aktor_id, a.imie, a.nazwisko, r.spektakl_id
FROM Teatr.Rola r JOIN Teatr.Aktor a ON r.aktor_id = a.aktor_id;



CREATE VIEW Teatr.Lista_wystawien AS
SELECT w.wystawienie_id, s.tytul, sala.nazwa AS sala, 
    w.data_rozpoczecia, w.data_zakonczenia, s.spektakl_id 
FROM Teatr.Wystawienie_spektaklu w 
    JOIN Teatr.Spektakl s ON w.spektakl_id = s.spektakl_id
    JOIN Teatr.Sala sala ON sala.sala_id = w.sala_id
ORDER BY w.data_rozpoczecia;



CREATE VIEW Teatr.Policz_role AS
SELECT s.spektakl_id, COUNT(*) AS Ilosc_rol
FROM Teatr.Spektakl s JOIN Teatr.Rola r ON s.spektakl_id = r.spektakl_id
GROUP BY s.spektakl_id;



CREATE VIEW Teatr.Policz_pracownikow AS
SELECT s.spektakl_id, COUNT(*) AS Ilosc_pracownikow
FROM Teatr.Spektakl s JOIN Teatr.Spektakl_technik st ON s.spektakl_id = st.spektakl_id
GROUP BY s.spektakl_id;



CREATE VIEW Teatr.Opisy_do_spektakli AS
SELECT s.spektakl_id,
    r.imie AS imie_rezysera, r.nazwisko AS nazwisko_rezysera,  
    sc.imie AS imie_scenarzysty, sc.nazwisko AS nazwisko_scenarzysty,
    s.opis AS opis_spektaklu, r.opis AS opis_rezysera, sc.opis AS opis_scenarzysty
FROM Teatr.Spektakl s 
    JOIN Teatr.Rezyser r ON r.rezyser_id = s.rezyser_id
    JOIN Teatr.Scenarzysta sc ON sc.scenarzysta_id = s.scenarzysta_id
ORDER BY spektakl_id;   