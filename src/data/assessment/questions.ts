import type {
  AssessmentQuestion,
} from "../../types/assessment";

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "work-style",
    question:
      "Which type of work do you enjoy most?",
    description:
      "Choose the option that best describes the kind of work you prefer.",
    type: "single",
    options: [
      {
        id: "building",
        label:
          "Building websites, applications, or digital products",
        value: "building",
      },
      {
        id: "analyzing",
        label:
          "Analyzing data and finding patterns",
        value: "analyzing",
      },
      {
        id: "designing",
        label:
          "Designing interfaces and user experiences",
        value: "designing",
      },
      {
        id: "solving",
        label:
          "Solving technical problems and improving systems",
        value: "solving",
      },
    ],
  },

  {
    id: "problem-solving",
    question:
      "How do you usually approach a difficult problem?",
    description:
      "Think about how you naturally prefer to solve challenges.",
    type: "single",
    options: [
      {
        id: "research",
        label:
          "Research the problem and understand it before acting",
        value: "research",
      },
      {
        id: "experiment",
        label:
          "Experiment with different solutions",
        value: "experiment",
      },
      {
        id: "break-down",
        label:
          "Break the problem into smaller steps",
        value: "break-down",
      },
      {
        id: "collaborate",
        label:
          "Discuss it with others and combine ideas",
        value: "collaborate",
      },
    ],
  },

  {
    id: "technology-interest",
    question:
      "Which technology area interests you most?",
    description:
      "Choose the area you would most like to explore.",
    type: "single",
    options: [
      {
        id: "web",
        label:
          "Web and application development",
        value: "web",
      },
      {
        id: "data",
        label:
          "Data, analytics, and artificial intelligence",
        value: "data",
      },
      {
        id: "security",
        label:
          "Cybersecurity and system protection",
        value: "security",
      },
      {
        id: "cloud",
        label:
          "Cloud infrastructure and DevOps",
        value: "cloud",
      },
    ],
  },

  {
    id: "learning-preference",
    question:
      "Which activity would you enjoy learning?",
    description:
      "Choose the activity that sounds most interesting to you.",
    type: "single",
    options: [
      {
        id: "coding",
        label:
          "Writing code and building applications",
        value: "coding",
      },
      {
        id: "data-analysis",
        label:
          "Analyzing datasets and creating insights",
        value: "data-analysis",
      },
      {
        id: "ui-design",
        label:
          "Creating interfaces and user experiences",
        value: "ui-design",
      },
      {
        id: "systems",
        label:
          "Managing systems, servers, and infrastructure",
        value: "systems",
      },
    ],
  },

  {
    id: "work-environment",
    question:
      "Which work environment sounds most appealing?",
    description:
      "Choose the environment in which you think you would work comfortably.",
    type: "single",
    options: [
      {
        id: "creative",
        label:
          "Creative and product-focused",
        value: "creative",
      },
      {
        id: "analytical",
        label:
          "Analytical and research-focused",
        value: "analytical",
      },
      {
        id: "technical",
        label:
          "Highly technical and engineering-focused",
        value: "technical",
      },
      {
        id: "collaborative",
        label:
          "Collaborative and team-oriented",
        value: "collaborative",
      },
    ],
  },
];