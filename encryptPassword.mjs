import bcrypt from 'bcrypt';

// Función para encriptar una contraseña
async function encryptPassword(password) {
    try {
        // Número de saltos (cuántas veces se aplicará el algoritmo de hashing)
        const saltRounds = 10;

        // Generar la sal
        const salt = await bcrypt.genSalt(saltRounds);

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, salt);

        // Retornar la contraseña encriptada
        return hashedPassword;
    } catch (error) {
        console.error('Error encriptando la contraseña:', error);
        throw error;
    }
}

// Ejemplo de uso
const password = 'miSuperSecretaContraseña';

encryptPassword(password)
    .then(hashedPassword => {
        console.log('Contraseña encriptada:', hashedPassword);
    })
    .catch(error => {
        console.error('Error:', error);
    });