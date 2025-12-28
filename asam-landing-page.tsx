'use client'

import React, { useState } from 'react'

// Patient transcript data
const patientTranscript = [
  { speaker: 'clinician', text: "Thanks for coming in today. Can you tell me about what brings you here?" },
  { speaker: 'patient', text: "Yeah, my family kind of pushed me to come. I've been using opioids pretty heavily for the past couple years." },
  { speaker: 'clinician', text: "I appreciate you being open about that. Can you tell me more about your current use pattern?" },
  { speaker: 'patient', text: "I'm using fentanyl, usually snorting it, about 3-4 times a day. Started with prescription painkillers after a back injury in 2021, but those got too expensive." },
  { speaker: 'clinician', text: "How much are you typically using each day?" },
  { speaker: 'patient', text: "Maybe half a gram? It's hard to say exactly. I spend about $100-150 a day on it." },
  { speaker: 'clinician', text: "Have you experienced any withdrawal symptoms when you've tried to stop or cut back?" },
  { speaker: 'patient', text: "Oh yeah, it's brutal. I get sweats, body aches, nausea, can't sleep. The anxiety is the worst part. I tried to quit cold turkey once and lasted maybe 18 hours." },
  { speaker: 'clinician', text: "That sounds really difficult. Have you had any medical complications from use?" },
  { speaker: 'patient', text: "I overdosed once last year, my friend had to use Narcan. And I've got some ongoing issues with my liver apparently, my doctor said my enzyme levels are elevated." },
  { speaker: 'clinician', text: "Are you taking any other substances currently?" },
  { speaker: 'patient', text: "I drink sometimes, maybe a six-pack on weekends. Used to smoke weed daily but stopped that a few months ago. And I'm prescribed Xanax for anxiety but I don't take it regularly." },
  { speaker: 'clinician', text: "Tell me about your living situation right now." },
  { speaker: 'patient', text: "I'm staying with my mom temporarily. Lost my apartment about six months ago when I couldn't keep up with rent. My relationship with my girlfriend ended because of all this." },
  { speaker: 'clinician', text: "How has your use affected your work or daily responsibilities?" },
  { speaker: 'patient', text: "I lost my job in construction about four months ago. I was showing up late, sometimes not at all. I want to work but it's hard to function without using." },
  { speaker: 'clinician', text: "Have you received any treatment for substance use before?" },
  { speaker: 'patient', text: "I did an outpatient program about a year ago, went for maybe two weeks then stopped going. And I've been to a few NA meetings but never stuck with it." },
  { speaker: 'clinician', text: "How would you describe your mental health right now?" },
  { speaker: 'patient', text: "Not great, honestly. I've always struggled with anxiety, that's why I got the Xanax prescription. And lately I've been really depressed. Some days I don't see the point in anything." },
  { speaker: 'clinician', text: "Have you had thoughts of harming yourself?" },
  { speaker: 'patient', text: "Sometimes I think everyone would be better off without me, but I don't have like an actual plan or anything. I wouldn't do that to my mom." },
  { speaker: 'clinician', text: "I'm glad you're here and being honest with me. What are you hoping to get out of treatment?" },
  { speaker: 'patient', text: "I just want my life back, you know? I want to be able to work again, fix things with my family. I'm tired of waking up every day just thinking about where I'm getting my next dose." },
]

