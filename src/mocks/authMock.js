import mock from "../utils/mock";

const activeUsers = [
  {
    id: "1",
    email: "public@iot-sensor.com",
    name: "User A",
    role: "Public",
  },
  {
    id: "2",
    email: "user@iot-sensor.com",
    name: "User B",
    role: "User",
  },
  {
    id: "3",
    email: "generalmanager@iot-sensor.com",
    name: "User C",
    role: "General Manager",
  },
  {
    id: "4",
    email: "siteadmin@iot-sensor.com",
    name: "User D",
    role: "Site Admin",
  },
  {
    id: "5",
    email: "globaladmin@iot-sensor.com",
    name: "User E",
    role: "Global Admin",
  },
  {
    id: "7",
    email: "sectoradmin@iot-sensor.com",
    name: "User G",
    role: "Sector Admin",
  },
  {
    id: "7",
    email: "countryadmin@iot-sensor.com",
    name: "User H",
    role: "Country Admin",
  },
  {
    id: "7",
    email: "superadmin@iot-sensor.com",
    name: "User I",
    role: "Super Admin",
  },
];

mock.onPost("/api/auth/sign-in").reply((config) => {
  const { email } = JSON.parse(config.data);

  let user = activeUsers.find((user) => user.email === email);
  if (user) {
    return [200, user];
  }

  return [401, { message: "Please check your email and password" }];
});

mock.onPost("/api/auth/sign-up").reply(() => {
  return [200, activeUsers[1]];
});

mock.onPost("/api/auth/reset-password").reply(() => {
  return [200, activeUsers[1]];
});
