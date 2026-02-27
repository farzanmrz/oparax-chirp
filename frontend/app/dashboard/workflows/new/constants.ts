export const FREQUENCY_OPTIONS = [
  { value: "15m", label: "Every 15 min" },
  { value: "30m", label: "Every 30 min (recommended)" },
  { value: "1h", label: "Every hour" },
  { value: "2h", label: "Every 2 hours" },
] as const

export const MAX_HANDLES = 10

export interface WorkflowFormState {
  name: string
  description: string
  frequency: string
  handles: string[]
  styleRules: string
  exampleTweet: string
}

export interface MockHeadline {
  id: number
  headline: string
  source: string
}

export const MOCK_HEADLINES: MockHeadline[] = [
  {
    id: 1,
    headline:
      "Manchester United reach agreement with Ajax for Frenkie de Jong — fee around €75M",
    source: "@FabrizioRomano",
  },
  {
    id: 2,
    headline:
      "Chelsea complete loan signing of Victor Osimhen from Napoli with option to buy",
    source: "@NizaarKinsella",
  },
  {
    id: 3,
    headline:
      "Arsenal's Martin Ødegaard signs new 5-year contract extension through 2030",
    source: "@David_Ornstein",
  },
  {
    id: 4,
    headline:
      "Liverpool in advanced talks with Real Sociedad for Mikel Merino — €60M release clause",
    source: "@JamesPearceLFC",
  },
  {
    id: 5,
    headline:
      "Tottenham reject £45M bid from Bayern Munich for Son Heung-min",
    source: "@AlasdairGold",
  },
]
