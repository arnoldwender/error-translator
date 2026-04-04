/* ------------------------------------------------------------------ */
/* Error database — translations for 5 personas across 48 error types */
/* ------------------------------------------------------------------ */

export type Persona = 'therapist' | 'drama' | 'genz' | 'shakespeare' | 'corporate';

export interface PersonaTranslations {
  therapist: string;
  drama: string;
  genz: string;
  shakespeare: string;
  corporate: string;
}

export interface ErrorEntry {
  code: string;
  translations: PersonaTranslations;
  therapy: string;
  emoji: string;
  /** Severity 1-4 controls the emotion meter face */
  severity: number;
  /** Sound key used by the audio engine */
  sound: 'sadTrombone' | 'glassBreak' | 'clockTick' | 'dramaticReveal' | 'errorBeep' | 'dial' | 'boom';
}

/* ---------- Full database ---------- */

export const ERROR_DATABASE: ErrorEntry[] = [
  // --- JavaScript / Node ---
  {
    code: "Cannot read properties of undefined",
    translations: {
      therapist: "It sounds like your code assumed something would be there for it. That expectation wasn't met, and that's okay to grieve.",
      drama: "OH MY GOD, it tried to READ from UNDEFINED?! That's like opening a door to NOTHING! THE VOID STARES BACK!",
      genz: "bestie your code said 'lemme grab that' and grabbed literally nothing. the property said 'i don't exist' and dipped fr fr",
      shakespeare: "O wretched code! Thou seekest properties in the barren fields of undefined! A fool's errand most assured!",
      corporate: "Per our records, the referenced property does not exist on the undefined object. Please align with your team on null-safe access patterns. Regards, The Runtime.",
    },
    therapy: "Lower your expectations. In code and in general.",
    emoji: "🫥",
    severity: 2,
    sound: 'sadTrombone',
  },
  {
    code: "TypeError",
    translations: {
      therapist: "You gave something the wrong type of thing. It expected love, you gave it undefined. Let's work through that.",
      drama: "A TYPE ERROR?! You literally gave it the WRONG THING! It's like bringing a fish to a dog show! THE AUDACITY!",
      genz: "lmaooo you gave it the wrong type bestie. it wanted a string and you gave it vibes. not the same thing no cap",
      shakespeare: "Thou hast offered a type most foul! Like presenting a turnip at a feast of kings! Fie upon thy casting!",
      corporate: "The supplied argument does not match the expected type signature. Please consult the TypeScript handbook and submit a revised implementation. Best, Engineering.",
    },
    therapy: "Be more explicit about what you're offering.",
    emoji: "💔",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "NaN",
    translations: {
      therapist: "The result is Not a Number. Sometimes things don't add up, and that's valid.",
      drama: "NOT A NUMBER?! WHAT DO YOU MEAN IT'S NOT A NUMBER?! I GAVE IT NUMBERS! THIS IS MATHEMATICAL BETRAYAL!",
      genz: "your math said 'nah' and literally became NaN. calculator app could never. this is so unserious",
      shakespeare: "What sorcery is this? A number that is not! Like a shadow without light, a void of arithmetic despair!",
      corporate: "The calculation returned NaN, indicating an invalid arithmetic operation. Please review inputs and resubmit. Finance will not approve NaN.",
    },
    therapy: "Perhaps reconsider your math. And your business plan.",
    emoji: "🔢",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "Maximum call stack exceeded",
    translations: {
      therapist: "You went too deep. Recursion without a base case is like spiraling thoughts without grounding. Let's find your base case.",
      drama: "THE STACK! IT'S OVERFLOWING! LIKE MY EMOTIONS! THERE'S NO END! WE'RE ALL TRAPPED IN AN INFINITE SPIRAL OF DESPAIR!",
      genz: "your function really said 'i'll call myself' and then called itself FOREVER. bro discovered infinity glitch irl",
      shakespeare: "O recursive serpent! Eating thine own tail without surcease! The stack doth overflow like the rivers of madness!",
      corporate: "The call stack has exceeded maximum depth. This suggests unbounded recursion. Please implement proper termination conditions per our coding standards.",
    },
    therapy: "Know when to stop. Add a base case. Go outside.",
    emoji: "🕳️",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "Promise rejected",
    translations: {
      therapist: "Something promised to do a thing and then didn't. Broken promises hurt. It's okay to feel that disappointment.",
      drama: "A PROMISE! REJECTED! JUST LIKE MY PULL REQUESTS! JUST LIKE MY HOPES AND DREAMS! THIS IS THE END!",
      genz: "the promise literally said 'nah i lied' and rejected you. been there bestie. the .catch() is your healing arc",
      shakespeare: "A promise, once sworn, now lies in ruin! Like a knight foresworn, the oath broken, the realm in chaos!",
      corporate: "The asynchronous operation failed to fulfill its commitment. Please implement proper error handling and escalate to the on-call engineer.",
    },
    therapy: "Handle your rejections gracefully. With a .catch().",
    emoji: "💔",
    severity: 2,
    sound: 'sadTrombone',
  },
  {
    code: "undefined is not a function",
    translations: {
      therapist: "You tried to call something that doesn't exist as a function. It's like reaching out to someone who was never there.",
      drama: "UNDEFINED IS NOT A FUNCTION?! OH THE HUMANITY! You tried to CALL the VOID! And the VOID SAID NO!",
      genz: "ah the javascript special. like ordering a burger and receiving the concept of hunger. undefined said 'i'm not callable' bestie",
      shakespeare: "Thou callest upon undefined as if 'twere a function! 'Tis like summoning a ghost to do thy bidding! Madness!",
      corporate: "The value 'undefined' cannot be invoked as a function. This is a classic JavaScript anti-pattern. Please refactor accordingly.",
    },
    therapy: "Check that your functions exist before calling them. Validate your assumptions.",
    emoji: "🌀",
    severity: 2,
    sound: 'sadTrombone',
  },
  {
    code: "CORS error",
    translations: {
      therapist: "Your request was rejected for coming from the wrong place. Cross-origin issues are about boundaries, and boundaries are healthy.",
      drama: "CORS SAID NO! YOUR REQUEST WAS DENIED AT THE BORDER! PAPERS NOT IN ORDER! ACCESS FORBIDDEN FROM YOUR ORIGIN!",
      genz: "cors really said 'you're not on the list' and bounced you from the API club. origin not valid. rejected era",
      shakespeare: "Thy request, sent from foreign shores, is denied! The server guards its borders with CORS most stern!",
      corporate: "The cross-origin request was blocked per CORS policy. Please coordinate with the backend team to whitelist your origin. CC: DevOps.",
    },
    therapy: "Sometimes you need a proxy to communicate. Consider therapy.",
    emoji: "🚫",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "heap out of memory",
    translations: {
      therapist: "You tried to hold too much at once. It's okay to let go of some things. Your heap needs space to breathe.",
      drama: "THE HEAP! IT'S FULL! THERE'S NO MORE ROOM! WE'RE DROWNING IN DATA! SOMEONE CALL THE GARBAGE COLLECTOR!",
      genz: "your app tried to hold every single thing in memory and crashed. bro is a digital hoarder fr fr. let go bestie",
      shakespeare: "The heap, once vast, is now consumed! Like a castle stuffed with treasures till the walls do burst!",
      corporate: "The V8 engine has exceeded its memory allocation limit. Please profile heap usage and optimize data structures. Budget for additional RAM has been denied.",
    },
    therapy: "Marie Kondo your variables. Does this bring joy? No? Delete it.",
    emoji: "🧠",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "infinite loop",
    translations: {
      therapist: "You're repeating the same thing expecting different results. Let's explore healthier loop patterns together.",
      drama: "AN INFINITE LOOP! THE HORROR! IT NEVER ENDS! LIKE MY SPRINT BACKLOG! SOMEONE CTRL+C THIS NIGHTMARE!",
      genz: "your code entered its infinite loop era and chose violence. same thing over and over. it's giving insanity definition",
      shakespeare: "O cursed loop, without end nor purpose! Like Sisyphus, condemned to push thy stone for all eternity!",
      corporate: "An unbounded iteration has been detected. This impacts system availability. Please add termination conditions per SLA requirements.",
    },
    therapy: "Add a break condition. In code and in life.",
    emoji: "🔄",
    severity: 3,
    sound: 'clockTick',
  },
  // --- Network / HTTP ---
  {
    code: "ECONNREFUSED",
    translations: {
      therapist: "Your server ghosted you. The connection was refused, and rejection always stings. It's not about you.",
      drama: "CONNECTION REFUSED! THE SERVER LITERALLY SLAMMED THE DOOR IN YOUR FACE! HOW DARE IT! AFTER ALL YOU'VE DONE!",
      genz: "the server literally said 'new phone who dis' and refused your connection. ghosted by localhost. that's rough bestie",
      shakespeare: "The server, cold and cruel, hath refused thy connection! Like a maiden spurning a suitor at the gate!",
      corporate: "The target host actively refused the connection. Please verify the service is running and the port is correct. This has been escalated to infrastructure.",
    },
    therapy: "Try talking to it again in 5 minutes. Or never.",
    emoji: "👻",
    severity: 2,
    sound: 'dial',
  },
  {
    code: "404 Not Found",
    translations: {
      therapist: "What you're looking for doesn't exist here. Sometimes things aren't where we expect them, and that's a lesson in acceptance.",
      drama: "404! NOT FOUND! IT'S GONE! VANISHED! LIKE MY WILL TO LIVE AFTER READING THIS CODEBASE!",
      genz: "404 bestie. whatever you're looking for has left the chat. it ghosted. it's gone. time to move on fr",
      shakespeare: "Alas! The page thou seekest hath vanished like morning mist! 'Twas here, now 'tis but a memory!",
      corporate: "The requested resource was not found at the specified URL. Please verify the endpoint path and consult the API documentation. Regards, Platform Team.",
    },
    therapy: "Accept the void. The void is fine.",
    emoji: "🕳️",
    severity: 1,
    sound: 'sadTrombone',
  },
  {
    code: "500 Internal Server Error",
    translations: {
      therapist: "The server had an internal breakdown. It's not ready to talk about what happened, and that's okay. Give it space.",
      drama: "500! THE SERVER IS HAVING A COMPLETE MELTDOWN! IT CAN'T EVEN! THE INTERNAL CRISIS IS REAL!",
      genz: "the server really said 'i literally cannot rn' and threw a 500. internal crisis moment. we've all been there bestie",
      shakespeare: "The server, wracked by inner turmoil, doth cry out '500!' A malaise most grave hath seized its very soul!",
      corporate: "An unexpected internal server error has occurred. The incident has been logged. Please do not reply to this error; a postmortem will follow.",
    },
    therapy: "Give it space. Check the logs. Cry a little.",
    emoji: "💀",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "ETIMEDOUT",
    translations: {
      therapist: "Something waited too long and gave up. Not every connection is meant to complete, and that's a form of closure.",
      drama: "TIMED OUT! IT WAITED AND WAITED AND NOTHING CAME! THE SILENCE IS DEAFENING! THE TIMEOUT IS ETERNAL!",
      genz: "your request waited so long it literally gave up. left on read by the server. timeout era unlocked",
      shakespeare: "The sands of time have run their course! Thy request, unanswered, fades into the abyss of expired connections!",
      corporate: "The request exceeded the configured timeout threshold. Please review network latency and adjust timeout parameters. SLA impact noted.",
    },
    therapy: "Some connections just aren't meant to be.",
    emoji: "⏰",
    severity: 2,
    sound: 'clockTick',
  },
  {
    code: "401 Unauthorized",
    translations: {
      therapist: "You weren't authorized. It's not personal -- access requires proper credentials, and asking for help is valid.",
      drama: "401! UNAUTHORIZED! YOU'RE NOT WELCOME HERE! LIKE SHOWING UP TO A PARTY YOU WEREN'T INVITED TO!",
      genz: "bro tried to access without credentials lmaooo. the server said 'who even are you' and blocked. bouncer energy",
      shakespeare: "Halt! Thou art not authorized to tread these hallowed paths! Present thy credentials or be gone, knave!",
      corporate: "Authentication failed. Please verify your API key or bearer token and ensure it has not expired. Contact Security for a credentials reset.",
    },
    therapy: "Maybe ask for permission before barging in.",
    emoji: "🔐",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "403 Forbidden",
    translations: {
      therapist: "Access is forbidden. Some doors aren't meant for you right now, and respecting boundaries is growth.",
      drama: "FORBIDDEN! YOU SHALL NOT PASS! THE SERVER HAS SPOKEN AND ITS WORD IS LAW! NO MEANS NO!",
      genz: "the server said 'absolutely not' and meant it. forbidden. blocked. do not pass go. do not collect 200. rip",
      shakespeare: "Forbid! The gates are barred against thee! No key nor cunning shall breach this fortress of denial!",
      corporate: "Your account lacks the necessary permissions for this resource. Please submit an access request through the IAM portal. Allow 3-5 business days.",
    },
    therapy: "Some doors are closed for a reason.",
    emoji: "🚪",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "npm ERR! ERESOLVE",
    translations: {
      therapist: "Your dependencies can't agree. Conflict resolution takes time, and sometimes peer dependencies need mediation.",
      drama: "ERESOLVE! YOUR DEPENDENCIES ARE AT WAR! PACKAGE A HATES PACKAGE B! THIS IS THE DEPENDENCY APOCALYPSE!",
      genz: "your node_modules are literally fighting each other. dependency drama is peak npm energy. delete it all and start over bestie",
      shakespeare: "The packages, like feuding houses, refuse to resolve! A plague upon both their peer dependencies!",
      corporate: "Dependency resolution has failed due to conflicting peer requirements. Please schedule a cross-team alignment meeting to discuss version strategy.",
    },
    therapy: "Delete node_modules. Delete your expectations.",
    emoji: "📦",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "Segmentation fault",
    translations: {
      therapist: "You touched memory that wasn't yours. Boundaries are important, even in address spaces.",
      drama: "SEGFAULT! YOU VIOLATED SACRED MEMORY! THE OPERATING SYSTEM IS FURIOUS! CORE DUMPED! EVERYTHING IS RUINED!",
      genz: "segfault bestie. you touched memory that said 'do not touch' and now everything's on fire. boundaries exist for a reason fr",
      shakespeare: "O vile transgression! Thou hast trespassed upon forbidden memory! The kernel's wrath is swift and merciless!",
      corporate: "A segmentation violation has occurred in the process address space. Core dump generated. Please file a bug report with the memory access trace.",
    },
    therapy: "Respect other people's memory space.",
    emoji: "🚧",
    severity: 4,
    sound: 'glassBreak',
  },
  {
    code: "git merge conflict",
    translations: {
      therapist: "Two versions of reality collided. Conflict is natural in collaboration. Let's work through this together, line by line.",
      drama: "MERGE CONFLICT! TWO BRANCHES ENTER, NEITHER LEAVES! THE CODE IS TORN BETWEEN TWO REALITIES!",
      genz: "git said 'pick a side' and you froze. merge conflict era. HEAD vs theirs. the most toxic relationship in tech",
      shakespeare: "Two branches, both alike in dignity, in fair repo where we lay our scene! Their merge, most foul, breeds conflict!",
      corporate: "A merge conflict has been detected. Please resolve the conflicting changes and re-submit the pull request. Code review is paused pending resolution.",
    },
    therapy: "Pick one. You can't have both. This applies to life too.",
    emoji: "⚔️",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "ENOENT: no such file",
    translations: {
      therapist: "The file you're looking for doesn't exist. Sometimes what we seek was never there, and that's a discovery too.",
      drama: "NO SUCH FILE! IT'S GONE! VANISHED! DID IT EVER EXIST?! IS ANYTHING REAL?! IS THIS ALL A SIMULATION?!",
      genz: "file not found bestie. you're looking for something that straight up doesn't exist. manifesting gone wrong",
      shakespeare: "The file, like a phantom, exists not! Search ye in vain through directories of despair!",
      corporate: "The specified file path does not resolve to an existing resource. Please verify the path and check deployment artifacts. ENOENT logged.",
    },
    therapy: "Check your assumptions. And your mental state.",
    emoji: "📁",
    severity: 1,
    sound: 'sadTrombone',
  },
  // --- Python ---
  {
    code: "IndentationError",
    translations: {
      therapist: "Your indentation is off. It's like trying to align your life -- small misalignments cause big problems.",
      drama: "INDENTATION ERROR?! ONE WRONG SPACE AND PYTHON LOSES ITS MIND! IT'S A TAB VS SPACES WARZONE!",
      genz: "python really said 'your spaces are wrong' and crashed. most dramatic language ever. it's giving OCD compiler",
      shakespeare: "Thy spacing hath offended Python's delicate sensibilities! A single tab awry and all is lost!",
      corporate: "Indentation does not conform to PEP 8 standards. Please configure your editor for consistent whitespace. This blocks the CI pipeline.",
    },
    therapy: "Set your editor to 4 spaces. End the tabs-vs-spaces war within yourself.",
    emoji: "📏",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "KeyError",
    translations: {
      therapist: "You asked a dictionary for something it doesn't have. Not every question has an answer, and that's okay.",
      drama: "KEY ERROR! THE DICTIONARY DOESN'T HAVE THAT KEY! IT'S LIKE LOOKING FOR MEANING IN A VOID!",
      genz: "you asked the dict for a key it doesn't have and it threw a whole tantrum. use .get() bestie. default values exist",
      shakespeare: "The key thou seekest lies not within this dictionary! 'Tis a quest for naught, a search most vain!",
      corporate: "The requested key does not exist in the dictionary object. Please use .get() with a default value per our Python style guide.",
    },
    therapy: "Use .get() with a default. Expect nothing, be prepared for everything.",
    emoji: "🔑",
    severity: 1,
    sound: 'sadTrombone',
  },
  {
    code: "ModuleNotFoundError",
    translations: {
      therapist: "The module you need isn't here. Dependencies are about connection, and sometimes we need to install what's missing.",
      drama: "MODULE NOT FOUND! YOUR IMPORT IS SCREAMING INTO THE VOID! DID YOU FORGET TO PIP INSTALL?! HOW COULD YOU!",
      genz: "lol you forgot to install the module. 'import vibes' doesn't work without pip install vibes first bestie",
      shakespeare: "The module thou dost import exists not in this realm! Hast thou forgotten the sacred pip install?",
      corporate: "The specified module is not available in the current environment. Please update requirements.txt and run pip install. DevOps has been notified.",
    },
    therapy: "pip install your problems. It works about half the time.",
    emoji: "📦",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "RecursionError",
    translations: {
      therapist: "You've gone too deep into recursion. Sometimes we need to step back before we can move forward.",
      drama: "RECURSION ERROR! THE FUNCTION IS EATING ITSELF! IT'S A OUROBOROS OF CODE! MAKE IT STOP!",
      genz: "your function literally called itself to death. recursion without a base case is just self-harm for code ngl",
      shakespeare: "O serpent of recursion! Thou devourest thine own tail without end! The stack weeps at thy madness!",
      corporate: "Maximum recursion depth exceeded. Please implement iterative solutions or increase sys.setrecursionlimit(). Performance review noted.",
    },
    therapy: "Every recursive function needs a way out. So does every developer.",
    emoji: "🐍",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "ZeroDivisionError",
    translations: {
      therapist: "You tried to divide by zero. Mathematically impossible, emotionally relatable. Some things just can't be split.",
      drama: "DIVIDE BY ZERO?! YOU TRIED TO TEAR THE FABRIC OF MATHEMATICS! THE UNIVERSE ITSELF REJECTS THIS!",
      genz: "you really tried to divide by zero and expected something to happen. math said 'nah' and crashed. unhinged behavior",
      shakespeare: "To divide by naught! 'Tis folly beyond measure! Even the gods of mathematics weep at such hubris!",
      corporate: "A division by zero error has occurred. Please add input validation to prevent this edge case. QA has been informed.",
    },
    therapy: "You can't divide something into nothing. That's both math and philosophy.",
    emoji: "➗",
    severity: 2,
    sound: 'sadTrombone',
  },
  // --- Java ---
  {
    code: "NullPointerException",
    translations: {
      therapist: "A null pointer. You reached for something that isn't there. It's okay to sit with that emptiness.",
      drama: "A NULLPOINTEREXCEPTION?! OH MY GOD! THE MOST CLASSIC, MOST DEVASTATING, MOST SOUL-CRUSHING ERROR IN ALL OF JAVA! WE'RE ALL GOING TO DIE!",
      genz: "bestie your null pointer is giving unhinged fr fr no cap. you tried to use something that literally doesn't exist. very that",
      shakespeare: "Alas! The pointer of null hath struck again! Like grasping at air where substance once did dwell!",
      corporate: "Per our null reference, please advise on next steps. The object was null when a non-null value was expected. Regards, The Stack Trace.",
    },
    therapy: "Optional.ofNullable(yourLife). Never assume something exists.",
    emoji: "☕",
    severity: 3,
    sound: 'sadTrombone',
  },
  {
    code: "ClassNotFoundException",
    translations: {
      therapist: "The class you need can't be found. Sometimes what we're looking for isn't on our classpath, and that's a journey.",
      drama: "CLASS NOT FOUND! YOUR ENTIRE OBJECT HIERARCHY IS COLLAPSING! THE CLASSPATH IS A LIE! EVERYTHING IS A LIE!",
      genz: "java can't find your class lol. did you forget to import it or is your classpath just vibes? definitely a you problem",
      shakespeare: "The class thou seekest dwells not upon this path! Like a knight errant searching for a castle of dreams!",
      corporate: "ClassNotFoundException indicates the JVM cannot locate the specified class. Please verify your classpath configuration and Maven dependencies.",
    },
    therapy: "Check your classpath. Check your life path. Both need attention.",
    emoji: "🏗️",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "OutOfMemoryError",
    translations: {
      therapist: "The JVM ran out of memory. Holding too much is exhausting -- for machines and people alike.",
      drama: "OUT OF MEMORY! THE JVM IS SUFFOCATING! THERE'S NO AIR! NO SPACE! THE HEAP IS A PRISON!",
      genz: "java heap said 'i'm at capacity' and gave up. your app is literally a memory hoarder. free() something bestie",
      shakespeare: "The memory, once abundant, now lies barren! The heap hath burst like a dam of sorrows!",
      corporate: "Java OutOfMemoryError: GC overhead limit exceeded. Please increase -Xmx or optimize object allocation. Infra budget request required for more RAM.",
    },
    therapy: "Increase your heap. Decrease your expectations. Balance is key.",
    emoji: "🪦",
    severity: 4,
    sound: 'glassBreak',
  },
  {
    code: "StackOverflowError",
    translations: {
      therapist: "Your stack overflowed. Too much recursion, too many layers. Sometimes you need to unwind before you can move forward.",
      drama: "STACK OVERFLOW! NOT THE WEBSITE -- THE ACTUAL ERROR! YOUR RECURSION HAS NO END! IT'S AN ABYSS!",
      genz: "stack overflow but not the website where you copy paste from. your actual stack overflowed. ironic honestly",
      shakespeare: "The stack, piled high with calls unanswered, doth topple! Like the Tower of Babel, reaching too far!",
      corporate: "StackOverflowError detected. Please review recursive method calls and implement proper termination conditions. Code review required before next deploy.",
    },
    therapy: "Not every problem needs more depth. Sometimes breadth is the answer.",
    emoji: "📚",
    severity: 3,
    sound: 'boom',
  },
  // --- Rust ---
  {
    code: "borrow checker",
    translations: {
      therapist: "The borrow checker said no. Ownership is complex -- in code and in relationships. Let's talk about your attachment style.",
      drama: "THE BORROW CHECKER! THE MOST TYRANNICAL OVERLORD IN ALL OF PROGRAMMING! IT WON'T LET YOU BORROW ANYTHING! EVER!",
      genz: "rust's borrow checker said 'that's not yours' and slapped your hand. possessive language behavior honestly. toxic but correct",
      shakespeare: "The borrow checker, stern and unyielding, doth deny thy claim! Ownership is sacred in this realm of Rust!",
      corporate: "The Rust borrow checker has identified a lifetime violation. Please restructure your code to satisfy ownership rules. Training resources attached.",
    },
    therapy: "Ownership and borrowing rules exist for safety. In Rust and in life.",
    emoji: "🦀",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "panic!",
    translations: {
      therapist: "Your program panicked. It's an extreme response, but sometimes that's the only honest reaction to an impossible situation.",
      drama: "PANIC! LITERALLY PANIC! THE PROGRAM ITSELF IS HAVING A PANIC ATTACK! THREAD MAIN PANICKED! WE'RE ALL PANICKING!",
      genz: "rust said panic! and honestly same. your program reached a state so bad it just gave up. relatable behavior",
      shakespeare: "PANIC! The program doth cry out in anguish! Like a ship struck upon the rocks of despair!",
      corporate: "An unrecoverable panic was triggered at runtime. Please replace panic!() with proper Result<T, E> error handling per Rust best practices.",
    },
    therapy: "Panic is valid sometimes. But Result<T, E> is usually healthier.",
    emoji: "🚨",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "lifetime may not live long enough",
    translations: {
      therapist: "A lifetime issue. Some references can't outlive their scope. It's about knowing when to let go.",
      drama: "THE LIFETIME ISN'T LONG ENOUGH! JUST LIKE MY PATIENCE WITH RUST! HOW LONG DOES A REFERENCE NEED TO LIVE?! FOREVER?!",
      genz: "rust said your reference has a short lifespan and tbh that's kinda existential. lifetime annotations are basically astrology for code",
      shakespeare: "The lifetime, brief as summer's breath, doth not suffice! The reference fades before its purpose is complete!",
      corporate: "Lifetime annotation mismatch detected. Please review the 'a bounds and ensure references do not outlive their owners. Pair programming session recommended.",
    },
    therapy: "Not everything can last forever. Annotate your lifetimes. Accept impermanence.",
    emoji: "⏳",
    severity: 2,
    sound: 'clockTick',
  },
  // --- Go ---
  {
    code: "nil pointer dereference",
    translations: {
      therapist: "You dereferenced a nil pointer. Reaching for something that's nil is like grasping at emptiness. Be gentle with yourself.",
      drama: "NIL POINTER DEREFERENCE! GO'S VERSION OF THE MILLION DOLLAR MISTAKE! YOUR GOROUTINE IS DEAD! DECEASED! GONE!",
      genz: "you tried to use a nil pointer and go said 'absolutely not.' it's giving null pointer energy but make it google",
      shakespeare: "Thou hast dereferenced nil! A pointer to nothing! Like seeking counsel from the empty throne!",
      corporate: "Runtime panic: nil pointer dereference. Please add nil checks before pointer access. This pattern should be caught in code review.",
    },
    therapy: "Always check for nil. In Go and in your expectations of others.",
    emoji: "🐹",
    severity: 3,
    sound: 'glassBreak',
  },
  {
    code: "goroutine leak",
    translations: {
      therapist: "Your goroutines are leaking. Some things keep running in the background even when you think they've stopped. Sound familiar?",
      drama: "GOROUTINE LEAK! THEY'RE MULTIPLYING! THEY'RE EVERYWHERE! A THOUSAND GOROUTINES AND NOT ONE OF THEM FINISHING!",
      genz: "your goroutines are leaking like my emotional baggage. they keep going even when nobody asked them to. relatable honestly",
      shakespeare: "The goroutines, like restless spirits, refuse to rest! Leaking forth into eternity, consuming all!",
      corporate: "Goroutine leak detected via pprof. Please ensure all goroutines have proper cancellation via context.Context. Memory usage trending upward.",
    },
    therapy: "Use context.WithCancel. Not everything should run forever.",
    emoji: "🚰",
    severity: 3,
    sound: 'clockTick',
  },
  {
    code: "deadlock",
    translations: {
      therapist: "A deadlock. Two things waiting for each other, neither willing to go first. It's a communication breakdown at its core.",
      drama: "DEADLOCK! EVERYTHING IS FROZEN! NOTHING MOVES! IT'S LIKE WAITING FOR A RESPONSE TO 'WE NEED TO TALK'!",
      genz: "deadlock detected. your goroutines are in a toxic relationship where nobody will go first. couples therapy for code needed",
      shakespeare: "A deadlock most foul! Two processes, locked in eternal standoff! Like lovers too proud to speak first!",
      corporate: "Fatal error: all goroutines are asleep - deadlock! Please review channel and mutex usage. Concurrency training has been scheduled for the team.",
    },
    therapy: "Someone has to make the first move. Use select with a timeout.",
    emoji: "🔒",
    severity: 4,
    sound: 'glassBreak',
  },
  // --- PHP ---
  {
    code: "T_PAAMAYIM_NEKUDOTAYIM",
    translations: {
      therapist: "An unexpected double colon. PHP's Hebrew error name is actually quite beautiful if you sit with it.",
      drama: "T_PAAMAYIM WHAT?! PHP CAN'T EVEN NAME ITS ERRORS IN ENGLISH! THIS IS PEAK PHP ENERGY! I CAN'T!",
      genz: "php really named an error T_PAAMAYIM_NEKUDOTAYIM and expected us to know what that means. most unserious language ever",
      shakespeare: "What tongue is this? T_PAAMAYIM_NEKUDOTAYIM! A curse in ancient Hebrew, spoken by the PHP oracle!",
      corporate: "Unexpected T_PAAMAYIM_NEKUDOTAYIM (scope resolution operator '::') error. Please review PHP class syntax. This is noted in the PHP documentation.",
    },
    therapy: "It means '::'. That's it. PHP just wanted to be dramatic.",
    emoji: "🐘",
    severity: 1,
    sound: 'sadTrombone',
  },
  {
    code: "Cannot modify header information",
    translations: {
      therapist: "Headers already sent. The ship has sailed on modifying the response. Timing is everything, in code and in life.",
      drama: "HEADERS ALREADY SENT! YOU'RE TOO LATE! THE RESPONSE IS GONE! LIKE A MESSAGE YOU CAN'T UNSEND!",
      genz: "php said 'too late the headers are sent' and honestly it's like trying to un-send a text. that ship sailed bestie",
      shakespeare: "The headers, once dispatched, cannot be recalled! Like words spoken in haste, they fly beyond thy grasp!",
      corporate: "Output started before header modification. Please ensure no whitespace or echo statements precede header() calls. Legacy code cleanup needed.",
    },
    therapy: "Output buffering exists for a reason. Start with ob_start().",
    emoji: "📮",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "Allowed memory size exhausted",
    translations: {
      therapist: "PHP ran out of its allowed memory. Even with limits, sometimes we consume more than we planned.",
      drama: "MEMORY EXHAUSTED! PHP'S TINY MEMORY LIMIT HAS BEEN BREACHED! 128M WASN'T ENOUGH! IT'S NEVER ENOUGH!",
      genz: "php ran out of memory which is honestly impressive given how little it starts with. ini_set your way out bestie",
      shakespeare: "The memory, rationed most cruelly, hath been consumed! PHP's meager allowance spent in but a moment!",
      corporate: "PHP fatal error: Allowed memory size exhausted. Please optimize your queries or increase memory_limit in php.ini. Hosting upgrade may be required.",
    },
    therapy: "Increase memory_limit. But also ask yourself: does this script really need all that data at once?",
    emoji: "🐘",
    severity: 3,
    sound: 'boom',
  },
  // --- General / Build ---
  {
    code: "Docker",
    translations: {
      therapist: "Container issues. Your isolated environment isn't as isolated as you'd like. Containment is hard work.",
      drama: "DOCKER IS BROKEN! THE CONTAINER WON'T START! IT WORKS ON YOUR MACHINE BUT NOT IN THE CONTAINER! THE IRONY!",
      genz: "docker said 'nah' and your container died. it works on my machine but not in the container. the duality of deployment",
      shakespeare: "The container, meant to hold thy code in safety, hath crumbled! Like a prison whose walls turn to dust!",
      corporate: "Docker container failed to start. Please verify Dockerfile, check port mappings, and ensure all environment variables are configured. DevOps ticket created.",
    },
    therapy: "Try docker-compose down && docker-compose up --build. The nuclear option.",
    emoji: "🐳",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "SSL certificate problem",
    translations: {
      therapist: "SSL trust issues. The certificate isn't trusted, and trust is the foundation of any secure connection.",
      drama: "SSL ERROR! THE CERTIFICATE IS UNTRUSTED! YOUR CONNECTION ISN'T SECURE! NOTHING IS SECURE! EVERYTHING IS COMPROMISED!",
      genz: "ssl said 'i don't trust this' and refused to connect. your certificate has trust issues. therapy for your https needed",
      shakespeare: "The seal of SSL, forged in deceit! The certificate, untrusted, leaves thy connection exposed to villains!",
      corporate: "SSL/TLS handshake failed. Certificate validation error. Please verify the certificate chain and check expiration dates. Security team alerted.",
    },
    therapy: "Renew your certificates. Renew your trust in the process.",
    emoji: "🔓",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "permission denied",
    translations: {
      therapist: "Permission denied. It's not that you can't -- it's that you haven't been given the access. Ask for what you need.",
      drama: "PERMISSION DENIED! YOU CAN'T DO THAT! YOU'RE NOT ALLOWED! THE FILE SYSTEM HAS SPOKEN!",
      genz: "permission denied bestie. you don't have access. the filesystem said 'not for you' and that's that. chmod or cry",
      shakespeare: "Denied! The permissions of the realm forbid thy passage! Like a peasant barred from the king's chamber!",
      corporate: "Operation failed: permission denied. Please verify file ownership and chmod settings. If elevated access is needed, submit a request to System Administration.",
    },
    therapy: "chmod 755. Or sudo. Or accept that some things aren't yours to change.",
    emoji: "⛔",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "syntax error",
    translations: {
      therapist: "A syntax error. The language didn't understand what you were trying to say. Miscommunication happens, and it's fixable.",
      drama: "SYNTAX ERROR! YOU FORGOT A SEMICOLON! OR A BRACKET! OR SOMETHING! THE PARSER IS HAVING A MENTAL BREAKDOWN!",
      genz: "syntax error bestie you literally can't spell in code. the compiler is judging you so hard rn. missing a bracket probably",
      shakespeare: "Thy syntax, mangled and malformed, doth confuse the parser! Like speaking prose in a tongue unknown!",
      corporate: "A syntax error has been detected at the indicated line. Please run the linter before committing. Pre-commit hooks are available.",
    },
    therapy: "Read the error message. It tells you exactly where you went wrong. Unlike people.",
    emoji: "✏️",
    severity: 1,
    sound: 'errorBeep',
  },
  {
    code: "race condition",
    translations: {
      therapist: "A race condition. Two things competing for the same resource, and the outcome depends on timing. Life is full of these.",
      drama: "RACE CONDITION! THREADS ARE COMPETING! DATA IS CORRUPTED! THE TIMING IS ALL WRONG! CHAOS REIGNS!",
      genz: "race condition detected. your threads are racing and nobody wins. it's giving toxic competition energy. use a mutex bestie",
      shakespeare: "A race most foul! Two threads, like rival knights, clash for the same prize! The result? Pure chaos!",
      corporate: "Non-deterministic behavior detected suggesting a race condition. Please implement proper synchronization primitives. Testing must include concurrent scenarios.",
    },
    therapy: "Use mutexes. Use locks. Use communication, not shared memory.",
    emoji: "🏃",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "disk space",
    translations: {
      therapist: "Out of disk space. You've been accumulating things without cleaning up. It's time to let go of old logs.",
      drama: "NO DISK SPACE! THE DRIVE IS FULL! YEARS OF DOCKER IMAGES AND LOG FILES HAVE CONSUMED EVERYTHING!",
      genz: "you ran out of disk space lol. too many docker images and log files. digital hoarding at its finest. clean up bestie",
      shakespeare: "The disk, once vast and empty, is now full to bursting! Like a treasury plundered by forgotten logs!",
      corporate: "Disk utilization has reached 100%. Please archive old data and remove unused Docker images. Capacity planning meeting scheduled.",
    },
    therapy: "df -h. Then delete those old Docker images you'll never use again.",
    emoji: "💿",
    severity: 2,
    sound: 'clockTick',
  },
  {
    code: "connection reset by peer",
    translations: {
      therapist: "The connection was reset by the other side. They ended it abruptly. Closure isn't always given -- sometimes you have to find it yourself.",
      drama: "CONNECTION RESET BY PEER! THEY JUST... HUNG UP! MID-CONVERSATION! THE AUDACITY! THE BETRAYAL!",
      genz: "the server literally hung up on you mid-request. connection reset by peer is the networking version of being ghosted fr",
      shakespeare: "Reset by peer! The connection, severed without warning! Like a friend who departs without farewell!",
      corporate: "TCP connection reset by peer. This may indicate server-side issues or network instability. Please coordinate with the partner team for resolution.",
    },
    therapy: "Implement retry logic with exponential backoff. In networking and in texting.",
    emoji: "📱",
    severity: 2,
    sound: 'dial',
  },
  {
    code: "too many open files",
    translations: {
      therapist: "Too many open files. You're trying to maintain too many connections at once. It's okay to close some.",
      drama: "TOO MANY OPEN FILES! THE OS IS DROWNING IN FILE DESCRIPTORS! CLOSE SOMETHING! ANYTHING!",
      genz: "too many open files bestie. your app has commitment issues and won't close anything. like having 200 browser tabs open",
      shakespeare: "Files upon files, opened without end! The system groans beneath their weight like Atlas bearing the world!",
      corporate: "Process has exceeded the maximum file descriptor limit. Please implement proper resource cleanup and consider increasing ulimit. Ops ticket created.",
    },
    therapy: "Close what you're not using. Files, connections, browser tabs, chapters of your life.",
    emoji: "📂",
    severity: 2,
    sound: 'clockTick',
  },
  {
    code: "502 Bad Gateway",
    translations: {
      therapist: "A bad gateway. The intermediary couldn't get a valid response. Being in the middle is hard.",
      drama: "502 BAD GATEWAY! THE PROXY IS CONFUSED! THE UPSTREAM IS DOWN! THE WHOLE CHAIN IS BROKEN!",
      genz: "502 bad gateway means the middleman server is confused. it asked upstream and upstream said 'idk lol.' great",
      shakespeare: "The gateway, corrupted and confused, delivers naught but error! The chain of servers, broken most foully!",
      corporate: "502 Bad Gateway response received. The upstream service may be down or overloaded. Please check service health dashboards and escalate to SRE.",
    },
    therapy: "Check nginx. Check the upstream service. Check if anyone else is experiencing this. You're not alone.",
    emoji: "🌉",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "429 Too Many Requests",
    translations: {
      therapist: "Too many requests. You're asking for too much too fast. Pace yourself. Rest is productive.",
      drama: "429! TOO MANY REQUESTS! SLOW DOWN! THE API CAN'T HANDLE YOUR NEEDINESS! GIVE IT SPACE!",
      genz: "you're spamming the api and it said 'chill.' 429 too many requests. the api needs boundaries too bestie",
      shakespeare: "Too many requests! Like a suitor too eager, thou hast overwhelmed the server with thy demands!",
      corporate: "Rate limit exceeded. Please implement request throttling and respect the Retry-After header. API usage report attached for review.",
    },
    therapy: "Implement rate limiting. In your API calls and in your texting habits.",
    emoji: "🐌",
    severity: 1,
    sound: 'clockTick',
  },
  {
    code: "webpack",
    translations: {
      therapist: "Webpack issues. Build tools are complex, and struggling with configuration doesn't mean you're not a good developer.",
      drama: "WEBPACK ERROR! THE BUILD IS BROKEN! THE CONFIG IS 500 LINES LONG AND NOBODY UNDERSTANDS IT! NOT EVEN WEBPACK!",
      genz: "webpack said 'i literally don't know what you want from me.' the config is vibes-based and the vibes are wrong",
      shakespeare: "Webpack, that labyrinthine beast, hath tangled thy bundles! A Minotaur of configuration most foul!",
      corporate: "Webpack build failed. Please review the build configuration and check for incompatible loaders. Migration to Vite has been proposed in the last retro.",
    },
    therapy: "Consider switching to Vite. Seriously.",
    emoji: "📦",
    severity: 2,
    sound: 'errorBeep',
  },
  {
    code: "kubernetes",
    translations: {
      therapist: "Kubernetes issues. Orchestrating containers is like managing a large team -- things go wrong, and that's normal.",
      drama: "KUBERNETES IS DOWN! THE PODS ARE CRASHING! THE CLUSTER IS ON FIRE! WHO DECIDED WE NEEDED THIS COMPLEXITY?!",
      genz: "k8s pods are crashlooping and honestly same. kubernetes is just containers having a group project. someone's always slacking",
      shakespeare: "The cluster, once harmonious, is now in disarray! Pods falling like soldiers upon a cursed battlefield!",
      corporate: "Multiple pod restarts detected in the production namespace. Please review resource limits and liveness probes. Incident channel opened in Slack.",
    },
    therapy: "kubectl get pods. Deep breath. Check the events. It's probably a misconfigured env var.",
    emoji: "☸️",
    severity: 3,
    sound: 'boom',
  },
  {
    code: "it works on my machine",
    translations: {
      therapist: "Ah, the classic deflection. 'It works on my machine' is the developer's way of saying 'I don't understand the environment.' Let's explore that.",
      drama: "IT WORKS ON YOUR MACHINE?! WELL CONGRATULATIONS! MAYBE WE SHOULD DEPLOY YOUR MACHINE TO PRODUCTION! GENIUS!",
      genz: "bro said 'it works on my machine' like that means anything. cool story. ship your laptop to prod then. problem solved",
      shakespeare: "It works upon thy machine, thou sayest? Then let us ship thy machine entire to the cloud, thou fool!",
      corporate: "Environmental parity issue noted. Please ensure Docker configurations match across development and production. 'Works on my machine' is not an acceptable resolution.",
    },
    therapy: "Docker exists for this exact reason. Containerize your code. Containerize your emotions.",
    emoji: "💻",
    severity: 2,
    sound: 'dramaticReveal',
  },
];

