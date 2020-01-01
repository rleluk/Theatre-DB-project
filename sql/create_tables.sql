
CREATE SEQUENCE Teatr.profesja_profesja_id_seq;

CREATE TABLE Teatr.Profesja (
                profesja_id INTEGER NOT NULL DEFAULT nextval('Teatr.profesja_profesja_id_seq'),
                Nazwa VARCHAR NOT NULL,
                CONSTRAINT profesja_pk PRIMARY KEY (profesja_id)
);


ALTER SEQUENCE Teatr.profesja_profesja_id_seq OWNED BY Teatr.Profesja.profesja_id;

CREATE SEQUENCE Teatr.technik_teatralny_technik_id_seq;

CREATE TABLE Teatr.Technik_teatralny (
                technik_id INTEGER NOT NULL DEFAULT nextval('Teatr.technik_teatralny_technik_id_seq'),
                Imie VARCHAR NOT NULL,
                Nazwisko VARCHAR NOT NULL,
                profesja_id INTEGER NOT NULL,
                CONSTRAINT technik_teatralny_pk PRIMARY KEY (technik_id)
);


ALTER SEQUENCE Teatr.technik_teatralny_technik_id_seq OWNED BY Teatr.Technik_teatralny.technik_id;

CREATE TABLE Teatr.Typ_biletu (
                typ_biletu_id INTEGER NOT NULL,
                Nazwa VARCHAR NOT NULL,
                CONSTRAINT typ_biletu_id PRIMARY KEY (typ_biletu_id)
);


CREATE SEQUENCE Teatr.sala_sala_id_seq;

CREATE TABLE Teatr.Sala (
                sala_id INTEGER NOT NULL DEFAULT nextval('Teatr.sala_sala_id_seq'),
                Nazwa VARCHAR NOT NULL,
                CONSTRAINT sala_id PRIMARY KEY (sala_id)
);


ALTER SEQUENCE Teatr.sala_sala_id_seq OWNED BY Teatr.Sala.sala_id;

CREATE TABLE Teatr.Miejsce (
                Miejsce_id INTEGER NOT NULL,
                Numer_siedzenia VARCHAR NOT NULL,
                Rzad VARCHAR NOT NULL,
                sala_id INTEGER NOT NULL,
                CONSTRAINT miejsce_pk PRIMARY KEY (Miejsce_id)
);


CREATE SEQUENCE Teatr.rezyser_rezyser_id_seq_1;

CREATE TABLE Teatr.Rezyser (
                rezyser_id INTEGER NOT NULL DEFAULT nextval('Teatr.rezyser_rezyser_id_seq_1'),
                Nazwisko VARCHAR NOT NULL,
                Imie VARCHAR NOT NULL,
                Opis VARCHAR NOT NULL,
                CONSTRAINT rezyser_id PRIMARY KEY (rezyser_id)
);


ALTER SEQUENCE Teatr.rezyser_rezyser_id_seq_1 OWNED BY Teatr.Rezyser.rezyser_id;

CREATE SEQUENCE Teatr.scenarzysta_scenarzysta_id_seq_1;

CREATE TABLE Teatr.Scenarzysta (
                scenarzysta_id INTEGER NOT NULL DEFAULT nextval('Teatr.scenarzysta_scenarzysta_id_seq_1'),
                Imie VARCHAR NOT NULL,
                Nazwisko VARCHAR NOT NULL,
                Opis VARCHAR NOT NULL,
                CONSTRAINT scenarzysta_id PRIMARY KEY (scenarzysta_id)
);


ALTER SEQUENCE Teatr.scenarzysta_scenarzysta_id_seq_1 OWNED BY Teatr.Scenarzysta.scenarzysta_id;

CREATE SEQUENCE Teatr.aktor_aktor_id_seq;

CREATE TABLE Teatr.Aktor (
                aktor_id INTEGER NOT NULL DEFAULT nextval('Teatr.aktor_aktor_id_seq'),
                Imie VARCHAR NOT NULL,
                Nazwisko VARCHAR NOT NULL,
                CONSTRAINT aktor_id PRIMARY KEY (aktor_id)
);


ALTER SEQUENCE Teatr.aktor_aktor_id_seq OWNED BY Teatr.Aktor.aktor_id;

CREATE SEQUENCE Teatr.gatunek_gatunek_id_seq;

CREATE TABLE Teatr.Gatunek (
                gatunek_id INTEGER NOT NULL DEFAULT nextval('Teatr.gatunek_gatunek_id_seq'),
                Nazwa VARCHAR NOT NULL,
                CONSTRAINT gatunek_id PRIMARY KEY (gatunek_id)
);


ALTER SEQUENCE Teatr.gatunek_gatunek_id_seq OWNED BY Teatr.Gatunek.gatunek_id;

CREATE SEQUENCE Teatr.spektakl_spektakl_id_seq;

CREATE TABLE Teatr.Spektakl (
                spektakl_id INTEGER NOT NULL DEFAULT nextval('Teatr.spektakl_spektakl_id_seq'),
                Opis VARCHAR NOT NULL,
                Tytul VARCHAR NOT NULL,
                gatunek_id INTEGER NOT NULL,
                rezyser_id INTEGER NOT NULL,
                scenarzysta_id INTEGER NOT NULL,
                CONSTRAINT spektakl_id PRIMARY KEY (spektakl_id)
);


