'use client'
import { createContext } from "react";

import type { ToastContextType } from "./type";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
