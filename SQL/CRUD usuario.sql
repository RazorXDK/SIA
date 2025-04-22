-- ============================================
-- CREATE: Insertar un nuevo usuario
-- ============================================
INSERT INTO sistema_educativo.usuario
(NOMBRE, APELLIDO, CORREO_USUARIO, USUARIO, CONTRASEÑA, ESTADO, FECHA_REGISTRO, FECHA_NACIMIENTO, INTENTOS_FALLIDOS)
VALUES('Mario R.', 'Grajeda', 'mgrajeda01@sia.com', 'Admin001', '123464*', 'Activo', '2025-04-14', '1999-08-09', 0);


-- ============================================
-- READ: Consultar usuarios
-- ============================================

-- Consultar todos los usuarios
SELECT * FROM sistema_educativo.usuario;

-- Consultar un usuario específico por ID
SELECT * FROM sistema_educativo.usuario
WHERE ID_USUARIO = 1;


-- ============================================
-- UPDATE: Actualizar información del usuario
-- ============================================

-- Cambiar el correo y estado del usuario con ID 1
UPDATE sistema_educativo.usuario
SET CORREO_USUARIO = 'mario.actualizado@sia.com',
    ESTADO = 'Inactivo'
WHERE ID_USUARIO = 1;


-- ============================================
-- DELETE: Eliminar un usuario
-- ============================================

-- Eliminar al usuario con ID 1
DELETE FROM sistema_educativo.usuario
WHERE ID_USUARIO = 1;
