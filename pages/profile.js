import ToolPage from '../components/ToolPage'
export default function Profile() {
  return <ToolPage
    title="AI Profile Builder"
    description="Paste your current bio and prompts. AI rewrites everything to get 3x more matches — optimized for Hinge, Tinder, and Bumble."
    icon="📸"
    color="#a855f7"
    apiEndpoint="generate-profile"
    outputLabel="Your New Profile"
    metaTitle="AI Dating Profile Writer — MatchIQ"
    metaDesc="AI rewrites your Hinge, Tinder, and Bumble profile to get 3x more matches. Free to try."
    fields={[
      { name: 'app', label: 'Which app?', type: 'select', placeholder: 'Select app', options: ['Hinge', 'Tinder', 'Bumble', 'All of them'], required: true },
      { name: 'age', label: 'Your age', type: 'text', placeholder: 'e.g. 28', required: true },
      { name: 'bio', label: 'Your current bio (paste it here)', type: 'textarea', placeholder: 'Paste your current bio, or write a few sentences about yourself...', rows: 4, required: true },
      { name: 'prompts', label: 'Your current prompts/answers', type: 'textarea', placeholder: 'e.g. "My simple pleasures: Coffee, hiking, and finding the best hole-in-the-wall spots"', rows: 4 },
      { name: 'vibe', label: 'What vibe do you want?', type: 'select', placeholder: 'Select your vibe', options: ['Funny and witty', 'Confident and direct', 'Chill and genuine', 'Adventurous', 'Intellectual'], required: true },
      { name: 'goals', label: 'What are you looking for?', type: 'select', placeholder: 'Select goal', options: ['Something serious', 'Casual dating', 'Seeing what happens', 'Not sure yet'] },
    ]}
  />
}
