export interface ErrorEntry {
  code: string;
  human: string;
  therapy: string;
  emoji: string;
}

export const ERROR_DATABASE: ErrorEntry[] = [
  {
    code: "ECONNREFUSED",
    human: "Your server ghosted you. It's not you. It's them.",
    therapy: "Try talking to it again in 5 minutes. Or never.",
    emoji: "👻",
  },
  {
    code: "Cannot read properties of undefined",
    human: "You assumed something existed. It didn't. Story of your life.",
    therapy: "Lower your expectations. In code and in general.",
    emoji: "🫥",
  },
  {
    code: "404 Not Found",
    human: "What you're looking for doesn't exist. Much like your work-life balance.",
    therapy: "Accept the void. The void is fine.",
    emoji: "🕳️",
  },
  {
    code: "500 Internal Server Error",
    human: "The server had an existential crisis. It's not ready to talk about it.",
    therapy: "Give it space. Check the logs. Cry a little.",
    emoji: "💀",
  },
  {
    code: "ETIMEDOUT",
    human: "Something waited too long and gave up. Relatable.",
    therapy: "Some connections just aren't meant to be.",
    emoji: "⏰",
  },
  {
    code: "npm ERR! ERESOLVE",
    human: "Your dependencies are having a conflict. Like your team in Q3.",
    therapy: "Delete node_modules. Delete your expectations.",
    emoji: "📦",
  },
  {
    code: "Segmentation fault",
    human: "You touched memory that wasn't yours. Boundaries matter.",
    therapy: "Respect other people's memory space.",
    emoji: "🚧",
  },
  {
    code: "git merge conflict",
    human: "Two versions of reality collided. Neither is willing to compromise.",
    therapy: "Pick one. You can't have both. This applies to life too.",
    emoji: "⚔️",
  },
  {
    code: "CORS error",
    human: "Your request was rejected for coming from the wrong place. We've all been there.",
    therapy: "Sometimes you need a proxy to communicate. Consider therapy.",
    emoji: "🚫",
  },
  {
    code: "TypeError",
    human: "You gave something the wrong type of thing. It expected love, you gave it undefined.",
    therapy: "Be more explicit about what you're offering.",
    emoji: "💔",
  },
  {
    code: "heap out of memory",
    human: "You tried to hold too much at once. Let something go.",
    therapy: "Marie Kondo your variables. Does this bring joy? No? Delete it.",
    emoji: "🧠",
  },
  {
    code: "infinite loop",
    human: "You're doing the same thing over and over expecting different results. That's the definition of insanity.",
    therapy: "Add a break condition. In code and in life.",
    emoji: "🔄",
  },
  {
    code: "401 Unauthorized",
    human: "You're not supposed to be here. Classic.",
    therapy: "Maybe ask for permission before barging in.",
    emoji: "🔐",
  },
  {
    code: "403 Forbidden",
    human: "You're not allowed here and you know it. Stop trying.",
    therapy: "Some doors are closed for a reason.",
    emoji: "🚪",
  },
  {
    code: "NaN",
    human: "The result is Not a Number. Just like your ROI projections.",
    therapy: "Perhaps reconsider your math. And your business plan.",
    emoji: "🔢",
  },
  {
    code: "Maximum call stack exceeded",
    human: "You went too deep. Way too deep. Nobody asked you to go this deep.",
    therapy: "Know when to stop. Add a base case. Go outside.",
    emoji: "🕳️",
  },
  {
    code: "ENOENT: no such file",
    human: "The file you're looking for doesn't exist. You may have imagined it.",
    therapy: "Check your assumptions. And your mental state.",
    emoji: "📁",
  },
  {
    code: "Promise rejected",
    human: "Something promised to do a thing and then didn't. Just like everyone else.",
    therapy: "Handle your rejections gracefully. With a .catch().",
    emoji: "💔",
  },
];

export const SUGGESTIONS = [
  "ECONNREFUSED",
  "404 Not Found",
  "TypeError",
  "git merge conflict",
  "npm ERR! ERESOLVE",
  "heap out of memory",
  "infinite loop",
  "Promise rejected",
  "CORS error",
];

export const TRANSLATE_LOGS = [
  "Parsing error message...",
  "Cross-referencing trauma database...",
  "Consulting emotional support algorithms...",
  "Analyzing developer suffering index...",
  "Generating human-readable disappointment...",
  "Translation complete.",
];