// ASAM form fields
const asamFields = [
  {
    dimension: 'Dimension 1: Acute Intoxication/Withdrawal',
    fields: [
      { label: 'Current substance use pattern', value: 'Patient reports using fentanyl 3-4x daily via intranasal route, approximately 0.5g/day ($100-150 daily expenditure). History of progression from prescription opioids (2021) to illicit fentanyl due to cost.' },
      { label: 'Withdrawal symptoms history', value: 'Significant withdrawal history including diaphoresis, myalgias, nausea, insomnia, and severe anxiety. Previous cessation attempt resulted in withdrawal symptoms within 18 hours. COWS assessment indicated moderate-severe physiological dependence.' },
      { label: 'Medical complications', value: 'One documented overdose requiring naloxone administration (2024). Elevated liver enzymes noted by PCP suggesting hepatic involvement. No current acute intoxication observed.' },
    ]
  },
  {
    dimension: 'Dimension 2: Biomedical Conditions',
    fields: [
      { label: 'Current medical conditions', value: 'Chronic back pain (injury 2021) - precipitating factor for initial opioid use. Elevated liver enzymes (specific values to be obtained from PCP records). History of overdose with naloxone reversal.' },
      { label: 'Current medications', value: 'Alprazolam (Xanax) prescribed for anxiety - patient reports non-adherent use. No current use of MOUD or other medications.' },
    ]
  },
  {
    dimension: 'Dimension 3: Emotional/Behavioral',
    fields: [
      { label: 'Mental health symptoms', value: 'Chronic anxiety disorder (pre-existing, prescribed benzodiazepines). Current depressive symptoms including anhedonia, hopelessness, and low motivation. Denies specific SI plan but endorses passive death ideation. States "sometimes think everyone would be better off without me" but identifies mother as protective factor.' },
      { label: 'Suicide risk assessment', value: 'Passive suicidal ideation present. No active plan or intent. Protective factors: relationship with mother, fear of impact on family. Requires monitoring and psychiatric evaluation.' },
    ]
  },
  {
    dimension: 'Dimension 4: Readiness to Change',
    fields: [
      { label: 'Motivation for treatment', value: 'Externally motivated (family pressure) but demonstrates some internal motivation. Expressed desire to "get life back," return to employment, and repair family relationships. Acknowledges negative impact on daily functioning. Previous engagement low (discontinued outpatient tx after 2 weeks).' },
      { label: 'Previous treatment history', value: 'One outpatient treatment episode ~12 months ago, discontinued after 2 weeks. Sporadic NA meeting attendance without sustained engagement. No residential/inpatient treatment history.' },
    ]
  },
  {
    dimension: 'Dimension 5: Relapse/Continued Use',
    fields: [
      { label: 'Triggers and risk factors', value: 'Chronic pain (back injury), financial stress, housing instability, unemployment, social isolation. Loss of romantic relationship. Unmanaged anxiety and depressive symptoms. Access to substance appears readily available.' },
      { label: 'Coping skills', value: 'Limited evidence of healthy coping mechanisms. Previous attempts at peer support (NA) not sustained. No current support network besides mother. Patient acknowledges using substances as primary coping mechanism for physical and emotional pain.' },
    ]
  },
  {
    dimension: 'Dimension 6: Recovery Environment',
    fields: [
      { label: 'Living situation', value: 'Currently residing with mother (temporary arrangement). Lost independent housing 6 months ago due to financial instability. Previously lived with girlfriend (relationship ended due to substance use).' },
      { label: 'Social support', value: 'Primary support: mother (appears engaged and supportive). Recent relationship loss with girlfriend. Terminated employment 4 months ago from construction job due to attendance issues and performance decline. Limited prosocial network noted.' },
      { label: 'Employment/financial', value: 'Currently unemployed (lost construction position 4 months ago). Spending $100-150/day on substances creating significant financial burden. Expresses desire to return to work but acknowledges current functional impairment.' },
    ]
  },
]

