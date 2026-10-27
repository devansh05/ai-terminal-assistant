import chalk from "chalk"; // chalk is used to write text in terminal
import boxen from "boxen"; // used to add proper ui in terminal like boxes
import figlet from "figlet";

export function printBanner() {
  // figlet is used to add titles on terminal
  const title = figlet.textSync("ai-terminal-agent-cli", { font: "Standard" });
  const panel = boxen(
    chalk.cyan("Learn the Claude Agent SDK\n") +
      chalk.dim("Full Production Ready"),
    { padding: 1, borderColor: "cyan" },
  );

  console.log("📋 title", title);
  console.log("📋 panel", panel);
}
