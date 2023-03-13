function getUserConfig() {
  const config = {};
  config.activated = Office.context.roamingSettings.get("activated");
  config.email = Office.context.roamingSettings.get("email");

  return config;
}

function resetUserConfig(){
  Office.context.roamingSettings.remove("activated");
  Office.context.roamingSettings.remove("email");
  Office.context.roamingSettings.saveAsync();
}

function setUserConfig(email) {
  Office.context.roamingSettings.set("activated", true);
  Office.context.roamingSettings.set("email", email);

  Office.context.roamingSettings.saveAsync();

  return {
    activated: true,
    email: email,
  };
}
