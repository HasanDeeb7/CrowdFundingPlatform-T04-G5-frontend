import { faker } from "@faker-js/faker";

function generateRandomRole() {
  const roles = ["admin", "donor", "creator"];
  return roles[Math.floor(Math.random() * roles.length)];
}

const fakeUsers = Array.from({ length: 5 }, (_, index) => {
  return {
    id: index + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    role: generateRandomRole(),
    
  };
});

export default fakeUsers
