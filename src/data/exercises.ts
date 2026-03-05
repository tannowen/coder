export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lesson: string; // The teaching content (Markdown)
  quiz: MCQ[];   // Multiple choice questions
  description: string; // The coding task description
  initialCode: string;
  solution?: string;
}

export const exercises: Exercise[] = [
  {
    id: 'hello-vhdl',
    title: 'The AND Gate Quest',
    category: 'Basics',
    difficulty: 'Beginner',
    lesson: `
# Welcome, Apprentice!

You are about to embark on the **AND Gate Quest**. In the world of Silicon, the AND gate is your first magic spell.

### The Magic of AND
Imagine two guards at a gate. Both guards must say "YES" ('1') for the gate to open. If even one says "NO" ('0'), the gate stays shut. That is an **AND gate**.

### The Grimoire: Entity & Architecture
Every VHDL module has two parts:

1. **The Entity (The Appearance)**: This defines what the module looks like from the outside—its input and output pins.
\`\`\`vhdl
entity and_gate is
    Port ( a : in  std_logic;
           b : in  std_logic;
           q : out std_logic);
end and_gate;
\`\`\`

2. **The Architecture (The Soul)**: This defines how the module *behaves*.
\`\`\`vhdl
architecture Behavioral of and_gate is
begin
    q <= a and b; -- The magic happens here!
end Behavioral;
\`\`\`

> **Apprentice Tip**: The \`std_logic\` type is just a fancy name for a single bit (a '0' or a '1').
    `,
    quiz: [
      {
        question: "If A is '1' and B is '0', what does an AND gate output?",
        options: [
          "'1' (Yes)",
          "'0' (No)",
          "It explodes",
          "Depends on the day"
        ],
        correctAnswer: 1,
        explanation: "An AND gate requires ALL inputs to be '1' to output '1'. Since B is '0', the output is '0'."
      },
      {
        question: "Which part of a VHDL file defines the inputs and outputs?",
        options: [
          "The Architecture",
          "The Entity",
          "The Library",
          "The Comments"
        ],
        correctAnswer: 1,
        explanation: "The Entity defines the external interface, including all input and output ports."
      }
    ],
    description: `
### Your Mission
Forgge the **AND gate** in your workshop. 

**Objectives:**
- Complete the architecture for the \`and_gate\`.
- Use the \`and\` operator to connect \`a\` and \`b\` to the output \`q\`.

**The Formula:**
\`q <= a and b;\`
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity and_gate is
    Port ( a : in  STD_LOGIC;
           b : in  STD_LOGIC;
           q : out STD_LOGIC);
end and_gate;

architecture Behavioral of and_gate is
begin
    -- Cast your spell here
    
end Behavioral;`,
  },
  {
    id: 'half-adder',
    title: 'The Arithmetic Alchemist',
    category: 'Arithmetic',
    difficulty: 'Beginner',
    lesson: `
# The Alchemist's Addition

Now that you can control basic gates, it's time to perform **Binary Alchemy**—also known as addition!

### The Half Adder
When you add two binary bits (A and B), you get two results:
1. **The Sum (S)**: The main result of the addition.
2. **The Carry (C)**: The overflow bit.

### The Logic of Addition
- **Sum**: This uses an **XOR** (Exclusive OR) gate. It outputs '1' if the inputs are different (e.g., 1+0=1, 0+1=1).
- **Carry**: This uses an **AND** gate. It outputs '1' only if both are '1' (e.g., 1+1=2, which is '0' with a carry of '1').

\`\`\`vhdl
sum <= a xor b;
carry <= a and b;
\`\`\`

In VHDL, these assignments happen **concurrently**—meaning they both update instantly whenever A or B changes!
    `,
    quiz: [
      {
        question: "In binary, what is 1 + 1?",
        options: [
          "2",
          "10 (0 with a carry of 1)",
          "11",
          "0"
        ],
        correctAnswer: 1,
        explanation: "In binary, 1+1 is 10. The sum bit is 0 and the carry bit is 1."
      }
    ],
    description: `
### Your Mission
Create a **Half Adder** to perform basic binary arithmetic.

**Objectives:**
- Calculate the \`sum\` using an \`xor\` gate.
- Calculate the \`carry\` using an \`and\` gate.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity half_adder is
    Port ( a : in  STD_LOGIC;
           b : in  STD_LOGIC;
           sum : out STD_LOGIC;
           carry : out STD_LOGIC);
end half_adder;

architecture Behavioral of half_adder is
begin
    -- Perform binary alchemy here
end Behavioral;`,
  },
  {
    id: 'mux-2to1',
    title: 'The Crossroads Multiplexer',
    category: 'Combinational',
    difficulty: 'Beginner',
    lesson: `
# The Crossroads: Multiplexers

A **Multiplexer (MUX)** is like a railroad switch. You have multiple data tracks, and one **Select** lever that chooses which track goes to the station.

### The 'When-Else' Spell
VHDL has a very elegant way to handle this selection called \`when-else\`.

\`\`\`vhdl
q <= d0 when sel = '0' else d1;
\`\`\`

This tells the hardware: "If the lever (sel) is at '0', send the first train (d0). Otherwise, send the second train (d1)."

It is the most common way to make decisions in combinational hardware!
    `,
    quiz: [
      {
        question: "If sel = '0', what will the output q be in 'q <= d0 when sel = '0' else d1'?",
        options: [
          "d1",
          "d0",
          "Empty",
          "Undefined"
        ],
        correctAnswer: 1,
        explanation: "The 'when sel = '0'' condition is met, so q takes the value of d0."
      }
    ],
    description: `
### Your Mission
Build a **2-to-1 Multiplexer** to control the flow of data at the crossroads.

**Objectives:**
- Use the \`when-else\` syntax.
- Route \`d0\` to \`q\` when \`sel\` is '0'.
- Route \`d1\` to \`q\` otherwise.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity mux_2to1 is
    Port ( d0  : in  STD_LOGIC;
           d1  : in  STD_LOGIC;
           sel : in  STD_LOGIC;
           q   : out STD_LOGIC);
end mux_2to1;

architecture Behavioral of mux_2to1 is
begin
    -- Control the crossroads here
end Behavioral;`,
  },
  {
    id: 'd-flip-flop',
    title: 'The Time Guardian (D-FF)',
    category: 'Sequential',
    difficulty: 'Intermediate',
    lesson: `
# The Time Guardian: Flip-Flops

Until now, your magic was "instant" (combinational). But to build complex systems, we need **memory** and **timing**.

### The Heartbeat: The Clock
In hardware, the **Clock (clk)** is the heartbeat of the system. It pulses from '0' to '1' and back again at a steady pace.

### The D Flip-Flop (D-FF)
A D-FF captures a value and "freezes" it until the next clock heartbeat.

### The 'Process' Block
To handle timing, we use a \`process\`. It only runs when the clock "ticks".

\`\`\`vhdl
process(clk)
begin
    if rising_edge(clk) then
        q <= d; -- The value of D is captured on the rising edge
    end if;
end process;
\`\`\`

> **Note**: \`rising_edge(clk)\` is the moment the clock goes from '0' to '1'.
    `,
    quiz: [
      {
        question: "When does a D Flip-Flop update its stored value?",
        options: [
          "As soon as D changes",
          "On the rising edge of the clock",
          "When the power is turned off",
          "Randomly"
        ],
        correctAnswer: 1,
        explanation: "A standard synchronous D Flip-Flop updates its output ONLY on the active clock edge (usually the rising edge)."
      }
    ],
    description: `
### Your Mission
Create a **D Flip-Flop** to act as a 1-bit memory cell for your quest.

**Objectives:**
- Create a \`process\` sensitive to the \`clk\`.
- Use \`rising_edge(clk)\` to detect the clock tick.
- Capture the value of \`d\` into \`q\`.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity d_ff is
    Port ( clk : in  STD_LOGIC;
           d   : in  STD_LOGIC;
           q   : out STD_LOGIC);
end d_ff;

architecture Behavioral of d_ff is
begin
    process(clk)
    begin
        -- Guard the time here
    end process;
end Behavioral;`,
  },
  {
    id: 'binary-counter',
    title: 'The Arcane Counter',
    category: 'Sequential',
    difficulty: 'Intermediate',
    lesson: `
# The Arcane Counter

A **Counter** is a sequential circuit that keeps track of how many clock pulses have occurred. It's the basis for timers and clocks in every computer.

### Arithmetic Types
VHDL is very strict about types. To add numbers like \`1 + 1\`, we use the **unsigned** type from the \`numeric_std\` library.

\`\`\`vhdl
use IEEE.NUMERIC_STD.ALL;
-- ...
signal count_reg : unsigned(3 downto 0) := (others => '0');
-- ...
count_reg <= count_reg + 1;
\`\`\`

### The Reset Ritual
Most counters have a **Reset** signal. When Reset is '1', the counter instantly goes back to zero, no matter what.
    `,
    quiz: [
      {
        question: "Which type is best for representing a binary number you want to increment?",
        options: [
          "std_logic",
          "unsigned",
          "boolean",
          "string"
        ],
        correctAnswer: 1,
        explanation: "The 'unsigned' type from numeric_std is designed for binary arithmetic like counting."
      }
    ],
    description: `
### Your Mission
Build a **4-bit Binary Counter** that increments on every clock tick.

**Objectives:**
- If \`reset\` is '1', set the count to 0.
- On the \`rising_edge(clk)\`, increment the \`count_reg\`.
- The output \`q\` is already connected to \`count_reg\` for you.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity binary_counter is
    Port ( clk   : in  STD_LOGIC;
           reset : in  STD_LOGIC;
           q     : out STD_LOGIC_VECTOR(3 downto 0));
end binary_counter;

architecture Behavioral of binary_counter is
    signal count_reg : unsigned(3 downto 0) := (others => '0');
begin
    process(clk, reset)
    begin
        -- Keep the arcane count here
    end process;
    
    q <= std_logic_vector(count_reg);
end Behavioral;`,
  }
];
