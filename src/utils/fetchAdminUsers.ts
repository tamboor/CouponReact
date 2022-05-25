let fetchMehodCustomers = () => {};
let fetchMehodCompanies = () => {};

export function setFetchMethodCustomers(method: () => void) {
  fetchMehodCustomers = method;
}

export function invokeFetchCustomers() {
  fetchMehodCustomers();
}

export function setFetchMethodCompanies(method: () => void) {
  fetchMehodCompanies = method;
}

export function invokeFetchCompanies() {
  fetchMehodCompanies();
}

//todo: MAKE SMARTER
