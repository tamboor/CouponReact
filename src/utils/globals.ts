//TODO: globals for heroku

class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    // kittens: "https://raw.githubusercontent.com/KobiShashs/Caas-Resources/master/cats.json"
    getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
    adminLogin: "http://localhost:8080/admin/login",
    companyLogin: "http://localhost:8080/company/login",
    customerLogin: "http://localhost:8080/customer/login",
    checkCoupon: "http://localhost:8080/customer/checkCoupon",
    updateCoupon: "http://localhost:8080/company/updateCoupon",
    addCoupon: "http://localhost:8080/company/addCoupon",
    deleteCustomer: "http://localhost:8080/admin/deleteCustomer",
    deleteCompany: "http://localhost:8080/admin/deleteCompany",
    deleteCoupon: "http://localhost:8080/company/deleteCoupon",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    getAllCompanies: "/admin/getAllCompanies",
    adminLogin: "/admin/login",
    companyLogin: "/company/login",
    customerLogin: "/customer/login",
    checkCoupon: "/customer/checkCoupon",
    updateCoupon: "/company/updateCoupon",
    addCoupon: "/company/addCoupon",
    deleteCustomer: "/admin/deleteCustomer",
    deleteCompany: "/admin/deleteCompany",
    deleteCoupon: "/company/deleteCoupon",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;

export const host =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";