export default function ASAMLandingPage() {
  const [demoStarted, setDemoStarted] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(-1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practiceName: '',
    phone: '',
    emr: ''
  })

  const totalFields = asamFields.reduce((acc, dim) => acc + dim.fields.length, 0)

  const startDemo = () => {
    setDemoStarted(true)

    // Animate through all fields over 10 seconds
    const intervalTime = 10000 / totalFields
    let fieldCounter = 0

    const interval = setInterval(() => {
      if (fieldCounter < totalFields) {
        setCurrentFieldIndex(fieldCounter)
        fieldCounter++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowLeadForm(true), 500)
      }
    }, intervalTime)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead form submitted:', formData)
    // TODO: Hook up to backend/CRM
    alert('Thank you! We will be in touch shortly to set up your free trial.')
  }

  // Calculate which fields should be filled based on currentFieldIndex
  const getFieldsFilled = () => {
    let count = 0
    const filled: { [key: string]: number } = {}

    asamFields.forEach((dim, dimIdx) => {
      filled[`dim-${dimIdx}`] = 0
      dim.fields.forEach((field, fieldIdx) => {
        if (count <= currentFieldIndex) {
          filled[`dim-${dimIdx}`] = fieldIdx + 1
        }
        count++
      })
    })

    return filled
  }

  const fieldsFilled = getFieldsFilled()

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <header className="bg-[#7530c5] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <img
            src="/Logo/Perspectives-Logo.png"
            alt="Perspectives Health"
            className="h-12 mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Gambarino, serif' }}>
            This ASAM Takes 45 Minutes.<br />Watch AI Complete It in 10 Seconds.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            See how Perspectives automates your most time-consuming assessments
          </p>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#7530c5] px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            Try It Now
          </button>
        </div>
      </header>

      {/* Demo Section */}
      <section id="demo" className="py-16 px-6 bg-[#f5f4f2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Patient Transcript */}
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 text-[#242424]">Patient Session Transcript</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {patientTranscript.map((exchange, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      exchange.speaker === 'clinician'
                        ? 'bg-[#7530c51a] ml-8'
                        : 'bg-[#f5f4f2] mr-8'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1 text-[#7530c5]">
                      {exchange.speaker === 'clinician' ? 'Clinician' : 'Patient'}
                    </div>
                    <div className="text-[#242424]">{exchange.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ASAM Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 text-[#242424]">ASAM Assessment Form</h2>

              {!demoStarted ? (
                <div className="flex items-center justify-center h-[500px]">
                  <button
                    onClick={startDemo}
                    className="bg-[#7530c5] text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    🤖 Fill ASAM Form
                  </button>
                </div>
              ) : (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {asamFields.map((dimension, dimIdx) => (
                    <div key={dimIdx} className="border-l-4 border-[#7530c5] pl-4">
                      <h3 className="font-bold text-lg mb-3 text-[#242424]">{dimension.dimension}</h3>
                      <div className="space-y-4">
                        {dimension.fields.map((field, fieldIdx) => {
                          const isFilled = fieldsFilled[`dim-${dimIdx}`] > fieldIdx
                          return (
                            <div key={fieldIdx}>
                              <label className="block text-sm font-semibold mb-1 text-[#7530c5]">
                                {field.label}
                              </label>
                              <div
                                className={`p-3 rounded border-2 transition-all duration-300 ${
                                  isFilled
                                    ? 'border-[#7530c5] bg-[#7530c51a]'
                                    : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                <p className={`text-sm transition-opacity duration-300 ${
                                  isFilled ? 'opacity-100' : 'opacity-0'
                                }`}>
                                  {isFilled ? field.value : '...'}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Value Props - shown during animation */}
          {demoStarted && currentFieldIndex >= 0 && currentFieldIndex < totalFields && (
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7530c5]">
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="font-bold text-lg mb-2 text-[#242424]">Save Massive Time</h3>
                <p className="text-sm text-gray-600">
                  {Math.round((currentFieldIndex / totalFields) * 10)} seconds elapsed
                  <span className="block text-xs mt-1">(vs. 45 minutes manual)</span>
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7530c5]">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-bold text-lg mb-2 text-[#242424]">More Detailed & Compliant</h3>
                <p className="text-sm text-gray-600">
                  AI cross-references patient statements and clinical criteria for audit-ready documentation
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#7530c5]">
                <div className="text-3xl mb-2">💚</div>
                <h3 className="font-bold text-lg mb-2 text-[#242424]">Less Burnout</h3>
                <p className="text-sm text-gray-600">
                  Stay present with clients. Zero time at keyboard doing documentation
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lead Form Section */}
      {showLeadForm && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#242424]" style={{ fontFamily: 'Gambarino, serif' }}>
              Get This for Every ASAM, Biopsychosocial, and Progress Note
            </h2>
            <p className="text-xl text-center mb-8 text-gray-600">
              See it work in your EMR with your actual patients. Start your 2-week free trial:
            </p>

            <form onSubmit={handleFormSubmit} className="bg-[#f5f4f2] p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#242424]">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#7530c5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#242424]">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#7530c5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#242424]">Practice/Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.practiceName}
                    onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                    className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#7530c5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#242424]">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#7530c5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-[#242424]">Current EMR System *</label>
                  <select
                    required
                    value={formData.emr}
                    onChange={(e) => setFormData({ ...formData, emr: e.target.value })}
                    className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#7530c5] focus:outline-none"
                  >
                    <option value="">Select your EMR...</option>
                    <option value="SimplePractice">SimplePractice</option>
                    <option value="Kipu">Kipu</option>
                    <option value="Alleva">Alleva</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#7530c5] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all"
              >
                Start My Free Trial
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                No credit card required • 30-minute setup • HIPAA compliant
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Footer with social proof */}
      <footer className="bg-[#242424] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-6">Trusted by behavioral health providers nationwide</p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-sm">HIPAA Compliant</div>
            <div className="text-sm">SOC 2 Type II</div>
            <div className="text-sm">30-Min Setup</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
