"use client";

import { useEffect } from "react";

export function ConsoleSignature() {
  useEffect(() => {
    const signal =
      "color:#c8f550;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:22px;font-weight:bold;line-height:1.3";
    const body =
      "color:#c8f550;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.7";
    const dim =
      "color:#9aa2af;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1.7";

    console.log(
      `%c◆%c
rishi@portfolio:~$ whoami
%c  mandavilli raju rishi deep — ai systems / full-stack / computer vision
  status .......... open for selected builds
  résumé .......... ${window.location.origin}/resume
  github .......... github.com/Rishideep-Mandavilli

%c  you opened the hood. that is exactly the instinct i build for.
  try the case-terminal under "case files." — type: help
  or route a signal at the bottom of the page. i answer fast.`,
      signal,
      body,
      "",
      dim,
    );
  }, []);

  return null;
}
