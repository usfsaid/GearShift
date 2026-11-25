import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Dispatches the given fetch thunks once when the component mounts
export default function useLoad(...fetchers) {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchers.forEach((fetcher) => dispatch(fetcher()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
}
