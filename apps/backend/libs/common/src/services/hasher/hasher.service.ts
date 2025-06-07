import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class HasherService {
  async hash(textToHash: string) {
    try {
      const hashed = await hash(textToHash);

      return hashed;
    } catch (error) {
      console.error('Error hashing text:', error);
      throw new Error('Hashing failed');
    }
  }

  async verify(encryptedItem: string, textToMatch: string) {
    try {
      const checkedItem = await verify(encryptedItem, textToMatch);

      if (checkedItem) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error verifying text:', error);
      throw new Error('Verification failed');
    }
  }
}
