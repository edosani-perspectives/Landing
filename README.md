# ASAM Interactive Landing Page

High-converting landing page for Perspectives Health ad traffic featuring an interactive ASAM demo that converts into lead collection.

## Features

- **Interactive Patient Transcript**: Realistic substance abuse intake conversation (20 exchanges)
- **Auto-Fill ASAM Demo**: 10-second animation showing AI completing full ASAM assessment
- **Value Props Display**: Real-time callouts showing time saved, compliance, and burnout reduction
- **Lead Collection Form**: Minimal friction form for 2-week free trial signup
- **Brand Aligned**: Uses Perspectives Health color palette and typography

## How to Deploy to v0

### Option 1: Copy-Paste into v0.dev
1. Go to [v0.dev](https://v0.dev)
2. Create a new project
3. Copy the entire contents of `asam-landing-page.tsx`
4. Paste into v0's editor
5. v0 will automatically set up the component

### Option 2: Upload File
1. Go to [v0.dev](https://v0.dev)
2. Click "Import" or "Upload"
3. Upload `asam-landing-page.tsx`
4. Deploy

## Design Specifications

### Color Palette
- **Primary Purple**: `#7530c5`
- **Dark Text**: `#242424`
- **White**: `#ffffff`
- **Light Beige BG**: `#f5f4f2`

### Typography
- **Primary**: Inter (body text)
- **Display**: Gambarino (headlines) - falls back to serif if unavailable

### Key Interactions
1. Hero CTA scrolls to demo section
2. "Fill ASAM Form" button triggers 10-second auto-fill animation
3. Value prop cards appear during animation
4. Lead form reveals after completion
5. Form submits to console.log (ready for backend integration)

## Next Steps / Customization

### Add Your Logo
In the header section, add:
```tsx
<img src="/path-to-your-logo.svg" alt="Perspectives Health" className="h-12 mb-6" />
```

### Hook Up Form Submission
Replace line ~242 in the `handleFormSubmit` function:
```tsx
// Current:
console.log('Lead form submitted:', formData)

// Replace with:
await fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Adjust Animation Speed
Change line ~121:
```tsx
const intervalTime = 10000 / totalFields  // 10000 = 10 seconds
```

### Edit Patient Transcript
Modify the `patientTranscript` array (lines 5-25) to customize the conversation

### Edit ASAM Fields
Modify the `asamFields` array (lines 28-96) to customize form fields and responses

## Content Breakdown

### Patient Transcript
- 20 exchanges between clinician and patient
- Covers all 6 ASAM dimensions naturally
- Realistic substance abuse intake scenario
- Provides enough context for AI to generate comprehensive responses

### ASAM Form Structure
- **Dimension 1**: Acute Intoxication/Withdrawal
- **Dimension 2**: Biomedical Conditions
- **Dimension 3**: Emotional/Behavioral
- **Dimension 4**: Readiness to Change
- **Dimension 5**: Relapse/Continued Use
- **Dimension 6**: Recovery Environment

Each dimension contains 2-3 detailed fields that get auto-populated during the demo.

## Performance Notes

- Single page component, no routing needed
- Smooth scroll behavior for better UX
- Optimized animation using React state management
- Mobile responsive (tested down to 320px width)
- Tailwind CSS for styling (v0 has this built-in)

## Support

For questions or customization help, refer to the Perspectives Health brand guidelines or contact the development team.
