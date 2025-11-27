import { useState, useEffect } from 'react'
import { INTERSECTION_OBSERVER_CONFIG } from '@/constants/animation-config'

type UseIntersectionTrackerOptions = {
  threshold?: number
  rootMargin?: string
}

export function useIntersectionTracker(
  sectionCount: number,
  options: UseIntersectionTrackerOptions = {}
) {
  const [activeSection, setActiveSection] = useState(0)

  const { threshold, rootMargin } = {
    ...INTERSECTION_OBSERVER_CONFIG,
    ...options,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const sectionIndex = parseInt(sectionId.split('-')[1] || '0', 10)
            setActiveSection(sectionIndex)
          }
        })
      },
      { threshold, rootMargin }
    )

    const sections: Element[] = []
    for (let i = 0; i < sectionCount; i++) {
      const element = document.getElementById(`section-${i}`)
      if (element) {
        sections.push(element)
        observer.observe(element)
      }
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [sectionCount, threshold, rootMargin])

  return activeSection
}
