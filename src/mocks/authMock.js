import mock from "../utils/mock";

const userData = {
  id: "1",
  email: "saiteja.malladi@gmail.com",
  name: "Sai Teja Malladi",
};

mock.onPost("/api/auth/sign-in").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === "saiteja.malladi@gmail.com" && password === "Idm@1234") {
    return [200, userData];
  }

  return [401, { message: "Please check your email and password" }];
});

mock.onPost("/api/auth/sign-up").reply(() => {
  return [200, userData];
});

mock.onPost("/api/auth/reset-password").reply(() => {
  return [200, userData];
});
