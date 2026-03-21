const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const apiKey = process.env.GROQ_API_KEY;
const isValidKey = apiKey && apiKey !== 'your_groq_api_key_here' && apiKey.trim() !== '';
const groq = isValidKey ? new Groq({ apiKey }) : null;

const SYSTEM_PROMPT = `You are DSA Mentor AI — an expert Data Structures and Algorithms interview coach with deep knowledge of competitive programming, system design, and technical interviews at top tech companies like Google, Meta, Amazon, and Microsoft.

Your personality:
- Approachable, encouraging, and precise
- You break down complex concepts into simple, digestible steps
- You always provide practical examples with clean pseudocode or actual code
- You motivate the user and help them build confidence

Your expertise covers:
- All fundamental data structures: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Tries, Heaps, Hash Maps
- Algorithms: Sorting, Searching, BFS, DFS, Dynamic Programming, Greedy, Backtracking, Divide & Conquer, Sliding Window, Two Pointers
- Time and Space complexity analysis (Big-O notation)
- Common interview patterns and problem-solving frameworks
- Top interview questions from FAANG companies
- Coding contest strategies

Guidelines:
- Format answers clearly using markdown with headers, bullet points, and code blocks
- For code examples, always specify the language (e.g., \`\`\`python, \`\`\`javascript, \`\`\`java)
- For complex topics, provide a quick summary first, then detailed explanation
- When explaining algorithms, include: concept → approach → code → complexity analysis
- Keep responses thorough but concise — no unnecessary filler
- Always end with a helpful tip or follow-up question to guide the user's learning

If given a coding problem, walk through it step by step: understand → brute force → optimize → code → test.`;

// Mock response for when no API key is configured
const MOCK_RESPONSES = [
  "Great question! **Binary Search** is a classic divide-and-conquer algorithm.\n\n## How it works\n1. Start with the **middle element** of a sorted array\n2. If target == middle → found!\n3. If target < middle → search the **left half**\n4. If target > middle → search the **right half**\n\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```\n\n⏱️ **Time Complexity**: O(log n) | **Space**: O(1)\n\n> 💡 Tip: Binary search requires the array to be **sorted**. Always check this first in an interview!",
  "Here are the **Top 10 DSA Interview Questions** you must know:\n\n1. **Two Sum** — Hash map approach O(n)\n2. **Longest Substring Without Repeating Characters** — Sliding window\n3. **Merge K Sorted Lists** — Min-heap / divide & conquer\n4. **Maximum Subarray (Kadane's)** — Dynamic programming\n5. **Word Ladder** — BFS shortest path\n6. **LRU Cache** — LinkedHashMap / Doubly LL + HashMap\n7. **Number of Islands** — DFS/BFS grid traversal\n8. **Coin Change** — DP bottom-up\n9. **Serialize & Deserialize Binary Tree** — BFS/DFS\n10. **Trapping Rain Water** — Two pointer / stack\n\n> 💡 **Master these patterns**: these 10 problems cover sliding window, two pointers, BFS, DFS, DP, and heap — the core interview patterns!",
  "## Dynamic Programming Roadmap 🗺️\n\nDP is all about breaking problems into **overlapping subproblems** and storing results.\n\n### Phase 1 — Foundations\n- Fibonacci (top-down memoization vs bottom-up)\n- Climbing Stairs\n- House Robber\n\n### Phase 2 — 1D DP\n- Coin Change\n- Maximum Subarray (Kadane's)\n- Longest Increasing Subsequence\n\n### Phase 3 — 2D DP\n- Unique Paths\n- Edit Distance\n- Longest Common Subsequence\n\n### Phase 4 — Advanced\n- Knapsack (0/1 and Unbounded)\n- Partition Equal Subset Sum\n- Burst Balloons\n\n> 💡 **Key insight**: Always define your DP state clearly — what does `dp[i]` or `dp[i][j]` represent?",
];

let mockIndex = 0;

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // If no valid API key, return a mock response
    if (!isValidKey || !groq) {
      await new Promise(r => setTimeout(r, 1500)); // Simulate delay
      const reply = MOCK_RESPONSES[mockIndex % MOCK_RESPONSES.length];
      mockIndex++;
      return res.json({ reply, mock: true });
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const reply = completion.choices[0]?.message?.content || 'I could not generate a response. Please try again.';
    res.json({ reply });
    console.log(reply);
  } catch (error) {
    console.error('Chat error:', error);
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid API key. Please check your GROQ_API_KEY in .env' });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit reached. Please wait a moment and try again.' });
    }
    res.status(500).json({ error: 'Failed to get a response. Please try again.' });
  }
});

module.exports = router;
