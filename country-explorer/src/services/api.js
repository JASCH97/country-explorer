/**
 * Base URL for the REST Countries API (version 3.1)
 * @constant {string}
 */

const BASE_URL = "https://restcountries.com/v3.1";

/**
 * Fetches all countries from the API with error handling
 * @returns {Promise<Country[]>} Array of country objects
 * @throws {Error} When network response is not OK or fetch fails
 * @example
 * try {
 *   const countries = await fetchAllCountries();
 * } catch (error) {
 *   console.error('API Error:', error.message);
 * }
 */

export const fetchAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};
