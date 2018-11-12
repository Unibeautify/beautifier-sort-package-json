import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";
import * as path from "path";

const filePath: string = path.resolve(__dirname, "package.json");

test("should successfully format json", () => {
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);

  const text = `{
  "keywords": ["test", "another", "keyword"],
  "scripts": {
    "start": "start",
    "build": "build"
  },
  "version": "0.0.1",
  "name": "test",
  "devDependencies": {
    "unibeautify": "0.17.0",
    "@types/jest": "23.3.9"
  },
  "description": "Test npm package.json",
  "dependencies": {
    "rimraf": "2.6.2"
  }
}`;
  const beautifierResult = `{
  "name": "test",
  "version": "0.0.1",
  "description": "Test npm package.json",
  "keywords": [
    "another",
    "keyword",
    "test"
  ],
  "scripts": {
    "build": "build",
    "start": "start"
  },
  "dependencies": {
    "rimraf": "2.6.2"
  },
  "devDependencies": {
    "@types/jest": "23.3.9",
    "unibeautify": "0.17.0"
  }
}`;

  return unibeautify
    .beautify({
      filePath,
      languageName: "JSON",
      options: {
        JSON: {},
      },
      text,
    })
    .then(results => {
      expect(results).toBe(beautifierResult);
    });
});
