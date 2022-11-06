require("module-alias/register");

const { setupApp } = require("@root/main/app");

const startApp = async () => {
  await setupApp();
};

startApp();
