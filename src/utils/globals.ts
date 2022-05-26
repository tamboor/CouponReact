//TODO: globals for heroku

class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
    getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
    adminLogin: "http://localhost:8080/admin/login",
    companyLogin: "http://localhost:8080/company/login",
    customerLogin: "http://localhost:8080/customer/login",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    getAllCompanies: "/admin/getAllCompanies",
    adminLogin: "/admin/login",
    companyLogin: "/company/login",
    customerLogin: "/customer/login",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
