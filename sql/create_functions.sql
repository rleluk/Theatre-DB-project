CREATE FUNCTION Teatr.Dodaj_sale(VARCHAR, INT, INT)
RETURNS INT 
LANGUAGE 'plpgsql' AS '
DECLARE
    id_sali INT;
BEGIN
    IF $2 < 1 OR $2 > 50 THEN
        RETURN -1;
    END IF;

    IF $3 < 1 OR $3 > 20 THEN
        RETURN -1;
    END IF;

    INSERT INTO Teatr.Sala(Nazwa) 
    VALUES ($1);
    
    SELECT Sala_id INTO id_sali 
    FROM Teatr.Sala 
    WHERE Nazwa = $1;

    FOR i IN 1 .. $2 LOOP
        FOR j IN 1 .. $3 LOOP
            INSERT INTO Teatr.Miejsce(Numer_siedzenia, Rzad, Sala_id) VALUES((i - 1) * $3 + j, i, id_sali);
        END LOOP;
    END LOOP;

    RETURN 1;
END
';