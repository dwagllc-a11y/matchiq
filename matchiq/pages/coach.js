import ToolPage from '../components/ToolPage'
export default function Coach() {
  return <ToolPage
    title="Conversation Coach"
    description="Paste her profile or a conversation that went cold. Get exact lines to send — openers, responses, how to ask for the number."
    icon="💬"
    color="#ec4899"
    apiEndpoint="generate-coach"
    outputLabel="Your Lines"
    metaTitle="AI Dating Conversation Coach — MatchIQ"
    metaDesc="Paste any match or dead conversation. AI gives you exact lines to send. Get her number."
    fields={[
      { name: 'situation', label: 'What do you need?', type: 'select', placeholder: 'Select situation', options: ['Opening line from her profile', 'Conversation went cold', 'Need to ask for her number', 'She seems interested but I\'m stuck', 'Recover after a bad reply', 'First message ideas'], required: true },
      { name: 'profile', label: 'Her profile or conversation (paste here)', type: 'textarea', placeholder: 'Paste her bio, prompts, or the conversation so far...', rows: 6, required: true },
      { name: 'yourStyle', label: 'Your style', type: 'select', placeholder: 'Select your style', options: ['Funny and playful', 'Direct and confident', 'Warm and genuine', 'Witty and intellectual'] },
      { name: 'context', label: 'Anything else I should know?', type: 'textarea', placeholder: 'e.g. "We matched 3 days ago and she replied once then went quiet"', rows: 2 },
    ]}
  />
}