/* ---------- Easter egg entries (handled specially) ---------- */

export const EASTER_EGGS: Record<string, ErrorEntry> = {
  /* Empty input */
  "": {
    code: "(empty input)",
    translations: {
      therapist: "The absence of errors is itself the greatest error. What are you avoiding?",
      drama: "NOTHING?! YOU PASTED NOTHING?! THE VOID STARES BACK AND IT IS UNIMPRESSED!",
      genz: "you submitted nothing. literally nothing. existential crisis unlocked. the code is you bestie",
      shakespeare: "Thou hast submitted the void itself! A canvas blank, a soul empty, a developer lost!",
      corporate: "No error was provided. This has been logged as a non-event. Please refrain from wasting system resources. Regards, Management.",
    },
    therapy: "The absence of errors is itself the greatest error.",
    emoji: "🫙",
    severity: 1,
    sound: 'dramaticReveal',
  },
  /* "it works on my machine" is in the main DB with a dramatic monologue trigger */
};

/* ---------- Hall of Fame — pre-seeded famous errors ---------- */

export interface HallOfFameEntry {
  error: string;
  translation: string;
  persona: Persona;
  relatableCount: number;
}

export const HALL_OF_FAME: HallOfFameEntry[] = [
  { error: "NullPointerException", translation: "Java's way of saying 'you trusted something you shouldn't have.'", persona: "therapist", relatableCount: 14203 },
  { error: "Segmentation fault (core dumped)", translation: "THE PROGRAM TOUCHED FORBIDDEN MEMORY AND DIED! CORE DUMPED! IT'S OVER!", persona: "drama", relatableCount: 9847 },
  { error: "npm ERR! ERESOLVE", translation: "your node_modules are literally fighting each other fr fr no cap", persona: "genz", relatableCount: 12551 },
  { error: "undefined is not a function", translation: "Like ordering a burger and receiving the concept of hunger.", persona: "therapist", relatableCount: 18942 },
  { error: "fatal: not a git repository", translation: "Thou standest outside the repository! A wanderer without a home!", persona: "shakespeare", relatableCount: 7623 },
  { error: "CORS error", translation: "Per our cross-origin policy, your request has been denied. Please submit Form XO-403.", persona: "corporate", relatableCount: 11204 },
  { error: "TypeError: Cannot read properties of null", translation: "bestie you can't read properties of null. null has no properties. null has nothing. null IS nothing", persona: "genz", relatableCount: 15678 },
  { error: "Error: ENOSPC: no space left on device", translation: "THE DISK IS FULL! YEARS OF LOG FILES HAVE CONSUMED THE WORLD!", persona: "drama", relatableCount: 6234 },
  { error: "IndentationError: unexpected indent", translation: "Python noticed one extra space and chose violence. Most dramatic language.", persona: "genz", relatableCount: 9012 },
  { error: "panic: runtime error", translation: "The program hath panicked! Like a horse startled by its own shadow!", persona: "shakespeare", relatableCount: 5432 },
  { error: "OOMKilled", translation: "The container exceeded its memory limit and was terminated. Budget for additional resources has been denied.", persona: "corporate", relatableCount: 8765 },
  { error: "git push rejected (non-fast-forward)", translation: "Git said 'no' because someone else pushed first. Classic.", persona: "therapist", relatableCount: 10432 },
];

