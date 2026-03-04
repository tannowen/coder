export interface Exercise {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  initialCode: string;
  solution?: string;
}

export const exercises: Exercise[] = [
  {
    id: 'hello-vhdl',
    title: 'Hello VHDL: The AND Gate',
    category: 'Basics',
    difficulty: 'Beginner',
    description: `
Welcome to VHDL! In this first exercise, you'll create a simple 2-input AND gate.

### Objectives:
- Define an entity named \`and_gate\`.
- Use two input ports: \`a\` and \`b\` of type \`std_logic\`.
- Use one output port: \`q\` of type \`std_logic\`.
- Implement the behavior in the architecture.

The architecture should perform the logical AND of \`a\` and \`b\` and assign it to \`q\`.
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
    id: 'or-gate',
    title: 'The OR Gate',
    category: 'Basics',
    difficulty: 'Beginner',
    description: `
Now that you've mastered the AND gate, let's try an OR gate.

### Objectives:
- Define an entity named \`or_gate\`.
- Use two input ports: \`a\` and \`b\` of type \`std_logic\`.
- Use one output port: \`q\` of type \`std_logic\`.

The architecture should perform the logical OR of \`a\` and \`b\`.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity or_gate is
    Port ( a : in  STD_LOGIC;
           b : in  STD_LOGIC;
           q : out STD_LOGIC);
end or_gate;

architecture Behavioral of or_gate is
begin
    -- Write your code here

end Behavioral;`,
  },
  {
    id: 'xor-gate',
    title: 'The XOR Gate',
    category: 'Basics',
    difficulty: 'Beginner',
    description: `
The Exclusive OR (XOR) gate is fundamental for addition and error checking.

### Objectives:
- Entity name: \`xor_gate\`
- Ports: \`a\` (in), \`b\` (in), \`q\` (out)
- Implement \`q <= a xor b\`.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity xor_gate is
    Port ( a : in  STD_LOGIC;
           b : in  STD_LOGIC;
           q : out STD_LOGIC);
end xor_gate;

architecture Behavioral of xor_gate is
begin
    -- Write your code here

end Behavioral;`,
  },
  {
    id: 'half-adder',
    title: 'Half Adder',
    category: 'Arithmetic',
    difficulty: 'Beginner',
    description: `
A half adder takes two bits and produces a sum bit and a carry bit.

### Objectives:
- Entity name: \`half_adder\`
- Inputs: \`a\`, \`b\`
- Outputs: \`sum\`, \`carry\`
- Sum is the XOR of inputs.
- Carry is the AND of inputs.
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
    id: 'full-adder',
    title: 'Full Adder',
    category: 'Arithmetic',
    difficulty: 'Intermediate',
    description: `
A full adder adds three bits (including an input carry) and produces a sum and output carry.

### Objectives:
- Entity name: \`full_adder\`
- Inputs: \`a\`, \`b\`, \`cin\`
- Outputs: \`sum\`, \`cout\`
- \`sum = a ^ b ^ cin\`
- \`cout = (a & b) | (cin & (a ^ b))\`
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity full_adder is
    Port ( a : in  STD_LOGIC;
           b : in  STD_LOGIC;
           cin : in  STD_LOGIC;
           sum : out STD_LOGIC;
           cout : out STD_LOGIC);
end full_adder;

architecture Behavioral of full_adder is
begin
    -- Write your logic here
end Behavioral;`,
  },
  {
    id: 'mux-2to1',
    title: '2-to-1 Multiplexer',
    category: 'Combinational',
    difficulty: 'Beginner',
    description: `
A multiplexer (MUX) selects one of many inputs and forwards it to the output.

### Objectives:
- Entity name: \`mux_2to1\`
- Inputs: \`d0\`, \`d1\`, \`sel\`
- Output: \`q\`
- If \`sel = '0'\`, \`q\` should be \`d0\`.
- If \`sel = '1'\`, \`q\` should be \`d1\`.

Use the \`when-else\` assignment: \`q <= d0 when sel = '0' else d1;\`
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
    id: 'mux-4to1',
    title: '4-to-1 Multiplexer',
    category: 'Combinational',
    difficulty: 'Intermediate',
    description: `
Extend the MUX logic to 4 inputs.

### Objectives:
- Entity: \`mux_4to1\`
- Inputs: \`d\` (4-bit vector: \`std_logic_vector(3 downto 0)\`)
- Select: \`sel\` (2-bit vector: \`std_logic_vector(1 downto 0)\`)
- Output: \`q\`

Use a \`with-select\` or \`case\` statement inside a process.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity mux_4to1 is
    Port ( d   : in  STD_LOGIC_VECTOR(3 downto 0);
           sel : in  STD_LOGIC_VECTOR(1 downto 0);
           q   : out STD_LOGIC);
end mux_4to1;

architecture Behavioral of mux_4to1 is
begin
    -- Implement 4-to-1 selection logic
end Behavioral;`,
  },
  {
    id: 'decoder-3to8',
    title: '3-to-8 Decoder',
    category: 'Combinational',
    difficulty: 'Intermediate',
    description: `
A decoder converts a binary code into a "one-hot" output.

### Objectives:
- Entity: \`decoder_3to8\`
- Input: \`input_bin\` (3-bit)
- Output: \`output_dec\` (8-bit)
- If input is "000", output is "00000001".
- If input is "011", output is "00001000".
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity decoder_3to8 is
    Port ( input_bin  : in  STD_LOGIC_VECTOR(2 downto 0);
           output_dec : out STD_LOGIC_VECTOR(7 downto 0));
end decoder_3to8;

architecture Behavioral of decoder_3to8 is
begin
    -- Implement decoder logic
end Behavioral;`,
  },
  {
    id: 'd-flip-flop',
    title: 'Sequential Logic: D Flip-Flop',
    category: 'Sequential',
    difficulty: 'Intermediate',
    description: `
Flip-flops are the building blocks of sequential logic. A D Flip-Flop (DFF) captures the value of the D input at a definite portion of the clock cycle (such as the rising edge of the clock).

### Objectives:
- Entity name: \`d_ff\`
- Ports: \`clk\` (in), \`d\` (in), \`q\` (out)
- Implement a process that triggers on the rising edge of \`clk\`.
- On the rising edge, \`q\` should take the value of \`d\`.

Remember to use \`rising_edge(clk)\` inside your process!
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
    title: '4-bit Binary Counter',
    category: 'Sequential',
    difficulty: 'Intermediate',
    description: `
A counter increments its value on every clock cycle.

### Objectives:
- Entity: \`binary_counter\`
- Ports: \`clk\`, \`reset\` (active high), \`q\` (4-bit output)
- If reset is '1', \`q\` should be "0000".
- Otherwise, on the rising edge of \`clk\`, \`q\` should increment.

Note: You'll need to use \`IEEE.NUMERIC_STD.ALL\` and the \`unsigned\` type for arithmetic.
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
  },
  {
    id: 'shift-register',
    title: '4-bit Shift Register',
    category: 'Sequential',
    difficulty: 'Intermediate',
    description: `
A shift register moves bits through its stages on each clock cycle.

### Objectives:
- Entity: \`shift_register\`
- Ports: \`clk\`, \`sin\` (serial in), \`pout\` (parallel out, 4-bit)
- On each rising edge of \`clk\`, shift the bits from right to left (or left to right).
- \`pout(0)\` becomes \`sin\`, \`pout(1)\` becomes old \`pout(0)\`, etc.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity shift_register is
    Port ( clk  : in  STD_LOGIC;
           sin  : in  STD_LOGIC;
           pout : out STD_LOGIC_VECTOR(3 downto 0));
end shift_register;

architecture Behavioral of shift_register is
    signal shift_reg : std_logic_vector(3 downto 0) := (others => '0');
begin
    process(clk)
    begin
        if rising_edge(clk) then
            -- Implement shift logic
        end if;
    end process;
    
    pout <= shift_reg;
end Behavioral;`,
  },
  {
    id: 'fsm-sequence',
    title: 'FSM: Sequence Detector (101)',
    category: 'State Machines',
    difficulty: 'Advanced',
    description: `
Design a Moore Finite State Machine that detects the sequence "101".

### Objectives:
- Entity: \`sequence_detector\`
- Ports: \`clk\`, \`reset\`, \`din\` (in), \`dout\` (out)
- \`dout\` should be '1' if the last three bits were "101".

Use an enumerated type for states: \`type state_type is (S_RESET, S_1, S_10, S_101);\`.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity sequence_detector is
    Port ( clk   : in  STD_LOGIC;
           reset : in  STD_LOGIC;
           din   : in  STD_LOGIC;
           dout  : out STD_LOGIC);
end sequence_detector;

architecture Behavioral of sequence_detector is
    type state_type is (S_RESET, S_1, S_10, S_101);
    signal current_state, next_state : state_type;
begin
    -- State register process
    -- Next state logic process
    -- Output logic
end Behavioral;`,
  },
  {
    id: 'basic-alu',
    title: 'Simple ALU',
    category: 'Logic',
    difficulty: 'Advanced',
    description: `
An Arithmetic Logic Unit (ALU) performs various calculations.

### Objectives:
- Entity: \`simple_alu\`
- Inputs: \`a\`, \`b\` (4-bit), \`op\` (2-bit)
- Output: \`result\` (4-bit)
- Operations based on \`op\`:
  - "00": Add (\`a + b\`)
  - "01": Subtract (\`a - b\`)
  - "10": AND (\`a and b\`)
  - "11": OR (\`a or b\`)
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity simple_alu is
    Port ( a      : in  STD_LOGIC_VECTOR(3 downto 0);
           b      : in  STD_LOGIC_VECTOR(3 downto 0);
           op     : in  STD_LOGIC_VECTOR(1 downto 0);
           result : out STD_LOGIC_VECTOR(3 downto 0));
end simple_alu;

architecture Behavioral of simple_alu is
begin
    process(a, b, op)
    begin
        -- Implement ALU logic
    end process;
end Behavioral;`,
  },
  {
    id: 'seven-seg',
    title: '7-Segment Display Hex Decoder',
    category: 'Display',
    difficulty: 'Intermediate',
    description: `
Convert a 4-bit hexadecimal input into the 7-segment control signals.

### Objectives:
- Entity: \`seven_seg_decoder\`
- Input: \`hex\` (4-bit)
- Output: \`seg\` (7-bit, order: a, b, c, d, e, f, g)
- For hex "0" (0000), seg should be "1111110" (all segments on except g).
- Assume active high segments.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity seven_seg_decoder is
    Port ( hex : in  STD_LOGIC_VECTOR(3 downto 0);
           seg : out STD_LOGIC_VECTOR(6 downto 0));
end seven_seg_decoder;

architecture Behavioral of seven_seg_decoder is
begin
    process(hex)
    begin
        case hex is
            when "0000" => seg <= "1111110";
            -- Implement other cases
            when others => seg <= "0000000";
        end case;
    end process;
end Behavioral;`,
  },
  {
    id: 'priority-encoder',
    title: '4-to-2 Priority Encoder',
    category: 'Combinational',
    difficulty: 'Intermediate',
    description: `
A priority encoder outputs the index of the highest-priority active input.

### Objectives:
- Entity: \`priority_encoder\`
- Input: \`d\` (4-bit)
- Output: \`q\` (2-bit), \`v\` (valid bit)
- \`d(3)\` has the highest priority. If \`d(3) = '1'\`, \`q = "11"\`.
- If \`d(3) = '0'\` and \`d(2) = '1'\`, \`q = "10"\`.
- \`v\` is '1' if any input is '1', else '0'.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity priority_encoder is
    Port ( d : in  STD_LOGIC_VECTOR(3 downto 0);
           q : out STD_LOGIC_VECTOR(1 downto 0);
           v : out STD_LOGIC);
end priority_encoder;

architecture Behavioral of priority_encoder is
begin
    process(d)
    begin
        -- Implement priority logic
    end process;
end Behavioral;`,
  },
  {
    id: 'magnitude-comparator',
    title: '4-bit Magnitude Comparator',
    category: 'Combinational',
    difficulty: 'Intermediate',
    description: `
Compare two 4-bit numbers.

### Objectives:
- Entity: \`comparator\`
- Inputs: \`a\`, \`b\` (4-bit)
- Outputs: \`greater\`, \`equal\`, \`less\`
- Set exactly one output to '1' based on the relationship between \`a\` and \`b\`.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity comparator is
    Port ( a : in  STD_LOGIC_VECTOR(3 downto 0);
           b : in  STD_LOGIC_VECTOR(3 downto 0);
           greater : out STD_LOGIC;
           equal   : out STD_LOGIC;
           less    : out STD_LOGIC);
end comparator;

architecture Behavioral of comparator is
begin
    -- Hint: cast to unsigned for comparison
end Behavioral;`,
  },
  {
    id: 'clock-divider',
    title: 'Clock Divider',
    category: 'Sequential',
    difficulty: 'Advanced',
    description: `
Reduce a high-frequency clock to a lower frequency.

### Objectives:
- Entity: \`clk_divider\`
- Input: \`clk_in\`, \`reset\`
- Output: \`clk_out\`
- \`clk_out\` should toggle every 50,000,000 clock cycles (assuming a 100MHz clock to get 1Hz).
- For this exercise, let's use a smaller factor of 4 to keep it simple. Toggle \`clk_out\` every 4 \`clk_in\` cycles.
    `,
    initialCode: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity clk_divider is
    Port ( clk_in  : in  STD_LOGIC;
           reset   : in  STD_LOGIC;
           clk_out : out STD_LOGIC);
end clk_divider;

architecture Behavioral of clk_divider is
    signal counter : integer := 0;
    signal temp_clk : std_logic := '0';
begin
    process(clk_in, reset)
    begin
        -- Implement division logic
    end process;
    
    clk_out <= temp_clk;
end Behavioral;`,
  }
];
