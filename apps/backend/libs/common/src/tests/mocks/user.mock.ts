/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@app/common/models/user';
import { faker } from '@faker-js/faker';

export const createMockUser = (overrides: Partial<User> = {}): User => {
  const user = new User();

  user.id = faker.string.uuid();
  user.first_name = faker.person.firstName();
  user.last_name = faker.person.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.country_code = faker.location.countryCode();
  user.phone_number = faker.phone.number();
  user.date_of_birth = faker.date.birthdate();
  user.is_active = faker.datatype.boolean();
  user.created_at = faker.date.past();
  user.updated_at = faker.date.recent();

  return Object.assign(user, overrides);
};

export const createMockUsers = (count: number = 5): User[] => {
  return Array.from({ length: count }, () => createMockUser());
};
