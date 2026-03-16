import SectionWrapper from './ui/SectionWrapper'
import CaseCard from './CaseCard'
import { caseStudies } from '../data/caseStudies'

export default function CaseStudies() {
  return (
    <SectionWrapper id="case-studies">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Case Studies</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {caseStudies.map((study) => (
          <CaseCard key={study.id} study={study} />
        ))}
      </div>
    </SectionWrapper>
  )
}
