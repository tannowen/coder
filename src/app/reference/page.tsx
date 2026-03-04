'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Book, Code, Zap, Hash, Terminal } from 'lucide-react';

const sections = [
  {
    title: 'Entity Structure',
    icon: <Code className="w-5 h-5 text-indigo-500" />,
    content: `
An **entity** defines the external interface (ports) of your module.

\`\`\`vhdl
entity name is
    Port (
        port_name : in  STD_LOGIC;
        port_vec  : out STD_LOGIC_VECTOR(7 downto 0)
    );
end name;
\`\`\`
    `
  },
  {
    title: 'Architecture & Processes',
    icon: <Terminal className="w-5 h-5 text-emerald-500" />,
    content: `
An **architecture** defines the internal logic of the entity. **Processes** are used for sequential logic.

\`\`\`vhdl
architecture Behavioral of name is
    -- define signals here
begin
    process(clk)
    begin
        if rising_edge(clk) then
            -- sequential assignments
        end if;
    end process;
end Behavioral;
\`\`\`
    `
  },
  {
    title: 'Data Types',
    icon: <Hash className="w-5 h-5 text-amber-500" />,
    content: `
- \`std_logic\`: A single bit ('0', '1', 'Z', 'U', etc.)
- \`std_logic_vector\`: A group of bits
- \`unsigned / signed\`: For arithmetic operations (requires \`NUMERIC_STD\`)
- \`integer\`: For counters or loop indices
    `
  },
  {
    title: 'Logic Operators',
    icon: <Zap className="w-5 h-5 text-rose-500" />,
    content: `
- Logical: \`and\`, \`or\`, \`nand\`, \`nor\`, \`xor\`, \`xnor\`, \`not\`
- Relational: \`=\`, \`/=\`, \`<\`, \`<=\`, \`>\`, \`>=\`
- Arithmetic: \`+\`, \`-\`, \`*\`
- Shift: \`sll\`, \`srl\`, \`rol\`, \`ror\`
    `
  }
];

export default function ReferencePage() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white p-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <Book className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-indigo-600 uppercase">Cheat Sheet</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-left-6 duration-1000">
              VHDL Language <span className="text-indigo-600">Reference.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              A quick guide to syntax and common patterns to help you through the exercises.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:p-4">
                  {section.content.split('\n').map((line, lIdx) => {
                    if (line.startsWith('`')) {
                      return <pre key={lIdx} className="bg-slate-900 text-slate-200 p-4 rounded-xl overflow-x-auto my-4 font-mono"><code>{line.replace(/`/g, '')}</code></pre>;
                    }
                    if (line.trim().startsWith('```')) return null;
                    return <p key={lIdx} className="my-1">{line}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
