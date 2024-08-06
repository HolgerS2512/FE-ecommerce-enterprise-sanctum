class RandomHashGenerator {
  constructor(length = 16) {
    this.length = length; // Länge des generierten Hashes
  }

  // Generiert einen zufälligen Hash
  generateHash() {
    // Erzeugt eine zufällige Byte-Sequenz
    const array = new Uint8Array(this.length);
    window.crypto.getRandomValues(array);

    // Konvertiert die Byte-Sequenz in eine hexadezimale Zeichenkette
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

export default RandomHashGenerator;
