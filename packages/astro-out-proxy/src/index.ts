import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";
import type { Options } from "./interfaces/options.js";
import type { AstroIntegration } from "astro";
import modifyLinks from "./lib/links.js";

const defaultOptions: Options = {
  safeAttribute: "data-safe",
};

function fromDir(startPath: string, filter: string) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let output: string[] = [];

  let files = fs.readdirSync(startPath);
  for (const file of files) {
    let filename = path.join(startPath, file);
    let stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      const result = fromDir(filename, filter);
      if (result) {
        output = output.concat(result);
      }
    } else if (filename.endsWith(filter)) {
      output.push(filename);
    }
  }

  return output;
}

export default function outProxy(options: Partial<Options>): AstroIntegration {
  const allOptions = { ...defaultOptions, ...options };

  return {
    name: "outLink",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const htmlFiles = fromDir(dir.pathname, ".html");

        if (!htmlFiles) return;

        for (const file of htmlFiles) {
          const html = fs.readFileSync(file, "utf-8");

          const root = parse(html);

          modifyLinks(root, allOptions);

          fs.writeFileSync(file, root.toString());
        }
      },
    },
  };
}
