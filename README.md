# ai-terminal-assistant

An AI coding assistant for the terminal, built with Node.js, TypeScript and the [Claude Agent SDK](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk). It works like Cursor's chat panel, but in your shell. You can chat with Claude in a streaming session. Depending on the mode, it can read your project, edit files and run commands.

## Features

- **Interactive streaming chat** with Claude, right in your terminal
- **Three permission modes** that control what the agent is allowed to do:
  | Mode    | What it can do                                                    | Tools                                       |
  | ------- | ----------------------------------------------------------------- | ------------------------------------------- |
  | `agent` | Read, edit and run commands: the full agent loop (edits auto-accepted) | Read, Edit, Write, Bash, Glob, Grep         |
  | `ask`   | Read-only exploration; answers without changing files             | Read, Glob, Grep, WebSearch, WebFetch       |
  | `plan`  | Explores the code and proposes a plan; no edits are applied       | Read, Glob, Grep, WebSearch, WebFetch       |
- **Slash commands** inside a chat session (switch modes, check context usage, and more)
- **One-shot prompts** for quick questions without opening a session
- **Environment check** (`doctor`) for Node.js version and API key
- Terminal UI with an ASCII banner, spinners, colored output and boxed panels

## Requirements

- Node.js **18+**
- [pnpm](https://pnpm.io/) (the project uses `pnpm@10`)
- An [Anthropic API key](https://console.anthropic.com/)

## Installation

```bash
git clone <repo-url>
cd ai-terminal-assistant
pnpm install
```

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your-api-key-here
```

## Usage

During development, run commands with `tsx`:

```bash
pnpm dev <command> [options]
```

Or build and run the compiled output:

```bash
pnpm build
pnpm start <command> [options]
```

### Commands

| Command                | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `wakeup`               | Shows the banner, runs the environment check, lets you pick a mode, then starts chat |
| `chat`                 | Starts an interactive streaming chat session                       |
| `talk "<prompt>"`      | Sends a single prompt to the agent and prints the response         |
| `doctor`               | Checks that Node.js ≥ 18 is installed and `ANTHROPIC_API_KEY` is set |
| `banner`               | Shows the welcome banner                                           |
| `hello`                | Prints a greeting                                                  |

#### Options

- `chat -m, --mode <agent|ask|plan>`: sets the permission mode (default: `agent`)
- `chat -v, --verbose` / `talk -v, --verbose`: shows agent loop message types

### Examples

```bash
# Guided start: banner → checks → mode picker → chat
pnpm dev wakeup

# Chat in read-only mode
pnpm dev chat --mode ask

# Quick one-shot question
pnpm dev talk "Explain what src/cli.ts does"

# Verify your setup
pnpm dev doctor
```

### Slash commands (inside `chat`)

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `/mode agent\|ask\|plan` | Switch permission mode mid-session  |
| `/context`             | Show context window usage           |
| `/help`                | Show available slash commands       |
| `/exit`                | End the chat session                |

## Default limits

Every session runs with these defaults, set in `src/agent/modes.ts`:

- Max turns: **25**
- Max budget: **$0.50 USD**
- Effort: **medium**
- Settings source: project-level (`.claude/` in the working directory)

## Project structure

```
src/
├── index.ts               # Entry point
├── cli.ts                 # Command definitions (commander)
├── agent/
│   ├── create-session.ts  # Creates a streaming chat session
│   ├── input-queue.ts     # Queues user input for the session
│   ├── message-handler.ts # Renders SDK messages to the terminal
│   ├── modes.ts           # agent / ask / plan → SDK options & tools
│   ├── permissions.ts     # Interactive tool-approval prompt
│   └── run-query.ts       # One-shot query runner
├── commands/
│   ├── chat.ts            # Interactive chat loop + slash commands
│   └── wake-up.ts         # Guided startup flow
├── config/
│   ├── constants.ts       # Modes, descriptions, slash commands
│   └── env.ts             # API key and environment checks
└── ui/
    ├── banner.ts          # figlet ASCII banner
    ├── format.ts          # Colored output helpers
    └── spinner.ts         # ora spinner helpers
sample/                    # Small static web app to try the agent on
```

## Tech stack

- [@anthropic-ai/claude-agent-sdk](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk): agent loop and tools
- [commander](https://github.com/tj/commander.js): CLI parsing
- [@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js): interactive prompts
- [chalk](https://github.com/chalk/chalk), [ora](https://github.com/sindresorhus/ora), [boxen](https://github.com/sindresorhus/boxen), [figlet](https://github.com/patorjk/figlet.js): terminal UI
- [execa](https://github.com/sindresorhus/execa): running shell commands
- [dotenv](https://github.com/motdotla/dotenv): environment variables

## License

ISC
