import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";

export const userIdNumber = atom({
  key: "userIdNumber",
  default: null,
});

// recoil 값을 localStorage에 저장하고 복원하는 커스텀 훅
export const usePersistRecoilState = (atom) => {
  const [state, setState] = useRecoilState(atom);

  useEffect(() => {
    const savedState = localStorage.getItem(atom.key);
    if (savedState !== null && savedState !== undefined) {
      setState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(atom.key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
