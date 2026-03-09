import ToolPage from '../components/ToolPage'
export default function Debrief() {
  return <ToolPage
    title="Date Debrief"
    description="Tell AI how the date went. Get an honest breakdown of what worked, what didn't, and exactly what to do next."
    icon="🔍"
    color="#10b981"
    apiEndpoint="generate-debrief"
    outputLabel="Your Debrief"
    metaTitle="AI Date Debrief — MatchIQ"
    metaDesc="Tell AI how your date went. Get an honest breakdown and exactly what to do next to get a second date."
    fields={[
      { name: 'howItWent', label: 'How did the date go overall?', type: 'select', placeholder: 'Select', options: ['Amazing — she was clearly into me', 'Good but not sure where I stand', 'Mixed signals throughout', 'Pretty awkward', 'Disaster'], required: true },
      { name: 'whatHappened', label: 'Tell me what happened', type: 'textarea', placeholder: 'Where did you go, how long, what did you talk about, how did it end...', rows: 6, required: true },
      { name: 'signals', label: 'What signals did she give?', type: 'textarea', placeholder: 'e.g. "She touched my arm twice, laughed a lot, but was vague about plans when I mentioned next time"', rows: 3 },
      { name: 'goal', label: 'What do you want to happen next?', type: 'select', placeholder: 'Select goal', options: ['Second date', 'More serious', 'Just see what happens', 'Not sure if I even like her'] },
    ]}
  />
}
