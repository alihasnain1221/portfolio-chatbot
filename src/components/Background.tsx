import { useParallax } from '../hooks/useParallax'

// Animated refractive background with subtle mouse parallax.
export default function Background() {
  const ref = useParallax<HTMLDivElement>()

  return (
    <div className="refractive-bg" ref={ref}>
      <div className="circle bg-secondary-container w-[600px] h-[600px] -top-20 -left-20" />
      <div
        className="circle bg-surface-variant w-[500px] h-[500px] top-1/2 -right-20"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="circle bg-primary-fixed w-[700px] h-[700px] -bottom-40 left-1/3"
        style={{ animationDelay: '-10s' }}
      />
    </div>
  )
}
