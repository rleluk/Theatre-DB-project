CREATE VIEW Teatr.Lista_technikow AS
SELECT t.technik_id, t.imie, t.nazwisko, p.nazwa AS Profesja 
FROM Teatr.Technik_teatralny t JOIN Teatr.Profesja p ON t.profesja_id = p.profesja_id
ORDER BY nazwisko, imie;

CREATE VIEW Teatr.Lista_sal AS
SELECT s.sala_id, s.nazwa, MAX(m.rzad) AS ilosc_rzedow, COUNT(m.numer_siedzenia) AS ilosc_siedzen 
FROM Teatr.Sala s JOIN Teatr.Miejsce m ON s.sala_id = m.sala_id 
GROUP BY s.sala_id, s.nazwa
ORDER BY s.sala_id; 




