INSERT INTO Teatr.Admin VALUES
(1, 'admin', 'admin01');

INSERT INTO Teatr.Aktor(imie, nazwisko, data_urodzenia) VALUES
('Jakub', 'Grzybiarz', '1933-12-01'),
('Anna', 'Kowalska', '1952-12-01'),
('Grzegorz', 'Grzybiarz', '1988-12-01'),
('Janusz', 'Nowak', '1958-12-01'),
('Ewa', 'Brzęczyszczykiewicz', '1991-12-01');

INSERT INTO Teatr.Rezyser(imie, nazwisko, data_urodzenia, opis) VALUES
('Jakub', 'Abacki', '1933-12-01', 'Obszerny opis reżysera.'),
('Anna', 'Babacka', '1952-12-01', 'Obszerny opis reżysera.'),
('Grzegorz', 'Cabacki', '1988-12-01', 'Obszerny opis reżysera.'),
('Janusz', 'Dabacki', '1958-12-01', 'Obszerny opis reżysera.'),
('Ewa', 'Ebacka', '1991-12-01', 'Obszerny opis reżysera.');

INSERT INTO Teatr.Scenarzysta(imie, nazwisko, data_urodzenia, opis) VALUES
('Jakub', 'Tabacki', '1933-12-01', 'Obszerny opis scenarzysty.'),
('Hubert', 'Trąbacki', '1952-12-01', 'Obszerny opis scenarzysty.'),
('Dżesika', 'Pebacka', '1988-12-01', 'Obszerny opis scenarzysty.'),
('Jurek', 'Grebacki', '1958-12-01', 'Obszerny opis scenarzysty.'),
('Ewa', 'Nowak', '1991-12-01', 'Obszerny opis scenarzysty.');

INSERT INTO Teatr.Gatunek(nazwa) VALUES
('Komedia'), ('Dramat'), ('Monodrama'), ('Parodia');

INSERT INTO Teatr.Profesja(nazwa) VALUES
('Kosmetyk'), ('Wizażysta'), ('Makijażysta'), 
('Stylista'), ('Fryzjer'), ('Reżyser świateł');

INSERT INTO Teatr.Typ_biletu(nazwa, cena) VALUES
('Normalny', 40), ('Ulgowy', 25);

INSERT INTO Teatr.Technik_teatralny(imie, nazwisko, profesja_id) VALUES
('Paweł', 'Kowalski', 1),
('Piotr', 'Abacki', 2),
('Brajan', 'Babacki', 3),
('Jurek', 'Tabacki', 6),
('Ewa', 'Ogórek', 5);
