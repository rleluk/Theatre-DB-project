INSERT INTO Teatr.Admin VALUES
(1, 'admin', 'admin01'),
(2, '', '');

INSERT INTO Teatr.Aktor(imie, nazwisko, data_urodzenia) VALUES
('Jakub', 'Grzybiarz', '1933-12-01'),
('Anna', 'Kowalska', '1952-12-01'),
('Grzegorz', 'Grzybiarz', '1988-12-01'),
('Janusz', 'Nowak', '1958-12-01'),
('Klementyna', 'Brzęczyszczykiewicz', '1991-12-01');

INSERT INTO Teatr.Rezyser(imie, nazwisko, data_urodzenia, opis) VALUES
('Jakub', 'Grzybiarz', '1933-12-01', 'opis'),
('Anna', 'Kowalska', '1952-12-01', 'opis'),
('Grzegorz', 'Grzybiarz', '1988-12-01', 'opis'),
('Janusz', 'Nowak', '1958-12-01', ''),
('Klementyna', 'Brzęczyszczykiewicz', '1991-12-01', 'kek');

INSERT INTO Teatr.Scenarzysta(imie, nazwisko, data_urodzenia, opis) VALUES
('Jakub', 'Grzybiarz', '1933-12-01', 'opis'),
('Anna', 'Kowalska', '1952-12-01', 'opis'),
('Grzegorz', 'Grzybiarz', '1988-12-01', 'opis'),
('Janusz', 'Nowak', '1958-12-01', ''),
('Klementyna', 'Brzęczyszczykiewicz', '1991-12-01', 'kek');

INSERT INTO Teatr.Gatunek(nazwa) VALUES
('Komedia'), ('Dramat'), ('Monodrama'), ('Parodia');

INSERT INTO Teatr.Profesja(nazwa) VALUES
('Kosmetyczka'), ('Kamerzysta'), ('Makijażystka');
