const htmllint = require("htmllint");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const opts = JSON.parse(fs.readFileSync(path.join(__dirname, ".htmllintrc"), "utf8"));

glob("**/*.ejs", function (er, files) {
  Promise.all(files.map(file => new Promise((resolve, reject) =>
    fs.readFile(file, "utf8", (err, data) => err ? reject(err) : resolve(data))
  ))).then(fileStrings => Promise.all(fileStrings.map((f, i) => {
    const filename = files[i];
    const absPath = path.resolve(process.cwd(), filename);
    let escaped = f
      .replace(new RegExp("<%(=|-).*?%>", "gs"), "null")
      .replace(new RegExp("<(?!%)((.(?!>))*?)<%.*%>(.*?)(?<!%)>", "g"), "<$1$3>") // eslint-disable-line
      .replace(new RegExp("<%(.*?)%>", "gs"), "<!--$1-->");
    if (filename.endsWith('downloads.ejs')) {
      console.log(f, escaped);
    }
    return htmllint(escaped, opts).then(issues => {
      issues.forEach(issue => {
        console.log(`${chalk.magenta(absPath)}:${issue.line}:${issue.column}  ${chalk.red(htmllint.messages.renderIssue(issue))}\n`);
      });
      return issues.length;
    }).catch(err => {
      throw ("[htmllint error in " + filename + " ] " + err);
    });
  })).then(issues => {
    const totalIssues = issues.reduce((acc, val) => acc + val);
    if (totalIssues > 0) {
      console.log(chalk.red(`${totalIssues} issues were found\n`));
      process.exit(1);
    }
  }));
});