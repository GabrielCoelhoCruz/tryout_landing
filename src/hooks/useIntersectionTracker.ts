import { useState, useEffect, useRef } from 'react'

type UseIntersectionTrackerOptions = {
  threshold?: number
  rootMargin?: string
}

export function useIntersectionTracker(
  sectionCount: number,
  options: UseIntersectionTrackerOptions = {}
) {
  const [activeSection, setActiveSection] = useState(0)
  const visibleSectionsRef = useRef<Map<number, number>>(new Map())

  const { threshold = 0.1, rootMargin = '-20% 0px -20% 0px' } = options

  useEffect(() => {
    if (sectionCount <= 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          const match = sectionId.match(/section-(\d+)/)
          if (!match) return

          const sectionIndex = parseInt(match[1], 10)

          if (entry.isIntersecting) {
            // Store visibility ratio for each section
            visibleSectionsRef.current.set(sectionIndex, entry.intersectionRatio)
          } else {
            visibleSectionsRef.current.delete(sectionIndex)
          }
        })

        // Find the section with highest visibility, or the highest index if equal
        const visibleSections = Array.from(visibleSectionsRef.current.entries())
        if (visibleSections.length > 0) {
          // Sort by visibility ratio (desc), then by index (desc) for tie-breaking
          visibleSections.sort((a, b) => {
            if (Math.abs(a[1] - b[1]) < 0.1) {
              // If ratios are close, prefer higher index (further in form)
              return b[0] - a[0]
            }
            return b[1] - a[1]
          })
          setActiveSection(visibleSections[0][0])
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin }
    )

    const sections: Element[] = []
    for (let i = 0; i < sectionCount; i++) {
      const element = document.getElementById(`section-${i}`)
      if (element) {
        sections.push(element)
        observer.observe(element)
      }
    }

    const visibleSections = visibleSectionsRef.current
    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
      visibleSections.clear()
    }
  }, [sectionCount, threshold, rootMargin])

  return activeSection
}
