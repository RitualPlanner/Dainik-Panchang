import path from 'path'
import { execSync, spawn } from 'child_process'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const port = Number(process.env.PORT) || 3000
const command = process.argv[2] === 'start' ? 'start' : 'dev'

// Helper to kill any process currently occupying the specified port
try {
  if (process.platform === 'win32') {
    const output = execSync(`netstat -ano | findstr :${port}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    })
    const lines = output.trim().split('\n')
    const pidsToKill = new Set()
    for (const line of lines) {
      if (line.includes('LISTENING')) {
        const parts = line.trim().split(/\s+/)
        const pid = parts[parts.length - 1]
        if (pid && pid !== String(process.pid)) {
          pidsToKill.add(pid)
        }
      }
    }
    for (const pid of pidsToKill) {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
    }
  } else {
    const pidStr = execSync(`lsof -t -i:${port}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim()
    if (pidStr) {
      const pids = pidStr.split('\n')
      for (const pid of pids) {
        if (pid && pid !== String(process.pid)) {
          execSync(`kill -9 ${pid}`, { stdio: 'ignore' })
        }
      }
    }
  }
} catch {
  // Ignore if no process is running on the port
}

const isWin = process.platform === 'win32'
const child = spawn(
  isWin ? 'cmd.exe' : 'npx',
  isWin
    ? ['/c', 'npx', 'next', command, '-p', String(port)]
    : ['next', command, '-p', String(port)],
  {
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port) },
  }
)

child.on('exit', (code) => {
  process.exit(code || 0)
})
