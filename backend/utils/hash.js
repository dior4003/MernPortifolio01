import bcrypt from "bcrypt";

/**
 * Parolni hashlaydi
 * @param {String} plainPassword - Oddiy parol
 * @param {Number} saltRounds - Qancha marta tuzlanadi (odatda 10)
 * @returns {String} - Hashed parol
 */
export const hashPassword = async (plainPassword, saltRounds = 10) => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

/**
 * Parolni tekshiradi
 * @param {String} plainPassword - Kirilgan parol
 * @param {String} hashedPassword - Bazadagi hashlangan parol
 * @returns {Boolean} - True agar mos bo‘lsa
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};