import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

// Example FAQ component (single-file). Drop this into your React app.
// Requirements: @mui/material, @mui/icons-material, emotion packages.

const sampleFaqs = [
  {
    id: 1,
    question: "What services do you offer as a freelance developer?",
    answer:
      "I create modern, responsive websites using technologies like React, TailwindCSS, and Node.js. My services include UI/UX implementation, frontend development, backend APIs, bug fixing, performance optimization, and full-stack website builds.",
    tags: ["Service"],
  },
  {
    id: 2,
    question: "What are the technologies you use?",
    answer:
      "I use the latest technologies, like React/Vite, JavaScript/TypeScript, TailwindCSS, MUI, GSAP.",
    tags: ["Technology"],
  },
  {
    id: 3,
    question: "How do I make an order?",
    answer:
      "You can contact me on Fiverr (account is linked below), using whatsapp for direct orders, or using this email kavishkauvindu0@gmail.com.",
    tags: ["Order", "Getting Started"],
  },
  {
    id: 4,
    question: "How long does it take to complete a website?",
    answer:
      "A simple landing page usually takes 3–7 days, while multi-page or feature-rich projects can take 2–4 weeks depending on the complexity and content availability.",
    tags: ["Order", "Service"],
  },
  {
    id: 5,
    question: "How do you structure pricing?",
    answer:
      "Pricing depends on the project’s size, features, and design requirements. Small projects start at a fixed rate, while larger ones may use milestone-based pricing. You’ll always receive a clear quote before work begins no hidden fees.",
    tags: ["Pricing", "Order"],
  },
  {
    id: 6,
    question: "Do you provide ongoing support after the project is completed?",
    answer:
      "Yes! I offer maintenance, updates, content changes, security patches, and performance improvements. Support can be provided hourly or via monthly plans.",
    tags: ["Service"],
  },
  {
    id: 7,
    question: "Can you work with an existing website or project?",
    answer:
      "Definitely. I can redesign your existing site, fix bugs, improve UI/UX, or optimize performance without needing to rebuild everything from scratch",
    tags: ["Order", "Service"],
  },
  {
    id: 8,
    question: "How do we communicate during the project?",
    answer:
      "I can stay in touch via email, WhatsApp, or your preferred platform. Regular progress updates and previews will be shared throughout the project.",
    tags: ["Communication"],
  },
  {
    id: 9,
    question: "Do you need content (text and images) before starting?",
    answer:
      "Yes, having content early helps speed up development. But if you don’t have anything yet, I can help draft placeholder text or suggest design friendly layouts.",
    tags: ["Order"],
  },
];

export default function Service() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); // array of opened faq ids

  const allTags = useMemo(() => {
    const s = new Set();
    sampleFaqs.forEach((f) => f.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return sampleFaqs.filter((f) => {
      const matchesQuery =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      const matchesTag =
        activeTags.length === 0 || f.tags.some((t) => activeTags.includes(t));
      return matchesQuery && matchesTag;
    });
  }, [query, activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function toggleExpandAll() {
    if (expandedIds.length === filtered.map((f) => f.id).length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(filtered.map((f) => f.id));
    }
  }

  function handleAccordionToggle(id) {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Basic highlight function for matched query in question text
  function highlight(text) {
    if (!query) return text;
    const q = query.trim();
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <Box
              component="span"
              key={i}
              sx={{ bgcolor: "primary.light", px: 0.4, borderRadius: 0.5 }}
            >
              {part}
            </Box>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={2}
      >
        <TextField
          size="small"
          placeholder="Search FAQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          sx={{ flex: 1 }}
          aria-label="Search FAQs"
        />

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={toggleExpandAll}
            aria-label="Expand or collapse all"
            size="small"
          >
            {expandedIds.length === filtered.map((f) => f.id).length ? (
              <UnfoldLessIcon />
            ) : (
              <UnfoldMoreIcon />
            )}
          </IconButton>
        </Stack>
      </Stack>

      <Box mb={1}>
        <Typography variant="subtitle2" gutterBottom>
          Categories
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {allTags.map((t) => (
            <Chip
              key={t}
              label={t}
              onClick={() => toggleTag(t)}
              variant={activeTags.includes(t) ? "filled" : "outlined"}
              clickable
            />
          ))}
          {allTags.length === 0 && (
            <Typography variant="caption">No categories</Typography>
          )}
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        {filtered.length === 0 ? (
          <Typography>No results found.</Typography>
        ) : (
          filtered.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expandedIds.includes(faq.id)}
              onChange={() => handleAccordionToggle(faq.id)}
              disableGutters
              sx={{ mb: 1, borderRadius: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">
                      {highlight(faq.question)}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={0.5}>
                      {faq.tags.map((tg) => (
                        <Chip
                          key={tg}
                          label={tg}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>

      <Box mt={3} textAlign="center">
        <Typography variant="caption" color="text.secondary">
          Still have questions? Reach out to{" "}
          <strong>kavishkauvindu0@gmail.com</strong>
        </Typography>
      </Box>
    </Box>
  );
}
