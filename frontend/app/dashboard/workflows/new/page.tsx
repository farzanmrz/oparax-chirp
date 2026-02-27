"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { HandleInput } from "@/components/handle-input"
import { createWorkflow } from "./actions"
import {
  FREQUENCY_OPTIONS,
  MAX_HANDLES,
  MOCK_HEADLINES,
  type WorkflowFormState,
} from "./constants"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon, Loading03Icon } from "@hugeicons/core-free-icons"

type TestPhase = "idle" | "scanning" | "analyzing" | "drafting" | "done"
type PagePhase = "form" | "headlines" | "drafting"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function NewWorkflowPage() {
  const [formState, setFormState] = useState<WorkflowFormState>({
    name: "",
    description: "",
    frequency: "30m",
    handles: [],
    styleRules: "",
    exampleTweet: "",
  })
  const [testPhase, setTestPhase] = useState<TestPhase>("idle")
  const [pagePhase, setPagePhase] = useState<PagePhase>("form")
  const [selectedHeadlines, setSelectedHeadlines] = useState<Set<number>>(
    new Set()
  )
  const [isPending, startTransition] = useTransition()

  const canTest = formState.description.trim().length > 0

  // --- Handles ---

  function addHandle(handle: string) {
    setFormState((prev) => ({
      ...prev,
      handles: [...prev.handles, handle],
    }))
  }

  function removeHandle(index: number) {
    setFormState((prev) => ({
      ...prev,
      handles: prev.handles.filter((_, i) => i !== index),
    }))
  }

  // --- Test run (mocked) ---

  async function runTestScan() {
    setTestPhase("scanning")
    await delay(1500)
    setTestPhase("analyzing")
    await delay(1500)
    setTestPhase("drafting")
    await delay(1500)
    setTestPhase("done")
    setPagePhase("headlines")
  }

  // --- Headline selection ---

  function toggleHeadline(id: number) {
    setSelectedHeadlines((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // --- Submit ---

  function handleSubmit() {
    startTransition(async () => {
      const result = await createWorkflow({
        name: formState.name,
        description: formState.description,
        frequency: formState.frequency,
        handles: formState.handles,
        styleRules: formState.styleRules,
        exampleTweet: formState.exampleTweet,
      })
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Workflow</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up a monitoring workflow to detect breaking news and draft tweets.
        </p>
      </div>

      {/* ── Phase 1: Workflow config + test ── */}
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* Section header */}
          <div className="pb-1">
            <h2 className="text-base font-semibold">Workflow Details</h2>
          </div>

          {/* Name (optional) */}
          <FormField
            label="Workflow name"
            optional
            hint="Leave blank to auto-generate from your description."
          >
            <Input
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. PL Transfer Watch"
            />
          </FormField>

          {/* Description */}
          <FormField
            label="Describe your beat"
            hint="Be specific — the more detail you give, the better the AI knows what to look for."
          >
            <Textarea
              value={formState.description}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="e.g. Premier League transfer rumors, focusing on top 6 clubs. I break signings, loan deals, and contract extensions."
              rows={4}
            />
          </FormField>

          {/* Frequency */}
          <FormField label="Scan frequency">
            <Select
              value={formState.frequency}
              onValueChange={(val) =>
                setFormState((prev) => ({ ...prev, frequency: val }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* X Handles (optional) */}
          <FormField
            label="X accounts to monitor"
            optional
            hint="Type a handle and press comma, space, or Enter to add."
          >
            <HandleInput
              handles={formState.handles}
              maxHandles={MAX_HANDLES}
              onAdd={addHandle}
              onRemove={removeHandle}
            />
          </FormField>

          {/* Test run */}
          <Separator />

          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">Test Run</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Preview what your workflow will find. This simulates a single
                scan cycle.
              </p>
            </div>

            {testPhase === "idle" && (
              <div className="flex justify-center py-2">
                <Button onClick={runTestScan} disabled={!canTest}>
                  Run Test
                </Button>
              </div>
            )}

            {testPhase !== "idle" && (
              <div className="space-y-3">
                <ProgressStep
                  label="Scanning X accounts..."
                  active={testPhase === "scanning"}
                  done={["analyzing", "drafting", "done"].includes(testPhase)}
                />
                <ProgressStep
                  label="Analyzing stories..."
                  active={testPhase === "analyzing"}
                  done={["drafting", "done"].includes(testPhase)}
                />
                <ProgressStep
                  label="Generating headlines..."
                  active={testPhase === "drafting"}
                  done={testPhase === "done"}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Phase 2: Headline selection ── */}
      {pagePhase !== "form" && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <h2 className="text-base font-semibold">Headlines Found</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {MOCK_HEADLINES.length} unique stories detected. Select the ones
                you want to draft tweets for.
              </p>
            </div>

            <div className="space-y-2">
              {MOCK_HEADLINES.map((item) => {
                const isSelected = selectedHeadlines.has(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHeadline(item.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40"
                      )}
                    >
                      {isSelected && (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          strokeWidth={3}
                          className="size-3"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-snug">
                        {item.headline}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        via {item.source}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {pagePhase === "headlines" && (
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setPagePhase("drafting")}
                  disabled={selectedHeadlines.size === 0}
                >
                  Continue with {selectedHeadlines.size} headline
                  {selectedHeadlines.size !== 1 ? "s" : ""}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Phase 3: Drafting rules ── */}
      {pagePhase === "drafting" && (
        <>
          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <h2 className="text-base font-semibold">Drafting Rules</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Tell the AI how you write. These rules shape every tweet it
                  drafts.
                </p>
              </div>

              <FormField
                label="Style conventions"
                optional
                hint="Describe your writing style — tone, structure, emoji usage, common phrases."
              >
                <Textarea
                  value={formState.styleRules}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      styleRules: e.target.value,
                    }))
                  }
                  placeholder={`e.g. Always start with "BREAKING:" for major news. Use 🚨 emoji for transfers. Keep it under 240 characters. Never use hashtags.`}
                  rows={4}
                />
              </FormField>

              <FormField
                label="Example tweet"
                optional
                hint="Paste or write an example tweet so the AI can match your voice."
              >
                <Textarea
                  value={formState.exampleTweet}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      exampleTweet: e.target.value,
                    }))
                  }
                  placeholder="e.g. BREAKING: Liverpool have agreed personal terms with Florian Wirtz. Transfer fee of €120M being negotiated with Leverkusen. Done deal expected within 48hrs 🚨"
                  rows={3}
                />
              </FormField>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end pb-4">
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending && (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  strokeWidth={2}
                  className="animate-spin"
                />
              )}
              Activate Workflow
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Reusable form field wrapper with clear visual hierarchy ──

function FormField({
  label,
  optional,
  hint,
  children,
}: {
  label: string
  optional?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p className="text-xs leading-normal text-muted-foreground/70">
          {hint}
        </p>
      )}
    </div>
  )
}

// ── Progress step indicator ──

function ProgressStep({
  label,
  active,
  done,
}: {
  label: string
  active: boolean
  done: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <div className="flex size-6 items-center justify-center rounded-full bg-success text-success-foreground">
          <HugeiconsIcon
            icon={Tick02Icon}
            strokeWidth={2.5}
            className="size-3.5"
          />
        </div>
      ) : active ? (
        <div className="flex size-6 items-center justify-center">
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className="size-5 animate-spin text-primary"
          />
        </div>
      ) : (
        <div className="size-6 rounded-full border-2 border-muted-foreground/20" />
      )}
      <span
        className={cn(
          "text-sm",
          done || active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  )
}
