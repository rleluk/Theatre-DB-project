ALTER TABLE Teatr.Sala
ADD unique(nazwa);

ALTER TABLE Teatr.Profesja 
ADD unique(nazwa);

ALTER TABLE Teatr.Gatunek
ADD unique(nazwa);

ALTER TABLE Teatr.Typ_biletu 
ADD unique(nazwa);

ALTER TABLE Teatr.Spektakl_technik
  ADD CONSTRAINT unique_spektakl_technik UNIQUE(spektakl_id, technik_id);

-- przy usuwaniu sali usuwają się też wszystkie miejsca do niej należące

ALTER TABLE Teatr.Miejsce
DROP CONSTRAINT sala_miejsce_fk;

ALTER TABLE Teatr.Miejsce 
ADD CONSTRAINT sala_miejsce_fk
FOREIGN KEY (sala_id)
REFERENCES Teatr.Sala (sala_id)
ON DELETE CASCADE;

-- przy usuwaniu spektaklu usuwają się też wszystkie role do niego należące

ALTER TABLE Teatr.Rola
DROP CONSTRAINT spektakl_rola_fk;

ALTER TABLE Teatr.Rola 
ADD CONSTRAINT spektakl_rola_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE CASCADE;

-- przy usuwaniu spektaklu usuwają się też rekordy z tabeli asocjacyjnej łączącej spektakl z technikami

ALTER TABLE Teatr.Spektakl_Technik
DROP CONSTRAINT spektakl_spektakl_technik_fk;

ALTER TABLE Teatr.Spektakl_Technik 
ADD CONSTRAINT spektakl_spektakl_technik_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE CASCADE;

-- przy usuwaniu spektaklu usuwamy również wszystkie wystawienia tego spektaklu

ALTER TABLE Teatr.Wystawienie_spektaklu
DROP CONSTRAINT spektakl_sala_spektakl_fk;

ALTER TABLE Teatr.Wystawienie_spektaklu 
ADD CONSTRAINT spektakl_sala_spektakl_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE CASCADE;

-- przy usuwaniu aktora usuwamy również wszystkie role tego aktora

ALTER TABLE Teatr.Rola
DROP CONSTRAINT aktor_rola_fk;

ALTER TABLE Teatr.Rola 
ADD CONSTRAINT aktor_rola_fk
FOREIGN KEY (aktor_id)
REFERENCES Teatr.AKtor (aktor_id)
ON DELETE CASCADE;

-- przy usuwaniu technika usuwają się też rekordy z tabeli asocjacyjnej łączącej spektakl z technikami

ALTER TABLE Teatr.Spektakl_Technik
DROP CONSTRAINT technik_teatralny_spektakl_technik_fk;

ALTER TABLE Teatr.Spektakl_Technik 
ADD CONSTRAINT technik_teatralny_spektakl_technik_fk
FOREIGN KEY (technik_id)
REFERENCES Teatr.Technik_teatralny (technik_id)
ON DELETE CASCADE;

-- przy usuwaniu wystawienia usuwamy też wszystkie bilety do niego należące

ALTER TABLE Teatr.Bilet
DROP CONSTRAINT wystawienie_spektaklu_bilet_fk;

ALTER TABLE Teatr.Bilet 
ADD CONSTRAINT wystawienie_spektaklu_bilet_fk
FOREIGN KEY (wystawienie_id)
REFERENCES Teatr.Wystawienie_spektaklu (wystawienie_id)
ON DELETE CASCADE;

-- przy usuwaniu miejsca usuwamy też wszystkie bilety do niego należące

ALTER TABLE Teatr.Bilet
DROP CONSTRAINT miejsce_bilet_fk;

ALTER TABLE Teatr.Bilet 
ADD CONSTRAINT miejsce_bilet_fk
FOREIGN KEY (miejsce_id)
REFERENCES Teatr.Miejsce (miejsce_id)
ON DELETE CASCADE;

-- przy uswuwaniu sali usuwamy też wszystkie wystawienia spektaklu odbywające się w tej sali

ALTER TABLE Teatr.Wystawienie_spektaklu
DROP CONSTRAINT sala_sala_spektakl_fk;

ALTER TABLE Teatr.Wystawienie_spektaklu 
ADD CONSTRAINT sala_sala_spektakl_fk
FOREIGN KEY (sala_id)
REFERENCES Teatr.Sala (sala_id)
ON DELETE CASCADE;

