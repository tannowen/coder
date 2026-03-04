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
    title: 'Hello VHDL: The AND Gate',
    category: 'Basics',
    difficulty: 'Beginner',
    lesson: `
# Understanding the AND Gate

In digital logic, an **AND gate** is a basic gate that outputs '1' only if all its inputs are '1'. 

In VHDL, we describe hardware using an **Entity** and an **Architecture**.

### 1. The Entity
The entity defines the "box" and its "pins" (ports). 
\`\`\`vhdl
entity and_gate is
    Port ( a : in  std_logic;
           b : in  std_logic;
           q : out std_logic);
end and_gate;
\`\`\`
- \`in\`: The signal enters the module.
- \`out\`: The signal leaves the module.
- \`std_logic\`: A data type representing a single bit.

### 2. The Architecture
The architecture defines what happens inside the box.
\`\`\`vhdl
architecture Behavioral of and_gate is
begin
    q <= a and b; -- Concurrent assignment
end Behavioral;
\`\`\`
The symbol \`<=\` is the signal assignment operator. In this case, it happens "concurrently", meaning whenever \`a\` or \`b\` changes, \`q\` is updated immediately.
    `,
    quiz: [
      {
        question: "What does the 'entity' block define in VHDL?",
        options: [
          "The internal logic behavior",
          "The external interface and ports",
          "The simulation testbench",
          "The power consumption"
        ],
        correctAnswer: 1,
        explanation: "The entity defines the inputs and outputs (ports) of the module, essentially its external interface."
      },
      {
        question: "Which operator is used for signal assignment in VHDL?",
        options: [
          "=",
          ":=",
          "<=",
          "=="
        ],
        correctAnswer: 2,
        explanation: "The <= operator is used for signal assignment in VHDL architectures."
      }
    ],
    description: `
Implement the AND gate logic.

### Objectives:
- Use the provided entity \`and_gate\`.
- In the architecture, assign the logical AND of \`a\` and \`b\` to \`q\`.
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
    -- Write your code here
    
end Behavioral;`,
  },
  {
    id: 'half-adder',
    title: 'Arithmetic: Half Adder',
    category: 'Arithmetic',
    difficulty: 'Beginner',
    lesson: `
# Arithmetic in VHDL: The Half Adder

Digital systems often need to perform addition. The simplest adder is the **Half Adder**.

### Logic
- **Sum**: \`A XOR B\` (The result of addition)
- **Carry**: \`A AND B\` (The overflow to the next bit)

### Multiple Assignments
In a VHDL architecture, you can have multiple concurrent assignments. They all execute "at the same time" in the hardware.

\`\`\`vhdl
sum <= a xor b;
carry <= a and b;
\`\`\`
    `,
    quiz: [
      {
        question: "What is the result of a Half Adder when A='1' and B='1'?",
        options: [
          "Sum=0, Carry=0",
          "Sum=1, Carry=0",
          "Sum=0, Carry=1",
          "Sum=1, Carry=1"
        ],
        correctAnswer: 2,
        explanation: "1 + 1 in binary is 10, so Sum is 0 and Carry is 1."
      }
    ],
    description: `
Implement the Half Adder logic.

### Objectives:
- Entity: \`half_adder\`
- Assign \`a XOR b\` to \`sum\`.
- Assign \`a AND b\` to \`carry\`.
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
    -- sum <= ...
    -- carry <= ...
end Behavioral;`,
  },
  {
    id: 'mux-2to1',
    title: 'Combinational: 2-to-1 Multiplexer',
    category: 'Combinational',
    difficulty: 'Beginner',
    lesson: `
# Multiplexers (MUX)

A **Multiplexer** is like a selector switch. It has multiple data inputs and one "select" input that decides which data input reaches the output.

### The 'When-Else' Statement
A powerful way to write selection logic in VHDL is using the \`when-else\` syntax.

\`\`\`vhdl
q <= d0 when sel = '0' else d1;
\`\`\`

This reads almost like English: "Assign d0 to q when sel is 0, otherwise assign d1."
    `,
    quiz: [
      {
        question: "In a 2-to-1 MUX, if sel = '1', which input is sent to the output?",
        options: [
          "d0",
          "d1",
          "Neither",
          "Both"
        ],
        correctAnswer: 1,
        explanation: "The select line '1' typically chooses the second input (d1)."
      }
    ],
    description: `
Implement a 2-to-1 Multiplexer using \`when-else\`.

### Objectives:
- If \`sel = '0'\`, \`q\` should be \`d0\`.
- Otherwise, \`q\` should be \`d1\`.
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
    -- Use when-else assignment
end Behavioral;`,
  },
  {
    id: 'd-flip-flop',
    title: 'Sequential Logic: D Flip-Flop',
    category: 'Sequential',
    difficulty: 'Intermediate',
    lesson: `
# Sequential Logic & The D Flip-Flop

Unlike combinational logic, **sequential logic** depends on a clock signal.

### The Process Block
To describe sequential logic in VHDL, we use a \`process\`. A process only "wakes up" when a signal in its **sensitivity list** changes.

\`\`\`vhdl
process(clk) -- clk is in the sensitivity list
begin
    if rising_edge(clk) then
        q <= d; -- happens only on the clock's rising edge
    end if;
end process;
\`\`\`

### Key Concepts:
- \`rising_edge(clk)\`: Detects the '0' to '1' transition.
- **Registers**: A D-FF stores 1 bit of information.
    `,
    quiz: [
      {
        question: "What is the purpose of the sensitivity list in a process?",
        options: [
          "To list all variables",
          "To specify which signals trigger the process",
          "To define priority",
          "To hide signals"
        ],
        correctAnswer: 1,
        explanation: "The sensitivity list tells the simulator which signal changes should trigger the execution of the process block."
      }
    ],
    description: `
Implement a simple D Flip-Flop.

### Objectives:
- Use a \`process(clk)\`.
- Inside, use \`if rising_edge(clk)\`.
- Assign \`d\` to \`q\`.
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
        -- Write your code here
    end process;
end Behavioral;`,
  },
  {
    id: 'binary-counter',
    title: 'Sequential: 4-bit Binary Counter',
    category: 'Sequential',
    difficulty: 'Intermediate',
    lesson: `
# Building a Counter

A counter is a sequential circuit that increments its value on every clock cycle.

### Numeric Types
To perform math (like \`+ 1\`), we need the \`numeric_std\` library and types like \`unsigned\`.

\`\`\`vhdl
use IEEE.NUMERIC_STD.ALL;
-- ...
signal count_reg : unsigned(3 downto 0) := "0000";
-- ...
count_reg <= count_reg + 1;
\`\`\`

### Reset
Counters usually have a **reset** signal to bring the count back to zero.
    `,
    quiz: [
      {
        question: "Which library is required for arithmetic operations in VHDL?",
        options: [
          "std_logic_1164",
          "numeric_std",
          "math_real",
          "std_arith"
        ],
        correctAnswer: 1,
        explanation: "numeric_std is the modern, standard library for arithmetic operations."
      }
    ],
    description: `
Implement a 4-bit binary counter with an active-high reset.

### Objectives:
- If \`reset = '1'\`, set \`count_reg\` to 0.
- On \`rising_edge(clk)\`, increment \`count_reg\`.
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
        -- Write counter logic here
    end process;
    
    q <= std_logic_vector(count_reg);
end Behavioral;`,
  }
];
// Note: More exercises would be updated similarly...
