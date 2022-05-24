let fetchFunc: () => void = () => {};

export function setRefreshFunction(func: () => void) {
  fetchFunc = func;
}

export function refetchCoupons() {
  fetchFunc();
}
