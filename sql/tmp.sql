ALTER TABLE Teatr.Miejsce
DROP CONSTRAINT sala_miejsce_fk;

ALTER TABLE Teatr.Miejsce 
ADD CONSTRAINT sala_miejsce_fk
FOREIGN KEY (sala_id)
REFERENCES Teatr.Sala (sala_id)
ON DELETE CASCADE;