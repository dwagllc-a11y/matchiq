import ToolPage from '../components/ToolPage'
export default function RedFlags() {
  return <ToolPage
    title="Red Flag Detector"
    description="Paste her texts, profile, or anything she said. AI reads between the lines and tells you what's really going on."
    icon="🚩"
    color="#ef4444"
    apiEndpoint="generate-redflags"
    outputLabel="Analysis"
    metaTitle="Dating Red Flag Detector — MatchIQ"
    metaDesc="Paste her texts or profile. AI detects red flags, explains what they mean, and tells you how to proceed."
    fields={[
      { name: 'content', label: 'Paste her texts, profile, or what she said', type: 'textarea', placeholder: 'Paste the conversation, her profile bio, or describe the situation...', rows: 8, required: true },
      { name: 'context', label: 'How long have you been talking?', type: 'select', placeholder: 'Select stage', options: ['Just matched', '1-3 days', 'A week', 'Been on a date', 'Dating for a month+'] },
      { name: 'concern', label: 'What\'s your gut telling you?', type: 'textarea', placeholder: 'e.g. "She takes forever to respond but always opens my messages instantly"', rows: 2 },
    ]}
  />
}
