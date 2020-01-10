CREATE FUNCTION Teatr.Dodaj_sale(VARCHAR, INT, INT)
RETURNS INT 
LANGUAGE 'plpgsql' AS $$
DECLARE
    id_sali INT;
BEGIN
    IF $2 < 1 OR $2 > 50 THEN
        RETURN -1;
    END IF;

    IF $3 < 1 OR $3 > 20 THEN
        RETURN -1;
    END IF;

    INSERT INTO Teatr.Sala(nazwa) 
    VALUES ($1);
    
    SELECT sala_id INTO id_sali 
    FROM Teatr.Sala 
    WHERE nazwa = $1;

    FOR i IN 1 .. $2 LOOP
        FOR j IN 1 .. $3 LOOP
            INSERT INTO Teatr.Miejsce(numer_siedzenia, nzad, nala_id) VALUES((i - 1) * $3 + j, i, id_sali);
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