//TODO: globals for heroku

class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
    getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    getAllCompanies: "/admin/getAllCompanies",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
