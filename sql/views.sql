CREATE VIEW Lista_technikow AS
SELECT t.Technik_id, t.Imie, t.Nazwisko, p.Nazwa AS Profesja 
FROM Technik_teatralny t JOIN Profesja p ON t.Profesja_id = p.Profesja_id
ORDER BY Nazwisko, Imie;
