import { IO } from "fp-ts/lib/IO";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as UI from "../store/slices/ui";

export type ModalState = "showing" | "hidden";

export type ModalStateManager = {
  reset: IO<void>;
  show: IO<void>;
  hide: IO<void>;
  toggle: IO<void>;
  isShowing: boolean;
};

export const useModalState = (defaultState: ModalState = "hidden"): ModalStateManager => {
  const [modalState, setModalState] = useState<ModalState>(defaultState);
  const dispatch = useDispatch();
  const setState = (value: ModalState) => {
    switch (`${modalState} -> ${value}`) {
      case "showing -> hidden":
        dispatch(UI.actions.closeModal()), setModalState("hidden");
        break;
      case "hidden -> showing":
        dispatch(UI.actions.openModal()), setModalState("showing");
        break;
      default:
        break;
    }
  };
  return {
    reset: () => setState(defaultState),
    show: () => setState("showing"),
    hide: () => setState("hidden"),
    toggle: () => setState(modalState === "hidden" ? "showing" : "hidden"),
    isShowing: modalState === "showing",
  };
};
