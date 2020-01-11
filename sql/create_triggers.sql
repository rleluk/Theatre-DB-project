CREATE FUNCTION Teatr.Sprawdz_date()
RETURNS TRIGGER 
LANGUAGE 'plpgsql' AS $$
BEGIN
    IF NEW.data_rozpoczecia < NEW.data_zakonczenia THEN
        RETURN NEW;
    ELSE 
        RAISE EXCEPTION 'Data rozpoczęcia nie może być wcześniejsza niż data zakończenia'; 
    END IF;
END
$$;

CREATE TRIGGER Sprawdz_wystawienie
AFTER INSERT OR UPDATE ON Teatr.Wystawienie_spektaklu
FOR EACH ROW EXECUTE PROCEDURE Teatr.Sprawdz_date();



CREATE FUNCTION Teatr.Sprawdz_pracownikow()
RETURNS TRIGGER 
LANGUAGE 'plpgsql' AS $$
DECLARE
    liczba_rol INT;
    liczba_technikow INT;
BEGIN
    SELECT ilosc_rol INTO liczba_rol 
    FROM Teatr.Policz_role 
    WHERE spektakl_id = NEW.spektakl_id;

    SELECT ilosc_pracownikow INTO liczba_technikow
    FROM Teatr.Policz_pracownikow
    WHERE spektakl_id = NEW.spektakl_id;

    IF liczba_rol > 0 AND liczba_technikow > 0 THEN
        RETURN NEW;
    ELSE 
        RAISE EXCEPTION 'Spektakl nie może się odbyć bez odpowiednich techników i aktorów.'; 
    END IF;
END
$$;

CREATE TRIGGER Sprawdz_wystawienie2
AFTER INSERT ON Teatr.Wystawienie_spektaklu
FOR EACH ROW EXECUTE PROCEDURE Teatr.Sprawdz_pracownikow();