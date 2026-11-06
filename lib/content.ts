/**
 * Single source of truth for all portfolio content.
 *
 * Any value set to `null` is intentionally missing and is hidden in the UI
 * until you fill it in. Nothing here is invented — only add verified facts.
 */

export const site = {
  name: "Bhashyam Naidu",
  shortName: "bn",
  title: "Backend & Cloud Engineer",
  subtitle: "AI Engineering Enthusiast",
  pitch:
    "I build scalable backend systems, cloud-native applications and intelligent software solutions that solve real-world problems.",
  location: "India",
  // Absolute site URL for canonical / sitemap / Open Graph. Resolved at build time:
  //   1. NEXT_PUBLIC_SITE_URL — set this in Vercel once you have a custom domain;
  //   2. otherwise Vercel's own production domain (VERCEL_PROJECT_PRODUCTION_URL);
  //   3. otherwise localhost (local builds only).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Bhashyam Naidu — Backend & Cloud Engineer. Computer Science undergraduate at VIT Vellore building backend systems, cloud-native infrastructure and AI-powered data tools.",
};

export const links = {
  github: "https://github.com/BhashyamNaidu",
  linkedin: "https://www.linkedin.com/in/bhashyamnaidu/" as string | null,
  email: "bhashyamnaidu21@gmail.com" as string | null,
  // MISSING: put your resume at public/resume.pdf, then set this to "/resume.pdf".
  resume: null as string | null,
};

export const openTo = [
  "Software Engineering",
  "Backend Engineering",
  "Cloud & Platform Engineering",
  "AI Engineering",
  "Data Engineering",
];

export const about = {
  lead: "I'm a Computer Science undergraduate at VIT Vellore who cares about what happens behind the interface —",
  leadAccent: "architecture, data and the paths requests take.",
  body: [
    "My interests sit in backend engineering, distributed systems, cloud infrastructure, databases and applied AI/ML. I enjoy building systems that go beyond basic application development: designing APIs and schemas, guarding the boundaries where untrusted input meets a database, automating deployment, and wiring in the monitoring that tells you when something breaks.",
    "Each project I take on is an excuse to reason about a real engineering trade-off — synchronous vs. event-driven, retrieval vs. generation, serverless functions vs. servers I run myself.",
  ],
  facts: [
    { k: "based_in", v: "India" },
    { k: "studying", v: "B.Tech CSE, VIT Vellore" },
    { k: "graduating", v: "2027" },
    { k: "cgpa", v: "8.5 / 10" },
    { k: "focus", v: "Backend · Cloud · Applied AI" },
  ],
  highlights: [
    {
      label: "Systems built end-to-end",
      value: "3",
      note: "An AI data platform, an event-driven AWS pipeline and a cloud-deployed API.",
    },
    {
      label: "Industry experience",
      value: "Mbanq",
      note: "Backend development internship — FastAPI, PostgreSQL, Docker Compose.",
    },
    {
      label: "Academic standing",
      value: "8.5",
      note: "CGPA out of 10, B.Tech Computer Science & Engineering.",
    },
  ],
};

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub?: string;
  accent?: boolean;
};

export type DiagramEdge = { from: string; to: string; label?: string };

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string[];
  summary: string;
  highlight: string;
  features: string[];
  stack: string[];
  github: string | null;
  /** Optional public showcase / live case-study URL. */
  demo?: string;
  engineeringNotes: { title: string; body: string }[];
  diagram: {
    width: number;
    height: number;
    nodeWidth: number;
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    boundary?: { x: number; y: number; w: number; h: number; label: string };
  };
};

