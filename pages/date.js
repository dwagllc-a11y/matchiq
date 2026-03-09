import ToolPage from '../components/ToolPage'
export default function DatePlanner() {
  return <ToolPage
    title="Date Planner"
    description="Tell us about her interests and your city. AI builds the perfect first date that feels personal, not generic."
    icon="📅"
    color="#f59e0b"
    apiEndpoint="generate-date"
    outputLabel="Your Date Plan"
    metaTitle="AI First Date Planner — MatchIQ"
    metaDesc="AI plans the perfect first date based on her interests. Specific venues, timing, conversation starters."
    fields={[
      { name: 'city', label: 'Your city', type: 'text', placeholder: 'e.g. Chicago, NYC, LA', required: true },
      { name: 'interests', label: 'Her interests (from her profile)', type: 'textarea', placeholder: 'e.g. "loves hiking, tries new restaurants, into yoga, has a dog"', rows: 3, required: true },
      { name: 'vibe', label: 'Date vibe', type: 'select', placeholder: 'Select vibe', options: ['Low key and chill', 'Fun and active', 'Romantic', 'Adventurous', 'Daytime casual', 'Evening out'], required: true },
      { name: 'budget', label: 'Budget', type: 'select', placeholder: 'Select budget', options: ['Under $30', '$30-60', '$60-100', 'Money is no object'] },
      { name: 'stage', label: 'First date or further along?', type: 'select', placeholder: 'Select stage', options: ['First date ever', 'Second date', 'Third date+'] },
    ]}
  />
}
