import { Organization } from "@app/types";
import { fakerRU as faker } from "@faker-js/faker";

const fakerLocation = faker.location;

export const createOrganizationList = (count: number) => {
  return faker.helpers.multiple(createOrganization, { count });
};

function createOrganization(): Organization {
  const zipCode = fakerLocation.zipCode();
  const city = fakerLocation.city();
  const street = fakerLocation.streetAddress();

  const address = `${zipCode}, г. ${city}, ${street}`;

  return {
    id: faker.string.uuid(),
    isSelected: false,
    name: faker.company.name(),
    address: address,
  };
}