export const projects: Project[] = [
  {
    slug: "insightquery",
    index: "01",
    name: "InsightQuery",
    category: ["AI Engineering", "Backend", "Data Systems"],
    summary:
      "An AI-powered data investigation platform that combines natural-language querying, safe SQL execution and retrieval-augmented generation to help users investigate structured datasets and supporting documents.",
    highlight:
      "Built on approximately 263,000 real 2023 Chicago crime records, plus a curated corpus of 15 reference documents for retrieval.",
    features: [
      "Intent classification that routes each question to SQL, document retrieval, or both",
      "LLM-proposed SQL checked by an AST-level validator before it can run",
      "Read-only PostgreSQL role with SELECT-only grants as a second, independent safety layer",
      "One bounded SQL repair attempt, re-validated before execution",
      "RAG over pgvector cosine similarity, with locally computed embeddings",
      "Evidence-grounded synthesis that cites the SQL rows and retrieved chunks",
      "Auditable query log and a dashboard showing each investigation's full trace",
      "160+ Pytest tests run in GitHub Actions CI; Docker Compose deployment",
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "SQLAlchemy",
      "Alembic",
      "RAG",
      "LLMs",
      "Docker",
      "Pytest",
      "GitHub Actions",
    ],
    github: "https://github.com/BhashyamNaidu/InsightQuery",
    demo: "https://bhashyamnaidu.github.io/InsightQuery/",
    engineeringNotes: [
      {
        title: "Route before generating",
        body: "Each question is classified as structured, document-based or hybrid before anything else runs. If classification fails or can't be parsed, it falls back to hybrid rather than guessing.",
      },
      {
        title: "Defence in depth at the database boundary",
        body: "Generated SQL is treated as untrusted: an AST-level validator decides whether it runs, and the query executes under a SELECT-only role. A repaired query goes back through the same validator, and validator rejections are never repaired.",
      },
      {
        title: "The LLM narrates; it isn't the source of truth",
        body: "The synthesis step only receives SQL rows and retrieved chunks that were already found, and its output is schema-validated. Every investigation is written to an audit log.",
      },
    ],
    diagram: {
      width: 720,
      height: 290,
      nodeWidth: 120,
      nodes: [
        { id: "q", x: 0, y: 122, label: "User question", sub: "natural language" },
        { id: "intent", x: 150, y: 122, label: "Intent router", sub: "classification", accent: true },
        { id: "guard", x: 300, y: 18, label: "SQL guard", sub: "AST validator" },
        { id: "embed", x: 300, y: 226, label: "Retriever", sub: "embeddings" },
        { id: "pg", x: 450, y: 18, label: "PostgreSQL", sub: "read-only role" },
        { id: "vec", x: 450, y: 226, label: "pgvector", sub: "15 documents" },
        { id: "llm", x: 600, y: 122, label: "LLM synthesis", sub: "cited answer", accent: true },
      ],
      edges: [
        { from: "q", to: "intent" },
        { from: "intent", to: "guard", label: "structured" },
        { from: "intent", to: "embed", label: "documents" },
        { from: "guard", to: "pg" },
        { from: "embed", to: "vec" },
        { from: "pg", to: "llm" },
        { from: "vec", to: "llm" },
      ],
    },
  },
  {
    slug: "cloudorderengine",
    index: "02",
    name: "CloudOrderEngine",
    category: ["Cloud Engineering", "Distributed Systems", "Backend"],
    summary:
      "A serverless order pipeline on AWS that decouples order intake from order processing using SQS and EventBridge, instead of chaining Lambda functions together with direct calls.",
    highlight:
      "Three independent Lambda functions, connected by a queue and an event bus, verified end-to-end through to a delivered confirmation email.",
    features: [
      "Validator Lambda that returns 202 as soon as an order is queued, or 400 for invalid payloads",
      "SQS queue with a redrive policy to a dead-letter queue",
      "Processor Lambda that computes order totals and writes orders to DynamoDB",
      "OrderPlaced events published to a custom EventBridge bus",
      "Notification Lambda that sends confirmation emails through SNS",
      "Least-privilege IAM role scoped to each function",
      "End-to-end verification through CloudWatch logs",
    ],
    stack: ["Python", "AWS Lambda", "Amazon SQS", "EventBridge", "DynamoDB", "Amazon SNS", "CloudWatch", "IAM"],
    github: "https://github.com/BhashyamNaidu/CloudOrderEngine",
    engineeringNotes: [
      {
        title: "Accept fast, process later",
        body: "The Validator returns 202 as soon as an order is queued; it doesn't wait for the database write or the email. SQS holds orders until the Processor is ready and provides retries.",
      },
      {
        title: "Publish facts, not function calls",
        body: "An earlier version had the Processor invoke the Notification Lambda directly. It now publishes an OrderPlaced event instead, so a new consumer can subscribe with a new EventBridge rule and no change to the Processor.",
      },
      {
        title: "Explicit failure paths and least privilege",
        body: "Messages that fail repeatedly are moved to a dead-letter queue instead of retrying forever, and each Lambda's IAM role is scoped to just the actions it performs.",
      },
    ],
    diagram: {
      width: 720,
      height: 290,
      nodeWidth: 120,
      nodes: [
        { id: "val", x: 0, y: 122, label: "Validator", sub: "AWS Lambda", accent: true },
        { id: "sqs", x: 150, y: 122, label: "Amazon SQS", sub: "order queue" },
        { id: "dlq", x: 150, y: 226, label: "DLQ", sub: "dead-letter queue" },
        { id: "proc", x: 300, y: 122, label: "Processor", sub: "AWS Lambda", accent: true },
        { id: "ddb", x: 450, y: 18, label: "DynamoDB", sub: "orders table" },
        { id: "bus", x: 450, y: 122, label: "EventBridge", sub: "OrderPlaced event" },
        { id: "notify", x: 600, y: 122, label: "Notification", sub: "AWS Lambda" },
        { id: "sns", x: 600, y: 226, label: "Amazon SNS", sub: "email" },
      ],
      edges: [
        { from: "val", to: "sqs" },
        { from: "sqs", to: "dlq", label: "redrive" },
        { from: "sqs", to: "proc" },
        { from: "proc", to: "ddb" },
        { from: "proc", to: "bus" },
        { from: "bus", to: "notify" },
        { from: "notify", to: "sns" },
      ],
    },
  },
  {
    slug: "shopeasy",
    index: "03",
    name: "ShopEasy",
    category: ["Backend Engineering", "Cloud", "DevOps"],
    summary:
      "A product-catalogue REST API built with FastAPI and SQLAlchemy, containerised with Docker and deployed to AWS behind an Application Load Balancer, with automated deploys and alerting.",
    highlight:
      "Demonstrates backend development, cloud deployment, deployment automation and infrastructure monitoring.",
    features: [
      "Product CRUD REST API built with FastAPI and SQLAlchemy",
      "Docker Compose deployment on EC2 behind an Nginx reverse proxy",
      "Application Load Balancer with health checks against a /health endpoint",
      "Amazon RDS MySQL for persistent storage",
      "GitHub Actions deploys on every push to main (SSH, pull, rebuild containers)",
      "CloudWatch CPU alarms with SNS email alerts",
      "VPC and security groups configured on AWS",
    ],
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "MySQL",
      "Docker",
      "Nginx",
      "AWS EC2",
      "RDS",
      "ALB",
      "CloudWatch",
      "SNS",
      "GitHub Actions",
    ],
    github: "https://github.com/BhashyamNaidu/shopeasy",
    engineeringNotes: [
      {
        title: "A layered entry point",
        body: "Requests pass through the Application Load Balancer, then Nginx, before reaching the FastAPI container. Public traffic never hits the application process directly.",
      },
      {
        title: "State lives outside the instance",
        body: "Data is stored in Amazon RDS MySQL, so each deploy can tear down and rebuild the application containers on EC2 without touching the data.",
      },
      {
        title: "Push to deploy, alarm on trouble",
        body: "A push to main triggers a GitHub Actions job that SSHes into EC2 and rebuilds the stack, and CloudWatch alarms send an SNS email when CPU crosses its threshold.",
      },
    ],
    diagram: {
      width: 720,
      height: 290,
      nodeWidth: 120,
      nodes: [
        { id: "client", x: 0, y: 122, label: "Client", sub: "REST requests" },
        { id: "alb", x: 150, y: 122, label: "Load Balancer", sub: "AWS ALB" },
        { id: "nginx", x: 300, y: 122, label: "Nginx", sub: "reverse proxy" },
        { id: "ci", x: 450, y: 18, label: "GitHub Actions", sub: "deploy on push" },
        { id: "api", x: 450, y: 122, label: "FastAPI", sub: "Docker · EC2", accent: true },
        { id: "rds", x: 600, y: 122, label: "MySQL", sub: "Amazon RDS" },
        { id: "cw", x: 450, y: 226, label: "CloudWatch", sub: "CPU alarm" },
        { id: "sns", x: 600, y: 226, label: "Amazon SNS", sub: "email alert" },
      ],
      edges: [
        { from: "client", to: "alb" },
        { from: "alb", to: "nginx" },
        { from: "nginx", to: "api" },
        { from: "ci", to: "api" },
        { from: "api", to: "rds" },
        { from: "api", to: "cw" },
        { from: "cw", to: "sns" },
      ],
    },
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C++", "JavaScript", "SQL"] },
  { group: "Backend", items: ["FastAPI", "REST APIs", "SQLAlchemy", "API Design", "Backend Architecture"] },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra", "Database Design", "Query Optimisation"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Terraform", "Linux", "Git & GitHub"],
  },
  {
    group: "AI & Data",
    items: ["Large Language Models", "RAG", "Embeddings", "Vector Databases", "Natural Language to SQL", "Data Pipelines"],
  },
  {
    group: "CS Fundamentals",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Distributed Systems"],
  },
];

export type TimelineEntry = {
  kind: "experience" | "education";
  org: string;
  role: string;
  period: string | null;
  location?: string;
  points: string[];
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: "experience",
    org: "Mbanq",
    role: "Backend Development Intern",
    // MISSING: exact internship dates, e.g. "May 2025 — Jul 2025" (hidden on the page until set).
    period: null,
    // Only the responsibilities you supplied. Add others here once verified.
    points: [
      "FastAPI backend development.",
      "PostgreSQL integration.",
      "Docker Compose.",
      "Backend testing, with 20+ tests.",
    ],
    tags: ["FastAPI", "PostgreSQL", "Docker Compose", "Testing"],
  },
  {
    kind: "education",
    org: "Vellore Institute of Technology (VIT), Vellore",
    role: "B.Tech — Computer Science and Engineering",
    period: "2023 — 2027",
    location: "Vellore, India",
    points: ["CGPA: 8.5 / 10"],
  },
];
