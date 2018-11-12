import {
  Beautifier,
  Language,
  BeautifierBeautifyData,
  DependencyType,
} from "unibeautify";
import { sortPackageJson } from "sort-package-json";
import * as readPkgUp from "read-pkg-up";
import * as path from "path";
import * as fs from "fs";

const { pkg } = readPkgUp.sync({ cwd: __dirname });
export const beautifier: Beautifier = {
  name: "sort-package-json",
  package: pkg,
  dependencies: [
    {
      type: DependencyType.Node,
      name: "sort-package-json",
      package: "sort-package-json",
      homepageUrl: "https://github.com/keithamus/sort-package-json",
      installationUrl: "https://github.com/keithamus/sort-package-json",
      bugsUrl: "https://github.com/keithamus/sort-package-json/issues",
      badges: [
        {
          description: "Build Status",
          url: "https://travis-ci.org/keithamus/sort-package-json.svg",
          href: "https://travis-ci.org/keithamus/sort-package-json",
        },
      ],
    },
  ],
  options: {
    JSON: true,
  },
  resolveConfig: () => {
    return Promise.resolve({});
  },
  beautify({
    text,
    options,
    filePath,
    projectPath,
    dependencies,
    beautifierConfig,
  }: BeautifierBeautifyData) {
    return new Promise<string>((resolve, reject) => {
      if (!filePath) {
        resolve(text);
      }
      const fileName = path.basename(<string>filePath);
      if (fileName === "package.json") {
        const sortedJSON = sortPackageJson(text);

        return resolve(sortedJSON);
      }
    });
  },
};
export default beautifier;