ALTER SEQUENCE Teatr.spektakl_spektakl_id_seq OWNED BY Teatr.Spektakl.spektakl_id;

CREATE TABLE Teatr.Spektakl_Technik (
                spektakl_id INTEGER NOT NULL,
                technik_id INTEGER NOT NULL
);


CREATE TABLE Teatr.Wystawienie_spektaklu (
                wystawienie_id INTEGER NOT NULL,
                Data_wystawienia DATE NOT NULL,
                spektakl_id INTEGER NOT NULL,
                sala_id INTEGER NOT NULL,
                Czas_trwania TIME NOT NULL,
                CONSTRAINT wystawienie_spektaklul_pk PRIMARY KEY (wystawienie_id)
);


CREATE SEQUENCE Teatr.bilet_bilet_id_seq;

CREATE TABLE Teatr.Bilet (
                bilet_id INTEGER NOT NULL DEFAULT nextval('Teatr.bilet_bilet_id_seq'),
                typ_biletu_id INTEGER NOT NULL,
                Cena REAL NOT NULL,
                Miejsce_id INTEGER NOT NULL,
                wystawienie_id INTEGER NOT NULL,
                CONSTRAINT bilet_id PRIMARY KEY (bilet_id)
);


ALTER SEQUENCE Teatr.bilet_bilet_id_seq OWNED BY Teatr.Bilet.bilet_id;

CREATE SEQUENCE Teatr.rola_rola_id_seq;

CREATE TABLE Teatr.Rola (
                rola_id INTEGER NOT NULL DEFAULT nextval('Teatr.rola_rola_id_seq'),
                Nazwa VARCHAR NOT NULL,
                spektakl_id INTEGER NOT NULL,
                Opis VARCHAR NOT NULL,
                CONSTRAINT rola_id PRIMARY KEY (rola_id)
);


ALTER SEQUENCE Teatr.rola_rola_id_seq OWNED BY Teatr.Rola.rola_id;

CREATE TABLE Teatr.Obsada (
                rola_id INTEGER NOT NULL,
                aktor_id INTEGER NOT NULL
);


ALTER TABLE Teatr.Technik_teatralny ADD CONSTRAINT zajecie_technik_teatralny_fk
FOREIGN KEY (profesja_id)
REFERENCES Teatr.Profesja (profesja_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Spektakl_Technik ADD CONSTRAINT technik_teatralny_spektakl_technik_fk
FOREIGN KEY (technik_id)
REFERENCES Teatr.Technik_teatralny (technik_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Bilet ADD CONSTRAINT typ_biletu_bilet_fk
FOREIGN KEY (typ_biletu_id)
REFERENCES Teatr.Typ_biletu (typ_biletu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Wystawienie_spektaklu ADD CONSTRAINT sala_sala_spektakl_fk
FOREIGN KEY (sala_id)
REFERENCES Teatr.Sala (sala_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Miejsce ADD CONSTRAINT sala_miejsce_fk
FOREIGN KEY (sala_id)
REFERENCES Teatr.Sala (sala_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Bilet ADD CONSTRAINT miejsce_bilet_fk
FOREIGN KEY (Miejsce_id)
REFERENCES Teatr.Miejsce (Miejsce_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Spektakl ADD CONSTRAINT rezyser_spektakl_fk
FOREIGN KEY (rezyser_id)
REFERENCES Teatr.Rezyser (rezyser_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Spektakl ADD CONSTRAINT scenarzysta_spektakl_fk
FOREIGN KEY (scenarzysta_id)
REFERENCES Teatr.Scenarzysta (scenarzysta_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Obsada ADD CONSTRAINT aktor_rola_aktor_fk
FOREIGN KEY (aktor_id)
REFERENCES Teatr.Aktor (aktor_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Spektakl ADD CONSTRAINT gatunek_spektakl_fk
FOREIGN KEY (gatunek_id)
REFERENCES Teatr.Gatunek (gatunek_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Rola ADD CONSTRAINT spektakl_rola_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Wystawienie_spektaklu ADD CONSTRAINT spektakl_sala_spektakl_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Spektakl_Technik ADD CONSTRAINT spektakl_spektakl_technik_fk
FOREIGN KEY (spektakl_id)
REFERENCES Teatr.Spektakl (spektakl_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Bilet ADD CONSTRAINT wystawienie_spektaklu_bilet_fk
FOREIGN KEY (wystawienie_id)
REFERENCES Teatr.Wystawienie_spektaklu (wystawienie_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Teatr.Obsada ADD CONSTRAINT rola_rola_aktor_fk
FOREIGN KEY (rola_id)
REFERENCES Teatr.Rola (rola_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE Profesja 
ADD unique(nazwa);

ALTER TABLE Gatunek
ADD unique(nazwa);

ALTER TABLE Typ_biletu 
ADD unique(nazwa);

ALTER TABLE Aktor ADD Data_urodzenia DATE NOT NULL;

ALTER TABLE Rezyser ADD Data_urodzenia DATE NOT NULL;

ALTER TABLE Scenarzysta ADD Data_urodzenia DATE NOT NULL;
