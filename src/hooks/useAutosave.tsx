import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useAutosave(saveFn: UseMutateFunction): {
  autosave: boolean;
  setAutosave: (value: boolean) => void;
} {
  const [autosave, setAutosave] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autosave) {
        saveFn();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      setAutosave(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key is not a dependency
  }, [autosave]);

  return { autosave, setAutosave };
}
