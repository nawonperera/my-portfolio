import { useEffect, useRef } from 'react'

const WebBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const nodes = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    const drawWeb = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          node.vx += dx * 0.00005
          node.vy += dy * 0.00005
        }

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(230, 57, 70, 0.5)'
        ctx.fill()

        nodes.slice(i + 1).forEach(other => {
          const d = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - d / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        const mouseDist = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2)
        if (mouseDist < 200) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(230, 57, 70, ${0.3 * (1 - mouseDist / 200)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      drawCornerWeb(ctx, 0, 0, 200, 1)
      drawCornerWeb(ctx, canvas.width, 0, 200, 2)
      drawCornerWeb(ctx, 0, canvas.height, 200, 3)
      drawCornerWeb(ctx, canvas.width, canvas.height, 200, 4)

      animationId = requestAnimationFrame(drawWeb)
    }

    const drawCornerWeb = (ctx, cx, cy, size, corner) => {
      const rings = 5
      const spokes = 8
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1

      for (let i = 0; i < spokes; i++) {
        const startAngle = (corner - 1) * (Math.PI / 2)
        const angle = startAngle + (i / spokes) * (Math.PI / 2)
        
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(
          cx + Math.cos(angle) * size,
          cy + Math.sin(angle) * size
        )
        ctx.stroke()
      }

      for (let r = 1; r <= rings; r++) {
        const radius = (r / rings) * size
        ctx.beginPath()
        const startAngle = (corner - 1) * (Math.PI / 2)
        ctx.arc(cx, cy, radius, startAngle, startAngle + Math.PI / 2)
        ctx.stroke()
      }
    }

    drawWeb()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-60"
    />
  )
}

export default WebBackground