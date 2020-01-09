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