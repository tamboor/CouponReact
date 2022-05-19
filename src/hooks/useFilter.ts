import { useState } from "react";

interface Predicate<T> {
  (item: T): boolean;
}
interface UseFilterProps<T> {
  data: T[];
  filters: Predicate<T>[];
}

export default function useFilter<T>(props: UseFilterProps<T>) {
  //   const [result, setResult] = useState<T[]>(props.data);

  let tempResult = [...props.data];

  props.filters.forEach((filter) => {
    tempResult = tempResult.filter(filter);
  });

  return tempResult;
}
