import { Options } from "../interfaces/options";
import type { HTMLElement as ParserHTMLElement } from "node-html-parser";

export default function modifyLinks(
  root: HTMLElement | ParserHTMLElement,
  allOptions: Options
) {
  const links = root.querySelectorAll("a");

  for (const link of links) {
    const safe = link.getAttribute(allOptions.safeAttribute);
    const id = link.getAttribute("id");

    if (safe != undefined || id == allOptions.leaveButtonId) continue;

    const href = link.getAttribute("href");
    if (href?.startsWith("http")) {
      link.setAttribute(
        "href",
        `/out?${allOptions.redirectParameter}=${encodeURIComponent(href)}&target=${
          link.getAttribute("target") ?? ""
        }&rel=${link.getAttribute("rel") ?? ""}`
      );
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  }
}