/* ---------- Suggestions for the quick-select buttons ---------- */

export const SUGGESTIONS = [
  "NullPointerException",
  "Segmentation fault",
  "404 Not Found",
  "CORS error",
  "undefined is not a function",
  "npm ERR! ERESOLVE",
  "borrow checker",
  "it works on my machine",
  "IndentationError",
  "deadlock",
];

/* ---------- Translation log messages per persona ---------- */

export const TRANSLATE_LOGS: Record<Persona, string[]> = {
  therapist: [
    "Creating safe space for your error...",
    "Analyzing emotional undertones...",
    "Consulting the developer trauma database...",
    "Preparing empathetic response...",
    "Validating your feelings about this stack trace...",
    "Translation complete.",
  ],
  drama: [
    "SCANNING ERROR... OH NO...",
    "THIS IS BAD. THIS IS REALLY BAD.",
    "CONSULTING THE DRAMA AMPLIFICATION ENGINE...",
    "CATASTROPHE LEVEL: CALCULATING...",
    "PREPARING DRAMATIC READING...",
    "Translation complete.",
  ],
  genz: [
    "scanning vibes...",
    "checking the error's energy...",
    "no cap analyzing this rn...",
    "this is gonna be unhinged fr...",
    "translation loading slay...",
    "Translation complete.",
  ],
  shakespeare: [
    "Summoning the Bard's wisdom...",
    "Consulting ancient scrolls of debugging lore...",
    "Translating to iambic pentameter...",
    "The quill doth scratch upon parchment...",
    "Verily, the translation takes form...",
    "Translation complete.",
  ],
  corporate: [
    "Processing error through official channels...",
    "Cross-referencing with compliance database...",
    "Generating formal incident report...",
    "Adding appropriate disclaimers...",
    "Scheduling follow-up meeting...",
    "Translation complete.",
  ],
};

/* ---------- Persona metadata ---------- */

export const PERSONA_META: Record<Persona, { label: string; icon: string; description: string }> = {
  therapist: { label: "Therapist", icon: "🧘", description: "Gentle, empathetic, validating" },
  drama: { label: "Drama Queen", icon: "👑", description: "Over-the-top catastrophizing" },
  genz: { label: "Gen-Z", icon: "💅", description: "Unhinged, no cap, fr fr" },
  shakespeare: { label: "Shakespearean", icon: "🎭", description: "Dramatic, poetic, archaic" },
  corporate: { label: "Corporate", icon: "💼", description: "Formal, passive-aggressive" },
};
