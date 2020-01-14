CREATE FUNCTION Teatr.Dodaj_sale(sala VARCHAR, liczba_rzedow INT, siedzen_w_rzedzie INT)
RETURNS INT 
LANGUAGE 'plpgsql' AS $$
DECLARE
    id_sali INT;
BEGIN
    IF $2 < 1 OR $2 > 50 THEN
        RAISE EXCEPTION 'Nieprawidłowa liczba rzędów.'; 
    END IF;

    IF $3 < 1 OR $3 > 20 THEN
        RAISE EXCEPTION 'Nieprawidłowa liczba siedzeń w rzędzie.'; 
    END IF;

    INSERT INTO Teatr.Sala(nazwa) 
    VALUES ($1);
    
    SELECT sala_id INTO id_sali 
    FROM Teatr.Sala 
    WHERE nazwa = $1;

    FOR i IN 1 .. $2 LOOP
        FOR j IN 1 .. $3 LOOP
            INSERT INTO Teatr.Miejsce(numer_siedzenia, rzad, sala_id) VALUES((i - 1) * $3 + j, i, id_sali);
        END LOOP;
    END LOOP;

    RETURN 1;
END
$$;



CREATE FUNCTION Teatr.Dodaj_spektakl(opis VARCHAR, tytul VARCHAR, gatunek VARCHAR, id_rezysera INT, id_scenarzysty INT)
RETURNS INT 
LANGUAGE 'plpgsql' AS $$
DECLARE
    id_spektaklu INT;
    id_gatunku INT;
BEGIN
    SELECT gatunek_id 
    INTO id_gatunku 
    FROM Teatr.Gatunek 
    WHERE nazwa = $3;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Nie znaleziono gatunku o podanej nazwie.'; 
    END IF;

    IF NOT EXISTS (SELECT * FROM Teatr.Rezyser WHERE rezyser_id = $4) THEN
        RAISE EXCEPTION 'Nie znaleziono reżysera o podanym id.'; 
    END IF;
    
    IF NOT EXISTS (SELECT * FROM Teatr.Scenarzysta WHERE scenarzysta_id = $5) THEN
        RAISE EXCEPTION 'Nie znaleziono scenarzysty o podanym id.'; 
    END IF;

    SELECT NEXTVAL('Teatr.spektakl_spektakl_id_seq')
    INTO id_spektaklu;

    INSERT INTO Teatr.Spektakl(spektakl_id, opis, tytul, gatunek_id, rezyser_id, scenarzysta_id)
    VALUES (id_spektaklu, $1, $2, id_gatunku, $4, $5);

    RETURN id_spektaklu;
END
$$;



CREATE FUNCTION Teatr.Zmien_spektakl(id_spektaklu INT, opis VARCHAR, tytul VARCHAR, gatunek VARCHAR, id_rezysera INT, id_scenarzysty INT)
RETURNS INT 
LANGUAGE 'plpgsql' AS $$
DECLARE
    id_gatunku INT;
BEGIN
    SELECT gatunek_id 
    INTO id_gatunku 
    FROM Teatr.Gatunek 
    WHERE nazwa = $4;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Nie znaleziono gatunku o podanej nazwie.'; 
    END IF;

    IF NOT EXISTS (SELECT * FROM Teatr.Rezyser WHERE rezyser_id = $5) THEN
        RAISE EXCEPTION 'Nie znaleziono reżysera o podanym id.'; 
    END IF;
    
    IF NOT EXISTS (SELECT * FROM Teatr.Scenarzysta WHERE scenarzysta_id = $6) THEN
        RAISE EXCEPTION 'Nie znaleziono scenarzysty o podanym id.'; 
    END IF;

    UPDATE Teatr.Spektakl 
    SET opis = $2, tytul = $3, gatunek_id = id_gatunku, rezyser_id = $5, scenarzysta_id = $6 
    WHERE spektakl_id = $1;

    RETURN 1;
END
$$;



CREATE FUNCTION Teatr.Wystaw_spektakl(id_spektaklu INT,
data_rozpoczecia TIMESTAMP, data_zakonczenia TIMESTAMP, sala VARCHAR)
RETURNS INT 
LANGUAGE 'plpgsql' AS $$
DECLARE
    id_sali INT;
BEGIN
    SELECT sala_id 
    INTO id_sali 
    FROM Teatr.Sala 
    WHERE nazwa = $4;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Nie znaleziono sali o podanej nazwie.'; 
    END IF;

    IF NOT EXISTS (SELECT * FROM Teatr.Spektakl WHERE spektakl_id = $1) THEN
        RAISE EXCEPTION 'Nie znaleziono spektaklu o podanym id.'; 
    END IF;

    INSERT INTO Teatr.Wystawienie_spektaklu(spektakl_id, data_rozpoczecia, data_zakonczenia, sala_id)
    VALUES($1, $2, $3, id_sali); 

    RETURN 1;
END
$$;



CREATE TYPE Teatr.sala_i_miejsce AS (sala VARCHAR, miejsce INT);

CREATE FUNCTION Teatr.Dodaj_bilet(id_wystawienia INT, typ_biletu VARCHAR)
RETURNS Teatr.sala_i_miejsce
LANGUAGE 'plpgsql' AS $$
DECLARE
    akt_ilosc_biletow INT;
    max_ilosc_biletow INT;
    ost_miejsce INT;
    id_typu INT;
    s_m Teatr.sala_i_miejsce;
BEGIN
    SELECT typ_biletu_id 
    INTO id_typu 
    FROM Teatr.Typ_biletu 
    WHERE nazwa = $2;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Nie znaleziono typu biletu o podanej nazwie.'; 
    END IF;

    IF NOT EXISTS (SELECT * FROM Teatr.Wystawienie_spektaklu WHERE wystawienie_id = $1) THEN
        RAISE EXCEPTION 'Nie znaleziono wystawienia spektaklu o podanym id.'; 
    END IF;

    SELECT akt_ilosc
    FROM Teatr.Aktualna_ilosc_biletow 
    INTO akt_ilosc_biletow
    WHERE wystawienie_id = $1;

    SELECT max_ilosc 
    FROM Teatr.Maksymalna_ilosc_biletow
    INTO max_ilosc_biletow
    WHERE wystawienie_id = $1;
     
    IF akt_ilosc_biletow = max_ilosc_biletow THEN
        RAISE EXCEPTION 'Wszystkie miejsca są już zajęte.';
    END IF;

    SELECT s.nazwa 
    INTO s_m.sala
    FROM Teatr.Wystawienie_spektaklu ws 
        JOIN Teatr.Sala s ON ws.sala_id = s.sala_id 
    WHERE wystawienie_id = $1;

    SELECT ostatnie_miejsce
    FROM Teatr.Ostatnie_zajete_miejsce
    INTO ost_miejsce
    WHERE wystawienie_id = $1;

    IF NOT FOUND THEN
        SELECT pierwsze_miejsce
        FROM Teatr.Pierwsze_miejsce_w_sali
        INTO ost_miejsce
        WHERE wystawienie_id = $1;

        INSERT INTO Teatr.Bilet(typ_biletu_id, miejsce_id, wystawienie_id)
        VALUES (id_typu, ost_miejsce, $1);

        s_m.miejsce = ost_miejsce;
    ELSE
        INSERT INTO Teatr.Bilet(typ_biletu_id, miejsce_id, wystawienie_id)
        VALUES (id_typu, ost_miejsce + 1, $1);

        s_m.miejsce = ost_miejsce + 1;
    END IF;

    RETURN (s_m.sala, s_m.miejsce);
END
$$;

